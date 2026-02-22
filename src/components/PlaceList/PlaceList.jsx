import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { PlaceCard } from './PlaceCard';
import { PLACES_DATA } from '../../data/places';
import { RemoveModal } from '../RemoveModal';

export function PlaceList({ onEditPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeletePress = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const confirmDelete = (motivo) => {
    setModalVisible(false);
    // Feedback visual para o usuário sobre a ação administrativa
    Alert.alert("Sucesso", "Pedido de remoção enviado para o administrador.");
  };

  return (
    <View style={styles.container}>
      {/* Mapeamento dos dados para os componentes visuais */}
      {PLACES_DATA.map((place) => (
        <PlaceCard
          key={place.id}
          name={place.nome}
          address={place.localizacao}
          accessibility={place.tipo}
          recursos={place.recursos}
          description={place.descricao}
          onEdit={() => onEditPress(place)}
          onDelete={() => handleDeletePress(place.id)}
        />
      ))}

      {/* Modal de remoção */}
      <RemoveModal
        visible={modalVisible}
        // AQUI ESTAVA O ERRO: Trocado de setMenuVisible para setModalVisible 👇
        onClose={() => setModalVisible(false)} 
        onConfirm={confirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
    paddingBottom: 20,
  }
});