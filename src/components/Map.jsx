import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PLACES_DATA } from '../data/places';
import { RemoveModal } from './RemoveModal';
import { useTheme } from '../contexts/ThemeContext';

const INITIAL_REGION = {
    latitude: -5.12056,
    longitude: -39.73139,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
};

const mapDarkStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
    { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
    { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

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

const LEGEND_ITEMS = [
    { color: "#ff0100", label: "Deficiência Motora", icon: "accessible" },
    { color: "#69ee0c", label: "Deficiência Visual", icon: "blind" },
    { color: "#3b6bff", label: "Motora e Visual", icon: "accessibility" },
    { color: "#d1cfce", label: "Sugestões de melhoria", icon: "build" },
];

export function Map() {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme();
    const insets = useSafeAreaInsets(); // Obtendo as margens do sistema

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [tempMarker, setTempMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isCardFavorite, setIsCardFavorite] = useState(false);
    const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);

    const handleSelectMarker = (marker) => {
        setIsCardFavorite(false);
        setSelectedMarker(marker);
    };

    const handleDeletePress = () => setRemoveModalVisible(true);

    const confirmDelete = (motivo) => {
        setRemoveModalVisible(false);
        setSelectedMarker(null);
        Alert.alert("Sucesso", `Pedido de remoção enviado!\nMotivo: ${motivo}`);
    };

    const handleMapPress = (e) => {
        setSelectedMarker(null);
        const coordinate = e.nativeEvent.coordinate;
        setTempMarker({ coordinate: coordinate, title: "Novo Local?" });
    };

    const handleAddPlace = () => {
        const coordinate = tempMarker.coordinate;
        setTempMarker(null);
        navigation.navigate('AddPlace', { coordinate });
    };

    const renderMapView = (isFull) => (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={INITIAL_REGION}
                onPress={handleMapPress}
                customMapStyle={isDark ? mapDarkStyle : []}
            >
                {PLACES_DATA.map((place) => (
                    <Marker
                        key={place.id}
                        coordinate={place.coordinate}
                        image={getMarkerImage(place.tipo)}
                        anchor={{ x: 0.5, y: 1.0 }}
                        onPress={(e) => {
                            e.stopPropagation();
                            setTempMarker(null);
                            handleSelectMarker(place);
                        }}
                    />
                ))}

                {tempMarker && (
                    <Marker
                        coordinate={tempMarker.coordinate}
                        image={TEMP_MARKER_ICON}
                        anchor={{ x: 0.5, y: 1.0 }}
                    />
                )}
            </MapView>

            {selectedMarker && (
                <View style={styles.floatingCardContainer}>
                    <View style={[styles.cardContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
                        <TouchableOpacity
                            style={styles.closeCardButton}
                            onPress={() => setSelectedMarker(null)}
                        >
                            <MaterialIcons name="close" size={24} color={theme.colors.onSurfaceVariant} />
                        </TouchableOpacity>

                        <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>{selectedMarker.nome}</Text>
                        <Text style={[styles.cardAddress, { color: theme.colors.onSurfaceVariant }]}>{selectedMarker.localizacao}</Text>

                        <Text style={[styles.cardResources, { color: theme.colors.onSurface }]}>
                            <Text style={{ fontWeight: 'bold' }}>Recursos: </Text>{selectedMarker.recursos}
                        </Text>

                        <View style={[styles.cardActions, { borderTopColor: theme.colors.outlineVariant }]}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('AddPlace', { placeData: selectedMarker });
                                setSelectedMarker(null);
                            }}>
                                <MaterialIcons name="edit" size={22} color={theme.colors.onSurface} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setIsCardFavorite(!isCardFavorite)}>
                                <MaterialIcons
                                    name={isCardFavorite ? "favorite" : "favorite-border"}
                                    size={22}
                                    color={isCardFavorite ? theme.colors.error : theme.colors.onSurface}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleDeletePress}>
                                <MaterialIcons name="delete-outline" size={22} color={theme.colors.error} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {tempMarker && (
                <View style={styles.floatingCardContainer}>
                    <View style={[styles.addPlaceCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
                        <Text style={[styles.addPlaceTitle, { color: theme.colors.onSurface }]}>Adicionar novo local aqui?</Text>
                        <View style={styles.addPlaceButtons}>
                            <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.colors.error }]} onPress={() => setTempMarker(null)}>
                                <Text style={{ color: theme.colors.onError, fontWeight: 'bold' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.colors.primary }]} onPress={handleAddPlace}>
                                <Text style={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            <TouchableOpacity
                style={[
                    styles.fullscreenButton,
                    {
                        backgroundColor: theme.colors.primary,
                        // Ajuste dinâmico: se houver barra de sistema, sobe o botão
                        bottom: 10 + (isFull ? insets.bottom : 0)
                    }
                ]}
                onPress={() => setIsFullScreen(!isFullScreen)}
            >
                <MaterialIcons name={isFull ? "fullscreen-exit" : "fullscreen"} size={26} color={theme.colors.onPrimary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.wrapper, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
            <View style={styles.container}>{renderMapView(false)}</View>

            <View style={[styles.legendContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text style={[styles.legendTitle, { color: theme.colors.onSurfaceVariant }]}>Suporte a:</Text>
                <View style={styles.legendGrid}>
                    {LEGEND_ITEMS.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <MaterialIcons name={item.icon} size={18} color={item.color} style={styles.legendIcon} />
                            <Text style={[styles.legendText, { color: theme.colors.onSurface }]}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Modal visible={isFullScreen} animationType="slide" onRequestClose={() => setIsFullScreen(false)}>
                <View style={styles.fullscreenContainer}>{renderMapView(true)}</View>
            </Modal>

            <RemoveModal
                visible={isRemoveModalVisible}
                onClose={() => setRemoveModalVisible(false)}
                onConfirm={confirmDelete}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: 15, borderRadius: 8, overflow: 'hidden', elevation: 3, borderWidth: 0.5 },
    container: { height: 410, width: '100%' },
    map: { width: '100%', height: '100%' },
    fullscreenButton: { position: 'absolute', left: 10, padding: 8, borderRadius: 8, elevation: 5 },
    fullscreenContainer: { flex: 1 },
    floatingCardContainer: { position: 'absolute', top: 20, left: 20, right: 20, alignItems: 'center', zIndex: 10 },
    cardContent: { borderRadius: 12, padding: 16, width: '100%', elevation: 5, borderWidth: 0.5 },
    closeCardButton: { position: 'absolute', top: 8, right: 8, zIndex: 1, padding: 5 },
    cardTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 4, paddingRight: 24 },
    cardAddress: { fontSize: 12, marginBottom: 8 },
    cardResources: { fontSize: 14, marginBottom: 16 },
    cardActions: { flexDirection: 'row', justifyContent: 'flex-start', gap: 25, borderTopWidth: 1, paddingTop: 12 },
    addPlaceCard: { borderWidth: 0.5, borderRadius: 12, padding: 20, width: '90%', alignItems: 'center', elevation: 5 },
    addPlaceTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
    addPlaceButtons: { flexDirection: 'row', gap: 20, width: '100%', justifyContent: 'center' },
    addBtn: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
    legendContainer: { padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)' },
    legendTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
    legendGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 6 },
    legendIcon: { marginRight: 6 },
    legendText: { fontSize: 13, fontWeight: '500' },
});