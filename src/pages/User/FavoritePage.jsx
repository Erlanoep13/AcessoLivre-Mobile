import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlaceList } from '../../components/PlaceList/PlaceList';


export function FavoritePage() {
  return (
    <View style={styles.container}>
      
      {/* Navbar Fixa no topo */}
      <Navbar />

      <ScrollView style={styles.scrollContainer}>
        
        <View style={styles.content}>
          {/* Título da Página */}
          <Text style={styles.pageTitle}>Meus Favoritos</Text>
          <Text style={styles.pageSubtitle}>Seus locais salvos aparecem aqui.
          </Text>

        <PlaceList />
          

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
    backgroundColor: '#1e4e28',
  },
  scrollContainer: {
    flex: 1,
    
  },
  content: {
    padding: 16,
    minHeight: 400, // Garante uma altura mínima pro footer não subir demais se estiver vazio
    textAlign: 'center'
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffffff', 
    marginTop: 10,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#ffffffff',
    marginBottom: 24,
  },

  placeholderText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  }
});
