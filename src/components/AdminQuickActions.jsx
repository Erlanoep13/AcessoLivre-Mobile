import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export function AdminQuickActions({ addRequests = 0, editRequests = 0, removeRequests = 0 }) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const ActionButton = ({ label, notificationCount, onPress }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outlineVariant }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>{label}</Text>

      {notificationCount > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.colors.error, borderColor: theme.colors.surface }]}>
          <Text style={[styles.badgeText, { color: theme.colors.onError }]}>
            {notificationCount > 9 ? '9+' : notificationCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ActionButton label="Pedidos de Adição" notificationCount={addRequests} onPress={() => navigation.navigate('AddRequest')} />
      <ActionButton label="Pedidos de Edição" notificationCount={editRequests} onPress={() => navigation.navigate('EditRequest')} />
      <ActionButton label="Pedidos de Remoção" notificationCount={removeRequests} onPress={() => navigation.navigate('RemoveRequest')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 4, marginBottom: 20 },
  button: { paddingVertical: 18, borderRadius: 12, marginBottom: 16, alignItems: 'center', justifyContent: 'center', position: 'relative', elevation: 2, borderWidth: 1 },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  badge: { position: 'absolute', top: -10, right: -5, borderRadius: 12, minWidth: 26, height: 26, justifyContent: 'center', alignItems: 'center', borderWidth: 2, paddingHorizontal: 4, elevation: 4 },
  badgeText: { fontSize: 12, fontWeight: 'bold' }
});