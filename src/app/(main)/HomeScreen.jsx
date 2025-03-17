import { View, Text, SafeAreaView, ScrollView, ScrollViewComponent } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import Colors from '../../styles/Colors';
import WelcomeUserHome from '../../components/home/welcomeUserHome';
import KshirsaTopBackground from '../../small-components/KshirsaTopBackground';
import RecentTransaction from '../../components/home/recentTransaction';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';

const MainHomeScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.moodyBlack, position: 'relative'}}>
      <ScrollView 
        // stickyHeaderIndices={[2]} // Index of the sticky header in the children array
        // scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        >
      <KshirsaTopBackground />
      <WelcomeUserHome />
      <View style={{ alignItems: 'center' }}>
      <BalanceSummaryCard />
      </View>
      <RecentTransaction />
      </ScrollView>
    </SafeAreaView>
  )
}

export default MainHomeScreen