import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, BackHandler } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import cssUtils from '../constants/cssUtils';
import { screenWidth } from '../constants/utils';

const { height } = Dimensions.get('window');

const KshirsaPopup = ({ visible, onClose, header = "Popup Header", children, popupHeight = height * 0.5, footer, additionalZindex = 0, isChildPopupOpen = false, isSecondaryDesign = false, transactionFilterPopup = false, headerRight }) => {
  const translateY = useSharedValue(height);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onClose();
        return true;
      });
      return () => backHandler.remove();
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
        <TouchableOpacity style={[styles.overlay, { zIndex: 1000 + additionalZindex }]} onPress={onClose} activeOpacity={1}>
          <View />
        </TouchableOpacity>
      )}
      <Animated.View
        style={[styles.popupContainer, animatedStyle, { height: popupHeight, zIndex: 1001 + additionalZindex, backgroundColor: isSecondaryDesign ? Colors.secondaryModalBg : Colors.moodyBlack }]}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
          {headerRight}
          {(isChildPopupOpen || !transactionFilterPopup) ?
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <AntDesign name="close" size={20} color={Colors.white} />
            </TouchableOpacity>
            : null}
        </View>
        <ScrollView contentContainerStyle={{ flex: 1, paddingVertical: 20, alignItems: 'flex-start' }} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
        {(!isChildPopupOpen && footer) &&
          <View style={{ position: 'absolute', bottom: 0, flex: 1, width: screenWidth, backgroundColor: Colors.moodyBlack }}>{footer}</View>}
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
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.moodyBlack,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
    width: screenWidth
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
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