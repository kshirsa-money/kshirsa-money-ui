import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import imagePath from '../constants/imagePath';
import Colors from '../styles/Colors';
import KshirsaMoneyLoadingImg from '../../assets/animatedImage/moneyLoadingImage';

const KshirsaLoadingScreen = () => {
  const fadeValue = useRef(new Animated.Value(0)).current; // For fading
  const scaleValue = useRef(new Animated.Value(1)).current; // For scaling
  const lineWidth = useRef(new Animated.Value(0)).current; // For line loading animation

  useEffect(() => {
    // Looping fade and scale animation for the logo
    Animated.loop(
      Animated.sequence([
        // Fade in and scale up
        Animated.parallel([
          Animated.timing(fadeValue, {
            toValue: 1, // Fully visible
            duration: 1000, // Duration for fade in
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1.1, // Slightly scale up
            duration: 1000, // Duration for scaling up
            useNativeDriver: true,
          }),
        ]),
        // Fade out and scale down
        Animated.parallel([
          Animated.timing(fadeValue, {
            toValue: 0, // Fully invisible
            duration: 1000, // Duration for fade out
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1, // Scale back to original size
            duration: 1000, // Duration for scaling back
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Line loading animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineWidth, {
          toValue: 100, // Full width of the line
          duration: 1000, // Duration to expand the line
          useNativeDriver: false,
        }),
        Animated.timing(lineWidth, {
          toValue: 0, // Reset to 0 width
          duration: 1000, // Duration to shrink the line
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fadeValue, scaleValue, lineWidth]);

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.loadingContainer}>
        {/* Logo with Fade and Scale Animation */}
        {/* <Animated.Image
          source={imagePath.logoPath} // Replace with your logo path
          style={[styles.logo, { opacity: fadeValue, transform: [{ scale: scaleValue }] }]}
          resizeMode="contain"
        /> */}
        <KshirsaMoneyLoadingImg />
          {/* Logo with Fade and Scale Animation */}
        {/* Line Loading Animation */}
        {/* <Animated.View
          style={[styles.loadingLine, { width: lineWidth }]} // Line width animated
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute', // Position it over the whole screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure the loading screen is on top
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.normalInputBg, // Optional: Add a background color to the loader
    padding: 20,
    borderRadius: 10, // Optional: Rounded corners
  },
  logo: {
    width: 80,
    height: 80, // Adjust size as needed
    marginBottom: 20, // Space between logo and loading line
  },
  loadingLine: {
    height: 4, // Height of the loading line
    backgroundColor: Colors.secondary, // Color of the loading line
    width: 0, // Start with 0 width, will animate
    borderRadius: 2, // Rounded edges for the line
  },
});

export default KshirsaLoadingScreen;
