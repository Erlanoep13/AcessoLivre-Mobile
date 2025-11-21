import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export function SearchBar() {
  const [texto, setTexto] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const manipularTexto = (valor) => {
    setTexto(valor);
    // Só mostra o dropdown se tiver algo digitado
    if (valor.length > 0) {
      setMostrarResultados(true);
    } else {
      setMostrarResultados(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Caixa do Input + Botão */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar Local"
          placeholderTextColor="#9CA3AF"
          value={texto}
          onChangeText={manipularTexto}
        />

        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Lista de Resultados (Dropdown) */}
      {mostrarResultados && (
        <View style={styles.resultsDropdown}>
          <TouchableOpacity>
            <Text style={styles.resultItem}>Resultado Exemplo 1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.resultItem}>Resultado Exemplo 2</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.resultItem}>Resultado Exemplo 3</Text>
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
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
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
    color: '#000',
    height: '100%',
  },
  searchButton: {
    padding: 8,
  },
  resultsDropdown: {
    position: 'absolute',
    top: 55, // Logo abaixo do input
    left: 16,
    right: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    zIndex: 20,
    elevation: 5, // Sombra alta para ficar por cima do conteúdo
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  }
});