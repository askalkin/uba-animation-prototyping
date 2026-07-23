import React, { useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
  BlurMask,
  Canvas,
  Group,
  Path,
  Skia,
  SweepGradient,
  useClock,
  vec,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

export type CometLoadingSpinnerProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  glowBlur?: number;
  spinDurationMs?: number;
  trailDurationMs?: number;
  style?: StyleProp<ViewStyle>;
};

const TAU = Math.PI * 2;

function toTransparent(color: string) {
  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return `${color}00`;
  }

  if (/^#[0-9a-fA-F]{8}$/.test(color)) {
    return `${color.slice(0, 7)}00`;
  }

  return "rgba(255, 0, 0, 0)";
}

export function CometLoadingSpinner({
  size = 48,
  strokeWidth = 4,
  color = "#ff0000",
  glowBlur = 8,
  spinDurationMs = 900,
  trailDurationMs = 1200,
  style,
}: CometLoadingSpinnerProps) {
  const center = size / 2;
  const radius = (size - strokeWidth - glowBlur * 2) / 2;
  const clock = useClock();
  const transparentColor = toTransparent(color);

  const circlePath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addCircle(center, center, Math.max(1, radius));
    return path;
  }, [center, radius]);

  const rotation = useDerivedValue(() => {
    const spinProgress = (clock.value % spinDurationMs) / spinDurationMs;
    return [{ rotate: spinProgress * TAU }];
  });

  const trimStart = useDerivedValue(() => {
    const trailProgress = (clock.value % trailDurationMs) / trailDurationMs;
    const stretch = 0.5 - 0.5 * Math.cos(trailProgress * TAU);
    return 0.04 + stretch * 0.18;
  });

  const trimEnd = useDerivedValue(() => {
    const trailProgress = (clock.value % trailDurationMs) / trailDurationMs;
    const stretch = 0.5 - 0.5 * Math.cos(trailProgress * TAU);
    return 0.36 + stretch * 0.5;
  });

  return (
    <Canvas style={[{ width: size, height: size }, style]}>
      <Group origin={vec(center, center)} transform={rotation}>
        <Path
          path={circlePath}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={trimStart}
          end={trimEnd}
        >
          <SweepGradient
            c={vec(center, center)}
            colors={[color, transparentColor]}
            positions={[0, 1]}
          />
          <BlurMask blur={glowBlur} style="solid" />
        </Path>
        <Path
          path={circlePath}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={trimStart}
          end={trimEnd}
        >
          <SweepGradient
            c={vec(center, center)}
            colors={[color, transparentColor]}
            positions={[0, 1]}
          />
        </Path>
      </Group>
    </Canvas>
  );
}

export default CometLoadingSpinner;
