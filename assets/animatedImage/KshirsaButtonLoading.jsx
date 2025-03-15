import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaButtonLoadingAnimation = ({width=40, height=30}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./buttonLoadingAnimation.json')}
        autoPlay
        loop={true}
        style={{width, height: height*1.4}}
        speed={1.5}
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
  // animation: {
  //   // width: width,
  //   height: 35,
  // },
});

export default KshirsaButtonLoadingAnimation;
