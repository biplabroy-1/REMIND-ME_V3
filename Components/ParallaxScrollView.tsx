import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from './Utils/ThemedView';

const HEADER_HEIGHT = 400;

type Props = PropsWithChildren<{
  headerContent: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  refreshControl?: ReactElement;
  onScrollEndReached: () => void;
  onScrollTopReached: () => void;
}>;

export default function ParallaxScrollView({
  children,
  headerContent,
  headerBackgroundColor,
  refreshControl,
  onScrollEndReached,
  onScrollTopReached,
}: Props) {

  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.97]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height) {
      onScrollEndReached();
    }
    if (offsetY <= 0) {
      onScrollTopReached();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        refreshControl={refreshControl}
        onScroll={handleScroll}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerContent}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CEDC',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
