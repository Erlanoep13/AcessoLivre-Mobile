import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export function RemoveModal({ visible, onClose, onConfirm }) {
  const { theme } = useTheme();
  const [motivo, setMotivo] = useState('');

  const handleConfirm = () => {
    if (motivo.trim() === '') {
      return; // Evita confirmação sem motivo
    }
    onConfirm(motivo);
    setMotivo('');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.modalView, { backgroundColor: theme.colors.surface }]}>

          <Text style={[styles.title, { color: theme.colors.error }]}>
            Solicitar Remoção
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Por que este local deve ser removido do mapa?
          </Text>

          <TextInput
            style={[styles.input, {
              backgroundColor: theme.colors.surfaceVariant,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outlineVariant
            }]}
            placeholder="Ex: O local fechou permanentemente..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            multiline
            numberOfLines={4}
            value={motivo}
            onChangeText={setMotivo}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.surfaceContainerHigh }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.colors.error },
                motivo.trim() === '' && { opacity: 0.5 }
              ]}
              onPress={handleConfirm}
              disabled={motivo.trim() === ''}
            >
              <Text style={[styles.buttonText, { color: theme.colors.onError }]}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    width: '100%',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 25,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 100, // Formato pílula M3
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});