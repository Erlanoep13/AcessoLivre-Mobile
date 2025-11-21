import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Navbar } from '../../components/Navbar';
import { LoginForm } from '../../components/LoginForm';
import { Footer } from '../../components/Footer';

export function LoginPage() {
    return (
        <View style={styles.container}>
            {/* StatusBar customizada para combinar com o header */}
            <StatusBar backgroundColor="#166534" barStyle="light-content" />

            {/* Navbar fixa no topo */}
            <Navbar />

            {/* Conteúdo Rolável (Formulário + Footer) */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Área centralizada do formulário */}
                <View style={styles.formArea}>
                    <LoginForm />
                </View>

                {/* 3. Footer no final do scroll */}
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
        justifyContent: 'space-between',
    },
    formArea: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 40,
    }
});