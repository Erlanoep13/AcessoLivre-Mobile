import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext'; // Importação do contexto
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AddPlaceForm } from '../../components/AddPlaceForm';

export function AddPlacePage() {
    const { theme, isDark } = useTheme(); // Acessando os tokens do M3

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <StatusBar
                backgroundColor={theme.colors.surfaceContainerHighest}
                barStyle={isDark ? "light-content" : "dark-content"}
            />

            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
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
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        paddingVertical: 10,
    }
});