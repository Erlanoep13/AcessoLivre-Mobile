import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

import { Navbar } from '../../components/Navbar';
import { SearchBar } from '../../components/SearchBar';
import { Footer } from '../../components/Footer';
import { PlaceList } from '../../components/PlaceList/PlaceList';
import { Map } from '../../components/Map';
import { ExplicaçoesGerais } from '../../components/ExplicaçoesGerais';

export function MapPage() {
  const navigation = useNavigation();
  const { username } = useUser();
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar
        backgroundColor={theme.colors.surfaceContainerHighest}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <Navbar />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* CONTAINER COM MARGEM GLOBAL (16px) */}
        <View style={styles.globalMargin}>

          <View style={styles.spacing}>
            <SearchBar />
          </View>

          {/* MENSAGEM DE BOAS-VINDAS */}
          {username && (
            <View style={styles.welcomeContainer}>
              <Text style={[styles.welcomeText, { color: theme.colors.onSurface }]}>
                Seja bem-vindo(a), <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>{username}!</Text>
              </Text>
            </View>
          )}

          <View style={styles.content}>
            {/* MAPA */}
            <Map />

            {/* BOTÃO ADICIONAR */}
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('AddPlace')}
              >
                <Text style={[styles.addButtonText, { color: theme.colors.onPrimary }]}>+ Adicionar Local</Text>
              </TouchableOpacity>
            </View>

            {/* LISTA DE LOCAIS */}
            <PlaceList onEditPress={(place) => navigation.navigate('AddPlace', { placeData: place })} />
          </View>

        </View>

        {/* FOOTER: Fora da margem global para ocupar largura total */}
        <Footer />
      </ScrollView>

      {/* BOTÃO FLUTUANTE */}
      <View style={styles.floatingButtonContainer}>
        <ExplicaçoesGerais />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  globalMargin: {
    paddingHorizontal: 16,
  },
  spacing: {
    marginTop: 20
  },
  welcomeContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 18
  },
  content: {
    marginBottom: 20
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 5,
    zIndex: 999
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 2
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});