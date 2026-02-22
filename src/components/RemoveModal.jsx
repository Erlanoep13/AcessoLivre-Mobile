import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export function RemoveModal({ visible, onClose, onConfirm }) {
  const { theme } = useTheme();
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.error }]}>Remover Local</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Por qual motivo este local deve ser removido?
          </Text>

          <TextInput
            style={[styles.input, {
              backgroundColor: theme.colors.surfaceVariant,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outlineVariant
            }]}
            placeholder="Ex: Local fechado permanentemente..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            multiline
            numberOfLines={3}
            value={reason}
            onChangeText={setReason}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.surfaceContainerHigh }]}
              onPress={onClose}
            >
              <Text style={{ color: theme.colors.onSurface, fontWeight: '600' }}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.error }]}
              onPress={handleConfirm}
            >
              <Text style={{ color: theme.colors.onError, fontWeight: 'bold' }}>Enviar Pedido</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 28,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 24,
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});