import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { screenHeight, screenWidth } from '../../src/constants/utils';

const KshirsaPullToRefresh = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./pullToRefreshAnimation.json')}
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
    justifyContent: 'flex-end',
    // alignItems: 'baseline',
    // backgroundColor: '#fff',
    position: 'relative',
    zIndex: 1000,
    // borderColor: 'red',
    // borderWidth: 1,
    marginTop: screenHeight * 0.1,
  },
  animation: {
    width: 150,
    height: 150,
    alignSelf: 'flex-end'
  },
});

export default KshirsaPullToRefresh;
