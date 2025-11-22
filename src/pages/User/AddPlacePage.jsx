import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AddPlaceForm } from '../../components/AddPlaceForm';

export function AddPlacePage() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1e4e28" barStyle="light-content" />

            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Container centralizado com margem para o formulário */}
                <View style={styles.formArea}>
                    <AddPlaceForm />
                </View>

                <Footer />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e4e28', // Fundo verde escuro
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    formArea: {
        padding: 16, // Margem externa para o card não colar na borda
        width: '100%',
    },
});