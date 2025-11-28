import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Os dados ficam aqui dentro agora, isolados
const FAVORITES_DATA = [
  { 
    id: '1', 
    name: 'Praça da Matriz', 
    address: 'Boa Viagem - Centro', 
    accessibility: 'Motora', 
    description: 'Vaga de estacionamento e rampa.', 
    recursos: 'Estacionamento' 
  },
  { 
    id: '2', 
    name: 'IFCE', 
    address: 'Rod. Pres. Juscelino Kubitschek', 
    accessibility: 'Motora', 
    description: 'Rampas e banheiros adaptados.', 
    recursos: 'Banheiros adaptados' 
  },
  { 
    id: '3', 
    name: 'Hospital Municipal', 
    address: 'Av. São Vicente', 
    accessibility: 'Visual', 
    description: 'Piso tátil.', 
    recursos: 'Piso tátil' 
  },
  { 
    id: '4', 
    name: 'Biblioteca', 
    address: 'Rua 25', 
    accessibility: 'Auditiva', 
    description: 'Intérpretes.', 
    recursos: 'Libras' 
  }
];

export function FavoriteCard() {
  // Função para remover (apenas visual por enquanto)
  const handleRemove = (id) => {
    console.log('Remover item:', id);
  };

  return (
    <View>
      {FAVORITES_DATA.map((item) => (
        <View key={item.id} style={styles.card}>
          
          {/* Título e Endereço */}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>

          {/* Detalhes */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>
              Acessibilidade: <Text style={styles.value}>{item.accessibility}</Text>
            </Text>
            {item.recursos && (
              <Text style={styles.label}>
                Recursos: <Text style={styles.value}>{item.recursos}</Text>
              </Text>
            )}
            <Text style={styles.label}>
              Descrição: <Text style={styles.value}>{item.description}</Text>
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Botão Remover */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              onPress={() => handleRemove(item.id)} 
              style={styles.favoriteButton}
            >
              <Feather name="heart" size={20} color="#d32f2f" />
              <Text style={styles.favoriteText}>Remover dos Favoritos</Text>
            </TouchableOpacity>
          </View>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  infoContainer: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  favoriteText: {
    marginLeft: 8,
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: 13,
  }
});