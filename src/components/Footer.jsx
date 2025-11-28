import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function Footer() {
  
  const openInstagram = () => {
    Linking.openURL('https://instagram.com/acessolivreads');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>Acesso Livre</Text>
        <Text style={styles.text}>
          Promovendo acessibilidade para todos.
        </Text>

        <TouchableOpacity style={styles.simpleLink} onPress={openInstagram}>
          <Feather name="instagram" size={18} color="#1e4e28" />
          <Text style={styles.linkText}>@acessolivreads</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.copyright}>
          © {new Date().getFullYear()} Acesso Livre. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  simpleLink: {
    flexDirection: 'row', // Coloca ícone e texto lado a lado
    alignItems: 'center',
    marginBottom: 15,
    gap: 6, // Espacinho entre o ícone e a letra
  },
  linkText: {
    fontSize: 14,
    color: '#1e4e28', // Verde da marca
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '80%',
    marginBottom: 15,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});