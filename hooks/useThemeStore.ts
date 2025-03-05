import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeType, themes } from '@/constants/themes';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light' as ThemeType,
      setTheme: (theme: ThemeType) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();
  return { 
    theme: themes[theme as ThemeType], 
    setTheme,
    allThemes: themes
  };
};