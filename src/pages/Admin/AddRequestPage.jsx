import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Navbar } from '../../components/Navbar';
import { RequestCard } from '../../components/RequestCard';
import { Footer } from '../../components/Footer';

// Dados Falsos (Mock)
const INITIAL_REQUESTS = [
  {
    id: '1',
    usuario: 'Marcos Barros', // Era userName
    nome: 'Praça Matriz de Madalena-Ce', // Era placeName
    localizacao: 'Madalena - Centro', // Era address
    tipo: 'Visual', // Era accessibilityType
    recursos: 'Piso Tátil, Placas em Braille', // Novo
    descricao: 'Praça da matriz possui piso Tátil' // Era description
  },
  {
    id: '2',
    usuario: 'Rafael Nogueira',
    nome: 'Biblioteca Municipal',
    localizacao: 'Boa Viagem - Centro',
    tipo: 'Motora',
    recursos: 'Rampa de acesso',
    descricao: 'Rampa de acesso na entrada principal'
  }
];

export function AddRequestPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const handleApprove = (id) => {
    Alert.alert(
      "Confirmar Aprovação",
      "Tem certeza que deseja adicionar este local ao mapa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            setRequests(current => current.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const handleReject = (id) => {
    Alert.alert(
      "Rejeitar Pedido",
      "Tem certeza que deseja descartar esta sugestão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Rejeitar",
          style: "destructive", // No iOS fica vermelho
          onPress: () => {
            setRequests(current => current.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.iconCircle}>
        <FontAwesome5 name="plus" size={30} color="#459102ff" />
      </View>
      <Text style={styles.title}>Pedidos de Adição</Text>
      <Text style={styles.subtitle}>
        Novos locais sugeridos pela comunidade
      </Text>
    </View>
  );

  // Função que desenha cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <RequestCard
        usuario={item.usuario}
        nome={item.nome}
        localizacao={item.localizacao}
        tipo={item.tipo}
        recursos={item.recursos}
        descricao={item.descricao}

        onAccept={() => handleApprove(item.id)}
        onRefuse={() => handleReject(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#166534" barStyle="light-content" />

      <Navbar />

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}

        ListHeaderComponent={renderHeader}

        ListFooterComponent={<Footer />}

        // Estilos e Configurações
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum pedido pendente.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#b1f295ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a5d6a7',
    marginTop: 5,
    textAlign: 'center',
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
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    marginBottom: 40,
  }
});