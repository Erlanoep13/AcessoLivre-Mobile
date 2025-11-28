import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
// 1. IMPORTAR O HOOK DE NAVEGAÇÃO
import { useNavigation } from '@react-navigation/native';

export function Footer() {
  // 2. INICIALIZAR A NAVEGAÇÃO
  const navigation = useNavigation();

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

        {/* Link do Instagram */}
        <TouchableOpacity style={styles.simpleLink} onPress={openInstagram}>
          <Feather name="instagram" size={18} color="#1e4e28" />
          <Text style={styles.linkText}>@acessolivreads</Text>
        </TouchableOpacity>

        {/* --- 3. NOVO LINK: SOBRE NÓS --- */}
        {/* Garante que o nome 'AboutPage' seja igual ao do routes.jsx */}
        <TouchableOpacity 
          style={styles.aboutButton} 
          onPress={() => navigation.navigate('AboutPage')}
        >
          <Text style={styles.aboutText}>Conheça o projeto (Sobre Nós)</Text>
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
  
  // Estilo do Instagram
  simpleLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  linkText: {
    fontSize: 14,
    color: '#1e4e28',
    fontWeight: '600',
  },

  // --- ESTILO DO SOBRE NÓS ---
  aboutButton: {
    marginBottom: 15,
    paddingVertical: 5,
  },
  aboutText: {
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline', // Sublinhado para parecer link
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