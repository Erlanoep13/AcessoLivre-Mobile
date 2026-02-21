import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AdminChart } from '../../components/AdminChart';
import { AdminQuickActions } from '../../components/AdminQuickActions';

export function AdminPage() {
  const { theme, isDark } = useTheme(); //

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar
        backgroundColor={theme.colors.surfaceContainerHighest}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <Navbar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- MARGEM GLOBAL DE 16PX --- */}
        <View style={styles.globalMarginContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Painel Administrativo</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Resumo estatístico do sistema
            </Text>
          </View>

          <AdminChart />
          <AdminQuickActions />
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  globalMarginContainer: {
    paddingHorizontal: 16, // Sua margem global solicitada
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 20,
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4
  },
});