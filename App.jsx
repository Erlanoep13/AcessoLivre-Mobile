import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importe das páginas de teste
import { LoginPage } from './src/pages/User/LoginPage';
import { AddRequestPage } from './src/pages/Admin/AddRequestPage';
import { MapPage } from './src/pages/User/MapPage';
import { AboutPage } from './src/pages/User/AboutPage';
import { AddPlacePage } from './src/pages/User/AddPlacePage';
<<<<<<< HEAD
import { FavoritePage } from './src/pages/User/FavoritePage';
=======
import { RegisterPage } from './src/pages/User/RegisterPage';
import { ExplicaçõesGerais } from './src/components/ExplicaçoesGerais';
import { RemovalRequestsPage } from './src/pages/Admin/RemoveRequestPage';
import { EditRequestsPage } from './src/pages/Admin/EditRequestPage';
>>>>>>> 70a3422b40c449819087dfe15bc529ed7f0f5930

export default function App() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      
        {/* --- TESTE AQUI --- */}
        {/* Descomente a linha da página que você quer ver */}
        
        {/* <LoginPage />
        <AddRequestPage /> 
        <MapPage />
<<<<<<< HEAD
        <AboutPage/>
        <AddRequestPage /> 
        <AddPlacePage />
        <MapPage />*/}

        <FavoritePage/>
    
        
      
=======
        <ExplicaçõesGerais/>
        <AboutPage/>        
        <AddRequestPage /> 
        <AddPlacePage />
        <RegisterPage/>
        <RemovalRequestsPage/>
        <EditRequestsPage/>*/}
        <AboutPage/>
        <ExplicaçõesGerais/>
>>>>>>> 70a3422b40c449819087dfe15bc529ed7f0f5930
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