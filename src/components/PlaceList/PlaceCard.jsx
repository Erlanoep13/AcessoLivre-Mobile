import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function PlaceCard({
  name,
  address,
  accessibility,
  description,
  recursos,
  onEdit,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "Remover Local",
      "Tem certeza que deseja remover este local?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim, remover",
          onPress: () => Alert.alert("Sucesso", "Pedido de remoção do local enviado para o administrador.")
        }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.address}>{address}</Text>

      <Text style={styles.label}>
        Acessibilidade: <Text style={styles.value}>{accessibility}</Text>
      </Text>

      <Text style={styles.label}>
        Recursos: <Text style={styles.value}>{recursos}</Text>
      </Text>
      
      <Text style={styles.label}>
        Descrição: <Text style={styles.value}>{description}</Text>
      </Text>

      <View style={styles.actionsContainer}>
        {/* Botão Editar */}
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Feather name="edit-2" size={20} color="#333" />
        </TouchableOpacity>

        {/* Botão Favoritar */}
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.iconButton}
        >
          <Feather
            name="heart"
            size={20}
            color={isFavorite ? "#d32f2f" : "#333"} // Muda a cor da borda se for favoritado
          />
        </TouchableOpacity>

        {/* Botão Deletar */}
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
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