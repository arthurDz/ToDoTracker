import React from 'react';
import {Appearance, SafeAreaView, StyleSheet} from 'react-native';
import LoginScreen from './app/screens/AuthScreens/LoginScreen';
import AppRoutes from './app/navigation';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppRoutes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
