import React, { useEffect, useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { getAllAuthData, getAuthData } from '../utils/database';
import { ACCESS_TOKEN } from '../utils/storageKeys';
import getUserDetailsAction from '../redux/actions/userDetailsAction';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { errorCodes } from '../constants/utils';
import SplashScreen from './SplashScreen';
import apiRoutes from '../constants/apiRoutes';
import { getStorageData } from '../utils/storage';
import { setupInterceptors } from '../api/api';

export default  function  Index() {
  const userDetails = useSelector((state) => state.userDetailsReducer?.data);
  const [initialRoute, setInitialRoute] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
    // useEffect(() => {
    //   setupInterceptors(router);
    // }, []);

  useEffect(() => {
    const initializeApp = async () => {
      const existToken = await getStorageData(ACCESS_TOKEN);
      // Check network status
      console.log(existToken, 'existToken')
      const networkState = await NetInfo.fetch();
      if (networkState.isConnected) {
        if (existToken) {
          // If connected and token exists, fetch user details
          dispatch(getUserDetailsAction())
            .unwrap()
            .then((res) => {
              setTimeout(() => {
                if (res?.data?.isSignUpFlowCompleted) {
                  setInitialRoute(apiRoutes.main);
                } else {
                setInitialRoute(apiRoutes.registration);
                }  
              }, 3000);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
              const errorcode = error?.errorDetails?.errorCode;
                setInitialRoute(apiRoutes.auth);
            })
        } else {
          console.log('inside else')
          setTimeout(() => {
            setInitialRoute(apiRoutes.auth);
          }, 3000);
        }
      } else {
        if (existToken) {
          setTimeout(() => {
            setInitialRoute(apiRoutes.main);
          }, 3000);
        } else {
          setTimeout(() => {
            setInitialRoute(apiRoutes.auth);
          }, 3000);
        }
      }
    };

    initializeApp();
  }, []);

  console.log(initialRoute, 'initialroute')
  return (
  !initialRoute ? <SplashScreen /> :
    <Redirect href={initialRoute} />
)
}
