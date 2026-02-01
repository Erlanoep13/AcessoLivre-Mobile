import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';

// 1. IMPORTAÇÃO DO ASYNC STORAGE ADICIONADA:
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importações do Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function LoginForm() {
  const [nome, setNome] = useState('');
  const [chaveAcesso, setChaveAcesso] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigation = useNavigation();
  const { setUsername } = useUser();

  async function handleLogin() {
    // 1. Validação de campos vazios
    if (nome.trim() === '' || chaveAcesso.trim() === '') {
      Alert.alert('Campos vazios', 'Por favor, preencha o nome de usuário e a senha.');
      return;
    }

    setLoading(true);

    try {
      // --- PASSO A: VERIFICAR SE O USUÁRIO EXISTE ---
      const userDoc = await firestore().collection('usernames').doc(nome.trim()).get();

      if (!userDoc.exists) {
        setLoading(false);
        Alert.alert('Erro de Acesso', 'Usuário não registrado.');
        return;
      }

      const userData = userDoc.data();

      // Verificação de Segurança
      if (!userData || !userData.email) {
        setLoading(false);
        Alert.alert('Erro no Cadastro', 'Este usuário existe, mas não possui e-mail vinculado. Contate o suporte.');
        return;
      }

      const emailRecuperado = userData.email;

      // --- PASSO B: VERIFICAR A SENHA ---
      await auth().signInWithEmailAndPassword(emailRecuperado, chaveAcesso);

      // --- SUCESSO ---
      console.log('Login realizado:', nome);
      
      // Atualiza o contexto (memória temporária)
      setUsername(nome);

      // 2. SALVAR NO ASYNC STORAGE (MEMÓRIA PERMANENTE) ADICIONADO:
      // Salvamos um objeto JSON com o nome e se é admin, para usar no auto-login depois
      const dadosUsuario = {
        username: nome,
        email: emailRecuperado,
        isAdmin: emailRecuperado === 'admin@acessolivre.com'
      };
      
      await AsyncStorage.setItem('@acessolivre:user', JSON.stringify(dadosUsuario));

      // Redirecionamento
      if (emailRecuperado === 'admin@acessolivre.com') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Admin' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MapPage' }],
        });
      }

    } catch (error) {
      console.log('Erro de login capturado:', error.code);
      setLoading(false);

      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        Alert.alert('Erro de Acesso', 'Senha errada.');
      }
      else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Bloqueado', 'Muitas tentativas. Aguarde um momento.');
      }
      else {
        Alert.alert('Erro', 'Usuário não cadastrado. Verifique o nome de usuário e tente novamente.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Faça Login e aproveite melhor nosso sistema!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome de Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Erlano"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="none"
        />

        {/* ÁREA DA SENHA */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Sua senha"
            placeholderTextColor="#ccc"
            secureTextEntry={!mostrarSenha}
            value={chaveAcesso}
            onChangeText={setChaveAcesso}
          />

          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.iconButton}>
            <Ionicons
              name={mostrarSenha ? "eye" : "eye-off"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    padding: 10,
  },
});