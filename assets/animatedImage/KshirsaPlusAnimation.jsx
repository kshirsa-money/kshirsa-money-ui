import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaPlusAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./plusAnimation.json')}
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
    width: 70,
    height: 70,
  },
});

export default KshirsaPlusAnimation;
