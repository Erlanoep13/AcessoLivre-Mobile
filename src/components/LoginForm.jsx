import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function LoginForm() {
  const [nome, setNome] = useState('');
  const [chaveAcesso, setChaveAcesso] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigation = useNavigation();
  const { setUsername } = useUser();
  const { theme, isDark } = useTheme();

  async function handleLogin() {
    if (nome.trim() === '' || chaveAcesso.trim() === '') {
      Alert.alert('Campos vazios', 'Por favor, preencha o nome de usuário e a senha.');
      return;
    }

    setLoading(true);

    try {
      // PASSO 1: Busca o e-mail associado ao username no Firestore
      const userDoc = await firestore().collection('usernames').doc(nome.trim()).get();

      if (!userDoc.exists) {
        setLoading(false);
        Alert.alert('Erro de Acesso', 'Usuário não registrado.');
        return;
      }

      const userData = userDoc.data();
      if (!userData || !userData.email) {
        setLoading(false);
        Alert.alert('Erro no Cadastro', 'Este usuário não possui e-mail vinculado.');
        return;
      }

      const emailRecuperado = userData.email;

      // PASSO 2: Autenticação oficial via Firebase Auth
      await auth().signInWithEmailAndPassword(emailRecuperado, chaveAcesso);

      // PASSO 3: Persistência Local (AsyncStorage)
      setUsername(nome);
      const dadosUsuario = {
        username: nome,
        isAdmin: emailRecuperado === 'admin@acessolivre.com'
      };
      await AsyncStorage.setItem('@acessolivre:user', JSON.stringify(dadosUsuario));

      navigation.reset({
        index: 0,
        routes: [{ name: emailRecuperado === 'admin@acessolivre.com' ? 'Admin' : 'MapPage' }],
      });

    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Verifique suas credenciais e tente novamente.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.pageTitle, { color: theme.colors.onSurface }]}>
        Faça Login e aproveite melhor nosso sistema!
      </Text>

      <View style={[styles.card, { backgroundColor: theme.colors.surfaceContainerLow }]}>

        <Text style={[styles.label, { color: theme.colors.onSurface }]}>Nome de Usuário</Text>
        <TextInput
          style={[styles.input, {
            backgroundColor: theme.colors.surfaceVariant,
            color: theme.colors.onSurface,
            borderColor: theme.colors.outlineVariant
          }]}
          placeholder="Ex: Erlano"
          placeholderTextColor={theme.colors.onSurfaceVariant}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: theme.colors.onSurface }]}>Sua Senha</Text>
        <View style={[styles.passwordContainer, {
          backgroundColor: theme.colors.surfaceVariant,
          borderColor: theme.colors.outlineVariant
        }]}>
          <TextInput
            style={[styles.inputPassword, { color: theme.colors.onSurface }]}
            placeholder="Sua senha"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            secureTextEntry={!mostrarSenha}
            value={chaveAcesso}
            onChangeText={setChaveAcesso}
          />

          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.iconButton}>
            <Ionicons
              name={mostrarSenha ? "eye" : "eye-off"}
              size={22}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: theme.colors.primary }, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.onPrimary} />
          ) : (
            <Text style={[styles.loginButtonText, { color: theme.colors.onPrimary }]}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={() => navigation.navigate('Register')}
      >
        <Text>Não tem uma conta? </Text>
        <Text style={[styles.createAccountText, { color: theme.colors.primary }]}>
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: 30
  },
  card: {
    width: '85%',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16
  },
  iconButton: {
    padding: 10
  },
  loginButton: {
    borderRadius: 100, // Botão pílula M3
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  createAccountContainer: {
    marginTop: 25
  },
  createAccountText: {
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: 'bold'
  },
});