import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';

export function RemoveModal({ visible, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) {
      Alert.alert("Atenção", "Por favor, informe um motivo para a remoção.");
      return;
    }
    onConfirm(reason);
    setReason(''); // Limpa o campo
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Remover Local</Text>
          <Text style={styles.subtitle}>Por qual motivo este local deve ser removido?</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Local fechado, Mudou de endereço..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={reason}
            onChangeText={setReason}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
              <Text style={styles.textCancel}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnConfirm]} onPress={handleConfirm}>
              <Text style={styles.textConfirm}>Enviar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 80,
    marginBottom: 20,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnCancel: {
    backgroundColor: '#f5f5f5',
  },
  btnConfirm: {
    backgroundColor: '#d32f2f',
  },
  textCancel: {
    color: '#333',
    fontWeight: 'bold',
  },
  textConfirm: {
    color: '#fff',
    fontWeight: 'bold',
  },
});