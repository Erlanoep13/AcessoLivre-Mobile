import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer'; // Importando seu footer

export function AboutPage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navbar/>
        
        {/* Cabeçalho da Página */}
        <View style={styles.header}>
          <FontAwesome5 name="accessible-icon" size={50} color="#fff" />
          <Text style={styles.headerTitle}>Acesso Livre</Text>
          <Text style={styles.headerSubtitle}>Inclusão em cada esquina</Text>
        </View>

        {/* Card Principal */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Nossa Missão</Text>
          <Text style={styles.text}>
            O <Text style={styles.bold}>Acesso Livre</Text> nasceu da necessidade de mapear a acessibilidade urbana de forma colaborativa.
            {"\n\n"}
            Queremos empoderar pessoas com deficiência, fornecendo informações confiáveis sobre rampas, pisos táteis, banheiros adaptados e muito mais.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Quem somos?</Text>
          <Text style={styles.description}>
            Somos uma equipe de desenvolvedores interessados por tecnologia e impacto social.
          </Text>

          {/* Lista da Equipe */}
          <View style={styles.teamContainer}>
            <TeamMember name="Marcos" role="Dev Frontend" icon="code" />
            <TeamMember name="Erlano" role="Dev Fullstack" icon="layers" />
            <TeamMember name="Rafael" role="Dev Mobile" icon="smartphone" />
          </View>
        </View>

        {/* Versão do App */}
        <Text style={styles.version}>Versão 1.0.0 (Beta)</Text>

        {/* Seu Footer entra aqui no final do scroll */}
        <Footer />

      </ScrollView>
    </View>
  );
}

// Componentezinho interno só para exibir cada membro da equipe
function TeamMember({ name, role, icon }) {
  return (
    <View style={styles.memberRow}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={20} color="#1e4e28" />
      </View>
      <View>
        <Text style={styles.memberName}>{name}</Text>
        <Text style={styles.memberRole}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e4e28', // O Verde da equipe
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a5d6a7', // Um verde mais claro para subtítulo
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    elevation: 5, // Sombra no Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e4e28',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1e4e28',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  teamContainer: {
    gap: 12, // Espaço entre os itens da lista
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
    padding: 10,
    borderRadius: 10,
  },
  iconBox: {
    marginRight: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  memberRole: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  version: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 20,
  },
});