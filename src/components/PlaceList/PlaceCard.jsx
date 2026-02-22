import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// 1. Importando o pacote oficial do Material Design
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export function PlaceCard({
  name,
  address,
  accessibility,
  description,
  recursos,
  onEdit,
  onDelete
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={[
      styles.card,
      { backgroundColor: theme.colors.surfaceContainerLow }
    ]}>
      {/* Cabeçalho do Card */}
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{name}</Text>
          <Text style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>{address}</Text>
        </View>

        {/* 2. Ícone de Imagem atualizado */}
        <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceContainerHigh }]}>
          <MaterialIcons name="image" size={24} color={theme.colors.onSurfaceVariant} />
        </View>
      </View>

      {/* Informações Técnicas */}
      <View style={styles.infoArea}>
        <Text style={[styles.label, { color: theme.colors.onSurface }]}>
          Acessibilidade: <Text style={styles.value}>{accessibility}</Text>
        </Text>
        <Text style={[styles.label, { color: theme.colors.onSurface }]}>
          Recursos: <Text style={styles.value}>{recursos}</Text>
        </Text>
      </View>

      {/* Barra de Ações baseada no protótipo */}
      <View style={[styles.actionsContainer, { borderTopColor: theme.colors.outlineVariant }]}>
        
        {/* 3. Ícone de favorito dinâmico (Vazado vs Preenchido) */}
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.iconButton}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={22}
            color={isFavorite ? theme.colors.error : theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity>

        {/* 4. Ícones de edição e exclusão atualizados */}
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <MaterialIcons name="edit" size={22} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <MaterialIcons name="delete-outline" size={22} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleArea: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoArea: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontWeight: 'normal',
    opacity: 0.8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 15,
  },
  iconButton: {
    padding: 8,
  }
});