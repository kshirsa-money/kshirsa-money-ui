import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import React from 'react';
import transactionCardStyles from '../../styles/stylesTransactioncard';
import imagePath from '../../constants/imagePath';
import logoStyles from '../../styles/logoStyles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import paymentModeOptions from '../../constants/paymentModeOptions';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, GestureDetector, Gesture } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const TransactionCard = ({ transactionData, onDelete, onEdit }) => {
  const translateX = useSharedValue(0);
  const threshold = -SCREEN_WIDTH * 0.3; // Define when the buttons appear

  const panGesture = Gesture.Pan()
  .activeOffsetX([-10, 10]) // Ignore very small horizontal movements (prevents unintended triggers)
  .failOffsetY([-20, 20]) // If vertical movement exceeds this range, cancel swipe
  .onUpdate((event) => {
    if (Math.abs(event.translationX) > Math.abs(event.translationY)) { 
      translateX.value = Math.max(event.translationX, -SCREEN_WIDTH * 0.5);
    }
  })
  .onEnd(() => {
    if (translateX.value < threshold) {
      translateX.value = withTiming(-SCREEN_WIDTH * 0.3, { duration: 200 });
    } else {
      translateX.value = withSpring(0);
    }
  });


  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background Buttons */}
        <View style={transactionCardStyles.actionContainer}>
          <Pressable style={[transactionCardStyles.editButton]} onPress={() => onEdit(transactionData)}>
            <Ionicons name="pencil" size={22} color="white" />
          </Pressable>
          <Pressable style={[transactionCardStyles.deleteButton]} onPress={() => onDelete(transactionData)}>
            <Ionicons name="trash" size={22} color="white" />
          </Pressable>
        </View>

        {/* Main Card */}
        <Animated.View style={[transactionCardStyles.container, animatedCardStyle]}>
          <View style={transactionCardStyles.leftContainer}>
            <View style={{ marginRight: 10, width: 50 }}>
              <Image source={imagePath.logoPath} style={logoStyles.smallLogo} />
            </View>
            <View>
              <Text style={transactionCardStyles.amount}>₹ {transactionData?.amount}</Text>
              <Text style={transactionCardStyles.subtitle}>{transactionData?.note || 'Not Specified'}</Text>
            </View>
          </View>
          <View style={transactionCardStyles.rightContainer}>
            <Text style={transactionCardStyles.subtitle}>{transactionData?.transactionTime}</Text>
            {paymentModeOptions.map((option) =>
              option.value === transactionData?.paymentMode ? (
                <View style={transactionCardStyles.paymentModeIcon} key={option.label}>
                  {option.icon}
                </View>
              ) : null
            )}
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default TransactionCard;
