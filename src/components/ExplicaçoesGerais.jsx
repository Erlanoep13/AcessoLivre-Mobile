import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
// 1. Importando o FAB (Floating Action Button) e IconButton do Paper
import { FAB, IconButton } from 'react-native-paper';

export function ExplicaçoesGerais() {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* --- BOTÃO FLUTUANTE OFICIAL (FAB do Material 3) --- */}
      <FAB
        icon="help"
        style={[styles.fab, { backgroundColor: theme.colors.tertiary }]}
        color={theme.colors.onTertiary}
        onPress={() => setModalVisible(true)}
        mode="elevated"
      />

      {/* --- MODAL INFORMATIVO --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: theme.colors.surface }]}>

            {/* Cabeçalho do Modal com IconButton M3 */}
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.outlineVariant }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
                Informações de Acessibilidade
              </Text>
              <IconButton
                icon="close"
                size={24}
                iconColor={theme.colors.onSurface}
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalContent}>

              {/* Seção Deficiência Motora - Cor Vermelha */}
              <View style={styles.sectionItem}>
                <View style={styles.rowTitle}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#ff0100' }]} />
                  <MaterialIcons name="accessible" size={24} color="#ff0100" style={styles.sectionIcon} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                    Deficiência Motora
                  </Text>
                </View>
                <Text style={[styles.descriptionText, { color: theme.colors.onSurfaceVariant }]}>
                  Locais sinalizados em <Text style={{ fontWeight: 'bold' }}>vermelho</Text> possuem acessibilidade voltada a pessoas com deficiência motora (ex.: rampas, pisos antiderrapantes, corrimãos).
                </Text>
                {/* Nota: Mantenha os seus require locais no seu VS Code! */}
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
                  <MaterialIcons name="blind" size={24} color="#69ee0c" style={styles.sectionIcon} />
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
                  <MaterialIcons name="accessibility" size={24} color="#3b6bff" style={styles.sectionIcon} />
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
                  <MaterialIcons name="build" size={24} color="#d1cfce" style={styles.sectionIcon} />
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
    bottom: 30,
    right: 20,
    zIndex: 999,
  },
  fab: {
    // O FAB do Paper já cuida do tamanho e sombra. 
    // Só precisamos arredondar totalmente (estilo pílula circular).
    borderRadius: 28,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalView: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 28,
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
    paddingBottom: 4, // Ajustado para compensar a margem natural do IconButton
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Ajuda a empurrar o botão de fechar para a direita
  },
  closeButton: {
    margin: 0, // Remove margens extras do botão de fechar
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
    marginRight: 10,
  },
  sectionIcon: {
    marginRight: 8, // Espaço entre o ícone e o texto
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