import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors  from '../../styles/Colors'
import UserInfo from '../../components/profileScreen/userInfo'
import KshirsaFeatures from '../../components/profileScreen/KshirsaFeatures'
import KshirsaButton from '../../small-components/KshirsaButton'
import cssUtils from '../../constants/cssUtils'
import { AntDesign } from '@expo/vector-icons'

const profileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <UserInfo />
      <KshirsaFeatures />
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.text}>LOGOUT</Text>
        <AntDesign name="logout" size={20} color={Colors.errorText} />
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.moodyBlack,
    paddingBottom: 100,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: Colors.errorInputBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: Colors.white,
    fontSize: cssUtils.smallTextSize,
  }
})