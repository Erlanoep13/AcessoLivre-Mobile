import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function AboutPage() {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar
        backgroundColor={theme.colors.surfaceContainerHighest}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Cabeçalho da Página */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/AcessoLivre.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Acesso Livre</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Inclusão em cada esquina
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surfaceContainerLow }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Nossa Missão</Text>
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            O <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>Acesso Livre</Text> nasceu da necessidade de mapear a acessibilidade urbana de forma colaborativa.
            {"\n\n"}
            Queremos empoderar pessoas com deficiência, fornecendo informações confiáveis sobre rampas, pisos táteis e banheiros adaptados em Boa Viagem e região.
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant, opacity: 0.3 }]} />

          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Quem somos?</Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            Somos uma equipe de desenvolvedores da ADS interessados por tecnologia e impacto social.
          </Text>

          {/* Lista da Equipe utilizando SecondaryContainer para destaque sutil */}
          <View style={styles.teamContainer}>
            <TeamMember name="Marcos" role="Dev Fullstack" icon="code" theme={theme} />
            <TeamMember name="Erlano" role="Dev Fullstack" icon="code" theme={theme} />
            <TeamMember name="Rafael" role="Dev Fullstack" icon="code" theme={theme} />
          </View>
        </View>

        <Text style={[styles.version, { color: theme.colors.onSurfaceVariant }]}>
          Versão 1.0.0 (Beta)
        </Text>

        <Footer />
      </ScrollView>
    </View>
  );
}

// Sub-componente de membro da equipe com estilo M3
function TeamMember({ name, role, icon, theme }) {
  return (
    <View style={[styles.memberRow, { backgroundColor: theme.colors.secondaryContainer }]}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={20} color={theme.colors.onSecondaryContainer} />
      </View>
      <View>
        <Text style={[styles.memberName, { color: theme.colors.onSecondaryContainer }]}>{name}</Text>
        <Text style={[styles.memberRole, { color: theme.colors.onSurfaceVariant }]}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 40
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5
  },
  headerSubtitle: {
    fontSize: 16
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 24, // Bordas suaves conforme padrão de containers M3
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify'
  },
  divider: {
    height: 1,
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    marginBottom: 15
  },
  teamContainer: {
    gap: 12
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16
  },
  iconBox: {
    marginRight: 15
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  memberRole: {
    fontSize: 12
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
    opacity: 0.6
  },
});