import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes'; 

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#1e4e28" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}