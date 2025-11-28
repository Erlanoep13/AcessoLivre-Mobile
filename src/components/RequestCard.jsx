import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function RequestCard({
  usuario,
  nome,

  // Props para ADIÇÃO
  localizacao,
  tipo,
  recursos,
  descricao,

  // Prop para EDIÇÃO
  alteracoes = [],

  onAccept,
  onRefuse
}) {

  // Se tiver lista de alterações, é modo EDIÇÃO. Se não, é ADIÇÃO.
  const isEditMode = alteracoes && alteracoes.length > 0;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.userName}>{usuario}</Text>
      </View>

      <Text style={styles.placeName}>{nome}</Text>

      {/* --- MODO EDIÇÃO (Lista de Mudanças) --- */}
      {isEditMode ? (
        <View>
          <Text style={styles.editTitle}>Sugestões de alteração:</Text>

          {alteracoes.map((item, index) => (
            <View key={index} style={styles.changeBlock}>
              {/* Nome do campo alterado */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.campo}</Text>
              </View>

              {/* Comparação */}
              <View style={styles.comparisonContainer}>
                <View style={styles.changeRow}>
                  <Text style={styles.labelOld}>Antigo:</Text>
                  <Text style={styles.textOld}>{item.antigo}</Text>
                </View>

                <View style={styles.arrowContainer}>
                  <MaterialIcons name="arrow-downward" size={16} color="#999" />
                </View>

                <View style={styles.changeRow}>
                  <Text style={styles.labelNew}>Novo:</Text>
                  <Text style={styles.textNew}>{item.novo}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        /* --- MODO ADIÇÃO --- */
        <View>
          <Text style={styles.address}>{localizacao}</Text>
          <Text style={styles.label}>Tipo: <Text style={styles.value}>{tipo}</Text></Text>
          <Text style={styles.label}>Recursos: <Text style={styles.value}>{recursos}</Text></Text>
          <Text style={styles.descriptionLabel}>Descrição: <Text style={styles.value}>{descricao}</Text></Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.btnReject]} onPress={onRefuse}>
          <MaterialIcons name="close" size={20} color="#666" />
          <Text style={styles.btnTextReject}>Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnApprove]} onPress={onAccept}>
          <MaterialIcons name="check" size={20} color="#fff" />
          <Text style={styles.btnTextApprove}>Aprovar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  editTitle: {
    fontSize: 14, color: '#666',
    marginBottom: 10,
    fontStyle: 'italic'
  },
  changeBlock: {
    marginBottom: 15
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 5
  },
  badgeText: {
    fontSize: 10,
    color: '#1565c0',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  comparisonContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8
  },
  changeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 2
  },
  labelOld: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d32f2f'
  },
  textOld: {
    fontSize: 13,
    color: '#555',
    textDecorationLine: 'line-through',
    flex: 1
  },
  labelNew: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2e7d32'
  },
  textNew: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    flex: 1
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
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
    backgroundColor: '#1e4e28',
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