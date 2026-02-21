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
import { useTheme } from '../../contexts/ThemeContext'; // Importação do contexto de tema

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function RegisterPage() {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme(); // Acessando os tokens de cor do M3
    const [name, setName] = useState('');
    const [accessKey, setAccessKey] = useState('');

    const handleGenerateKey = () => {
        if (name.trim() === '') {
            Alert.alert("Campo obrigatório", "Por favor, digite seu nome.");
            return;
        }
        // Mock da chave de acesso provisória conforme lógica anterior
        setAccessKey("1");
    };

    const handleCopyAndLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            {/* StatusBar sincronizada com a Navbar (surfaceContainerHighest) */}
            <StatusBar
                backgroundColor={theme.colors.surfaceContainerHighest}
                barStyle={isDark ? "light-content" : "dark-content"}
            />

            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.formArea}>

                    <Text style={[styles.pageTitle, { color: theme.colors.onSurface }]}>
                        Crie sua conta!
                    </Text>

                    {/* Card: surfaceContainerLow (#F1F5EC) para se destacar da surface (#F7FBF2) */}
                    <View style={[styles.card, { backgroundColor: theme.colors.surfaceContainerLow }]}>

                        {!accessKey ? (
                            // --- ESTADO 1: FORMULÁRIO ---
                            <>
                                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Nome</Text>
                                <TextInput
                                    style={[styles.input, {
                                        backgroundColor: theme.colors.surfaceVariant,
                                        color: theme.colors.onSurface,
                                        borderColor: theme.colors.outlineVariant
                                    }]}
                                    placeholder="Seu nome"
                                    placeholderTextColor={theme.colors.onSurfaceVariant}
                                    value={name}
                                    onChangeText={setName}
                                />

                                <Text style={[styles.helperText, { color: theme.colors.onSurfaceVariant }]}>
                                    Ao clicar em gerar, você receberá sua chave de acesso provisória.
                                </Text>

                                <TouchableOpacity
                                    style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                                    onPress={handleGenerateKey}
                                >
                                    <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
                                        Gerar Chave
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.linkButton}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={[styles.linkText, { color: theme.colors.onSurfaceVariant }]}>
                                        Já tem uma conta? <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Faça Login</Text>
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            // --- ESTADO 2: SUCESSO (CHAVE GERADA) ---
                            <View style={styles.successContainer}>
                                <MaterialIcons name="check-circle" size={56} color={theme.colors.primary} />
                                <Text style={[styles.successTitle, { color: theme.colors.onSurface }]}>
                                    Tudo pronto, {name}!
                                </Text>
                                <Text style={[styles.instructionText, { color: theme.colors.onSurfaceVariant }]}>
                                    Esta é sua chave de acesso. Você precisará dela para entrar.
                                </Text>

                                {/* Destaque da Chave: PrimaryContainer conforme M3 */}
                                <View style={[
                                    styles.keyDisplay,
                                    { backgroundColor: theme.colors.primaryContainer, borderColor: theme.colors.primary }
                                ]}>
                                    <Text style={[styles.keyText, { color: theme.colors.onPrimaryContainer }]}>
                                        {accessKey}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                                    onPress={handleCopyAndLogin}
                                >
                                    <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
                                        Ir para Login
                                    </Text>
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
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'space-between' },
    formArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '80%',
        marginBottom: 25
    },
    card: {
        width: '100%',
        borderRadius: 24, // Bordas mais suaves para containers M3
        padding: 24,
        elevation: 2, // Elevação sutil em vez de bordas
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
        marginBottom: 15,
        borderWidth: 1,
    },
    helperText: {
        fontSize: 14,
        marginBottom: 25,
        fontStyle: 'italic',
        lineHeight: 20
    },
    primaryButton: {
        borderRadius: 100, // Formato pílula M3
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        elevation: 2
    },
    buttonText: { fontWeight: 'bold', fontSize: 16 },
    linkButton: { marginTop: 25, alignItems: 'center' },
    linkText: { fontSize: 14 },
    successContainer: { alignItems: 'center', paddingVertical: 10 },
    successTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 8 },
    instructionText: { fontSize: 14, textAlign: 'center', marginBottom: 25, lineHeight: 20 },
    keyDisplay: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        marginBottom: 30
    },
    keyText: { fontSize: 42, fontWeight: 'bold' }
});