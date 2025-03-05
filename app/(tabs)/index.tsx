import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Board from '@/components/Board';
import GameInfo from '@/components/GameInfo';
import GameControls from '@/components/GameControls';
import { useTheme } from '@/hooks/useThemeStore';
import { useGameStore } from '@/hooks/useGameStore';

export default function GameScreen() {
  const { theme } = useTheme();
  const { gameMode, difficulty } = useGameStore();

  // Set up the header title based on game mode
  const getHeaderTitle = () => {
    if (gameMode === 'single') {
      return `Tic Tac Toe - AI (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)})`;
    }
    return 'Tic Tac Toe - 2 Players';
  };

  // Convert theme's statusBarStyle to proper StatusBar barStyle value
  const statusBarStyle = theme.statusBarStyle === 'dark' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={statusBarStyle} />
      
      <Stack.Screen 
        options={{ 
          title: getHeaderTitle(),
          headerStyle: { backgroundColor: theme.surface },
          headerTintColor: theme.text,
        }} 
      />
      
      {/* <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      > */}
        <View style={styles.gameContainer}>
          <GameInfo />
          <Board />
          <GameControls />
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  gameContainer: {
    width: '90%',
    maxWidth: 500,
    alignItems: 'center',
  },
});