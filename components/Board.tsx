import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './Cell';
import { useGameStore } from '@/hooks/useGameStore';
import { useTheme } from '@/hooks/useThemeStore';

export default function Board() {
  const { board, makeMove, winningCombination } = useGameStore();
  const { theme } = useTheme();

  const handleCellPress = (index: number) => {
    makeMove(index);
  };

  const isWinningCell = (index: number) => {
    return winningCombination ? winningCombination.includes(index) : false;
  };

  return (
    <View style={[styles.board, { backgroundColor: theme.gridColor }]}>
      <View style={styles.row}>
        <Cell value={board[0]} onPress={() => handleCellPress(0)} index={0} isWinningCell={isWinningCell(0)} />
        <Cell value={board[1]} onPress={() => handleCellPress(1)} index={1} isWinningCell={isWinningCell(1)} />
        <Cell value={board[2]} onPress={() => handleCellPress(2)} index={2} isWinningCell={isWinningCell(2)} />
      </View>
      
      <View style={styles.row}>
        <Cell value={board[3]} onPress={() => handleCellPress(3)} index={3} isWinningCell={isWinningCell(3)} />
        <Cell value={board[4]} onPress={() => handleCellPress(4)} index={4} isWinningCell={isWinningCell(4)} />
        <Cell value={board[5]} onPress={() => handleCellPress(5)} index={5} isWinningCell={isWinningCell(5)} />
      </View>
      
      <View style={styles.row}>
        <Cell value={board[6]} onPress={() => handleCellPress(6)} index={6} isWinningCell={isWinningCell(6)} />
        <Cell value={board[7]} onPress={() => handleCellPress(7)} index={7} isWinningCell={isWinningCell(7)} />
        <Cell value={board[8]} onPress={() => handleCellPress(8)} index={8} isWinningCell={isWinningCell(8)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    padding: 8,
    borderRadius: 16,
    maxWidth: 400,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});