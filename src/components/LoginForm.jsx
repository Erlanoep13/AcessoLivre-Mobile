import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext'; 

export function LoginForm() {
  const [nome, setNome] = useState('');
  const [chaveAcesso, setChaveAcesso] = useState('');

  const navigation = useNavigation();
  const { setUsername } = useUser();

  function handleLogin() {
    // 1. Validação simples
    if (nome.trim() === '') {
       Alert.alert('Atenção', 'Por favor, digite o seu nome.');
       return;
    }

    // 2. Salva o nome na memória do app (seja admin ou user)
    setUsername(nome);

    // 3. Verifica se é o Admin e redireciona
    if (nome.toLowerCase() === 'admin') {
      // Se for admin, vai para o PAINEL DE ADMINISTRAÇÃO
      console.log('Entrando como Administrador...');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Admin' }], // Rota definida no seu routes.jsx
      });
    } else {
      // Se for outro nome, vai para o MAPA (Comportamento padrão)
      console.log('Entrando como Usuário:', nome);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MapPage' }], // Rota definida no seu routes.jsx
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Faça Login e aproveite melhor nosso sistema!</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="none" // Importante: evita que o celular coloque letra maiúscula sozinho no "admin"
        />
        <Text style={styles.label}>Chave de acesso</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua chave"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={chaveAcesso}
          onChangeText={setChaveAcesso}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.createAccountContainer} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccountText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', marginBottom: 20 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center', maxWidth: '80%', marginBottom: 30 },
  card: { backgroundColor: '#fff', width: '85%', borderRadius: 10, paddingVertical: 30, paddingHorizontal: 20, elevation: 5 },
  label: { fontSize: 16, color: '#000', marginBottom: 8, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8, fontSize: 16, marginBottom: 20, color: '#333' },
  loginButton: { backgroundColor: '#1e293b', borderRadius: 5, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  createAccountContainer: { marginTop: 20 },
  createAccountText: { color: '#fff', textDecorationLine: 'underline', fontSize: 16, fontWeight: 'bold' },
});