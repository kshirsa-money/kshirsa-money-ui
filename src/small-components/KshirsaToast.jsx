import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from "react-native-reanimated";
import Colors from "../styles/Colors";

const KshirsaToast = ({ 
  message, 
  type = "info", 
  visible, 
  duration = 3000, 
  onHide 
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    let exitTimer;
    
    if (visible) {
      // Entry animation
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });

      // After the specified duration, start the exit animation
      exitTimer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(50, { duration: 300 });

        // Run the onHide callback after the exit animation completes
        setTimeout(() => {
          if (onHide) runOnJS(onHide)(); // Call onHide after the exit animation
        }, 300); // Ensure we call onHide after the animation finishes
      }, duration);

    } else {
      // Hide immediately if `visible` is false
      opacity.value = 0;
      translateY.value = -50;
    }

    return () => {
      clearTimeout(exitTimer); // Clean up timers on component unmount or when visibility changes
    };
  }, [visible, duration, onHide]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null; // Prevent rendering the toast if it's not visible

  return (
    <Animated.View style={[styles.toast, styles[type], animatedStyle]}>
      <Text style={styles[`toastText${type}`]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 100,
  },
  toastText: {
    fontSize: 14,
    fontWeight: "600",
  },
  success: { backgroundColor: Colors.secondary },
  error: { backgroundColor: Colors.errorInputBg },
  info: { backgroundColor: Colors.primaryText },
  toastTextsuccess: { color: Colors.moodyBlack },
  toastTexterror: { color: Colors.white },
  toastTextinfo: { color: Colors.white },
});

export default KshirsaToast;
