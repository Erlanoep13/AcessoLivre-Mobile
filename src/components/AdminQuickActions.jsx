import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Badge } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // Importamos os ícones do Expo
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export function AdminQuickActions({ addRequests = 0, editRequests = 0, removeRequests = 0 }) {
  // 1. Instanciamos a navegação real
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      
      {/* --- BOTÃO DE ADIÇÃO --- */}
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained-tonal"
          // 2. Usamos uma função para renderizar um ícone Customizado Maior (size 32)
          icon={({ color }) => <MaterialIcons name="add-circle-outline" size={32} color={color} />}
          buttonColor={theme.colors.surfaceVariant}
          textColor={theme.colors.onSurface}
          style={[styles.button, { borderColor: theme.colors.outlineVariant }]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
          // 3. A navegação acionada diretamente no onPress
          onPress={() => navigation.navigate('AddRequest')} 
        >
          Pedidos de Adição
        </Button>

        {addRequests > 0 && (
          <Badge style={[styles.badge, { backgroundColor: theme.colors.error, color: theme.colors.onError }]} size={26}>
            {addRequests > 9 ? '9+' : addRequests}
          </Badge>
        )}
      </View>

      {/* --- BOTÃO DE EDIÇÃO --- */}
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained-tonal"
          // Ícone customizado maior
          icon={({ color }) => <MaterialIcons name="edit" size={32} color={color} />}
          buttonColor={theme.colors.surfaceVariant}
          textColor={theme.colors.onSurface}
          style={[styles.button, { borderColor: theme.colors.outlineVariant }]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
          // Navegação direta
          onPress={() => navigation.navigate('EditRequest')} 
        >
          Pedidos de Edição
        </Button>

        {editRequests > 0 && (
          <Badge style={[styles.badge, { backgroundColor: theme.colors.error, color: theme.colors.onError }]} size={26}>
            {editRequests > 9 ? '9+' : editRequests}
          </Badge>
        )}
      </View>

      {/* --- BOTÃO DE REMOÇÃO --- */}
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained-tonal"
          // Ícone customizado maior
          icon={({ color }) => <MaterialIcons name="delete-outline" size={32} color={color} />}
          buttonColor={theme.colors.surfaceVariant}
          textColor={theme.colors.onSurface}
          style={[styles.button, { borderColor: theme.colors.outlineVariant }]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
          // Navegação direta
          onPress={() => navigation.navigate('RemoveRequest')} 
        >
          Pedidos de Remoção
        </Button>

        {removeRequests > 0 && (
          <Badge style={[styles.badge, { backgroundColor: theme.colors.error, color: theme.colors.onError }]} size={26}>
            {removeRequests > 9 ? '9+' : removeRequests}
          </Badge>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    paddingHorizontal: 4, 
    marginBottom: 20 
  },
  buttonWrapper: {
    marginBottom: 16,
    position: 'relative', // Essencial para o Badge sobrepor o botão
  },
  button: { 
    borderRadius: 12, 
    borderWidth: 1,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 12, // Um pouco mais alto para comportar o ícone tamanho 32
    justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
    paddingLeft: 1,
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: 'bold',
    marginLeft: 25, // Afasta um pouquinho o texto do ícone grande
  },
  badge: { 
    position: 'absolute', 
    top: -8, 
    right: -4, 
    fontWeight: 'bold',
    fontSize: 13,
  }
});