import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
    Alert.alert("Sucesso", "Pedido de remoção enviado para o administrador.");
  };

  return (
    <View style={styles.container}>
      {PLACES_DATA.map((place) => (
        <PlaceCard
          key={place.id}
          name={place.nome}
          address={place.localizacao}
          accessibility={place.tipo}
          recursos={place.recursos}
          description={place.descricao}
          onEdit={() => onEditPress(place)}
          onFavorite={() => console.log('Favoritar', place.id)}
          onDelete={() => handleDeletePress(place.id)}
        />
      ))}
      
      <RemoveModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  }
});