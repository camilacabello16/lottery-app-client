/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  View,
} from 'react-native';
import WebViewComponent from './components/WebViewComponent';
import messaging from '@react-native-firebase/messaging';
import { getToken, notificationListen, requestUserPermission } from './utils';

function App(): JSX.Element {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListen();
    getToken();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebViewComponent />
    </SafeAreaView>
  );
}

export default App;
