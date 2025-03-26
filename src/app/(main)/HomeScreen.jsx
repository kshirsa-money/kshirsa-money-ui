import { View, Text, ScrollView, ScrollViewComponent } from 'react-native'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../styles/Colors';
import WelcomeUserHome from '../../components/home/welcomeUserHome';
import KshirsaTopBackground from '../../small-components/KshirsaTopBackground';
import RecentTransaction from '../../components/home/recentTransaction';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';
import { RefreshControl } from 'react-native-gesture-handler';
import KshirsaPullToRefresh from '../../../assets/animatedImage/KshirsaPullToRefresh';
import getRecentTransactionsAction from '../../redux/actions/getRecentTransactionAction';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainHomeScreen = () => {
  const dispatch = useDispatch();
   const { loading } = useSelector((state) => state.getRecentTransactionsReducer) || {};
  const onRefresh = useCallback(() => {
   dispatch(getRecentTransactionsAction())
  }
  , []);
  console.log(loading, 'recentTransactionLoading')
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.moodyBlack, position: 'relative'}}>
      <ScrollView 
        // stickyHeaderIndices={[2]} // Index of the sticky header in the children array
        // scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={Colors.black}
            colors={[Colors.secondary]}
            progressBackgroundColor={Colors.moodyBlack}
          >
            <KshirsaPullToRefresh />
          </RefreshControl>
            }
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