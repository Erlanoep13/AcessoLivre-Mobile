import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext'; // Importação do tema global

export function ExplicaçoesGerais() {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme(); // Acessando os tokens de cor do M3

  return (
    <View style={styles.container}>
      {/* --- BOTÃO FLUTUANTE (Bolinha com Interrogação) --- */}
      <TouchableOpacity
        style={[styles.openButton, { backgroundColor: theme.colors.tertiary }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.textButton, { color: theme.colors.onTertiary }]}>
          ?
        </Text>
      </TouchableOpacity>

      {/* --- MODAL INFORMATIVO --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: theme.colors.surface }]}>

            {/* Cabeçalho do Modal */}
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.outlineVariant }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
                Informações de Acessibilidade
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalContent}>

              {/* Seção Deficiência Motora - Cor Vermelha */}
              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#ff0100' }]} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                    Deficiência Motora
                  </Text>
                </View>
                <Text style={[styles.descriptionText, { color: theme.colors.onSurfaceVariant }]}>
                  Locais sinalizados em <Text style={{ fontWeight: 'bold' }}>vermelho</Text> possuem acessibilidade voltada a pessoas com deficiência motora (ex.: rampas, pisos antiderrapantes, corrimãos).
                </Text>
                <Image
                  source={require('../../assets/n_rampas_acessibilidade.jpg')}
                  style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}
                  resizeMode="cover"
                />
              </View>

              {/* Seção Deficiência Visual - Cor Verde */}
              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#69ee0c' }]} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                    Deficiência Visual
                  </Text>
                </View>
                <Text style={[styles.descriptionText, { color: theme.colors.onSurfaceVariant }]}>
                  Locais em <Text style={{ fontWeight: 'bold' }}>verde</Text> possuem recursos para pessoas com deficiência visual (ex.: piso tátil, placas em braille, sinal sonoro).
                </Text>
                <Image
                  source={require('../../assets/piso tátil.png')}
                  style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}
                  resizeMode="cover"
                />
              </View>

              {/* Seção Ambas - Cor Azul */}
              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#3b6bff' }]} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                    Motora e Visual (Ambas)
                  </Text>
                </View>
                <Text style={[styles.descriptionText, { color: theme.colors.onSurfaceVariant }]}>
                  Locais em <Text style={{ fontWeight: 'bold' }}>azul</Text> atendem tanto pessoas com deficiência motora quanto visual simultaneamente.
                </Text>
                <Image
                  source={require('../../assets/visual e motora.jpg')}
                  style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}
                  resizeMode="cover"
                />
              </View>

              {/* Seção Sugestão de Melhoria - Cor Cinza */}
              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#d1cfce' }]} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                    Sugestão de melhoria
                  </Text>
                </View>
                <Text style={[styles.descriptionText, { color: theme.colors.onSurfaceVariant }]}>
                  Locais em <Text style={{ fontWeight: 'bold' }}>cinza</Text> indicam pontos onde a acessibilidade ainda não está presente, mas seria essencial incluir.
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
    position: 'absolute',
    bottom: 30, // Posicionado conforme MapPage
    right: 20,
    zIndex: 999,
  },
  openButton: {
    width: 56, // Tamanho padrão FAB M3
    height: 56,
    borderRadius: 28, // Formato circular
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 24, // Destaque na interrogação
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Overlay mais suave
    padding: 20,
  },
  modalView: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 28, // Cantos mais arredondados M3
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    paddingBottom: 10,
  },
  sectionItem: {
    marginBottom: 30,
  },
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorIndicator: {
    width: 8,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
});