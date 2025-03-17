import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import cssUtils from '../constants/cssUtils';

const { height } = Dimensions.get('window');

const KshirsaPopup = ({ visible, onClose, header = "Popup Header", children }) => {
  const translateY = useSharedValue(height);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(height, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      {visible && (
        <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
          <View />
        </TouchableOpacity>
      )}
      <Animated.View style={[styles.popupContainer, animatedStyle]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <AntDesign name="close" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        {children}
        {/* <View style={styles.popupContent}>{children}</View> */}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.moodyBlack,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 15,
  },
  headerText: {
    fontSize: cssUtils.mediumTextSize,
    fontWeight: cssUtils.mediumBold,
    color: Colors.lightGrey,
  },
  closeIcon: {
    padding: 5,
  },
  popupContent: {
    alignItems: 'center',
  },
});

export default KshirsaPopup;
