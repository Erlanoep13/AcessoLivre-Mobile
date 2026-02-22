import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Card, Text, Button, Chip, Divider } from 'react-native-paper';

export function RequestCard({ usuario, nome, localizacao, tipo, recursos, descricao, alteracoes = [], onAccept, onRefuse }) {
  const { theme } = useTheme();
  const isEditMode = alteracoes && alteracoes.length > 0;

  return (
    <Card 
      style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]} 
      mode="outlined"
    >
      <View style={[styles.cardHeader, { borderBottomColor: theme.colors.outlineVariant }]}>
        <Text variant="titleMedium" style={[styles.userName, { color: theme.colors.primary }]}>{usuario}</Text>
      </View>

      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge" style={[styles.placeName, { color: theme.colors.onSurface }]}>{nome}</Text>

        {isEditMode ? (
          <View>
            <Text variant="labelLarge" style={[styles.editTitle, { color: theme.colors.onSurfaceVariant }]}>Sugestões de alteração:</Text>
            {alteracoes.map((item, index) => (
              <View key={index} style={styles.changeBlock}>
                <Chip 
                  mode="flat" 
                  style={[styles.badge, { backgroundColor: theme.colors.tertiaryContainer }]}
                  textStyle={[styles.badgeText, { color: theme.colors.onTertiaryContainer }]}
                  icon="pencil"
                >
                  {item.campo}
                </Chip>

                <View style={[styles.comparisonContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <Text variant="labelMedium" style={[styles.labelOld, { color: theme.colors.error }]}>
                    Antigo: <Text variant="bodyMedium" style={[styles.textOld, { color: theme.colors.onSurfaceVariant }]}>{item.antigo}</Text>
                  </Text>
                  
                  <MaterialIcons name="arrow-downward" size={16} color={theme.colors.onSurfaceVariant} style={{ alignSelf: 'center', marginVertical: 4 }} />
                  
                  <Text variant="labelMedium" style={[styles.labelNew, { color: theme.colors.primary }]}>
                    Novo: <Text variant="bodyMedium" style={[styles.textNew, { color: theme.colors.onSurface }]}>{item.novo}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text variant="bodyMedium" style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>{localizacao}</Text>
            <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurface }]}>Tipo: <Text variant="bodyMedium" style={styles.value}>{tipo}</Text></Text>
            <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurface }]}>Recursos: <Text variant="bodyMedium" style={styles.value}>{recursos}</Text></Text>
          </View>
        )}
      </Card.Content>

      <Divider style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />

      {/* Trocamos Card.Actions por View para forçar o alinhamento perfeito no centro */}
      <View style={styles.actions}>
        <Button 
          mode="contained-tonal"
          icon="close"
          buttonColor={theme.colors.secondaryContainer}
          textColor={theme.colors.onSecondaryContainer}
          style={styles.button}
          onPress={onRefuse}
        >
          Recusar
        </Button>

        <Button 
          mode="contained"
          icon="check"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.button}
          onPress={onAccept}
        >
          Aprovar
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: 12, 
    marginBottom: 16, 
    borderWidth: 1 
  },
  cardHeader: { 
    borderBottomWidth: 1, 
    paddingBottom: 8, 
    marginBottom: 12, 
    alignItems: 'center',
    marginHorizontal: 16, 
    marginTop: 16,
  },
  cardContent: {
    paddingHorizontal: 16,
  },
  userName: { fontWeight: 'bold' },
  placeName: { fontWeight: 'bold', marginBottom: 4 },
  address: { marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  editTitle: { marginBottom: 10, fontStyle: 'italic' },
  changeBlock: { marginBottom: 15 },
  badge: { alignSelf: 'flex-start', marginBottom: 8, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  comparisonContainer: { padding: 10, borderRadius: 8 },
  labelOld: { fontWeight: 'bold' },
  textOld: { textDecorationLine: 'line-through', fontWeight: 'normal', opacity: 0.7 },
  labelNew: { fontWeight: 'bold' },
  textNew: { fontWeight: '600' },
  divider: { height: 1, marginVertical: 12, opacity: 0.3 },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'center', // Centraliza os itens no eixo X
    gap: 12, // Dá um espaço uniforme entre os dois botões
    paddingHorizontal: 16, 
    paddingBottom: 16 
  },
  button: { 
    flex: 1, // Faz com que ambos os botões tenham exatamente o mesmo tamanho 
  },
  value: { fontWeight: 'normal', opacity: 0.8 }
});