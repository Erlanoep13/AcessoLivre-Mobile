import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function PlaceCard({ 
  name, 
  address, 
  accessibility, 
  description, 
  onEdit, 
  onFavorite, 
  onDelete 
}) {
  return (
    <View style={styles.card}>
      {/* Título */}
      <Text style={styles.title}>{name}</Text>
      
      {/* Endereço */}
      <Text style={styles.address}>{address}</Text>

      {/* Acessibilidade */}
      <Text style={styles.label}>
        Tipo de acessibilidade: <Text style={styles.value}>{accessibility}</Text>
      </Text>

      {/* Descrição */}
      <Text style={styles.label}>
        Descrição: <Text style={styles.value}>{description}</Text>
      </Text>

      {/* Barra de Ações (Ícones) */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Feather name="edit-2" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onFavorite} style={styles.iconButton}>
          <Feather name="heart" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Feather name="trash-2" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
    color: '#444',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  iconButton: {
    padding: 4,
  }
});