import { Image, SafeAreaView, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { GetStartedScreenStyles } from '../../styles/StylesGetStartedScreen'
import Colors from '../../styles/Colors'
import KshirsaButton from '../../small-components/KshirsaButton'
import { useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'
import imagePath from '../../constants/imagePath'
import logoStyles from '../../styles/logoStyles'
import { deleteAuthRow, getAllAuthData, saveAuthData } from '../../utils/database'


const GetStartedScreen = () => {
  const router = useRouter()
  // useEffect(() => {
  //   async function tokenCheck() {
  //     const allData = await getAllAuthData();
  //     console.log(allData, 'all data')
  //   }
  //    deleteAuthRow();
  //   tokenCheck();
  // }, [])
  const handleGetStarted =()=> {
    router.push(uiRoutes.loginOrSignup)
  }
  
  return (
    <SafeAreaView style={GetStartedScreenStyles.container}>
      <View />
      <View style={GetStartedScreenStyles.body}>
        <Image source={imagePath.logoPath} style={logoStyles.bigLogo} />
        <Text style={logoStyles.bigLogoText}>Kshirsa</Text>
        </View>
      <View style={GetStartedScreenStyles.footer}>
        <View style={GetStartedScreenStyles.oneLinerWrapper}>
        <Text style={GetStartedScreenStyles.oneLinerText}>Spend Smarter Save More</Text>
        </View>
        <KshirsaButton title='Get Started' onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  )
}

export default GetStartedScreen
