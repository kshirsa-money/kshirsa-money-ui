import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaProfileAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./KshirsaProfileAnimation.json')}
        autoPlay
        loop={false}
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
    width: 80,
    height: 80,
  },
});

export default KshirsaProfileAnimation;
