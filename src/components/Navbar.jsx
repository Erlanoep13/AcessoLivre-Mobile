//Navbar.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Sidebar } from './Sidebar'; // Importando o arquivo que criamos acima

export function Navbar() {
  // Estado para controlar se o menu está visível ou não
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>

      {/* Componente do Menu Lateral (Fica escondido até menuVisible ser true) */}
      <Sidebar
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      {/* Botão Menu (Hambúrguer) */}
      {/* Ao clicar, mudamos o estado para true */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>AcessoLivre</Text>

      {/* Logo Imagem */}
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
    paddingBottom: 10,
    paddingTop: 5,
    elevation: 4,
  },
  menuButton: {
    padding: 4,
  },
  menuText: {
    fontSize: 28, // Aumentei um pouco para ficar mais fácil de clicar
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