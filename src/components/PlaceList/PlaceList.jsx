import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PlaceCard } from './PlaceCard';

// Dados mockados
const MOCK_PLACES = [
  {
    id: '1',
    name: 'Praça da Matriz',
    address: 'Boa Viagem - Centro, praça Monsenhor José Cândido',
    accessibility: 'Motora',
    description: 'Vaga de estacionamento para pessoas com deficiências e rampa de acesso à praça perto da Tropikaly'
  },
  {
    id: '2',
    name: 'IFCE - Campus Boa Viagem',
    address: 'Rod. Pres. Juscelino Kubitschek - Boa Viagem, CE, 63870-000',
    accessibility: 'Motora',
    description: 'Instituto Federal de Educação, Ciência e Tecnologia do Ceará. Possui rampas e banheiros adaptados.'
  }
];

export function PlaceList() {
  return (
    <View style={styles.container}>
      {MOCK_PLACES.map((place) => (
        <PlaceCard 
          key={place.id}
          name={place.name}
          address={place.address}
          accessibility={place.accessibility}
          description={place.description}
          onEdit={() => console.log('Editar', place.id)}
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