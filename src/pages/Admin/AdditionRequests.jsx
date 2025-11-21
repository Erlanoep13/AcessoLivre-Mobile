import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { RequestCard } from '../../components/RequestCard';

// Mock de dados (simulando o banco)
const MOCK_REQUESTS = [
  {
    id: '1',
    userName: 'Erlano Benevides',
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
    userName: 'Marcos Barros',
    placeName: 'Mercado Público',
    address: 'Madalena - Centro',
    accessibilityType: 'Visual',
    description: 'Rampas quebradas'
  }
];

export function AdditionRequests() {

  // Função para lidar com a renderização de cada item
  const renderItem = ({ item }) => (
    <RequestCard 
      userName={item.userName}
      placeName={item.placeName}
      address={item.address}
      accessibilityType={item.accessibilityType}
      description={item.description}
      onAccept={() => console.log(`Aceitou id: ${item.id}`)}
      onRefuse={() => console.log(`Recusou id: ${item.id}`)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#14532d" />

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>
          Pedidos de adição
        </Text>

        <FlatList
          data={MOCK_REQUESTS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28',
    paddingTop: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
});