import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { TextInput, Button, Chip, Text } from 'react-native-paper';

export function AddPlaceForm({ initialCoordinate, initialData }) {
    const navigation = useNavigation();
    const { theme } = useTheme();

    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [tipo, setTipo] = useState('Sugestão de melhoria');
    const [categoria, setCategoria] = useState('');
    const [recursos, setRecursos] = useState('');
    const [descricao, setDescricao] = useState('');
    const [image, setImage] = useState(null);
    const [loadingCoords, setLoadingCoords] = useState(false);

    const tiposAcessibilidade = [
        { label: 'Motora', value: 'Motora' },
        { label: 'Visual', value: 'Visual' },
        { label: 'Ambas', value: 'Ambas' },
        { label: 'Sugestão', value: 'Sugestão de melhoria' }
    ];

    const paperInputTheme = {
        colors: {
            background: theme.colors.surfaceVariant,
            primary: theme.colors.primary,
            onSurfaceVariant: theme.colors.onSurfaceVariant,
            onSurface: theme.colors.onSurface,
        }
    };

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome || '');
            setLocalizacao(initialData.localizacao || '');
            setDescricao(initialData.descricao || '');
            setTipo(initialData.tipo || 'Sugestão de melhoria');
            setCategoria(initialData.categoria || '');
            setImage(initialData.image || null);
            setRecursos(initialData.recursos || '');
        }
    }, [initialData]);

    useEffect(() => {
        if (initialCoordinate && !initialData) {
            transformCoordsToAddress(initialCoordinate);
        }
    }, [initialCoordinate, initialData]);

    const transformCoordsToAddress = async (coords) => {
        setLoadingCoords(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            let addressResponse = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            if (addressResponse.length > 0) {
                const item = addressResponse[0];
                const fullAddress = `${item.street || ''}${item.streetNumber ? ', ' + item.streetNumber : ''} - ${item.district || item.subregion || ''}`;
                setLocalizacao(fullAddress);
            }
        } catch (error) {
            setLocalizacao(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`);
        } finally {
            setLoadingCoords(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    function handleSave() {
        const camposFaltantes = [];
        if (!nome.trim()) camposFaltantes.push("Nome");
        if (!localizacao.trim()) camposFaltantes.push("Localização");
        if (!recursos.trim()) camposFaltantes.push("Recursos");

        if (camposFaltantes.length > 0) {
            Alert.alert(
                "Atenção",
                `Os seguintes campos são obrigatórios:\n\n• ${camposFaltantes.join('\n• ')}`
            );
            return;
        }

        const msg = initialData ? "Edição enviada para análise!" : "Novo local enviado para análise!";
        Alert.alert("Sucesso", msg, [{ text: "OK", onPress: () => navigation.navigate('MapPage') }]);
    }

    return (
        <View style={styles.container}>

            <Text style={[styles.softTitle, { color: theme.colors.onSurfaceVariant }]}>
                {initialData ? 'Sugerir Edição para o Local' : 'Sugerir Adição de Local'}
            </Text>

            <View style={[styles.card, { backgroundColor: theme.colors.surfaceContainerLow }]}>

                <TextInput
                    mode="outlined"
                    label="Nome do Local *"
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                    theme={paperInputTheme}
                    outlineColor={theme.colors.outlineVariant}
                    activeOutlineColor={theme.colors.primary}
                />

                <TextInput
                    mode="outlined"
                    label="Localização *"
                    value={localizacao}
                    onChangeText={setLocalizacao}
                    style={styles.input}
                    theme={paperInputTheme}
                    outlineColor={theme.colors.outlineVariant}
                    activeOutlineColor={theme.colors.primary}
                    right={loadingCoords ? <TextInput.Icon icon={() => <ActivityIndicator size="small" color={theme.colors.primary} />} /> : null}
                />

                <Text style={[styles.chipLabel, { color: theme.colors.onSurface }]}>Tipo de Marcação *</Text>
                <View style={styles.chipContainer}>
                    {tiposAcessibilidade.map((item) => (
                        <Chip
                            key={item.value}
                            selected={tipo === item.value}
                            onPress={() => setTipo(item.value)}
                            style={[
                                styles.chip,
                                { backgroundColor: tipo === item.value ? theme.colors.primaryContainer : theme.colors.surfaceVariant }
                            ]}
                            textStyle={{ color: tipo === item.value ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant }}
                        >
                            {item.label}
                        </Chip>
                    ))}
                </View>

                <TextInput
                    mode="outlined"
                    label="Categoria"
                    value={categoria}
                    onChangeText={setCategoria}
                    style={styles.input}
                    theme={paperInputTheme}
                />

                <TextInput
                    mode="outlined"
                    label="Recursos Presentes *"
                    value={recursos}
                    onChangeText={setRecursos}
                    style={styles.input}
                    theme={paperInputTheme}
                    outlineColor={theme.colors.outlineVariant}
                    activeOutlineColor={theme.colors.primary}
                />

                <Text style={[styles.photoLabel, { color: theme.colors.onSurface }]}>Foto do Local</Text>
                <View style={styles.imageSection}>
                    {image ? (
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: image }} style={styles.imagePreview} />
                            <TouchableOpacity style={styles.removeButton} onPress={() => setImage(null)}>
                                <Feather name="trash-2" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[styles.photoPicker, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outlineVariant }]}
                            onPress={pickImage}
                        >
                            <Feather name="camera" size={24} color={theme.colors.onSurfaceVariant} />
                            <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 5, fontWeight: 'bold' }}>Anexar Foto</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <TextInput
                    mode="outlined"
                    label="Descrição"
                    multiline
                    numberOfLines={4}
                    value={descricao}
                    onChangeText={setDescricao}
                    style={styles.input}
                    theme={paperInputTheme}
                />

                <Button
                    mode="contained"
                    onPress={handleSave}
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                    style={styles.saveButton}
                >
                    {initialData ? "Confirmar Edição" : "Salvar Local"}
                </Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 10,
        marginBottom: 20,
    },
    softTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    card: {
        borderRadius: 24,
        padding: 24,
        width: '100%',
        elevation: 2,
    },
    input: {
        marginBottom: 16,
    },
    chipLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 4,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    chip: {
        borderRadius: 8,
    },
    photoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 4,
    },
    imageSection: {
        marginBottom: 20,
    },
    photoPicker: {
        height: 120,
        borderRadius: 12,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewContainer: {
        width: '100%',
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 20,
    },
    saveButton: {
        marginTop: 10,
        borderRadius: 100,
    },
});