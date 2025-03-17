
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import KshirsaTabbar from '../../small-components/KshiirsaTabbar';

export default function TabLayout() {
  return (
  <Tabs tabBar={(props) => <KshirsaTabbar {...props} />}>
    <Tabs.Screen name='HomeScreen' options={{ title: 'Home', headerShown: false}} />
    <Tabs.Screen name='profileScreen' options={{ title: 'Profile', headerShown: false}} />
  </Tabs>
  );
}

