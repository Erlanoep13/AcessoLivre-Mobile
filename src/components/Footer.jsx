import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Hook para área segura
import { useTheme } from '../contexts/ThemeContext';

export function Footer() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets(); // Obtendo as margens do sistema

  const openInstagram = () => {
    Linking.openURL('https://instagram.com/acessolivreads');
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.surfaceVariant,
        // Soma o padding padrão com a margem do sistema (se existir)
        paddingBottom: 30 + insets.bottom
      }
    ]}>
      <View style={styles.content}>

        <Text style={[styles.title, { color: theme.colors.onSurface }]}>Acesso Livre</Text>
        <Text style={[styles.text, { color: theme.colors.onSurfaceVariant }]}>
          Promovendo acessibilidade para todos.
        </Text>

        {/* Link do Instagram */}
        <TouchableOpacity style={styles.link} onPress={openInstagram}>
          <MaterialCommunityIcons
            name="instagram"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={[styles.linkText, { color: theme.colors.primary }]}>@acessolivreads</Text>
        </TouchableOpacity>

        <Button
          mode="outlined"
          icon="information-outline"
          onPress={() => navigation.navigate('AboutPage')}
          textColor={theme.colors.primary}
          style={[styles.aboutButton, { borderColor: theme.colors.outlineVariant }]}
        >
          Conheça o projeto (Sobre Nós)
        </Button>

        <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant, opacity: 0.3 }]} />

        <Text style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}>
          © {new Date().getFullYear()} Acesso Livre. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  aboutButton: {
    marginBottom: 20,
    borderRadius: 100,
  },
  divider: {
    height: 1,
    width: '80%',
    marginBottom: 15,
  },
  copyright: {
    fontSize: 11,
    textAlign: 'center',
  },
});