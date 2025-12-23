import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type ColorTheme = 'dark' | 'light';
export type ThemeVariant = 'default' | 'christmas';

interface ThemeContextType {
  colorTheme: ColorTheme;
  themeVariant: ThemeVariant;
  toggleColorTheme: () => void;
  setThemeVariant: (variant: ThemeVariant) => void;
  availableVariants: ThemeVariant[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem('portfolio-color-theme');
    return (stored as ColorTheme) || 'dark';
  });

  const [themeVariant, setThemeVariantState] = useState<ThemeVariant>(() => {
    const stored = localStorage.getItem('portfolio-theme-variant');
    return (stored as ThemeVariant) || 'default';
  });

  const availableVariants: ThemeVariant[] = ['default', 'christmas'];

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'christmas-theme', 'default-theme');
    
    // Add color theme (dark/light)
    root.classList.add(colorTheme);
    
    // Add theme variant
    if (themeVariant === 'christmas') {
      root.classList.add('christmas-theme');
    } else {
      root.classList.add('default-theme');
    }
    
    // Save to localStorage
    localStorage.setItem('portfolio-color-theme', colorTheme);
    localStorage.setItem('portfolio-theme-variant', themeVariant);
  }, [colorTheme, themeVariant]);

  const toggleColorTheme = () => {
    setColorTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setThemeVariant = (variant: ThemeVariant) => {
    setThemeVariantState(variant);
  };

  return (
    <ThemeContext.Provider value={{ 
      colorTheme, 
      themeVariant, 
      toggleColorTheme, 
      setThemeVariant,
      availableVariants 
    }}>
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

// Helper hook for backward compatibility and Christmas detection
export const useChristmas = () => {
  const { themeVariant } = useTheme();
  return { isChristmasSeason: themeVariant === 'christmas' };
};
