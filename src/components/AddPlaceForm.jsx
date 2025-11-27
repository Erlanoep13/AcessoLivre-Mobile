import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export function AddPlaceForm({ initialCoordinate, initialData }) {
    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [tipo, setTipo] = useState('Sugestão de melhoria');
    const [categoria, setCategoria] = useState('');
    const [recursos, setRecursos] = useState('');
    const [descricao, setDescricao] = useState('');
    const [image, setImage] = useState(null);


    // Efeito para preencher dados na EDIÇÃO
    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome);
            setLocalizacao(initialData.localizacao);
            setDescricao(initialData.descricao || '');
            setTipo(initialData.tipo || 'Sugestão de melhoria');
            setCategoria(initialData.categoria);
            setImage(initialData.image);
            setRecursos(initialData.recursos);
        }
    }, [initialData]);

    // Efeito para preencher endereço na ADIÇÃO (Geocoding)
    useEffect(() => {
        // Só roda se NÃO for edição (prioriza os dados existentes)
        if (initialCoordinate && !initialData) {
            transformCoordsToAddress(initialCoordinate);
        }
    }, [initialCoordinate, initialData]);

    const transformCoordsToAddress = async (coords) => {
        try {
            // Pede permissão de localização (Necessário para usar o serviço de geocoding no Android)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Não conseguimos converter as coordenadas em endereço sem permissão de localização.');
                return;
            }

            // Faz a conversão reversa
            let addressResponse = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            // O retorno é um array
            if (addressResponse.length > 0) {
                const item = addressResponse[0];
                const street = item.street || item.name || '';
                const district = item.district || item.subregion || '';
                const city = item.city || item.region || '';
                const number = item.streetNumber || '';

                const fullAddress = `${street}${number ? ', ' + number : ''}${district ? ' - ' + district : ''}${city ? ', ' + city : ''}`;

                setLocalizacao(fullAddress);
            }
        } catch (error) {
            console.log("Erro no geocoding:", error);
            // Se der erro, pelo menos preenchemos com as coordenadas cruas pro usuário saber
            setLocalizacao(`${coords.latitude}, ${coords.longitude}`);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria!');
            return;
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log("Erro detalhado:", error);
            Alert.alert("Erro", "Falha ao abrir galeria.");
        }
    };

    function handleSave() {
        const camposFaltantes = [];

        if (!nome.trim()) camposFaltantes.push("Nome do Local");
        if (!localizacao.trim()) camposFaltantes.push("Localização");
        if (!recursos.trim()) camposFaltantes.push("Recursos de Acessibilidade");
        if (!tipo) camposFaltantes.push("Tipo de Acessibilidade");

        // Se houver algum item na lista, mostra o erro específico
        if (camposFaltantes.length > 0) {
            Alert.alert(
                "Atenção",
                `Por favor, preencha os seguintes campos:\n\n• ${camposFaltantes.join("\n• ")}`
            );
            return;
        }

        Alert.alert("Sucesso", "Dados prontos para envio!");
    }

    return (
        <View style={styles.card}>

            <Text style={styles.label}>Nome do Local: <Text style={styles.required}>*</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Escola..."
                placeholderTextColor="#ccc"
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Localização: <Text style={styles.required}>*</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Centro, Rua 26 de Junho, 128"
                placeholderTextColor="#ccc"
                value={localizacao}
                onChangeText={setLocalizacao}
            />

            <Text style={styles.label}>Tipo de Acessibilidade: <Text style={styles.required}>*</Text></Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Motora" value="Motora" />
                    <Picker.Item label="Visual" value="Visual" />
                    <Picker.Item label="Motora e Visual" value="Motora e Visual" />
                    <Picker.Item label="Sugestão de melhoria" value="Sugestão de melhoria" />
                </Picker>
            </View>

            <Text style={styles.label}>Categoria do Local:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Educação, Saúde..."
                placeholderTextColor="#ccc"
                value={categoria}
                onChangeText={setCategoria}
            />

            <Text style={styles.label}>Recursos de Acessibilidade Presentes: <Text style={styles.required}>*</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Rampas, Braille..."
                placeholderTextColor="#ccc"
                value={recursos}
                onChangeText={setRecursos}
            />

            <Text style={styles.label}>Adicionar Foto (Opcional)</Text>

            <View style={styles.imageSection}>
                {image ? (
                    <View style={styles.previewContainer}>

                        {/* Wrapper para posicionar o botão X absoluto sobre a imagem */}
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: image }} style={styles.imagePreview} />

                            {/* --- BOTÃO DE REMOVER FOTO --- */}
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => setImage(null)}
                            >
                                <Feather name="x" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
                            <Text style={styles.changePhotoText}>Trocar foto</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.fileInputContainer}>
                        <Text style={styles.filePlaceholder} numberOfLines={1} ellipsizeMode="tail">
                            Nenhum ficheiro selecionado
                        </Text>
                        <TouchableOpacity style={styles.attachButton} onPress={pickImage}>
                            <Feather name="camera" size={16} color="#333" style={{ marginRight: 5 }} />
                            <Text style={styles.attachButtonText}>Anexar Foto</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="..."
                placeholderTextColor="#ccc"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={descricao}
                onChangeText={setDescricao}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Local</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 6,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        height: 50,
        color: '#333',
    },
    textArea: {
        height: 100,
    },
    imageSection: {
        marginBottom: 10,
    },
    fileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
        borderRadius: 6,
        padding: 10,
    },
    filePlaceholder: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        marginRight: 10
    },
    attachButton: {
        flexDirection: 'row',
        backgroundColor: '#e2e8f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignItems: 'center',
        flexShrink: 0,
    },
    attachButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    previewContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        padding: 6,
        zIndex: 1,
    },
    changePhotoButton: {
        backgroundColor: '#e2e8f0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    changePhotoText: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#22c55e',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    required: {
        color: '#d32f2fb9',
        fontWeight: 'bold',
    },
});