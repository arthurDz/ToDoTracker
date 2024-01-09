import React from 'react';
import {Appearance, SafeAreaView, StyleSheet} from 'react-native';
import LoginScreen from './app/screens/AuthScreens/LoginScreen';
import AppRoutes from './app/navigation';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppRoutes />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
