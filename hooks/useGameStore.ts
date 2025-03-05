import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Player = 'X' | 'O' | null;
export type GameMode = 'single' | 'two-player';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  winningCombination: number[] | null;
  gameStatus: GameStatus;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  gameMode: GameMode;
  difficulty: Difficulty;
  history: {
    date: string;
    winner: Player;
  }[];
  
  // Actions
  makeMove: (index: number) => void;
  resetGame: () => void;
  resetScores: () => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

const initialBoard = Array(9).fill(null);

const checkWinner = (board: Player[]): { winner: Player; combination: number[] | null } => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combination: pattern };
    }
  }

  return { winner: null, combination: null };
};

const getAIMove = (board: Player[], difficulty: Difficulty): number => {
  const emptyIndices = board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
  
  if (emptyIndices.length === 0) return -1;
  
  // Easy: Random move
  if (difficulty === 'easy') {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }
  
  // Medium: 50% chance of optimal move, 50% random
  if (difficulty === 'medium') {
    if (Math.random() > 0.5) {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
  }
  
  // Hard or Medium with optimal move: Use minimax algorithm
  // For simplicity, we'll implement a basic strategy instead of full minimax
  
  // Try to win
  for (let i = 0; i < emptyIndices.length; i++) {
    const index = emptyIndices[i];
    const newBoard = [...board];
    newBoard[index] = 'O';
    const { winner } = checkWinner(newBoard);
    if (winner === 'O') return index;
  }
  
  // Block opponent from winning
  for (let i = 0; i < emptyIndices.length; i++) {
    const index = emptyIndices[i];
    const newBoard = [...board];
    newBoard[index] = 'X';
    const { winner } = checkWinner(newBoard);
    if (winner === 'X') return index;
  }
  
  // Take center if available
  if (board[4] === null) return 4;
  
  // Take corners
  const corners = [0, 2, 6, 8].filter(index => board[index] === null);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  // Take any available edge
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      board: initialBoard,
      currentPlayer: 'X' as Player,
      winner: null,
      winningCombination: null,
      gameStatus: 'playing' as GameStatus,
      scores: {
        X: 0,
        O: 0,
        draws: 0,
      },
      gameMode: 'two-player' as GameMode,
      difficulty: 'medium' as Difficulty,
      history: [],
      
      makeMove: (index: number) => {
        const state = get();
        const { board, currentPlayer, gameStatus, gameMode, difficulty } = state;
        
        if (gameStatus !== 'playing' || board[index] !== null) return;
        
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        
        const { winner, combination } = checkWinner(newBoard);
        const isBoardFull = newBoard.every(cell => cell !== null);
        
        let newGameStatus: GameStatus = 'playing';
        let newScores = { ...state.scores };
        let newHistory = [...state.history];
        
        if (winner) {
          newGameStatus = 'won';
          newScores[winner] += 1;
          newHistory.push({
            date: new Date().toISOString(),
            winner,
          });
        } else if (isBoardFull) {
          newGameStatus = 'draw';
          newScores.draws += 1;
          newHistory.push({
            date: new Date().toISOString(),
            winner: null,
          });
        }
        
        set({
          board: newBoard,
          currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
          winner,
          winningCombination: combination,
          gameStatus: newGameStatus,
          scores: newScores,
          history: newHistory,
        });
        
        // AI move if single player mode and game is still playing
        if (gameMode === 'single' && newGameStatus === 'playing' && currentPlayer === 'X') {
          setTimeout(() => {
            const currentState = get();
            const { board, gameStatus } = currentState;
            if (gameStatus !== 'playing') return;
            
            const aiMoveIndex = getAIMove(board, difficulty);
            if (aiMoveIndex !== -1) {
              get().makeMove(aiMoveIndex);
            }
          }, 500);
        }
      },
      
      resetGame: () => {
        set({
          board: initialBoard,
          currentPlayer: 'X' as Player,
          winner: null,
          winningCombination: null,
          gameStatus: 'playing' as GameStatus,
        });
      },
      
      resetScores: () => {
        set({
          scores: {
            X: 0,
            O: 0,
            draws: 0,
          },
          history: [],
        });
      },
      
      setGameMode: (mode: GameMode) => {
        set({ gameMode: mode });
        get().resetGame();
      },
      
      setDifficulty: (difficulty: Difficulty) => {
        set({ difficulty });
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: GameState) => ({
        scores: state.scores,
        gameMode: state.gameMode,
        difficulty: state.difficulty,
        history: state.history,
      }),
    }
  )
);