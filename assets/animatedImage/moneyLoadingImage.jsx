import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaMoneyLoadingImg = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./moneyLoadingLottie.json')}
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
    width: 200,
    height: 200,
  },
});

export default KshirsaMoneyLoadingImg;
