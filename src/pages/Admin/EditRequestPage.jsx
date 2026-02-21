import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { RequestCard } from '../../components/RequestCard';
import { Footer } from '../../components/Footer';

export function EditRequestsPage() {
  const { theme, isDark } = useTheme();
  const [requests, setRequests] = useState([
    { id: '1', usuario: 'Maria_Eng', nome: 'Biblioteca Municipal', alteracoes: [{ campo: 'Acessibilidade', antigo: 'Apenas escadas', novo: 'Rampa de acesso na entrada.' }] },
    { id: '2', usuario: 'Joao_Entregador', nome: 'Mercado Central', alteracoes: [{ campo: 'Endereço', antigo: 'Rua A, 100', novo: 'Rua A, 120 (Ao lado do correio)' }] }
  ]);

  const handleAction = (id, type) => {
    Alert.alert(type === 'app' ? "Aprovar" : "Rejeitar", "Confirmar ação?", [
      { text: "Voltar", style: "cancel" },
      { text: "Confirmar", onPress: () => setRequests(curr => curr.filter(i => i.id !== id)) }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: theme.colors.tertiaryContainer }]}>
            <FontAwesome5 name="edit" size={26} color={theme.colors.onTertiaryContainer} />
          </View>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Pedidos de Edição</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>Revise as sugestões de mudança da comunidade</Text>
        </View>

        <View style={styles.listContainer}>
          {requests.map((item) => (
            <RequestCard
              key={item.id}
              usuario={item.usuario}
              nome={item.nome}
              alteracoes={item.alteracoes}
              onAccept={() => handleAction(item.id, 'app')}
              onRefuse={() => handleAction(item.id, 'rej')}
            />
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
  subtitle: { fontSize: 14, textAlign: 'center', paddingHorizontal: 40 },
  listContainer: { paddingHorizontal: 16 },
  scrollContent: { flexGrow: 1 }
});