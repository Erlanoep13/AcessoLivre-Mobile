import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'; // Adicionei ScrollView de volta
import { AdditionRequests } from './src/pages/Admin/AdditionRequests';
import { Footer } from './src/components/Footer';
import { ExplicaçõesGerais } from './src/components/ExplicaçoesGerais';
import { Navbar } from './src/components/Navbar';


export default function App() {
  return (
    <View style={styles.container}>
      
      <ExplicaçõesGerais />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.mainContent}>
           <AdditionRequests />
        </View>

        <Footer />
        
      </ScrollView>

      <Navbar />
      <AdditionRequests />
      <Footer />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28',
  },
  scrollContent: {
    flexGrow: 1, // Faz a área de rolagem ocupar toda a altura disponível
    justifyContent: 'space-between', // Separa o topo do rodapé
  },
  mainContent: {
    flex: 1, // Garante que o conteúdo ocupe espaço
    paddingTop: 80, // DÁ UM ESPAÇO para o botão flutuante não ficar em cima do texto
    paddingHorizontal: 10,
  }
});