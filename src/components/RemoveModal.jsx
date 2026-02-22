import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export function RemoveModal({ visible, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) {
      Alert.alert("Atenção", "Por favor, informe um motivo para a remoção.");
      return;
    }
    onConfirm(reason);
    setReason(''); 
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
            mode="outlined"
            label="Motivo da remoção"
            placeholder="Ex: Local fechado..."
            multiline
            numberOfLines={3}
            value={reason}
            onChangeText={setReason}
            activeOutlineColor="#1e4e28" 
            outlineColor="#ddd"
            style={styles.input}
          />

          <View style={styles.actions}>
            <Button 
              mode="text" 
              textColor="#555" 
              onPress={onClose}
            >
              Cancelar
            </Button>

            <Button 
              mode="contained" 
              buttonColor="#d32f2f" 
              onPress={handleConfirm}
            >
              Enviar Pedido
            </Button>
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
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});