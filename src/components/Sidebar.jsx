import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Switch
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';

const screenWidth = Dimensions.get('window').width;

export function Sidebar({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const navigation = useNavigation();
  const { username, signOut } = useUser();
  const { theme, isDark, toggleTheme } = useTheme();

  const isAdmin = username && username.toLowerCase() === 'admin';

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [visible]);

  const navigateTo = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[
          styles.menuContainer,
          { transform: [{ translateX: slideAnim }], backgroundColor: theme.colors.surface }
        ]}>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>AcessoLivre</Text>
            <TouchableOpacity onPress={onClose}>
              {/* Ícone de fechar do Material */}
              <MaterialIcons name="close" size={28} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Seletor de Tema */}
            <View style={styles.themeToggle}>
              <View style={styles.row}>
                {/* Ícones de Sol/Lua do Material */}
                <MaterialIcons 
                  name={isDark ? "brightness-2" : "wb-sunny"} 
                  size={22} 
                  color={theme.colors.onSurface} 
                />
                <Text style={[styles.menuText, { color: theme.colors.onSurface, marginLeft: 15 }]}>
                  Modo Escuro
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.colors.outline, true: theme.colors.primaryContainer }}
                thumbColor={isDark ? theme.colors.primary : "#f4f3f4"}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />

            {/* Navegação Comum */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('MapPage')}>
              <MaterialIcons name="search" size={24} color={theme.colors.onSurface} style={styles.icon} />
              <Text style={[styles.menuText, { color: theme.colors.onSurface }]}>Pesquisar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Favorites')}>
              <MaterialIcons name="star" size={24} color={theme.colors.onSurface} style={styles.icon} />
              <Text style={[styles.menuText, { color: theme.colors.onSurface }]}>Favoritos</Text>
            </TouchableOpacity>

            {/* Administração */}
            {isAdmin && (
              <View style={[
                styles.adminCard,
                { backgroundColor: theme.colors.surfaceContainerLow }
              ]}>
                <Text style={[styles.adminTitle, { color: theme.colors.primary }]}>ADMINISTRAÇÃO</Text>

                <TouchableOpacity style={styles.adminItem} onPress={() => navigateTo('Admin')}>
                  <MaterialIcons name="dashboard" size={22} color={theme.colors.primary} style={styles.icon} />
                  <Text style={[styles.menuText, { color: theme.colors.primary }]}>Painel do Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.adminItem} onPress={() => navigateTo('AddRequest')}>
                  <MaterialIcons name="add-box" size={22} color={theme.colors.primary} style={styles.icon} />
                  <Text style={[styles.menuText, { color: theme.colors.primary }]}>Solic. de Adição</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.adminItem} onPress={() => navigateTo('EditRequest')}>
                  <MaterialIcons name="edit" size={22} color={theme.colors.primary} style={styles.icon} />
                  <Text style={[styles.menuText, { color: theme.colors.primary }]}>Solic. de Edição</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.adminItem} onPress={() => navigateTo('RemoveRequest')}>
                  <MaterialIcons name="delete" size={22} color={theme.colors.primary} style={styles.icon} />
                  <Text style={[styles.menuText, { color: theme.colors.primary }]}>Solic. de Remoção</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />

            {/* Ações de Usuário */}
            {username ? (
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color={theme.colors.error} style={styles.icon} />
                <Text style={[styles.menuText, { color: theme.colors.error, fontWeight: 'bold' }]}>
                  Sair ({username})
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Login')}>
                <MaterialIcons name="person" size={24} color={theme.colors.onSurface} style={styles.icon} />
                <Text style={[styles.menuText, { color: theme.colors.onSurface }]}>Login</Text>
              </TouchableOpacity>
            )}

          </ScrollView>
        </Animated.View>
        <TouchableOpacity style={styles.transparentArea} onPress={onClose} activeOpacity={1} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  menuContainer: { width: '80%', padding: 25, height: '100%', elevation: 16 },
  transparentArea: { width: '20%', height: '100%' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 25
  },
  title: { fontSize: 26, fontWeight: 'bold' },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  divider: { height: 1, marginVertical: 20, opacity: 0.2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  icon: { marginRight: 15 },
  menuText: { fontSize: 16 },
  adminCard: { borderRadius: 16, padding: 15, marginTop: 10 },
  adminTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  adminItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }
});