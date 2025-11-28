import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 1. Importar navegação

export function AdminQuickActions({ 
  addRequests = 0, 
  editRequests = 0, 
  removeRequests = 0
}) {
  
  const navigation = useNavigation(); // 2. Inicializar navegação

  const ActionButton = ({ label, notificationCount, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{label}</Text>
      
      {notificationCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {notificationCount > 9 ? '9+' : notificationCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão 1: Adição -> Vai para 'AddRequest' */}
      <ActionButton 
        label="Pedidos de Adição" 
        notificationCount={addRequests} 
        onPress={() => navigation.navigate('AddRequest')} 
      />
      
      {/* Botão 2: Edição -> Vai para 'EditRequest' */}
      <ActionButton 
        label="Pedidos de Edição" 
        notificationCount={editRequests} 
        onPress={() => navigation.navigate('EditRequest')} 
      />
      
      {/* Botão 3: Remoção -> Vai para 'RemoveRequest' */}
      <ActionButton 
        label="Pedidos de Remoção" 
        notificationCount={removeRequests} 
        onPress={() => navigation.navigate('RemoveRequest')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 4, 
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffffffff', // Mantive a cor branca que você colocou
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'relative', 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937', 
  },
  badge: {
    position: 'absolute',
    top: -8, 
    right: -4, 
    backgroundColor: '#EF4444', 
    borderRadius: 12, 
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3F4F6', 
    paddingHorizontal: 4,
    elevation: 3,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  }
});