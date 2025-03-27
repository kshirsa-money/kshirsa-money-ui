import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TABS = [
  { name: 'HomeScreen', icon: 'home' },
  { name: 'profileScreen', icon: 'user' },
];

const TabBarButton = ({ routeName, icon, isFocused, onPress }) => {
  const scaleValue = new Animated.Value(isFocused ? 1.2 : 1);
  
  React.useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: isFocused ? 1.2 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <FontAwesome name={icon} size={24} color={isFocused ? '#6200ea' : '#777'} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function KshirsaTabbar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}> 
      {TABS.map((tab, index) => (
        <React.Fragment key={tab.name}>
          {index === 1 && <View style={styles.floatingButtonPlaceholder} />}  
          <TabBarButton
            routeName={tab.name}
            icon={tab.icon}
            isFocused={state.index === index}
            onPress={() => router.push(tab.name)}
          />
        </React.Fragment>
      ))}
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome name='plus' size={30} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;
const CIRCLE_SIZE = 60;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: TAB_WIDTH,
  },
  floatingButtonPlaceholder: {
    width: CIRCLE_SIZE,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    left: width / 2 - CIRCLE_SIZE / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6200ea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
