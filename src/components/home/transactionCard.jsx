import { View, Text, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import transactionCardStyles from '../../styles/stylesTransactioncard';
import imagePath from '../../constants/imagePath';
import logoStyles from '../../styles/logoStyles';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import paymentModeOptions from '../../constants/paymentModeOptions';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withDelay, runOnJS } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { formatDate, formatLocalDateTime } from '../../utils/helper';
import balanceSummaryCardStyles from '../../styles/stylesBalanceSummaryCard';
import { transactionTypes } from '../../constants/utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

const TransactionCard = ({ transactionData, onDelete, onEdit, onPress, index, swipeIndex, setSwipeIndex }) => {
  const translateX = useSharedValue(0);
  const threshold = -SCREEN_WIDTH * 0.3; // When the swipe menu should appear

  // Animate entry (cards slide from bottom)
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 150; // Staggered animation delay
    translateY.value = withDelay(delay, withTiming(0, { duration: 500 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
  }, []);

  useEffect(() => {
    if (swipeIndex !== index) {
      translateX.value = withSpring(0);
    }
  }, [swipeIndex]);

  // Pan gesture for swipe
  // Pan gesture for swipe
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Ignore small movements
    .failOffsetY([-20, 20]) // Prevent conflicts with vertical scrolling
    .onUpdate((event) => {
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        translateX.value = Math.max(event.translationX, -SCREEN_WIDTH * 0.5);
      }
    })
    .onEnd(() => {
      if (translateX.value < threshold) {
        // Only update swipe index if it's not already set
        if (swipeIndex !== index) {
          runOnJS(setSwipeIndex)(index);
        }
        translateX.value = withTiming(-SCREEN_WIDTH * 0.3, { duration: 200 });
      } else {
        translateX.value = withSpring(0);
        runOnJS(setSwipeIndex)(null);
      }
    });


  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  // Apply same animation to the background buttons
// Apply same animation to the background buttons
const animatedActionStyle = useAnimatedStyle(() => ({
  opacity: translateX.value < -10 ? 1 : 0, // Only show when swiping left
  transform: [{ translateY: translateY.value }],
}));


  return (
<GestureDetector gesture={panGesture}>
  <View style={{ position: 'relative', overflow: 'hidden' }}>
    {/* Animated Background Buttons */}
    <Animated.View 
      style={[transactionCardStyles.actionContainer, animatedActionStyle]} 
      pointerEvents={translateX.value < -10 ? "auto" : "none"} // Allow clicks only when visible
    >
      <Pressable style={[transactionCardStyles.editButton]} onPress={() => onEdit(transactionData)}>
        <Ionicons name="duplicate" size={24} color="white" />
      </Pressable>
      <Pressable style={[transactionCardStyles.deleteButton]} onPress={() => onDelete(transactionData)}>
        <Ionicons name="trash" size={22} color="white" />
      </Pressable>
    </Animated.View>

    {/* Main Card */}
    <Pressable onPress={() => onPress(transactionData)} style={translateX.value < -10 ? { zIndex: -1 } : {zIndex: 1}}>  
      <Animated.View style={[transactionCardStyles.container, animatedCardStyle]}>
        <View style={transactionCardStyles.leftContainer}>
          <View style={{ marginRight: 10, width: 50 }}>
            <Image source={imagePath.logoPath} style={logoStyles.smallLogo} />
          </View>
          <View style={transactionCardStyles.leftVerticleContainer}>
            <Text style={transactionCardStyles.amount}>{transactionData?.categoryName}</Text>
            <Text style={transactionCardStyles.subtitle}>{transactionData?.note || 'Not Specified'}</Text>
          </View>
        </View>
        <View style={transactionCardStyles.rightContainer}>
          <Text style={transactionCardStyles.subtitle}>{formatLocalDateTime(transactionData?.transactionTime)}</Text>
          <Text style={[
            transactionCardStyles.newAmount,
            transactionData?.transactionType === transactionTypes.EXPENSE
              ? transactionCardStyles.expenseAmount
              : transactionData?.transactionType === transactionTypes.INCOME
                ? transactionCardStyles.incomeAmount
                : transactionCardStyles.loanAmount
          ]}>
            {transactionData?.transactionType === transactionTypes.EXPENSE
              ? "- ₹"
              : transactionData?.transactionType === transactionTypes.INCOME
                ? "+ ₹"
                : "Loan ₹"}
            {transactionData?.amount}
          </Text>

          {paymentModeOptions.map((option) =>
            option.value === transactionData?.paymentMode ? (
              <View style={transactionCardStyles.paymentModeIcon} key={option.label}>
                {option.icon}
              </View>
            ) : null
          )}
        </View>
      </Animated.View>
    </Pressable>
  </View>
</GestureDetector>

  );
};

export default TransactionCard;


{/* <Animated.View style={[transactionCardStyles.container, animatedCardStyle]}>
<View style={transactionCardStyles.leftContainer}>
  <View style={balanceSummaryCardStyles.arrowStyle}>
    <AntDesign name="arrowdown" size={18} color={Colors.errorText} />
  </View>
  <View>
    <Text style={transactionCardStyles.amount}>₹ {transactionData?.amount}</Text>
    <Text style={transactionCardStyles.subtitle}>{transactionData?.note || 'Not Specified'}</Text>
  </View>
</View>
<View style={transactionCardStyles.rightContainer}>
  <Text style={transactionCardStyles.subtitle}>{formatLocalDateTime(transactionData?.transactionTime)}</Text>
  {paymentModeOptions.map((option) =>
    option.value === transactionData?.paymentMode ? (
      <View style={transactionCardStyles.paymentModeIcon} key={option.label}>
        {option.icon}
      </View>
    ) : null
  )}
</View>
</Animated.View> */}