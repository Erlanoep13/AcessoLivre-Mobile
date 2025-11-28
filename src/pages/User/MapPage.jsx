import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Navbar } from '../../components/Navbar';
import { SearchBar } from '../../components/SearchBar';
import { Footer } from '../../components/Footer';
import { PlaceList } from '../../components/PlaceList/PlaceList';
import { Map } from '../../components/Map';
// Importamos o contexto para ler o nome
import { useUser } from '../../contexts/UserContext'; 

export function MapPage() {
  const navigation = useNavigation();
  const { username } = useUser(); // Pega o nome salvo na memória

  return (
    <View style={styles.container}>

      {/* NAVBAR */}
      <Navbar />

      {/* ÁREA DE ROLAGEM (Conteúdo + Footer) */}
      <ScrollView style={styles.scrollContainer}>

        {/* Barra de pesquisa com espaço do topo */}
        <View style={styles.spacing}>
          <SearchBar />
        </View>

        {/* --- MENSAGEM DE BOAS-VINDAS --- */}
        {/* Só aparece se tiver alguém logado (username existe) */}
        {username && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Seja bem-vindo(a), <Text style={styles.nameHighlight}>{username}!</Text>
            </Text>
          </View>
        )}

        <View style={styles.content}>

          {/* Mapa */}
          <Map />

          {/* BOTÃO DE ADICIONAR LOCAL */}
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddPlace')}
            >
              <Text style={styles.addButtonText}>+ Adicionar Local</Text>
            </TouchableOpacity>
          </View>

          {/* --- LISTA DE LOCAIS --- */}
          <PlaceList 
             onEditPress={(place) => navigation.navigate('AddPlace', { placeData: place })}
          />

        </View>

        {/* FOOTER */}
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
  
  // Estilos novos da mensagem
  welcomeContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center', 
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff', // Texto branco pra contrastar com o fundo verde escuro
  },
  nameHighlight: {
    fontWeight: 'bold',
    color: '#ffffffff', // Verde claro igual ao botão
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
    marginBottom: 10,
    marginTop: 20,
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