import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Colors  from '../../styles/Colors'
import UserInfo from '../../components/profileScreen/userInfo'
import KshirsaFeatures from '../../components/profileScreen/KshirsaFeatures'
import KshirsaButton from '../../small-components/KshirsaButton'
import cssUtils from '../../constants/cssUtils'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../redux/actions/userDetailsAction'
import { getStorageData } from '../../utils/storage'
import { REFRESH_TOKEN } from '../../utils/storageKeys'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import uiText from '../../constants/uiTexts'
import { useNavigation, useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'
import { resetUserDetailsAction } from '../../redux/reducers/userDetailsReducer'

const profileScreen = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const { logoutSuccess, logoutLoading } = useSelector(state => state.userDetailsReducer)
  const handleLogout = async () => {
    const refreshToken = await getStorageData(REFRESH_TOKEN)
    console.log(refreshToken, 'token')
    dispatch(logoutAction({token: refreshToken}))
  }
  console.log(logoutSuccess, 'logoutSuccess', logoutLoading, 'logoutLoading')
  useEffect(() => {
    if(logoutSuccess) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: uiText.LOGOUT_SUCCESS,
        })
      dispatch(resetUserDetailsAction())
      router.replace(uiRoutes.auth)
    }
  }
  , [logoutSuccess])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <UserInfo />
      <KshirsaFeatures />
      <TouchableOpacity style={[styles.buttonStyle, logoutLoading && {opacity: 0.2}]} onPress={handleLogout} disabled={logoutLoading}>
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