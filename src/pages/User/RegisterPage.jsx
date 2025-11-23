import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Footer } from '../../components/Footer';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para os inputs (caso queira conectar com backend depois)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Validação simples apenas visual por enquanto
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }
    Alert.alert("Sucesso", "Lógica de cadastro vai ser feita aqui");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho com Ícone */}
        <View style={styles.header}>
          <FontAwesome5 name="user-plus" size={40} color="#fff" />
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Junte-se à comunidade Acesso Livre</Text>
        </View>

        {/* Formulário (Card Branco) */}
        <View style={styles.formCard}>
          
          {/* Input Nome */}
          <Text style={styles.label}>Nome Completo</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Input Email */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="exemplo@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Input Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Crie uma senha forte"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons 
                name={showPassword ? "visibility" : "visibility-off"} 
                size={22} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Input Confirmar Senha */}
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Repita a senha"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons 
                name={showConfirmPassword ? "visibility" : "visibility-off"} 
                size={22} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Botão de Cadastro */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          {/* Link para Login */}
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>
              Já tem uma conta? <Text style={styles.linkBold}>Faça Login</Text>
            </Text>
          </TouchableOpacity>

        </View>

        <Footer />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28', // Verde do Tema
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#a5d6a7', // Verde claro
    marginTop: 5,
  },
  formCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    elevation: 8, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e4e28', // Botão verde escuro
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkBold: {
    color: '#1e4e28',
    fontWeight: 'bold',
  },
});