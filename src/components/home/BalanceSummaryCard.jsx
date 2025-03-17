import { View, Text, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import balanceSummaryCardStyles from '../../styles/stylesBalanceSummaryCard';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const BalanceSummaryCard = () => {
  // const [isSticky, setIsSticky] = useState(false);
  // const cardPosition = useRef(null);

  // const handleScroll = (event) => {
  //   const scrollY = event.nativeEvent.contentOffset.y;
  //   if (cardPosition.current) {
  //     const cardTop = cardPosition.current.y; // Position of the card
  //     if (scrollY >= cardTop && !isSticky) {
  //       setIsSticky(true);
  //     } else if (scrollY < cardTop && isSticky) {
  //       setIsSticky(false);
  //     }
  //   }
  // };

  return (
    <>
      {/* Original UI */}
      <LinearGradient
        colors={['#002200', Colors.primary, '#002200']} // Subtle gradient colors
        start={{ x: 0, y: 0.5 }} // Top-left
        end={{ x: 1, y: 0.5 }}   // Bottom-left
        // style={styles.card}
        style={balanceSummaryCardStyles.container}
      >
      {/* <View
      > */}
        <View style={balanceSummaryCardStyles.smallContainer}>
          <View>
            <Text style={balanceSummaryCardStyles.balanceTitle}>Total Balance</Text>
            <View style={balanceSummaryCardStyles.balanceTextWrapper}>
              <FontAwesome name="rupee" size={30} color={Colors.lightGrey} />
              <Text style={balanceSummaryCardStyles.balanceText}>29231239</Text>
            </View>
          </View>
          <View style={balanceSummaryCardStyles.balanceDropdown}>
            <Text style={{fontWeight: 'bold'}}>Month</Text>
            <AntDesign name="downcircleo" size={20} color="black" />
          </View>
        </View>

        <View style={balanceSummaryCardStyles.smallContainer}>
          <View>
            <View style={balanceSummaryCardStyles.balanceTitleWwrapper}>
              <View style={balanceSummaryCardStyles.arrowStyle}>
                <AntDesign name="arrowdown" size={18} color={Colors.errorText} />
              </View>
              <Text style={balanceSummaryCardStyles.smallBalanceTitle}>Expenses</Text>
            </View>
            <View style={balanceSummaryCardStyles.balanceTextWrapper}>
              <FontAwesome name="rupee" size={24} color={Colors.white} />
              <Text style={balanceSummaryCardStyles.smallBalanceText}>29231239</Text>
            </View>
          </View>
          <View>
            <View style={balanceSummaryCardStyles.balanceTitleWwrapper}>
              <View style={balanceSummaryCardStyles.arrowStyle}>
                <AntDesign name="arrowup" size={18} color={Colors.green} />
              </View>
              <Text style={balanceSummaryCardStyles.smallBalanceTitle}>Income</Text>
            </View>
            <View style={balanceSummaryCardStyles.balanceTextWrapper}>
              <FontAwesome name="rupee" size={24} color={Colors.white} />
              <Text style={balanceSummaryCardStyles.smallBalanceText}>29231239</Text>
            </View>
          </View>
        </View>
      {/* </View> */}
      </LinearGradient>
    </>
  );
};

export default BalanceSummaryCard;
