import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaAnimatedClock = ({width=30, height=30}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./animatedClock.json')}
        autoPlay
        loop={true}
        style={[styles.animation,{width, height}]}
        speed={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
  },
});

export default KshirsaAnimatedClock;
