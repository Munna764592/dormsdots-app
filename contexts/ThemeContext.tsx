import React, {createContext, useContext, useState} from 'react';
import {useColorScheme} from 'react-native';

interface Theme {
  background: string;
  text: string;
  primary: string;
  tabbg: string;
  dropdown: string;
  text2: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const lightTheme: Theme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#4a1c96',
  tabbg: '#E0E0E0',
  dropdown: '#F6F6F6',
  text2: '#9CA3AF',
};

const darkTheme: Theme = {
  background: '#101010',
  text: '#FFFFFF',
  primary: '#BB86FC',
  tabbg: '#1e1e1e',
  dropdown: '#1e1e1e',
  text2: '#9CA3AF',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDarkMode}}>
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
