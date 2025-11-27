import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PLACES_DATA } from '../data/places';

const INITIAL_REGION = {
    latitude: -5.12056,
    longitude: -39.73139,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
};

const MARKER_ICONS = {
    'Motora': require('../../assets/markers/IconeMotora.png'),
    'Visual': require('../../assets/markers/IconeVisual.png'),
    'Motora e Visual': require('../../assets/markers/IconeAmbas.png'),
    'Sugestão de melhoria': require('../../assets/markers/IconeFalta.png'),
    'default': require('../../assets/markers/IconeFalta.png')
};

const TEMP_MARKER_ICON = require('../../assets/markers/IconeTemp.png');

const getMarkerImage = (tipo) => {
    return MARKER_ICONS[tipo] || MARKER_ICONS['default'];
};

// Legenda dinâmica baseada nas nossas constantes de cor
const LEGEND_ITEMS = [
    { color: "#ff0100", label: "Deficiência Motora" },
    { color: "#69ee0c", label: "Deficiência Visual" },
    { color: "#3b6bff", label: "Motora e Visual" },
    { color: "#d1cfce", label: "Nenhuma das opções" },
];

export function Map() {
    const navigation = useNavigation();

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [tempMarker, setTempMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isCardFavorite, setIsCardFavorite] = useState(false);

    const handleSelectMarker = (marker) => {
        setIsCardFavorite(false);
        setSelectedMarker(marker);
    };

    // Função de Deletar
    const handleDelete = () => {
        Alert.alert(
            "Remover Local",
            "Tem certeza que deseja remover este local?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim, remover",
                    onPress: () => {
                        Alert.alert("Sucesso", "Pedido de remoção do local enviado para o administrador.");
                        setSelectedMarker(null); // Fecha o card após "deletar"
                    }
                }
            ]
        );
    };

    const handleMapPress = (e) => {
        // Fecha card de local existente se estiver aberto
        setSelectedMarker(null);

        // Pega as coordenadas do clique
        const coordinate = e.nativeEvent.coordinate;

        // Define o marcador temporário
        setTempMarker({
            coordinate: coordinate,
            title: "Novo Local?"
        });
    };

    const handleAddPlace = () => {
        const coordinate = tempMarker.coordinate;

        // Fecha o marcador temporário visualmente
        setTempMarker(null);

        // Navega enviando a coordenada como parâmetro
        navigation.navigate('AddPlace', { coordinate });
    };

    const renderMapView = (isFull) => (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={INITIAL_REGION}
                onPress={handleMapPress}
            >
                {PLACES_DATA.map((place) => (
                    <Marker
                        key={place.id}
                        coordinate={place.coordinate}

                        image={getMarkerImage(place.tipo)}

                        // Android: x=0.5 (meio horizontal), y=1.0 (base inferior)
                        anchor={{ x: 0.5, y: 1.0 }}
                        // iOS: Desloca o centro para cima (metade da altura da imagem, aprox -20px)
                        centerOffset={{ x: 0, y: -20 }}

                        onPress={(e) => {
                            e.stopPropagation();
                            setTempMarker(null);
                            handleSelectMarker(place);
                        }}
                    >

                    </Marker>
                ))}

                {/* Marcador Temporário */}
                {tempMarker && (
                    <Marker
                        coordinate={tempMarker.coordinate}
                        image={TEMP_MARKER_ICON} // Use a imagem importada
                        anchor={{ x: 0.5, y: 1.0 }}
                        centerOffset={{ x: 0, y: -20 }}
                    />
                )}
            </MapView>

            {/* --- CARD FLUTUANTE --- */}
            {selectedMarker && (
                <View style={styles.floatingCardContainer}>
                    <View style={styles.cardContent}>

                        {/* Botão fechar card (X) */}
                        <TouchableOpacity
                            style={styles.closeCardButton}
                            onPress={() => setSelectedMarker(null)}
                        >
                            <Feather name="x" size={20} color="#666" />
                        </TouchableOpacity>

                        <Text style={styles.cardTitle}>{selectedMarker.nome}</Text>
                        <Text style={styles.cardAddress}>{selectedMarker.localizacao}</Text>
                        <Text style={styles.cardResources}>
                            <Text style={{ fontWeight: 'bold' }}>Recursos: </Text>
                            {selectedMarker.recursos}
                        </Text>
                        <Text style={styles.cardDescription}>
                            <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>
                            {selectedMarker.descricao}
                        </Text>

                        <View style={styles.cardActions}>
                            {/* Botão Editar */}
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => {
                                    // Navega enviando os dados do marcador selecionado
                                    navigation.navigate('AddPlace', { placeData: selectedMarker });
                                    setSelectedMarker(null); // Fecha o card
                                }}
                            >
                                <Feather name="edit-2" size={20} color="#333" />
                            </TouchableOpacity>

                            {/* Botão Favoritar */}
                            <TouchableOpacity style={styles.actionBtn} onPress={() => setIsCardFavorite(!isCardFavorite)}>
                                <Feather
                                    name="heart"
                                    size={20}
                                    color={isCardFavorite ? "#d32f2f" : "#333"}
                                    fill={isCardFavorite ? "#d32f2f" : "transparent"}
                                />
                            </TouchableOpacity>

                            {/* Botão Deletar */}
                            <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
                                <Feather name="trash-2" size={20} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {tempMarker && (
                <View style={styles.floatingCardContainer}>
                    <View style={styles.addPlaceCard}>
                        <Text style={styles.addPlaceTitle}>Adicionar novo local aqui?</Text>

                        <View style={styles.addPlaceButtons}>
                            {/* Botão Cancelar */}
                            <TouchableOpacity
                                style={[styles.addBtn, styles.cancelBtn]}
                                onPress={() => setTempMarker(null)}
                            >
                                <Text style={styles.cancelBtnText}>Cancelar</Text>
                            </TouchableOpacity>

                            {/* Botão Sim */}
                            <TouchableOpacity
                                style={[styles.addBtn, styles.confirmBtn]}
                                onPress={handleAddPlace}
                            >
                                <Text style={styles.confirmBtnText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {/* Botão de tela cheia */}
            <TouchableOpacity
                style={styles.fullscreenButton}
                onPress={() => setIsFullScreen(true)}
            >
                <Feather name={isFull ? "minimize" : "maximize"} size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.wrapper}>

            {/* MODO EMBUTIDO */}
            <View style={styles.container}>
                {renderMapView(false)}
            </View>

            {/* Legenda */}
            <View style={styles.legendContainer}>
                <Text style={styles.legendTitle}>Suporte a:</Text>
                <View style={styles.legendGrid}>
                    {LEGEND_ITEMS.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* MODAL TELA CHEIA */}
            <Modal
                visible={isFullScreen}
                animationType="slide"
                onRequestClose={() => setIsFullScreen(false)}
            >
                <View style={styles.fullscreenContainer}>
                    {renderMapView(true)}

                    {/* Botão fechar modal específico */}
                    <TouchableOpacity
                        style={[styles.fullscreenButton, styles.closeModalButton]}
                        onPress={() => setIsFullScreen(false)}
                    >
                        <Feather name="minimize" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    container: {
        height: 410,
        width: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    fullscreenButton: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: '#166534',
        padding: 10,
        borderRadius: 4,
        elevation: 5,
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    closeButton: {
        backgroundColor: '#d32f2f',
        bottom: 40,
    },

    // --- ESTILOS DO CARD FLUTUANTE ---
    floatingCardContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
        zIndex: 10,
    },
    cardContent: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 16,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeCardButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        padding: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
        color: '#000',
        paddingRight: 20,
    },
    cardAddress: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#333',
        marginBottom: 12,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 25,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    actionBtn: {
        padding: 5,
    },

    // ---- CARD DE ADIÇÂO ----
    addPlaceCard: {
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: 300,
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addPlaceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    addPlaceButtons: {
        flexDirection: 'row',
        gap: 40,
    },
    addBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmBtn: {
        backgroundColor: '#22c55e',
    },
    cancelBtn: {
        backgroundColor: '#ff3300ff',
    },
    confirmBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelBtnText: {
        color: '#fff6f6ff',
        fontWeight: 'bold',
    },

    // --- LEGENDA ---
    legendContainer: {
        backgroundColor: '#e7ffefff',
        padding: 12,
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
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },

    // Marcador
    markerImage: {
        width: 35,
        height: 35,
    },
});