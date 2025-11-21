import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Navbar } from '../../components/Navbar';
import { RequestCard } from '../../components/RequestCard';
import { Footer } from '../../components/Footer';

// Dados Falsos (Mock)
const MOCK_REQUESTS = [
  {
    id: '1',
    userName: 'Marcos Barros',
    placeName: 'Praça Matriz de Madalena-Ce',
    address: 'Madalena - Centro',
    accessibilityType: 'Visual',
    description: 'Praça da matriz possui piso Tátil'
  },
  {
    id: '2',
    userName: 'Rafael Nogueira',
    placeName: 'Biblioteca Municipal',
    address: 'Boa Viagem - Centro',
    accessibilityType: 'Motora',
    description: 'Rampa de acesso na entrada principal'
  },
  {
    id: '3',
    userName: 'Ana Souza',
    placeName: 'Mercado Central',
    address: 'Centro',
    accessibilityType: 'Visual e Motora',
    description: 'Elevador quebrado há meses.'
  }
];

export function AddRequestPage() {

  // Função que desenha cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <RequestCard
        userName={item.userName}
        placeName={item.placeName}
        address={item.address}
        accessibilityType={item.accessibilityType}
        description={item.description}
        onAccept={() => console.log(`Aceitou ${item.id}`)}
        onRefuse={() => console.log(`Recusou ${item.id}`)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#166534" barStyle="light-content" />

      <Navbar />

      {/* Título da Página */}
      <Text style={styles.pageTitle}>Pedidos de adição</Text>

      {/* Lista de Cards */}
      <FlatList
        data={MOCK_REQUESTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28',
  },
  pageTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '500',
  },
  card: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  }
});