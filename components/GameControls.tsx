import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RotateCcw, Settings } from 'lucide-react-native';
import { useGameStore } from '@/hooks/useGameStore';
import { useTheme } from '@/hooks/useThemeStore';
import { useRouter } from 'expo-router';

export default function GameControls() {
  const { resetGame } = useGameStore();
  const { theme } = useTheme();
  const router = useRouter();

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.surface }]}
        onPress={resetGame}
      >
        <RotateCcw size={20} color={theme.primary} />
        <Text style={[styles.buttonText, { color: theme.primary }]}>New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.surface }]}
        onPress={handleSettingsPress}
      >
        <Settings size={20} color={theme.primary} />
        <Text style={[styles.buttonText, { color: theme.primary }]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});