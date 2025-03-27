import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFontsLoaded } from '../redux/reducers/uiReducer';
import { Text, View } from 'react-native';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'CinzelDecorative-Regular': require('../../assets/fonts/CinzelDecorative-Regular.ttf'),
    'CinzelDecorative-Bold': require('../../assets/fonts/CinzelDecorative-Bold.ttf'),
    'spaceMono-regular': require('../../assets/fonts/SpaceMono-Regular.ttf')
  });
  const isFontStateUpdated = useFontLoaded(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (fontsLoaded && !isFontStateUpdated) {
      dispatch(setFontsLoaded());
    }
  }, [fontsLoaded, dispatch]);

  if (!fontsLoaded) {
    return <View><Text>Loading Fonts...</Text></View>;;
  }

  return children;
};
export default FontLoader;

export const useFontLoaded = () => {
  return useSelector((state) => state.fonts.loaded);
};

export const getFonts = {
  CinzeRegular: 'CinzelDecorative-Regular',
  CinzelBold: 'CinzelDecorative-Bold',
  spaceMonoRegular: 'spaceMono-regular',
};