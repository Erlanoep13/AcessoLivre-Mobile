import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar } from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceContainerHighest }]}>
      <Sidebar
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      {/* 2. Substituindo o texto ☰ pelo ícone Material */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <MaterialIcons 
          name="menu" 
          size={28} 
          color={theme.colors.onSurface} 
        />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.colors.onSurface }]}>AcessoLivre</Text>

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
    // Centraliza o ícone caso o botão tenha uma área de toque maior
    justifyContent: 'center',
    alignItems: 'center',
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