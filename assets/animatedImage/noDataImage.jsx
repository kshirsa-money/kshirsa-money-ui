import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaNoDataImage = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./noDataLottie.json')} // Path to JSON file
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
    width: 200,
    height: 200,
  },
});

export default KshirsaNoDataImage;
