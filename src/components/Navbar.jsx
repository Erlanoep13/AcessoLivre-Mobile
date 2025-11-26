import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Sidebar } from './Sidebar'; 

// Garante um valor padrão (24px) caso o Android se perca no cálculo inicial
const STATUSBAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      
      <Sidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      {/* Botão Menu */}
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>AcessoLivre</Text>

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
    backgroundColor: '#166534',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 7,
    paddingTop: STATUSBAR_HEIGHT + 5, 
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  menuButton: {
    padding: 4,
  },
  menuText: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  }
});