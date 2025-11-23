import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function AdminPage() {
  return (
    <View style={styles.container}>
      
      {/* Navbar no topo */}
      <Navbar />

      <ScrollView style={styles.scrollContainer}>
        
        <View style={styles.content}>
          <Text style={styles.pageTitle}>Painel do Administrador</Text>
          
          {/* Área vazia aguardando seus próximos comandos */}
          <View style={styles.placeholder}>
            <Text style={{ color: '#9CA3AF' }}>Conteúdo administrativo aqui...</Text>
          </View>
        </View>

        {/* Footer no final */}
        <Footer />

      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28', // Fundo cinza claro
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    minHeight: 500, // Garante altura para o footer ficar lá embaixo
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffffff', // Verde do tema
    marginTop: 10,
    marginBottom: 4,
  },
  placeholder: {
    height: 200,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});