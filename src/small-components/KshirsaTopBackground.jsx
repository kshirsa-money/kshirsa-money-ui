import { View, Text, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import Colors from '../styles/Colors';
import useGetCurrentTimeDetails from '../hooks/useGetCurrentTimeDetails';
import { LinearGradient } from 'expo-linear-gradient';

const KshirsaTopBackground = () => {
    const { greeting, image } = useGetCurrentTimeDetails();
  return (
    <LinearGradient
    colors={[Colors.primary, Colors.moodyGreen, Colors.moodyGreen2, Colors.moodyBlack]}
    start={{ x: 0.1, y: 0.1 }}
    end={{ x: 0.4, y: 0.5 }}
    // style={{ flex: 1, borderRadius: 20 }}
    style={[KshirsaTopBgStyles.container, KshirsaTopBgStyles.welcomeContainer]}
  >
    {/* <View > */}
        {/* <Image source={image} resizeMode="cover" style={[KshirsaTopBgStyles.container, KshirsaTopBgStyles.welcomeContainer]} /> */}
    {/* </View> */}
    </LinearGradient>
  )
}

export default KshirsaTopBackground


const KshirsaTopBgStyles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.secondary,
        height: 250,
        transform: [{ scaleX: 1.3 }],
        position: 'absolute',
        width: '100%',
        borderBottomRightRadius: 350,
        borderBottomLeftRadius: 150,
    }
    });