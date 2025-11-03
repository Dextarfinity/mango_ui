import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('scan2save_theme');
    console.log('ThemeProvider initializing, saved theme:', saved);
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System preference:', systemPreference);
    return systemPreference;
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    console.log('Theme effect running, isDark:', isDark);
    if (isDark) {
      console.log('Adding dark class to document');
      document.documentElement.classList.add('dark');
      localStorage.setItem('scan2save_theme', 'dark');
    } else {
      console.log('Removing dark class from document');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('scan2save_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle theme called, current isDark:', isDark);
    setIsDark(prev => {
      console.log('Setting isDark to:', !prev);
      return !prev;
    });
  };

  const setTheme = (theme) => {
    setIsDark(theme === 'dark');
  };

  const value = {
    isDark,
    theme: isDark ? 'dark' : 'light',
    toggleTheme,
    setTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
