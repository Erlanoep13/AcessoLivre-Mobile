// LoginForm.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// 1. IMPORTAR O HOOK DE NAVEGAÇÃO
import { useNavigation } from '@react-navigation/native';

export function LoginForm() {
  // 2. ATIVAR A NAVEGAÇÃO
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [chaveAcesso, setChaveAcesso] = useState('');

  function handleLogin() {
    // Validação simples
    if (!chaveAcesso.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua chave de acesso.');
      return;
    }

    console.log('Logando com:', nome, chaveAcesso);
    
    // Se o login der certo, vai para o Mapa
    // Verifique se o nome da rota no routes.jsx é 'MapPage'
    navigation.navigate('MapPage'); 
  }

  return (
    <View style={styles.container}>

      {/* Título da Seção */}
      <Text style={styles.pageTitle}>
        Faça Login e aproveite melhor nosso sistema!
      </Text>

      {/* Card Branco */}
      <View style={styles.card}>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Chave de acesso</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua chave (apenas números)"
          placeholderTextColor="#ccc"
          keyboardType="numeric" // Teclado numérico para facilitar
          secureTextEntry={true}
          value={chaveAcesso}
          onChangeText={setChaveAcesso}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

      </View>

      {/* Link Criar Conta */}
      <TouchableOpacity 
        style={styles.createAccountContainer}
        // 3. AQUI ESTÁ A MÁGICA:
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.createAccountText}>Criar conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#1e293b',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  createAccountContainer: {
    marginTop: 20,
  },
  createAccountText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
  },
});