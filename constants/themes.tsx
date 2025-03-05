import { Platform } from 'react-native';

export type ThemeType = 'light' | 'dark' | 'pastel' | 'midnight';

export interface Theme {
  id: ThemeType;
  name: string;
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  xColor: string;
  oColor: string;
  gridColor: string;
  statusBarStyle: 'light' | 'dark';
}

export const themes: Record<ThemeType, Theme> = {
  light: {
    id: 'light',
    name: 'Light',
    background: '#F9F9F9',
    surface: '#FFFFFF',
    primary: '#007AFF',
    secondary: '#5AC8FA',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
    xColor: '#FF3B30',
    oColor: '#34C759',
    gridColor: '#E5E5EA',
    statusBarStyle: 'dark',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    background: '#1C1C1E',
    surface: '#2C2C2E',
    primary: '#0A84FF',
    secondary: '#64D2FF',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    xColor: '#FF453A',
    oColor: '#30D158',
    gridColor: '#3A3A3C',
    statusBarStyle: 'light',
  },
  pastel: {
    id: 'pastel',
    name: 'Pastel',
    background: '#F8F5FF',
    surface: '#FFFFFF',
    primary: '#B5A9F8',
    secondary: '#F8C9D6',
    text: '#4A4A4A',
    textSecondary: '#9B9B9B',
    xColor: '#F8A9A9',
    oColor: '#A9F8C9',
    gridColor: '#E5E0F8',
    statusBarStyle: 'dark',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#BB86FC',
    secondary: '#03DAC6',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    xColor: '#CF6679',
    oColor: '#03DAC6',
    gridColor: '#2C2C2C',
    statusBarStyle: 'light',
  },
};

export const isWeb = Platform.OS === 'web';