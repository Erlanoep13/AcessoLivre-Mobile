import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AddPlaceForm } from '../../components/AddPlaceForm';

export function AddPlacePage({ route }) {

    const { coordinate, placeData } = route.params || {};

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1e4e28" barStyle="light-content" />

            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.formArea}>
                    {/* Passamos a coordenada e os dados do local para o formulário */}
                    <AddPlaceForm
                        initialCoordinate={coordinate}
                        initialData={placeData}
                    />
                </View>

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
        padding: 16, // Margem externa para o card não colar na borda
        width: '100%',
    },
});