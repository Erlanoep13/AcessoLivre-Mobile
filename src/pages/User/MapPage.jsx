import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Navbar } from '../../components/Navbar';
import { SearchBar } from '../../components/SearchBar';
import { Footer } from '../../components/Footer';
import { PlaceList } from '../../components/PlaceList/PlaceList';

export function MapPage() {
  return (
    <View style={styles.container}>

      {/* 2. MOSTRANDO A NAVBAR (Fica fixa no topo) */}
      <Navbar />

      {/* 3. ÁREA DE ROLAGEM (Conteúdo + Footer) */}
      {/* O ScrollView permite rolar a tela se o conteúdo for grande */}
      <ScrollView style={styles.scrollContainer}>

        {/* Espaço para separar a barra de pesquisa do topo */}
        <View style={styles.spacing}>
          <SearchBar />
        </View>

        <View style={styles.content}>

          {/* Exemplo de caixa de conteúdo para testar o scroll */}
          <View style={styles.placeholderBox}>
            <Text>Conteúdo do Mapa...</Text>
          </View>

          <View style={styles.addButtonContainer}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Adicionar Local</Text>
            </View>
          </View>

          {/* --- LISTA DE LOCAIS --- */}
          <PlaceList />

        </View>

        {/* 4. MOSTRANDO O FOOTER (Fica no final da rolagem) */}
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
  spacing: {
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  placeholderBox: {
    height: 400,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //Estilo do botão
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});