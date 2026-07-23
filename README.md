# Loader Motion Lab

A static multi-page loader project. Open `index.html` in a browser, or serve the
folder locally if you prefer a local URL.

Pages:

- Progressive Blur Spinner
- Progressive Blur Spinner Solo
- Minimalist-Spinner
- Pull-to-refresh Blob Capsule
- Pull-to-refresh Glass Capsule
- Pull-to-refresh Neutral Capsule
- Pull-to-refresh Neutral Capsule 2
- loader-dense
- loader-radius
- success-wheel-2
- minimalist success
- UBA Media Blob Prototype
- UBA-loader-gradient-blob prototype

The pull-to-refresh capsule pages include a header Light/Dark theme switch.
The progressive spinner uses a 4px trimmed circular stroke with red-to-transparent
trail styling, glow, continuous rotation, and animated trail length.

## React Native components

`PullToRefreshWrapper.tsx` is a reusable `ScrollView` wrapper using
`react-native-reanimated` and `expo-blur`.

```tsx
import PullToRefreshWrapper from "./PullToRefreshWrapper";

export function FeedScreen() {
  return (
    <PullToRefreshWrapper onRefresh={async () => loadLatestItems()}>
      {items.map((item) => (
        <FeedItem item={item} key={item.id} />
      ))}
    </PullToRefreshWrapper>
  );
}
```
