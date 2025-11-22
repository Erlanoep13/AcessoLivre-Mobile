import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importe das páginas de teste
import { LoginPage } from './src/pages/User/LoginPage';
import { AddRequestPage } from './src/pages/Admin/AddRequestPage';
import { MapPage } from './src/pages/User/MapPage';
import { AddPlacePage } from './src/pages/User/AddPlacePage';

export default function App() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      
        {/* --- TESTE AQUI --- */}
        {/* Descomente a linha da página que você quer ver */}
        
        {/* <LoginPage />
        
        <AddRequestPage /> 
        
        <MapPage />*/}
        
        <AddPlacePage />
      
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});