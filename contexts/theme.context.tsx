import { ThemeMode, Themes } from "@/constants/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (newTheme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: (newTheme: ThemeMode) => {},
});

const THEME_STORAGE_KEY = "@app_theme";

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  const colors = Themes[theme];

  return {
    theme,
    setTheme,
    colors,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = (await AsyncStorage.getItem(
        THEME_STORAGE_KEY
      )) as ThemeMode;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme(systemColorScheme || "light");
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    }
  };

  const setNewTheme = async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
