import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PlaceCard } from './PlaceCard';
import { PLACES_DATA } from '../../data/places';

export function PlaceList({ onEditPress }) {
  return (
    <View style={styles.container}>
      {PLACES_DATA.map((place) => (
        <PlaceCard
          key={place.id}
          name={place.nome}
          address={place.localizacao}
          accessibility={place.tipo}
          description={place.descricao}
          onEdit={() => onEditPress(place)}
          onFavorite={() => console.log('Favoritar', place.id)}
          onDelete={() => console.log('Deletar', place.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  }
});