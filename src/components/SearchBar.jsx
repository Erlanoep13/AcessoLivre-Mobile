import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext'; // Importação do tema global

export function SearchBar() {
  const { theme, isDark } = useTheme(); // Acessando as cores do Material Theme
  const [texto, setTexto] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const manipularTexto = (valor) => {
    setTexto(valor);
    // Mostra o dropdown apenas se houver algo digitado
    setMostrarResultados(valor.length > 0);
  };

  return (
    <View style={styles.container}>

      {/* Caixa do Input + Botão de Pesquisa */}
      <View style={[
        styles.inputContainer,
        {
          backgroundColor: theme.colors.surfaceVariant, // Tom mais suave conforme protótipo
          borderColor: theme.colors.outline
        }
      ]}>
        <TextInput
          style={[styles.input, { color: theme.colors.onSurface }]}
          placeholder="Pesquisar Local"
          placeholderTextColor={isDark ? theme.colors.onSurfaceVariant : "#9CA3AF"}
          value={texto}
          onChangeText={manipularTexto}
        />

        <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
          <Feather
            name="search"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      </View>

      {/* Lista de Resultados (Dropdown) */}
      {mostrarResultados && (
        <View style={[
          styles.resultsDropdown,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outlineVariant
          }
        ]}>
          <TouchableOpacity onPress={() => console.log("Clicou no resultado")}>
            <Text style={[styles.resultItem, { color: theme.colors.onSurface, borderBottomColor: theme.colors.outlineVariant }]}>
              Resultado Exemplo 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.resultItem, { color: theme.colors.onSurface, borderBottomColor: theme.colors.outlineVariant }]}>
              Resultado Exemplo 2
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    position: 'relative',
    zIndex: 10,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  searchButton: {
    padding: 8,
  },
  resultsDropdown: {
    position: 'absolute',
    top: 55,
    left: 16,
    right: 16,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    zIndex: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    borderBottomWidth: 1,
  }
});