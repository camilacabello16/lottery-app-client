/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import WebViewComponent from './components/WebViewComponent';

function App(): JSX.Element {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebViewComponent />
    </SafeAreaView>
  );
}

export default App;
