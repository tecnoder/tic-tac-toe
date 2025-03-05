import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useGameStore } from '@/hooks/useGameStore';
import { useTheme } from '@/hooks/useThemeStore';
import { X, Circle, Minus } from 'lucide-react-native';

export default function GameHistory() {
  const { history } = useGameStore();
  const { theme } = useTheme();

  if (history.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Game History</Text>
        <View style={[styles.emptyContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No games played yet
          </Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Game History</Text>
      
      <FlatList
        data={[...history].reverse().slice(0, 5)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.historyItem, { backgroundColor: theme.surface }]}>
            <View style={styles.resultIcon}>
              {item.winner === 'X' && <X size={20} color={theme.xColor} />}
              {item.winner === 'O' && <Circle size={20} color={theme.oColor} />}
              {item.winner === null && <Minus size={20} color={theme.textSecondary} />}
            </View>
            <View style={styles.historyContent}>
              <Text style={[styles.resultText, { color: theme.text }]}>
                {item.winner ? `Player ${item.winner} won` : 'Draw'}
              </Text>
              <Text style={[styles.dateText, { color: theme.textSecondary }]}>
                {formatDate(item.date)}
              </Text>
            </View>
          </View>
        )}
        style={styles.historyList}
        contentContainerStyle={styles.historyListContent}
      />
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
  historyList: {
    maxHeight: 300,
  },
  historyListContent: {
    paddingBottom: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultIcon: {
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    marginTop: 2,
  },
  emptyContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
  },
});