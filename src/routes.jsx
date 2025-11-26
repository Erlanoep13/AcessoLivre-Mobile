import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapPage } from './pages/User/MapPage';
import { AddPlacePage } from './pages/User/AddPlacePage';
import { FavoritePage } from './pages/User/FavoritePage';
import { RegisterPage } from './pages/User/RegisterPage';
import { LoginPage } from './pages/User/LoginPage';
import { AboutPage } from './pages/User/AboutPage';
import { AddRequestPage } from './pages/Admin/AddRequestPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { EditRequestsPage } from './pages/Admin/EditRequestPage';
import { RemoveRequestsPage } from './pages/Admin/RemoveRequestPage';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator 
      initialRouteName="MapPage" // Define qual tela abre primeiro
      screenOptions={{ 
        headerShown: false // Esconde o cabeçalho padrão feio do Android/iOS
      }}
    >
      <Stack.Screen name="MapPage" component={MapPage} />
      <Stack.Screen name="AddPlace" component={AddPlacePage} />
      <Stack.Screen name="Favorites" component={FavoritePage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="About" component={AboutPage} />
      <Stack.Screen name="Admin" component={AdminPage} />
      <Stack.Screen name="AddRequest" component={AddRequestPage} />
      <Stack.Screen name="EditRequest" component={EditRequestsPage} />
      <Stack.Screen name="RemoveRequest" component={RemoveRequestsPage} />

    </Stack.Navigator>
  );
}