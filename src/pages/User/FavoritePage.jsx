import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { FavoriteCard } from '../../components/FavoriteCard';

export function FavoritePage() {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* StatusBar sincronizada com a Navbar (surfaceContainerHighest) */}
      <StatusBar
        backgroundColor={theme.colors.surfaceContainerHighest}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <Navbar />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
          {/* Título da Página */}
          <Text style={[styles.pageTitle, { color: theme.colors.onSurface }]}>
            Meus Favoritos
          </Text>
          <Text style={[styles.pageSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Seus locais salvos aparecem aqui para acesso rápido.
          </Text>

          {/* Lista de Cards de Favoritos */}
          <FavoriteCard />
        </View>

        <Footer />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    minHeight: 450,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    marginBottom: 24,
  }
});