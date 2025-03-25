import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaCalendarAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./calendarAnimation.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  animation: {
    width: 35,
    height: 35,
    transform: [{ scale: 2.5 }],
    alignSelf: 'center',
  },
});

export default KshirsaCalendarAnimation;
