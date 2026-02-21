import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function RemoveRequestsPage() {
  const { theme, isDark } = useTheme();
  const [requests, setRequests] = useState([
    { id: '1', placeName: 'Padaria do Zé', address: 'Rua das Flores, 123', reason: 'O local fechou permanentemente.', requestedBy: 'Ana_88' },
    { id: '2', placeName: 'Rampa da Praça', address: 'Av. Central, s/n', reason: 'A rampa foi demolida na reforma.', requestedBy: 'Carlos_Dev' }
  ]);

  const handleRemoval = (id, approved) => {
    Alert.alert(approved ? "Remover Local" : "Manter Local", "Confirmar decisão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", style: approved ? "destructive" : "default", onPress: () => setRequests(curr => curr.filter(i => i.id !== id)) }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: theme.colors.errorContainer }]}>
            <FontAwesome5 name="trash-alt" size={28} color={theme.colors.error} />
          </View>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Pedidos de Remoção</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>Gerencie solicitações de exclusão de locais</Text>
        </View>

        <View style={styles.listContainer}>
          {requests.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}>
              <Text style={[styles.placeName, { color: theme.colors.onSurface }]}>{item.placeName}</Text>
              <Text style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>{item.address}</Text>
              <View style={[styles.reasonBox, { backgroundColor: theme.colors.errorContainer }]}>
                <Text style={[styles.reasonLabel, { color: theme.colors.error }]}>Motivo:</Text>
                <Text style={[styles.reasonText, { color: theme.colors.onSurface }]}>"{item.reason}"</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
              <View style={styles.actions}>
                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.secondaryContainer }]} onPress={() => handleRemoval(item.id, false)}>
                  <Text style={{ color: theme.colors.onSecondaryContainer, fontWeight: 'bold' }}>Manter Local</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.error }]} onPress={() => handleRemoval(item.id, true)}>
                  <MaterialIcons name="delete" size={18} color={theme.colors.onError} />
                  <Text style={{ color: theme.colors.onError, fontWeight: 'bold', marginLeft: 5 }}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, textAlign: 'center' },
  listContainer: { paddingHorizontal: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, elevation: 3 },
  placeName: { fontSize: 18, fontWeight: 'bold' },
  address: { fontSize: 14, marginBottom: 10 },
  reasonBox: { padding: 10, borderRadius: 8, marginBottom: 10 },
  reasonLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  reasonText: { fontSize: 14, fontStyle: 'italic' },
  divider: { height: 1, marginVertical: 12, opacity: 0.2 },
  actions: { flexDirection: 'row', gap: 10 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  scrollContent: { flexGrow: 1 }
});