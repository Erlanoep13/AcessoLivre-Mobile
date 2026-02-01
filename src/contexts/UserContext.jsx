import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [username, setUsername] = useState(null);
  
  // Novo estado para saber se o app ainda está lendo a memória
  const [loadingStorage, setLoadingStorage] = useState(true);

  // 1. Este useEffect roda assim que o Contexto é criado (ao abrir o app)
  useEffect(() => {
    async function loadStorageData() {
      try {
        // Tenta buscar os dados que salvamos no Login
        const storageUser = await AsyncStorage.getItem('@acessolivre:user');

        if (storageUser) {
          // Se achou, converte de volta para Objeto e salva no estado
          const userParsed = JSON.parse(storageUser);
          setUsername(userParsed.username); 
        }
      } catch (error) {
        console.log("Erro ao recuperar login:", error);
      } finally {
        // Diz para o app que terminou de ler a memória
        setLoadingStorage(false);
      }
    }

    loadStorageData();
  }, []);

  // 2. Função de Sair (Logout) para usar em botões no futuro
  async function signOut() {
    try {
      await AsyncStorage.removeItem('@acessolivre:user');
      setUsername(null);
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  return (
    <UserContext.Provider value={{ username, setUsername, loadingStorage, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}