import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AddPlaceForm } from '../../components/AddPlaceForm';

export function AddPlacePage() {
    const { theme, isDark } = useTheme();
    const route = useRoute();
    const { placeData, coordinate } = route.params || {};

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <StatusBar
                backgroundColor={theme.colors.surfaceContainerHighest}
                barStyle={isDark ? "light-content" : "dark-content"}
            />

            <Navbar />

            {/* KeyboardAvoidingView: Ajusta a tela quando o teclado sobe */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <AddPlaceForm
                            initialData={placeData}
                            initialCoordinate={coordinate}
                        />
                    </View>

                    <Footer />
                </ScrollView>
            </KeyboardAvoidingView>
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