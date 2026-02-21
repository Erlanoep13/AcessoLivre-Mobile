import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { RequestCard } from '../../components/RequestCard';
import { Footer } from '../../components/Footer';

const INITIAL_REQUESTS = [
  { id: '1', usuario: 'Marcos Barros', nome: 'Praça Matriz de Madalena-Ce', localizacao: 'Madalena - Centro', tipo: 'Visual', recursos: 'Piso Tátil, Placas em Braille', descricao: 'Praça da matriz possui piso Tátil' },
  { id: '2', usuario: 'Rafael Nogueira', nome: 'Biblioteca Municipal', localizacao: 'Boa Viagem - Centro', tipo: 'Motora', recursos: 'Rampa de acesso', descricao: 'Rampa de acesso na entrada principal' }
];

export function AddRequestPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const { theme, isDark } = useTheme();

  const handleApprove = (id) => {
    Alert.alert("Confirmar Aprovação", "Adicionar este local ao mapa?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", onPress: () => setRequests(curr => curr.filter(i => i.id !== id)) }
    ]);
  };

  const handleReject = (id) => {
    Alert.alert("Rejeitar Pedido", "Descartar esta sugestão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Rejeitar", style: "destructive", onPress: () => setRequests(curr => curr.filter(i => i.id !== id)) }
    ]);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={[styles.iconCircle, { backgroundColor: theme.colors.primaryContainer }]}>
        <FontAwesome5 name="plus" size={24} color={theme.colors.onPrimaryContainer} />
      </View>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>Pedidos de Adição</Text>
      <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        Novos locais sugeridos pela comunidade
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <Navbar />
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardPadding}>
            <RequestCard
              usuario={item.usuario}
              nome={item.nome}
              localizacao={item.localizacao}
              tipo={item.tipo}
              recursos={item.recursos}
              descricao={item.descricao}
              onAccept={() => handleApprove(item.id)}
              onRefuse={() => handleReject(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<Footer />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>Nenhum pedido pendente.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 5, textAlign: 'center' },
  cardPadding: { paddingHorizontal: 16, paddingBottom: 10 },
  listContent: { paddingBottom: 20 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 18 }
});