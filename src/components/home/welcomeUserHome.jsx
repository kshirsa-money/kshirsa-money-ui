import { View, Text, Image } from 'react-native'
import React from 'react'
import welcomeUserHomeStyles from '../../styles/stylesWelcomeUserHome'
import useGetCurrentTimeDetails from '../../hooks/useGetCurrentTimeDetails';
import Colors from '../../styles/Colors';

const WelcomeUserHome = () => {
    const { greeting, image } = useGetCurrentTimeDetails();
    const styleCondition = greeting === 'Good Morning' || greeting === 'Good Night' || greeting === 'Good Evening'
  return (
    <View style={welcomeUserHomeStyles.container}>
    <View style={welcomeUserHomeStyles.leftContainer}>
        <Text style={[welcomeUserHomeStyles.timeText]}>{greeting}</Text>
        <Text style={[welcomeUserHomeStyles.nameText, styleCondition && welcomeUserHomeStyles.extraStyles ]}>Kingshuk Roy</Text>
    </View>
    </View>
  )
}

export default WelcomeUserHome