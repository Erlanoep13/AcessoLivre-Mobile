import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Footer } from '../../components/Footer';

export function EditRequestsPage() {
  // Dados fictícios simulando o que mudou
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      placeName: 'Biblioteca Municipal', 
      field: 'Acessibilidade',
      oldValue: 'Apenas escadas',
      newValue: 'Rampa de acesso instalada na entrada principal.',
      user: 'Maria_Eng'
    },
    { 
      id: 2, 
      placeName: 'Mercado Central', 
      field: 'Endereço',
      oldValue: 'Rua A, 100',
      newValue: 'Rua A, 120 (Ao lado do correio)',
      user: 'Joao_Entregador'
    },
    { 
      id: 3, 
      placeName: 'Teatro da Cidade', 
      field: 'Nome do Local',
      oldValue: 'Teatro da Cidade',
      newValue: 'Teatro Municipal Ariano Suassuna',
      user: 'Cultura_Gov'
    }
  ]);

  const handleApprove = (id) => {
    Alert.alert(
      "Confirmar Edição",
      "Deseja aplicar estas alterações ao local?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Aplicar Mudança", 
          onPress: () => {
            setRequests(requests.filter(item => item.id !== id));
            Alert.alert("Sucesso", "Informações atualizadas!");
          } 
        }
      ]
    );
  };

  const handleReject = (id) => {
    setRequests(requests.filter(item => item.id !== id));
    Alert.alert("Rejeitado", "A sugestão de edição foi descartada.");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho Laranja */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="edit" size={30} color="#f57c00" />
          </View>
          <Text style={styles.title}>Pedidos de Edição</Text>
          <Text style={styles.subtitle}>
            Revise as sugestões de mudança da comunidade
          </Text>
        </View>

        {/* Lista */}
        <View style={styles.listContainer}>
          {requests.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum pedido de edição pendente.</Text>
          ) : (
            requests.map((item) => (
              <View key={item.id} style={styles.card}>
                
                {/* Título do Card */}
                <View style={styles.cardHeader}>
                  <Text style={styles.placeName}>{item.placeName}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.field}</Text>
                  </View>
                </View>

                {/* Comparação Antes x Depois */}
                <View style={styles.comparisonContainer}>
                  <View style={styles.changeRow}>
                    <Text style={styles.labelOld}>Antigo:</Text>
                    <Text style={styles.textOld}>{item.oldValue}</Text>
                  </View>
                  
                  <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={20} color="#999" />
                  </View>

                  <View style={styles.changeRow}>
                    <Text style={styles.labelNew}>Novo:</Text>
                    <Text style={styles.textNew}>{item.newValue}</Text>
                  </View>
                </View>

                <Text style={styles.userText}>Sugerido por: {item.user}</Text>

                <View style={styles.divider} />

                {/* Botões */}
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={[styles.button, styles.btnReject]} 
                    onPress={() => handleReject(item.id)}
                  >
                    <MaterialIcons name="close" size={20} color="#666" />
                    <Text style={styles.btnTextReject}>Rejeitar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.button, styles.btnApprove]} 
                    onPress={() => handleApprove(item.id)}
                  >
                    <MaterialIcons name="check" size={20} color="#fff" />
                    <Text style={styles.btnTextApprove}>Aprovar</Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))
          )}
        </View>

        <Footer />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28', // Fundo Verde padrão
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffe0b2', // Laranja bem claro
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a5d6a7',
    marginTop: 5,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#1565c0',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  comparisonContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  changeRow: {
    marginBottom: 5,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 2,
  },
  labelOld: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d32f2f', // Vermelho para antigo
  },
  textOld: {
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'line-through', // Riscado para indicar que vai sair
  },
  labelNew: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde para novo
  },
  textNew: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  userText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  btnReject: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnApprove: {
    backgroundColor: '#1e4e28', // Verde do app para confirmar
  },
  btnTextReject: {
    color: '#666',
    fontWeight: 'bold',
  },
  btnTextApprove: {
    color: '#fff',
    fontWeight: 'bold',
  },
});