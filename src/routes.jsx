import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapPage } from './pages/User/MapPage';
import { AddPlacePage } from './pages/User/AddPlacePage';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator 
      initialRouteName="Map" // Define qual tela abre primeiro
      screenOptions={{ 
        headerShown: false // Esconde o cabeçalho padrão feio do Android/iOS
      }}
    >
      <Stack.Screen name="Map" component={MapPage} />
      <Stack.Screen name="AddPlace" component={AddPlacePage} />
    </Stack.Navigator>
  );
}