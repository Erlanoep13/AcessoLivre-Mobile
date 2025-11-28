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
// 1. Importei a Navbar
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function RemoveRequestsPage() {
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      placeName: 'Padaria do Zé', 
      address: 'Rua das Flores, 123', 
      reason: 'O local fechou permanentemente.',
      requestedBy: 'Ana_88'
    },
    { 
      id: 2, 
      placeName: 'Rampa da Praça', 
      address: 'Av. Central, s/n', 
      reason: 'A rampa foi demolida na reforma.',
      requestedBy: 'Carlos_Dev'
    },
    { 
      id: 3, 
      placeName: 'Farmácia Saúde', 
      address: 'Rua Nova, 45', 
      reason: 'Local duplicado no mapa.',
      requestedBy: 'Marcos_Admin'
    }
  ]);

  const handleApproveRemoval = (id) => {
    Alert.alert(
      "Confirmar Remoção",
      "Tem a certeza que deseja remover este local do mapa?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: 'destructive',
          onPress: () => {
            setRequests(requests.filter(item => item.id !== id));
            Alert.alert("Sucesso", "Local removido com sucesso!");
          } 
        }
      ]
    );
  };

  const handleRejectRemoval = (id) => {
    setRequests(requests.filter(item => item.id !== id));
    Alert.alert("Informação", "Pedido rejeitado. O local foi mantido.");
  };

  return (
    <View style={styles.container}>
      
      {/* 2. Coloquei a Navbar aqui no topo */}
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho da Página */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="trash-alt" size={32} color="#c62828" />
          </View>
          <Text style={styles.title}>Pedidos de Remoção</Text>
          <Text style={styles.subtitle}>
            Gerencie solicitações de exclusão de locais
          </Text>
        </View>

        {/* Lista de Pedidos */}
        <View style={styles.listContainer}>
          {requests.length === 0 ? (
            <Text style={styles.emptyText}>Não há pedidos pendentes.</Text>
          ) : (
            requests.map((item) => (
              <View key={item.id} style={styles.card}>
                
                <View style={styles.cardHeader}>
                  <Text style={styles.placeName}>{item.placeName}</Text>
                  <MaterialIcons name="place" size={20} color="#666" />
                </View>
                
                <Text style={styles.address}>{item.address}</Text>
                
                <View style={styles.reasonBox}>
                  <Text style={styles.reasonLabel}>Motivo:</Text>
                  <Text style={styles.reasonText}>"{item.reason}"</Text>
                </View>
                
                <Text style={styles.userText}>Pedido por: {item.requestedBy}</Text>

                <View style={styles.divider} />

                {/* Botões de Ação */}
                <View style={styles.actions}>
                  {/* Botão Rejeitar (Manter o local) */}
                  <TouchableOpacity 
                    style={[styles.button, styles.btnReject]} 
                    onPress={() => handleRejectRemoval(item.id)}
                  >
                    <Text style={[styles.btnText, {color: '#555'}]}>Manter Local</Text>
                  </TouchableOpacity>

                  {/* Botão Aprovar (Remover o local) */}
                  <TouchableOpacity 
                    style={[styles.button, styles.btnApprove]} 
                    onPress={() => handleApproveRemoval(item.id)}
                  >
                    <MaterialIcons name="delete" size={18} color="#fff" style={{marginRight:5}} />
                    <Text style={styles.btnText}>Confirmar Remoção</Text>
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
    backgroundColor: '#1e4e28', // Fundo Verde
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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffcdd2', // Vermelho bem claro
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  reasonBox: {
    backgroundColor: '#ffebee', // Fundo avermelhado para o motivo
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 2,
  },
  reasonText: {
    fontSize: 14,
    color: '#d32f2f',
    fontStyle: 'italic',
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
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnReject: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnApprove: {
    backgroundColor: '#d32f2f', // Vermelho Perigo
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
});