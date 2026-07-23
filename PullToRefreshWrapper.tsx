import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const RELEASE_SPRING = {
  damping: 7,
  stiffness: 170,
  mass: 0.6,
};

const BOUNCE_SPRING = {
  damping: 5,
  stiffness: 240,
  mass: 0.55,
};

type RefreshResult = void | Promise<void>;

export type PullToRefreshWrapperProps = Omit<
  ScrollViewProps,
  "onScroll" | "onScrollEndDrag" | "refreshControl"
> & {
  onRefresh?: () => RefreshResult;
  refreshing?: boolean;
  threshold?: number;
  progressSharedValue?: SharedValue<number>;
  containerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorTop?: number;
  capsuleWidth?: number;
  capsuleHeight?: number;
  circleSize?: number;
  circleColor?: string;
  blurIntensity?: number;
  blurTint?: "light" | "dark" | "default";
};

function isPromise(result: RefreshResult): result is Promise<void> {
  return Boolean(result && typeof result.then === "function");
}

export function PullToRefreshWrapper({
  children,
  onRefresh,
  refreshing,
  threshold = 96,
  progressSharedValue,
  containerStyle,
  indicatorStyle,
  indicatorTop = 18,
  capsuleWidth = 36,
  capsuleHeight = 128,
  circleSize = 22,
  circleColor = "#ff0000",
  blurIntensity = 48,
  blurTint = "light",
  bounces = true,
  alwaysBounceVertical = true,
  overScrollMode = "always",
  scrollEventThrottle = 16,
  style,
  contentContainerStyle,
  ...scrollViewProps
}: PullToRefreshWrapperProps) {
  const [internalRefreshing, setInternalRefreshing] = useState(false);
  const activeRefreshing = refreshing ?? internalRefreshing;
  const activeRefreshingRef = useRef(activeRefreshing);
  const progress = useSharedValue(0);
  const refreshingState = useSharedValue(activeRefreshing);
  const releaseBounce = useSharedValue(0);

  const normalizedThreshold = Math.max(1, threshold);
  const circleTravel = Math.max(0, capsuleHeight - circleSize - 16);

  const capsuleLayoutStyle = useMemo(
    () => ({
      top: indicatorTop,
      width: capsuleWidth,
      height: capsuleHeight,
      borderRadius: capsuleWidth / 2,
    }),
    [capsuleHeight, capsuleWidth, indicatorTop],
  );

  const circleLayoutStyle = useMemo(
    () => ({
      top: 8,
      left: (capsuleWidth - circleSize) / 2,
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
    }),
    [capsuleWidth, circleColor, circleSize],
  );

  const completeInternalRefresh = useCallback(
    (result: RefreshResult) => {
      if (refreshing !== undefined) {
        if (isPromise(result)) {
          result.catch(() => undefined);
        }

        return;
      }

      if (isPromise(result)) {
        result
          .catch(() => undefined)
          .finally(() => setInternalRefreshing(false));
        return;
      }

      setTimeout(() => setInternalRefreshing(false), 760);
    },
    [refreshing],
  );

  const triggerRefresh = useCallback(() => {
    if (activeRefreshingRef.current) {
      return;
    }

    if (refreshing === undefined) {
      setInternalRefreshing(true);
    }

    const result = onRefresh?.();
    completeInternalRefresh(result);
  }, [completeInternalRefresh, onRefresh, refreshing]);

  useEffect(() => {
    activeRefreshingRef.current = activeRefreshing;
    refreshingState.value = activeRefreshing;

    if (activeRefreshing) {
      progress.value = withSpring(1, RELEASE_SPRING);
      if (progressSharedValue) {
        progressSharedValue.value = withSpring(1, RELEASE_SPRING);
      }
      return;
    }

    progress.value = withSpring(0, RELEASE_SPRING);
    if (progressSharedValue) {
      progressSharedValue.value = withSpring(0, RELEASE_SPRING);
    }
  }, [activeRefreshing, progress, progressSharedValue, refreshingState]);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        if (refreshingState.value) {
          return;
        }

        const pullDistance = Math.max(0, -event.contentOffset.y);
        const nextProgress = Math.min(pullDistance / normalizedThreshold, 1);

        progress.value = nextProgress;
        if (progressSharedValue) {
          progressSharedValue.value = nextProgress;
        }
      },
      onEndDrag: () => {
        if (refreshingState.value) {
          return;
        }

        if (progress.value >= 1) {
          refreshingState.value = true;
          progress.value = withSpring(1, RELEASE_SPRING);
          if (progressSharedValue) {
            progressSharedValue.value = withSpring(1, RELEASE_SPRING);
          }

          releaseBounce.value = withSequence(
            withSpring(1, BOUNCE_SPRING),
            withSpring(0, RELEASE_SPRING),
          );

          runOnJS(triggerRefresh)();
          return;
        }

        progress.value = withSpring(0, RELEASE_SPRING);
        if (progressSharedValue) {
          progressSharedValue.value = withSpring(0, RELEASE_SPRING);
        }
      },
    },
    [normalizedThreshold, triggerRefresh],
  );

  const capsuleAnimatedStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(
      progress.value,
      [0, 1],
      [0.96, 1.02],
      Extrapolation.CLAMP,
    );

    return {
      opacity: interpolate(
        progress.value,
        [0, 0.12, 1],
        [0.74, 0.9, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        { translateY: releaseBounce.value * 5 },
        { scaleY: scaleY + releaseBounce.value * 0.03 },
      ],
    };
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, circleTravel],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [0, 1],
      [0.82, 1.08],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateY: translateY - releaseBounce.value * 7 },
        { scale: scale + releaseBounce.value * 0.18 },
      ],
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <AnimatedScrollView
        {...scrollViewProps}
        alwaysBounceVertical={alwaysBounceVertical}
        bounces={bounces}
        contentContainerStyle={contentContainerStyle}
        onScroll={scrollHandler}
        overScrollMode={overScrollMode}
        scrollEventThrottle={scrollEventThrottle}
        style={style}
      >
        {children}
      </AnimatedScrollView>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.capsule,
          capsuleLayoutStyle,
          capsuleAnimatedStyle,
          indicatorStyle,
        ]}
      >
        <BlurView
          intensity={blurIntensity}
          style={StyleSheet.absoluteFill}
          tint={blurTint}
        />
        <View style={styles.frostTint} />
        <Animated.View
          style={[styles.circle, circleLayoutStyle, circleAnimatedStyle]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  capsule: {
    position: "absolute",
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.56)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
    zIndex: 20,
  },
  frostTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  circle: {
    position: "absolute",
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.42,
    shadowRadius: 14,
    elevation: 12,
  },
});

export default PullToRefreshWrapper;
