import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Colors from '../styles/Colors';
import { screenWidth } from '../constants/utils';

const THUMB_SIZE = 28;
const MIN_DISTANCE = 0;

const KshirsaRange = ({ min, max, fromValue, toValue, setFromValue, setToValue, width = '' }) => {
  const [sliderWidth, setSliderWidth] = useState(width || screenWidth * 0.85); // Default to 85% of screen width
  const [lastMoved, setLastMoved] = useState(null); // Track the last moved thumb (either 'from' or 'to')

  const fromX = useSharedValue(((fromValue - min) / (max - min)) * sliderWidth);
  const toX = useSharedValue(((toValue - min) / (max - min)) * sliderWidth);

  const fromStartX = useSharedValue(0);
  const toStartX = useSharedValue(0);

  const fromThumbScale = useSharedValue(1);
  const toThumbScale = useSharedValue(1);

  useEffect(() => {
    fromX.value = ((fromValue - min) / (max - min)) * sliderWidth;
    toX.value = ((toValue - min) / (max - min)) * sliderWidth;
  }, [fromValue, toValue]);

  const updateValue = (thumb, newX) => {
    const value = Math.round(min + ((newX / sliderWidth) * (max - min)));
    if (thumb === 'from') {
      setFromValue(value);
    } else {
      setToValue(value);
    }
    setLastMoved(thumb); // Set the last moved thumb
  };

  const fromGesture = Gesture.Pan()
    .onBegin(() => {
      fromThumbScale.value = 1.1;  // Enlarge the thumb when dragging starts
      fromStartX.value = fromX.value;
    })
    .onUpdate((event) => {
      let newX = fromStartX.value + event.translationX;
      newX = Math.max(0, Math.min(newX, toX.value));

      fromX.value = newX;
      runOnJS(updateValue)('from', newX);
    })
    .onEnd(() => {
      fromThumbScale.value = 1;  // Return to normal size when dragging ends
    });

  const toGesture = Gesture.Pan()
    .onBegin(() => {
      toThumbScale.value = 1.1;  // Enlarge the thumb when dragging starts
      toStartX.value = toX.value;
    })
    .onUpdate((event) => {
      let newX = toStartX.value + event.translationX;
      newX = Math.max(fromX.value, Math.min(newX, sliderWidth));

      toX.value = newX;
      runOnJS(updateValue)('to', newX);
    })
    .onEnd(() => {
      toThumbScale.value = 1;  // Return to normal size when dragging ends
    });

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const fromThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: fromX.value }, { scale: fromThumbScale.value }],
      width: THUMB_SIZE * fromThumbScale.value,
      height: THUMB_SIZE * fromThumbScale.value,
      zIndex: lastMoved === 'from' ? 1 : 0, // Bring to front if 'from' was last moved
    };
  });

  const toThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: toX.value }, { scale: toThumbScale.value }],
      width: THUMB_SIZE * toThumbScale.value,
      height: THUMB_SIZE * toThumbScale.value,
      zIndex: lastMoved === 'to' ? 1 : 0, // Bring to front if 'to' was last moved
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container} onLayout={onLayout}>
        <View style={[styles.sliderTrack, { width: sliderWidth }]}>
          {/* Selected range (active track) */}
          <Animated.View 
            style={[styles.activeTrack, useAnimatedStyle(() => ({
              left: fromX.value, 
              width: toX.value - fromX.value,
            }))]}
          />
          
          {/* From thumb */}
          <GestureDetector gesture={fromGesture}>
            <Animated.View style={[styles.thumb, fromThumbStyle]} />
          </GestureDetector>

          {/* To thumb */}
          <GestureDetector gesture={toGesture}>
            <Animated.View style={[styles.thumb, toThumbStyle]} />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    position: 'relative',
    justifyContent: 'center',
  },
  activeTrack: {
    position: 'absolute',
    height: 6,
    backgroundColor: Colors.secondary,
    borderRadius: 3,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 50,
    backgroundColor: Colors.moodyBlack,
    position: 'absolute',
    top: -11,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
});

export default KshirsaRange;
