import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Text, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import ThemeSelector from '@/components/ThemeSelector';
import GameModeSelector from '@/components/GameModeSelector';
import GameHistory from '@/components/GameHistory';
import { useTheme } from '@/hooks/useThemeStore';
import { useGameStore } from '@/hooks/useGameStore';
import { Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { resetScores } = useGameStore();

  const handleResetStats = () => {
    Alert.alert(
      "Reset Game Statistics",
      "Are you sure you want to reset all game statistics and history?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Reset", 
          onPress: () => resetScores(),
          style: "destructive"
        }
      ]
    );
  };

  // Convert theme's statusBarStyle to proper StatusBar barStyle value
  const statusBarStyle = theme.statusBarStyle === 'dark' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={statusBarStyle} />
      
      <Stack.Screen 
        options={{ 
          title: "Settings",
          headerStyle: { backgroundColor: theme.surface },
          headerTintColor: theme.text,
        }} 
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.settingsContainer}>
          <ThemeSelector />
          <GameModeSelector />
          <GameHistory />
          
          <View style={styles.dangerZone}>
            <Text style={[styles.dangerTitle, { color: theme.text }]}>Danger Zone</Text>
            
            <TouchableOpacity
              style={[styles.dangerButton, { backgroundColor: theme.surface }]}
              onPress={handleResetStats}
            >
              <Trash2 size={20} color="#FF453A" />
              <Text style={styles.dangerButtonText}>Reset Statistics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  settingsContainer: {
    width: '90%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  dangerZone: {
    marginTop: 20,
    marginBottom: 40,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF453A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF453A',
    marginLeft: 8,
  },
});