import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import userInfoStyles from '../../styles/stylesUserInfo'
import KshirsaProfileAnimation from '../../../assets/animatedImage/KshirsaProfileAnimation'
import Colors from '../../styles/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const userData = useSelector(state => state.userDetailsReducer?.data)
    console.log(userData, ' dats')
  return (
    <View style={userInfoStyles.container}>
            <LinearGradient
            colors={[Colors.secondary, Colors.moodyBlack]}
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0, y: 0 }}

            style={[userInfoStyles.profileImageWrapper]}
          >
            <KshirsaProfileAnimation />
          </LinearGradient>
            <Text style={userInfoStyles.userName}>{userData?.userDetails?.name}</Text>
            <Text style={userInfoStyles.userEmail}>ID: {userData?.userDetails?.userEmail}</Text>
    </View>
  )
}

export default UserInfo

