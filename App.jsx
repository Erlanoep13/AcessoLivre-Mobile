import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes'; 
import { UserProvider } from './src/contexts/UserContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <UserProvider>
            <StatusBar 
              translucent={true} 
              barStyle="dark-content" 
              backgroundColor="transparent" />
            <StatusBar backgroundColor="#1e4e28" barStyle="light-content" />
            <Routes />
          </UserProvider>
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}