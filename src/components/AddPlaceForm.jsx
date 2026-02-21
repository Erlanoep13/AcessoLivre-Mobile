import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; //

export function AddPlaceForm({ initialCoordinate, initialData }) {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme(); //

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

    // Efeito para EDIÇÃO
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

    // Efeito para ADIÇÃO (Geocoding Reverso)
    useEffect(() => {
        if (initialCoordinate && !initialData) {
            transformCoordsToAddress(initialCoordinate);
        }
    }, [initialCoordinate, initialData]);

    const transformCoordsToAddress = async (coords) => {
        setLoadingCoords(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Não conseguimos obter o endereço sem acesso à localização.');
                return;
            }

            let addressResponse = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            if (addressResponse.length > 0) {
                const item = addressResponse[0];
                const street = item.street || item.name || '';
                const district = item.district || '';
                const city = item.city || '';
                const number = item.streetNumber || '';

                const fullAddress = `${street}${number ? ', ' + number : ''}${district ? ' - ' + district : ''}${city ? ', ' + city : ''}`;
                setLocalizacao(fullAddress);
            }
        } catch (error) {
            setLocalizacao(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
        } finally {
            setLoadingCoords(false);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria!');
            return;
        }

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
        if (!nome.trim()) camposFaltantes.push("Nome do Local");
        if (!localizacao.trim()) camposFaltantes.push("Localização");
        if (!recursos.trim()) camposFaltantes.push("Recursos de Acessibilidade");

        if (camposFaltantes.length > 0) {
            Alert.alert("Atenção", `Preencha os campos obrigatórios:\n\n• ${camposFaltantes.join("\n• ")}`);
            return;
        }

        const mensagem = initialData
            ? "Pedido de edição enviado com sucesso!"
            : "Pedido de adição enviado para o administrador.";

        Alert.alert("Sucesso", mensagem, [
            { text: "OK", onPress: () => navigation.navigate('MapPage') }
        ]);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.card, { backgroundColor: theme.colors.surfaceContainerLow }]}>

                {/* NOME */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Nome do Local <Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
                    placeholder="Ex: Biblioteca Municipal"
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    value={nome}
                    onChangeText={setNome}
                />

                {/* LOCALIZAÇÃO */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Localização <Text style={styles.required}>*</Text></Text>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={[styles.input, { flex: 1, backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
                        placeholder="Endereço ou coordenadas"
                        placeholderTextColor={theme.colors.onSurfaceVariant}
                        value={localizacao}
                        onChangeText={setLocalizacao}
                    />
                    {loadingCoords && <ActivityIndicator size="small" color={theme.colors.primary} style={styles.loader} />}
                </View>

                {/* TIPO DE MARCAÇÃO (4 BOTÕES SELECIONÁVEIS) */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Tipo de Marcação <Text style={styles.required}>*</Text></Text>
                <View style={styles.chipContainer}>
                    {tiposAcessibilidade.map((item) => (
                        <TouchableOpacity
                            key={item.value}
                            onPress={() => setTipo(item.value)}
                            style={[
                                styles.chip,
                                {
                                    backgroundColor: tipo === item.value ? theme.colors.primaryContainer : theme.colors.surfaceVariant,
                                    borderColor: tipo === item.value ? theme.colors.primary : 'transparent'
                                }
                            ]}
                        >
                            <Text style={[
                                styles.chipText,
                                { color: tipo === item.value ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant }
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* CATEGORIA */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Categoria do Local</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
                    placeholder="Ex: Saúde, Lazer, Educação..."
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    value={categoria}
                    onChangeText={setCategoria}
                />

                {/* RECURSOS */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Recursos Presentes <Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
                    placeholder="Ex: Rampas, Placas em Braille..."
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    value={recursos}
                    onChangeText={setRecursos}
                />

                {/* FOTO */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Adicionar Foto (Opcional)</Text>
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
                            style={[styles.photoPicker, { backgroundColor: theme.colors.surfaceVariant, borderStyle: 'dashed', borderColor: theme.colors.outlineVariant }]}
                            onPress={pickImage}
                        >
                            <Feather name="camera" size={24} color={theme.colors.onSurfaceVariant} />
                            <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 5 }}>Anexar Foto</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* DESCRIÇÃO */}
                <Text style={[styles.label, { color: theme.colors.onSurface }]}>Descrição</Text>
                <TextInput
                    style={[styles.input, styles.textArea, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
                    placeholder="Detalhes adicionais..."
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    multiline
                    numberOfLines={4}
                    value={descricao}
                    onChangeText={setDescricao}
                />

                {/* BOTÃO SALVAR (ESTILO PÍLULA) */}
                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.saveButtonText, { color: theme.colors.onPrimary }]}>
                        {initialData ? "Enviar solicitação de edição" : "Enviar solicitação de adição"}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    card: {
        borderRadius: 24,
        padding: 24,
        width: '100%',
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 15,
    },
    required: {
        color: '#BA1A1A',
    },
    input: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 0,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loader: {
        position: 'absolute',
        right: 15,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 5,
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 100,
        borderWidth: 1,
    },
    chipText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    imageSection: {
        marginTop: 5,
    },
    photoPicker: {
        height: 120,
        borderRadius: 16,
        borderWidth: 1,
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
        borderRadius: 100,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 30,
        elevation: 4,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});