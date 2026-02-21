import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Sidebar } from './Sidebar';
import { useTheme } from '../contexts/ThemeContext'; // Importação do contexto de tema

// Define a altura da StatusBar para evitar sobreposição no Android e iOS
const STATUSBAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useTheme(); // Acessando os tokens de cor do M3

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceContainerHighest }]}>
      {/* Sidebar integrada à Navbar */}
      <Sidebar
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      {/* Botão de Menu Hambúrguer */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={[styles.menuText, { color: theme.colors.onSurface }]}>☰</Text>
      </TouchableOpacity>

      {/* Título Central */}
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>AcessoLivre</Text>

      {/* Logo da aplicação */}
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={require('../../assets/AcessoLivre.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 7,
    paddingTop: STATUSBAR_HEIGHT + 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  menuButton: {
    padding: 4,
  },
  menuText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  }
});