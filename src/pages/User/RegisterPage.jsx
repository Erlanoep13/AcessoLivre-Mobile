import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    StatusBar,
    Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function RegisterPage() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [accessKey, setAccessKey] = useState('');

    const handleGenerateKey = () => {
        // Validação simples
        if (name.trim() === '') {
            Alert.alert("Campo obrigatório", "Por favor, digite seu nome.");
            return;
        }

        // Por enquanto, definimos a chave fixar como "1".
        // Futuramente, isso virá da resposta do seu backend/banco de dados.
        setAccessKey("1");
    };

    const handleCopyAndLogin = () => {
        // Futuramente: Copiar para área de transferência
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {/* StatusBar combinando com o fundo */}
            <StatusBar backgroundColor="#1e4e28" barStyle="light-content" />
            
            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.formArea}>
                    
                    {/* Título da Página (Estilo Login) */}
                    <Text style={styles.pageTitle}>
                        Crie sua conta!
                    </Text>

                    <View style={styles.card}>
                        
                        {!accessKey ? (
                            // --- ESTADO 1: FORMULÁRIO ---
                            <>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Seu nome"
                                    placeholderTextColor="#ccc"
                                    value={name}
                                    onChangeText={setName}
                                />

                                <Text style={styles.helperText}>
                                    Ao clicar em gerar, você receberá sua chave de acesso provisória.
                                </Text>

                                {/* Botão estilo Login (Azul Marinho) */}
                                <TouchableOpacity style={styles.navyButton} onPress={handleGenerateKey}>
                                    <Text style={styles.buttonText}>Gerar Chave</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.linkButton} 
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={styles.linkText}>
                                        Já tem uma conta? <Text style={styles.linkBold}>Faça Login</Text>
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            // --- ESTADO 2: SUCESSO (MOSTRA A CHAVE "1") ---
                            <View style={styles.successContainer}>
                                <MaterialIcons name="check-circle" size={48} color="#1e4e28" />
                                <Text style={styles.successTitle}>Tudo pronto, {name}!</Text>
                                <Text style={styles.instructionText}>
                                    Esta é sua chave de acesso. Você precisará dela para entrar.
                                </Text>

                                {/* Mostra a chave fixa "1" */}
                                <View style={styles.keyDisplay}>
                                    <Text style={styles.keyText}>{accessKey}</Text>
                                </View>

                                {/* Botão estilo Login (Azul Marinho) */}
                                <TouchableOpacity style={styles.navyButton} onPress={handleCopyAndLogin}>
                                    <Text style={styles.buttonText}>Ir para Login</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>
                </View>

                <Footer />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e4e28', // Fundo Verde Escuro
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    formArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Centraliza o card horizontalmente
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    // Título branco fora do card (igual ao print do login)
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        maxWidth: '80%',
        marginBottom: 25,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%', // Ocupa a largura disponível do formArea
        borderRadius: 10,
        padding: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    helperText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    
    // --- BOTÃO ESTILO LOGIN (Azul Marinho) ---
    navyButton: {
        backgroundColor: '#166534', // Cor do botão da sua imagem de login
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
    },
    
    // --- LINKS ---
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

    // --- ÁREA DE SUCESSO ---
    successContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    successTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 5,
    },
    instructionText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    keyDisplay: {
        backgroundColor: '#e8f5e9',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1e4e28',
        borderStyle: 'dashed',
        marginBottom: 25,
    },
    keyText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1e4e28',
    }
});