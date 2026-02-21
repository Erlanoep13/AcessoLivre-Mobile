import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const deviceScheme = useColorScheme(); // Pega a preferência do sistema (Android/iOS)
    const [isDark, setIsDark] = useState(deviceScheme === 'dark');

    useEffect(() => {
        async function loadTheme() {
            const savedTheme = await AsyncStorage.getItem('@AcessoLivre:theme');
            if (savedTheme !== null) {
                setIsDark(savedTheme === 'dark');
            }
        }
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        await AsyncStorage.setItem('@AcessoLivre:theme', newTheme ? 'dark' : 'light');
    };

    const currentTheme = isDark ? theme.dark : theme.light;

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext); 