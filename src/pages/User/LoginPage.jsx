import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { LoginForm } from '../../components/LoginForm';
import { Footer } from '../../components/Footer';

export function LoginPage() {
    const { theme, isDark } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <StatusBar
                backgroundColor={theme.colors.surfaceContainerHighest}
                barStyle={isDark ? "light-content" : "dark-content"}
            />

            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.formArea}>
                    <LoginForm />
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
        justifyContent: 'space-between',
    },
    formArea: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 40,
    }
});