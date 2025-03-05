import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { X, Circle, Trophy } from 'lucide-react-native';
import { useGameStore, Player } from '@/hooks/useGameStore';
import { useTheme } from '@/hooks/useThemeStore';

export default function GameInfo() {
  const { currentPlayer, gameStatus, winner, scores } = useGameStore();
  const { theme } = useTheme();

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `Player ${winner} wins!`;
    } else if (gameStatus === 'draw') {
      return 'It\'s a draw!';
    } else {
      return `Player ${currentPlayer}'s turn`;
    }
  };

  const getStatusIcon = () => {
    if (gameStatus === 'won') {
      return <Trophy size={24} color={theme.primary} style={styles.statusIcon} />;
    } else if (gameStatus === 'playing') {
      if (currentPlayer === 'X') {
        return <X size={24} color={theme.xColor} style={styles.statusIcon} />;
      } else {
        return <Circle size={24} color={theme.oColor} style={styles.statusIcon} />;
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.statusContainer, { backgroundColor: theme.surface }]}>
        {getStatusIcon()}
        <Text style={[styles.statusText, { color: theme.text }]}>
          {getStatusMessage()}
        </Text>
      </View>

      <View style={styles.scoreContainer}>
        <View style={[styles.scoreCard, { backgroundColor: theme.surface }]}>
          <X size={20} color={theme.xColor} />
          <Text style={[styles.scoreText, { color: theme.text }]}>{scores.X}</Text>
        </View>
        
        <View style={[styles.scoreCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.drawText, { color: theme.textSecondary }]}>Draws</Text>
          <Text style={[styles.scoreText, { color: theme.text }]}>{scores.draws}</Text>
        </View>
        
        <View style={[styles.scoreCard, { backgroundColor: theme.surface }]}>
          <Circle size={20} color={theme.oColor} />
          <Text style={[styles.scoreText, { color: theme.text }]}>{scores.O}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  scoreCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  drawText: {
    fontSize: 14,
  },
});