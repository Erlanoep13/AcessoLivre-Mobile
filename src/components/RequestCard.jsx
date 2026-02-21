import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export function RequestCard({ usuario, nome, localizacao, tipo, recursos, descricao, alteracoes = [], onAccept, onRefuse }) {
  const { theme } = useTheme();
  const isEditMode = alteracoes && alteracoes.length > 0;

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}>
      <View style={[styles.cardHeader, { borderBottomColor: theme.colors.outlineVariant }]}>
        <Text style={[styles.userName, { color: theme.colors.primary }]}>{usuario}</Text>
      </View>

      <Text style={[styles.placeName, { color: theme.colors.onSurface }]}>{nome}</Text>

      {isEditMode ? (
        <View>
          <Text style={[styles.editTitle, { color: theme.colors.onSurfaceVariant }]}>Sugestões de alteração:</Text>
          {alteracoes.map((item, index) => (
            <View key={index} style={styles.changeBlock}>
              <View style={[styles.badge, { backgroundColor: theme.colors.tertiaryContainer }]}>
                <Text style={[styles.badgeText, { color: theme.colors.onTertiaryContainer }]}>{item.campo}</Text>
              </View>
              <View style={[styles.comparisonContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text style={[styles.labelOld, { color: theme.colors.error }]}>Antigo: <Text style={styles.textOld}>{item.antigo}</Text></Text>
                <MaterialIcons name="arrow-downward" size={16} color={theme.colors.onSurfaceVariant} style={{ alignSelf: 'center' }} />
                <Text style={[styles.labelNew, { color: theme.colors.primary }]}>Novo: <Text style={[styles.textNew, { color: theme.colors.onSurface }]}>{item.novo}</Text></Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>{localizacao}</Text>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Tipo: <Text style={styles.value}>{tipo}</Text></Text>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Recursos: <Text style={styles.value}>{recursos}</Text></Text>
        </View>
      )}

      <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.secondaryContainer }]} onPress={onRefuse}>
          <MaterialIcons name="close" size={20} color={theme.colors.onSecondaryContainer} />
          <Text style={{ color: theme.colors.onSecondaryContainer, fontWeight: 'bold' }}>Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={onAccept}>
          <MaterialIcons name="check" size={20} color={theme.colors.onPrimary} />
          <Text style={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}>Aprovar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3, borderWidth: 1 },
  cardHeader: { borderBottomWidth: 1, paddingBottom: 8, marginBottom: 12, alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: 'bold' },
  placeName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 13, marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  editTitle: { fontSize: 13, marginBottom: 10, fontStyle: 'italic' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 5 },
  badgeText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  comparisonContainer: { padding: 10, borderRadius: 8 },
  labelOld: { fontSize: 12, fontWeight: 'bold' },
  textOld: { textDecorationLine: 'line-through', fontWeight: 'normal', opacity: 0.7 },
  labelNew: { fontSize: 12, fontWeight: 'bold' },
  textNew: { fontWeight: '600' },
  divider: { height: 1, marginVertical: 12, opacity: 0.3 },
  actions: { flexDirection: 'row', gap: 10 },
  button: { flex: 1, paddingVertical: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  value: { fontWeight: 'normal', opacity: 0.8 }
});