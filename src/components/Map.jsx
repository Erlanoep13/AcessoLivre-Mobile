import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

// Coordenadas de Boa Viagem - CE
const INITIAL_REGION = {
    latitude: -5.12056,
    longitude: -39.73139,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
};

// Dados da Legenda
const LEGEND_ITEMS = [
    { color: "#d32f2f", label: "Deficiência Motora" },
    { color: "#3bb041ff", label: "Deficiência Visual" },
    { color: "#1976d2", label: "Visual e Motora" },
    { color: "#9d9d9dff", label: "Sugestão de melhoria" },
];

// Mock de locais para os marcadores (Pins no mapa)
const MAP_MARKERS = [
    {
        id: 1,
        title: "Praça da Matriz",
        description: "Acessibilidade Motora",
        coordinate: { latitude: -5.126254, longitude: -39.729998 },
        color: "#d32f2f"
    },
    {
        id: 2,
        title: "IFCE - Campus Boa Viagem",
        description: "Rampas e Banheiros Adaptados",
        coordinate: { latitude: -5.082886, longitude: -39.706610 },
        color: "#2e7d32"
    }
];

export function Map() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={INITIAL_REGION}
            // showsUserLocation={true} // Para mostrar a localização do usuário, pode ser implementado futuramente
            >
                {MAP_MARKERS.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        pinColor={marker.color}
                    >
                        {/* Callout é o balãozinho que abre ao clicar no marcador */}
                        <Callout>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutTitle}>{marker.title}</Text>
                                <Text style={styles.calloutDescription}>{marker.description}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.legendContainer}>
                <Text style={styles.legendTitle}>Legenda:</Text>
                <View style={styles.legendGrid}>
                    {LEGEND_ITEMS.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
    },
    map: {
        width: '100%',
        height: 400,
    },
    calloutContainer: {
        width: 160,
        padding: 5,
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    calloutDescription: {
        fontSize: 12,
        color: '#666',
    },
    legendContainer: {
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    legendTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    legendGrid: {
        flexDirection: 'column',
        gap: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
        marginBottom: 4,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#333',
    }
});