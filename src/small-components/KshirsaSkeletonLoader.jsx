import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Colors from '../styles/Colors';

const KshirsaSkeletonLoader = ({ count = 5 }) => {
  return (
    <FlatList
      data={Array.from({ length: count })}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ index }) => <SkeletonCard index={index} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const SkeletonCard = ({ index }) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withRepeat(withTiming(0.4, { duration: 800 }), -1, true);
    }, index * 150); // Staggered delay effect per card
  }, []);

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.skeletonCircle, animatedOpacity]} />
      <View style={styles.rightSection}>
        <Animated.View style={[styles.skeletonLine, animatedOpacity]} />
        <Animated.View style={[styles.skeletonLine, styles.shortLine, animatedOpacity]} />
        <Animated.View style={[styles.skeletonLine, styles.extraShortLine, animatedOpacity]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryText,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    // marginHorizontal: 20,
    overflow: 'hidden',
  },
  skeletonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  rightSection: {
    flex: 1,
    marginLeft: 15,
  },
  skeletonLine: {
    width: '80%',
    height: 15,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 8,
  },
  shortLine: {
    width: '60%',
  },
  extraShortLine: {
    width: '40%',
  },
});

export default KshirsaSkeletonLoader;
