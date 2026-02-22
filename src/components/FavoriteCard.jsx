import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';

// Dados Mockados para exibição
const FAVORITES_DATA = [
  { id: '1', name: 'Praça da Matriz', address: 'Boa Viagem - Centro', accessibility: 'Motora', description: 'Vaga de estacionamento e rampa.', recursos: 'Estacionamento' },
  { id: '2', name: 'IFCE', address: 'Rod. Pres. Juscelino Kubitschek', accessibility: 'Motora', description: 'Rampas e banheiros adaptados.', recursos: 'Banheiros adaptados' },
  { id: '3', name: 'Hospital Municipal', address: 'Av. São Vicente', accessibility: 'Visual', description: 'Piso tátil.', recursos: 'Piso tátil' }
];

export function FavoriteCard() {
  const { theme } = useTheme();

  const handleRemove = (id) => {
    console.log('Remover item:', id);
  };

  return (
    <View>
      {FAVORITES_DATA.map((item) => (
        <View key={item.id} style={[
          styles.card,
          { backgroundColor: theme.colors.surfaceContainerLow }
        ]}>

          {/* Título e Endereço */}
          <Text style={[styles.title, { color: theme.colors.primary }]}>{item.name}</Text>
          <Text style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>{item.address}</Text>

          {/* Detalhes Técnicos em container surfaceVariant */}
          <View style={[styles.infoContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>
              Acessibilidade: <Text style={styles.value}>{item.accessibility}</Text>
            </Text>
            {item.recursos && (
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                Recursos: <Text style={styles.value}>{item.recursos}</Text>
              </Text>
            )}
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>
              Descrição: <Text style={styles.value}>{item.description}</Text>
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant, opacity: 0.3 }]} />

          {/* 3. Ação de Remover com o Button da Paper */}
          <View style={styles.actionsContainer}>
            <Button
              mode="contained"
              icon="heart-minus" // Ícone do Material que faz muito mais sentido para "remover"
              onPress={() => handleRemove(item.id)}
              buttonColor={theme.colors.errorContainer}
              textColor={theme.colors.onErrorContainer}
              style={styles.favoriteButton}
              contentStyle={{ paddingHorizontal: 4 }}
            >
              Remover dos Favoritos
            </Button>
          </View>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    marginBottom: 12,
  },
  infoContainer: {
    padding: 12,
    borderRadius: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
    opacity: 0.8,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  favoriteButton: {
    borderRadius: 100, // Formato de pílula clássico do Material
  }
});