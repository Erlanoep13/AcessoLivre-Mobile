import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
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
  const { theme } = useTheme();

  async function handleLogin() {
    if (nome.trim() === '' || chaveAcesso.trim() === '') {
      Alert.alert('Campos vazios', 'Por favor, preencha o nome de usuário e a senha.');
      return;
    }

    setLoading(true);

    try {
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

      await auth().signInWithEmailAndPassword(emailRecuperado, chaveAcesso);

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

        {/* 2. Input de Usuário da Paper */}
        <TextInput
          mode="outlined"
          label="Nome de Usuário"
          placeholder="Ex: Erlano"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="none"
          textColor={theme.colors.onSurface}
          outlineColor={theme.colors.outlineVariant}
          activeOutlineColor={theme.colors.primary}
          style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
        />

        {/* 3. Input de Senha da Paper (com ícone embutido) */}
        <TextInput
          mode="outlined"
          label="Sua Senha"
          placeholder="Sua senha"
          secureTextEntry={!mostrarSenha}
          value={chaveAcesso}
          onChangeText={setChaveAcesso}
          textColor={theme.colors.onSurface}
          outlineColor={theme.colors.outlineVariant}
          activeOutlineColor={theme.colors.primary}
          style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, marginBottom: 30 }]}
          right={
            <TextInput.Icon 
              icon={mostrarSenha ? "eye-off" : "eye"} 
              onPress={() => setMostrarSenha(!mostrarSenha)} 
              color={theme.colors.onSurfaceVariant}
            />
          }
        />

        {/* 4. Botão de Login da Paper (já gerencia o loading) */}
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.loginButton}
          contentStyle={{ paddingVertical: 6 }}
        >
          Entrar
        </Button>
      </View>

      {/* 5. Botão de Criar Conta */}
      <Button
        mode="text"
        textColor={theme.colors.primary}
        onPress={() => navigation.navigate('Register')}
        style={styles.createAccountContainer}
      >
        Não tem uma conta? Criar conta
      </Button>
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
  input: {
    marginBottom: 15,
  },
  loginButton: {
    borderRadius: 100, // Padrão de pílula
    marginTop: 10,
  },
  createAccountContainer: {
    marginTop: 25
  },
});