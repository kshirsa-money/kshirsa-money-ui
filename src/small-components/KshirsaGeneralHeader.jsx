import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../styles/Colors'
import kshirsaHeaderStyles from '../styles/stylesKshirsaHeader'
import { SafeAreaView } from 'react-native-safe-area-context'

const KshirsaGeneralHeader = ({pageTitle = 'Kshirsa', headerRight}) => {
  return (
    <SafeAreaView style={kshirsaHeaderStyles.container}>
      <View style={kshirsaHeaderStyles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={kshirsaHeaderStyles.headerLeft}>
        <FontAwesome name="chevron-left" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={kshirsaHeaderStyles.headerTitle}>{pageTitle}</Text>
      </View>
        {headerRight && headerRight()}
    </SafeAreaView>
  )
}

export default KshirsaGeneralHeader