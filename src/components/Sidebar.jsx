import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext'; 

const screenWidth = Dimensions.get('window').width;

export function Sidebar({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const navigation = useNavigation();
  const { username, setUsername } = useUser(); 

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    } else {
      slideAnim.setValue(-screenWidth);
    }
  }, [visible]);

  const navigateTo = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    setUsername(null);
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
          
          <View style={styles.header}>
            <Text style={styles.title}>AcessoLivre</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('MapPage')}>
            <Feather name="search" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Pesquisar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Favorites')}>
            <Feather name="star" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Favoritos</Text>
          </TouchableOpacity>

          {/* REMOVI A DIVISÓRIA QUE ESTAVA AQUI */}

          {username ? (
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Feather name="log-out" size={20} color="#DC2626" style={styles.icon} />
              <Text style={[styles.menuText, { color: '#DC2626', fontWeight: 'bold' }]}>
                Sair ({username})
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Login')}>
              <Feather name="user" size={20} color="#333" style={styles.icon} />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
          )}

          {/* AGORA O BOTÃO "CRIAR CONTA" APARECE SEMPRE */}
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Register')}>
            <Feather name="plus" size={20} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>Criar Conta</Text>
          </TouchableOpacity>

        </Animated.View>
        <TouchableOpacity style={styles.transparentArea} onPress={onClose} activeOpacity={1} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  menuContainer: { width: '75%', backgroundColor: '#FFF', padding: 20, height: '100%', elevation: 5 },
  transparentArea: { width: '25%', height: '100%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#166534' },
  divider: { height: 1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  icon: { marginRight: 15 },
  menuText: { fontSize: 16, color: '#333' }
});