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
import { useNavigation } from '@react-navigation/native';
import { Footer } from '../../components/Footer';

export function RegisterPage() {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [generatedKey, setGeneratedKey] = useState(null); // Estado para guardar a chave gerada

  // Função para Gerar a Chave
  const handleRegister = () => {
    if (name.trim() === '') {
      Alert.alert("Campo Obrigatório", "Por favor, digite seu nome.");
      return;
    }

    // Simulação de geração de chave (No futuro, o Backend fará isso)
    // Gera algo como: AL-8X2A-9B3C
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newKey = `AL-${randomPart}-${randomPart2}`;

    setGeneratedKey(newKey); // Salva a chave e muda a tela visualmente
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login'); // Certifique-se que o nome da rota é 'Login'
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <FontAwesome5 name="id-card" size={40} color="#fff" />
          <Text style={styles.title}>Novo Acesso</Text>
          <Text style={styles.subtitle}>Crie sua credencial única</Text>
        </View>

        {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
        
        {!generatedKey ? (
          // 1. FORMULÁRIO (Mostra se NÃO tiver chave gerada ainda)
          <View style={styles.formCard}>
            <Text style={styles.label}>Como gostaria de ser chamado?</Text>
            
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Seu nome ou apelido"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>GERAR MEU ACESSO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={handleGoToLogin}>
              <Text style={styles.linkText}>Já tenho uma chave</Text>
            </TouchableOpacity>
          </View>

        ) : (
          // 2. RESULTADO (Mostra se a chave JÁ foi gerada)
          <View style={styles.resultCard}>
            <MaterialIcons name="verified" size={50} color="#1e4e28" style={{marginBottom: 10}} />
            <Text style={styles.successTitle}>Cadastro Realizado!</Text>
            <Text style={styles.instruction}>
              Olá, <Text style={{fontWeight:'bold'}}>{name}</Text>! Esta é sua chave de acesso. 
              Anote-a em um lugar seguro, você precisará dela para entrar.
            </Text>

            {/* A CHAVE EM DESTAQUE */}
            <View style={styles.keyBox}>
              <Text style={styles.keyText}>{generatedKey}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
              <Text style={styles.buttonText}>COPIEI, IR PARA LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}

        <Footer />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28',
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
    color: '#a5d6a7',
    marginTop: 5,
  },
  // Estilos do Cartão de Formulário
  formCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    marginBottom: 30,
  },
  // Estilos do Cartão de Resultado (Sucesso)
  resultCard: {
    backgroundColor: '#e8f5e9', // Um verde bem clarinho
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#1e4e28',
    height: 55,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
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
    width: '100%',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Estilos específicos da área da chave
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e4e28',
    marginBottom: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#555',
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  keyBox: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    marginBottom: 25,
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  }
});