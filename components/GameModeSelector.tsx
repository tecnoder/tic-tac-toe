import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGameStore, GameMode, Difficulty } from '@/hooks/useGameStore';
import { useTheme } from '@/hooks/useThemeStore';
import { User, Users, Cpu } from 'lucide-react-native';

export default function GameModeSelector() {
  const { gameMode, setGameMode, difficulty, setDifficulty } = useGameStore();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Game Mode</Text>
      
      <View style={styles.modeContainer}>
        <TouchableOpacity
          style={[
            styles.modeOption,
            { 
              backgroundColor: theme.surface,
              borderColor: gameMode === 'single' ? theme.primary : 'transparent',
            }
          ]}
          onPress={() => setGameMode('single')}
        >
          <User size={24} color={gameMode === 'single' ? theme.primary : theme.textSecondary} />
          <Text style={[
            styles.modeText, 
            { color: gameMode === 'single' ? theme.primary : theme.text }
          ]}>
            Single Player
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.modeOption,
            { 
              backgroundColor: theme.surface,
              borderColor: gameMode === 'two-player' ? theme.primary : 'transparent',
            }
          ]}
          onPress={() => setGameMode('two-player')}
        >
          <Users size={24} color={gameMode === 'two-player' ? theme.primary : theme.textSecondary} />
          <Text style={[
            styles.modeText, 
            { color: gameMode === 'two-player' ? theme.primary : theme.text }
          ]}>
            Two Players
          </Text>
        </TouchableOpacity>
      </View>
      
      {gameMode === 'single' && (
        <View style={styles.difficultyContainer}>
          <Text style={[styles.subtitle, { color: theme.text }]}>AI Difficulty</Text>
          
          <View style={styles.difficultyOptions}>
            <TouchableOpacity
              style={[
                styles.difficultyOption,
                { 
                  backgroundColor: theme.surface,
                  borderColor: difficulty === 'easy' ? theme.primary : 'transparent',
                }
              ]}
              onPress={() => setDifficulty('easy')}
            >
              <Text style={[
                styles.difficultyText, 
                { color: difficulty === 'easy' ? theme.primary : theme.text }
              ]}>
                Easy
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.difficultyOption,
                { 
                  backgroundColor: theme.surface,
                  borderColor: difficulty === 'medium' ? theme.primary : 'transparent',
                }
              ]}
              onPress={() => setDifficulty('medium')}
            >
              <Text style={[
                styles.difficultyText, 
                { color: difficulty === 'medium' ? theme.primary : theme.text }
              ]}>
                Medium
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.difficultyOption,
                { 
                  backgroundColor: theme.surface,
                  borderColor: difficulty === 'hard' ? theme.primary : 'transparent',
                }
              ]}
              onPress={() => setDifficulty('hard')}
            >
              <Text style={[
                styles.difficultyText, 
                { color: difficulty === 'hard' ? theme.primary : theme.text }
              ]}>
                Hard
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  difficultyContainer: {
    width: '100%',
  },
  difficultyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
  },
});