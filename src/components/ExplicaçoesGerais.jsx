// ExplicaçõesGerais.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function ExplicaçoesGerais() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* --- O BOTÃO QUE FICA NA TELA --- */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textButton}>Explicações Gerais</Text>
      </TouchableOpacity>

      {/* --- O POP-UP (MODAL) --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* Cabeçalho do Modal com botão de fechar */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Informações de Acessibilidade</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>

              {/* --- Seção Deficiência Motora (Vermelho) --- */}
              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#d32f2f' }]} />
                  <Text style={styles.sectionTitle}>Deficiência Motora</Text>
                </View>
                <Text style={styles.descriptionText}>
                  Locais sinalizados em <Text style={{ fontWeight: 'bold' }}>vermelho</Text> possuem acessibilidade voltada a pessoas com deficiência motora (ex.: rampas, pisos antiderrapantes, corrimãos).
                </Text>


                <Image
                  source={require ('../../assets/n_rampas_acessibilidade.jpg' )}
                  style={styles.imagePlaceholder}
                  resizeMode="cover"
                />
              </View>


              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#2e7d32' }]} />
                  <Text style={styles.sectionTitle}>Deficiência Visual</Text>
                </View>
                <Text style={styles.descriptionText}>
                  Locais em <Text style={{ fontWeight: 'bold' }}>verde</Text> possuem recursos para pessoas com deficiência visual (ex.: piso tátil, placas em braille, sinal sonoro).
                </Text>


                <Image
                  source={require('../../assets/piso tátil.png')}
                  style={styles.imagePlaceholder}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: 'blue' }]} />
                  <Text style={styles.sectionTitle}>Deficiência Motora e Visual(ambas)</Text>
                </View>
                <Text style={styles.descriptionText}>
                  Locais em <Text style={{ fontWeight: 'bold' }}>azul</Text> estão os locais que atendem tanto pessoas com deficiência motora quanto visual.
                </Text>


                <Image
                  source={require('../../assets/visual e motora.jpg' )}
                  style={styles.imagePlaceholder}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: 'grey' }]} />
                  <Text style={styles.sectionTitle}>Sugestão de melhoria</Text>
                </View>
                <Text style={styles.descriptionText}>
                  Locais em <Text style={{ fontWeight: 'bold' }}>cinza</Text> Locais onde a acessibilidade ainda não está presente, mas seria essencial incluir.
                </Text>
              </View>

            </ScrollView>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // 
    position: 'absolute', // Tira o botão do fluxo normal e faz ele flutuar  // Distância do topo (ajuste conforme a altura da sua Navbar)
    bottom: 100,
    right: 30,
    zIndex: 99,
    alignSelf: 'center',
  },
  openButton: {
    backgroundColor: '#2962ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5, // Sombra mais forte para parecer que está flutuando
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Estilos do Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro transparente
    padding: 20,
  },
  modalView: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e4e28', // Verde do tema
  },
  modalContent: {
    paddingBottom: 20,
  },
  sectionItem: {
    marginBottom: 25,
  },
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 24, // Faz aquele formato de "pílula" vertical pequena
    borderRadius: 4,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});