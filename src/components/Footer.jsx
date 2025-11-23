// Footer.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Acesso Livre</Text>

        <Text style={styles.text}>
          Promovendo acessibilidade para todos.
        </Text>

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
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '80%',
    marginVertical: 10,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});