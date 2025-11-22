// RequestCard.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function RequestCard({
  userName,
  placeName,
  address,
  accessibilityType,
  description,
  onAccept,
  onRefuse
}) {
  return (
    <View style={styles.card}>
      {/* Cabeçalho do Card (Nome do Usuário) */}
      <View style={styles.cardHeader}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Corpo do Card */}
      <Text style={styles.placeName}>{placeName}</Text>
      <Text style={styles.address}>{address}</Text>

      <Text style={styles.label}>
        Tipo: <Text style={styles.value}>{accessibilityType}</Text>
      </Text>

      <Text style={styles.descriptionLabel}>
        Descrição: <Text style={styles.value}>{description}</Text>
      </Text>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.refuseButton]} onPress={onRefuse}>
          <Text style={styles.buttonText}>✖ Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
          <Text style={styles.buttonText}>✔ Aceitar</Text>
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
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  value: {
    fontWeight: 'normal',
    color: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    width: '48%',
  },
  refuseButton: {
    backgroundColor: '#dc2626',
  },
  acceptButton: {
    backgroundColor: '#22c55e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});