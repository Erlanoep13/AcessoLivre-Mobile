import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function AdminQuickActions({ 
  addRequests = 0,    // Pedidos de adição
  editRequests = 0,   // Pedidos de edição
  removeRequests = 0, // Pedidos de remoção
  onPressAdd,
  onPressEdit,
  onPressRemove
}) {

  // Componente interno do Botão Retangular
  const ActionButton = ({ label, notificationCount, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{label}</Text>
      
      {/* Bolinha de Notificação no Canto */}
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
      {/* Botão 1: Adição */}
      <ActionButton 
        label="Pedidos de Adição" 
        notificationCount={addRequests} 
        onPress={onPressAdd} 
      />
      
      {/* Botão 2: Edição */}
      <ActionButton 
        label="Pedidos de Edição" 
        notificationCount={editRequests} 
        onPress={onPressEdit} 
      />
      
      {/* Botão 3: Remoção */}
      <ActionButton 
        label="Pedidos de Remoção" 
        notificationCount={removeRequests} 
        onPress={onPressRemove} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 4, // Pequeno respiro lateral
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffffffff', 
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 12, // Espaço entre um botão e outro
    alignItems: 'center', // Texto centralizado
    justifyContent: 'center',
    position: 'relative', // Essencial para a notificação absoluta funcionar
    // Sombra leve
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937', // Cinza escuro/Preto
  },
  badge: {
    position: 'absolute',
    top: -8, // Sobe um pouquinho pra fora do botão
    right: -4, // Fica no canto direito
    backgroundColor: '#EF4444', // Vermelho vivo
    borderRadius: 12, // Redondo
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3F4F6', // Borda clarinha para destacar do fundo
    paddingHorizontal: 4,
    elevation: 3,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  }
});