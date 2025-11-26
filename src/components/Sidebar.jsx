// Sidebar.jsx

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// 1. IMPORTAR O HOOK DE NAVEGAÇÃO
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export function Sidebar({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  
  // 2. INICIALIZAR A NAVEGAÇÃO
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(-screenWidth);
    }
  }, [visible]);

  // 3. FUNÇÃO AUXILIAR PARA NAVEGAR E FECHAR O MENU
  const handleNavigate = (screenName) => {
    onClose(); // Fecha o menu primeiro para ficar fluido
    navigation.navigate(screenName); // Vai para a tela desejada
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >

          <View style={styles.header}>
            <Text style={styles.title}>AcessoLivre</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Opção: Pesquisar (Vai para o Mapa) */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigate('MapPage')}
          >
            <Feather name="search" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Pesquisar</Text>
          </TouchableOpacity>

          {/* Opção: Favoritos */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigate('Favorites')}
          >
            <Feather name="star" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Favoritos</Text>
          </TouchableOpacity>

          {/* Opção: Login */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigate('Login')}
          >
            <Feather name="user" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Login</Text>
          </TouchableOpacity>

          {/* Opção: Criar Conta */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigate('Register')}
          >
            <Feather name="plus" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Criar Conta</Text>
          </TouchableOpacity>

        </Animated.View>

        <TouchableOpacity
          style={styles.transparentArea}
          onPress={onClose}
          activeOpacity={1}
        />

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: '75%',
    backgroundColor: '#FFF',
    padding: 20,
    height: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transparentArea: {
    width: '25%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  }
});