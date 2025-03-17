import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaHomeAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./homeAnimated.json')}
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
  },
});

export default KshirsaHomeAnimation;
