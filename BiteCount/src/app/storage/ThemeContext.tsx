import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeType } from '../../../styles/themes';

type ThemeContextType = {
  colors: typeof themes.DarkGreen;
  themeName: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeType>('DarkGreen');

  // Load saved theme preference on app start
  useEffect(() => {
    AsyncStorage.getItem('user_theme').then((saved) => {
      if (saved && saved in themes) {
        setThemeName(saved as ThemeType);
      }
    });
  }, []);

  const toggleTheme = async () => {
    const nextTheme: ThemeType = themeName === 'DarkGreen' ? 'LightMint' : 'DarkGreen';
    setThemeName(nextTheme);
    await AsyncStorage.setItem('user_theme', nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ colors: themes[themeName], themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};