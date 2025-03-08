import React, { useEffect, useState } from "react";
import { Redirect, Slot, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "./SplashScreen";
import AppProvider from ".";
import { getAllAuthData, getAuthData, initializeDatabase } from "../utils/database";
import { ACCESS_TOKEN } from "../utils/storageKeys";
import { Provider, useDispatch } from "react-redux";
import KshirsaStore from "../redux/store";
import Colors from "../styles/Colors";
import { SafeAreaView, View } from "react-native";
import { setupInterceptors } from "../api/api";
import { AlertNotificationRoot } from "react-native-alert-notification";
import AlertComponent from "../small-components/KshirsaAlert";
import KshirsaFloatingBtn from "../small-components/KshirsaFloatingBtn";
import apiRoutes from "../constants/apiRoutes";
import { setButtonState } from "../redux/reducers/floatingBtnReducer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorFallback from "../components/errorBoundary/fallbackUi";
import { ErrorBoundary } from "react-error-boundary";
import GetStartedScreen from "./(auth)";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const visibleFloatingBtn = pathname === apiRoutes.main;

  useEffect(() => {
    setupInterceptors(router);
  }, []);
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.moodyBlack}}>
    <Provider store={KshirsaStore}>
      <GestureHandlerRootView>
      <AlertNotificationRoot>
      <StatusBar backgroundColor={Colors.secondary} />
      <Slot />
      <AlertComponent />
      {visibleFloatingBtn && <KshirsaFloatingBtn onPress={() => router.push(apiRoutes.addTransaction)}/>}
      </AlertNotificationRoot>
      </GestureHandlerRootView>
    </Provider>
    </SafeAreaView>
    </ErrorBoundary>
  )
}