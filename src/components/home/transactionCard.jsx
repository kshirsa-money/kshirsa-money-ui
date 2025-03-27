import { View, Text, Image, Pressable, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import transactionCardStyles from '../../styles/stylesTransactioncard';
import imagePath from '../../constants/imagePath';
import logoStyles from '../../styles/logoStyles';
import { transactionTypes } from '../../constants/utils';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { formatLocalDateTime } from '../../utils/helper';
import paymentModeOptions from '../../constants/paymentModeOptions';

const TransactionCard = ({ transactionData, index, swipeableRef, onPress, onDuplicate, onDelete, needDelayAnimation = true, isSwipeNeed=true }) => {
  const swipeRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(0)).current; // Start at 0 (hidden)
  const translateYAnim = useRef(new Animated.Value(50)).current; // Start below

  useEffect(() => {
    const delay = needDelayAnimation ? index * 100 : 0;

    setTimeout(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0, // Moves up
          duration: 400,
          easing: (t) => t, // Linear easing
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, [index]);

  // Close the previous swipeable card before opening a new one
  const handleSwipeOpen = () => {
    if (swipeableRef.current && swipeableRef.current !== swipeRef.current) {
      swipeableRef.current.close(); 
    }
    swipeableRef.current = swipeRef.current;
  };

  // Right swipeable actions
  const renderRightActions = () => {
    if(!isSwipeNeed) return null;
    return (
    <View style={transactionCardStyles.rightSwipeContainer}>
      <TouchableOpacity
        style={transactionCardStyles.editButton}
        onPress={() => onDuplicate(transactionData)}
      >
        <Ionicons name="duplicate" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={transactionCardStyles.deleteButton}
        onPress={() => onDelete(transactionData)}
      >
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleSwipeOpen}
    >
      <Pressable onPress={() => onPress(transactionData)}>
        <Animated.View
          style={[
            transactionCardStyles.container,
            { 
              transform: [
                { scale: scaleAnim },
                { translateY: translateYAnim } // Moves up smoothly
              ] 
            }
          ]}
        >
          <View style={transactionCardStyles.leftContainer}>
            <View style={{ marginRight: 10, width: 50 }}>
              <Image source={imagePath.logoPath} style={logoStyles.smallLogo} />
            </View>
            <View style={transactionCardStyles.leftVerticleContainer}>
              <Text style={transactionCardStyles.amount}>{transactionData?.categoryName}</Text>
              <Text style={transactionCardStyles.subtitle} ellipsizeMode="tail" numberOfLines={1}>
                {transactionData?.note || 'Not Specified'}
              </Text>
            </View>
          </View>
          <View style={transactionCardStyles.rightContainer}>
            <Text style={transactionCardStyles.subtitle}>{formatLocalDateTime(transactionData?.transactionTime)}</Text>
            <Text
              style={[
                transactionCardStyles.newAmount,
                transactionData?.transactionType === transactionTypes.EXPENSE
                  ? transactionCardStyles.expenseAmount
                  : transactionData?.transactionType === transactionTypes.INCOME
                  ? transactionCardStyles.incomeAmount
                  : transactionCardStyles.loanAmount,
              ]}
            >
              {transactionData?.transactionType === transactionTypes.EXPENSE
                ? '- ₹'
                : transactionData?.transactionType === transactionTypes.INCOME
                ? '+ ₹'
                : 'Loan ₹'}
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
    </Swipeable>
  );
};

export default TransactionCard;
