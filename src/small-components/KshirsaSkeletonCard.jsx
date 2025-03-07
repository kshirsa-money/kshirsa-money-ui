import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Colors from '../styles/Colors';

const KshirsaSkeletonCard = () => {
  const shimmerTranslateX = useSharedValue(-100); // Start shimmer effect from the left

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(withTiming(300, { duration: 1200 }), -1, false);
  }, []);

  const animatedShimmer = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslateX.value }],
  }));

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.skeletonCircle} />
      </View>
      <View style={styles.rightSection}>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, styles.shortLine]} />
        <View style={[styles.skeletonLine, styles.extraShortLine]} />
      </View>
      {/* Shimmer Effect */}
      <Animated.View style={[styles.shimmerWrapper, animatedShimmer]}>
        <LinearGradient colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} style={styles.shimmer} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryText,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  leftSection: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  rightSection: {
    flex: 1,
    marginLeft: 15,
  },
  skeletonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
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
  shimmerWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 100,
  },
  shimmer: {
    flex: 1,
  },
});

export default KshirsaSkeletonCard;
