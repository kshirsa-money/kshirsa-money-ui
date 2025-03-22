import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const KshirsaSearchIconAnimated = ({width=30, height=30}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./searchIconAnimation.json')}
        autoPlay
        loop={true}
        style={{width, height}}
        // speed={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: '#fff',
  },
  // animation: {
  //   // width: width,
  //   height: 35,
  // },
});

export default KshirsaSearchIconAnimated;
