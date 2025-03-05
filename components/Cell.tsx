import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { X, Circle } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';
import { Player } from '@/hooks/useGameStore';
import { useTheme } from '@/hooks/useThemeStore';
import { Platform } from 'react-native';

interface CellProps {
  value: Player;
  onPress: () => void;
  index: number;
  isWinningCell: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Cell({ value, onPress, index, isWinningCell }: CellProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const winningAnimation = useSharedValue(1);

  useEffect(() => {
    if (value) {
      scale.value = withSpring(1, { damping: 10 });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = 0;
      opacity.value = 0;
    }
  }, [value]);

  useEffect(() => {
    if (isWinningCell) {
      winningAnimation.value = withTiming(1.1, { duration: 300, easing: Easing.inOut(Easing.ease) });
    } else {
      winningAnimation.value = 1;
    }
  }, [isWinningCell]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value * winningAnimation.value }],
      opacity: opacity.value,
    };
  });

  const cellAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isWinningCell 
        ? withTiming(value === 'X' 
          ? `${theme.xColor}20` 
          : `${theme.oColor}20`, 
          { duration: 300 }
        ) 
        : withTiming(theme.surface, { duration: 300 }),
      transform: [{ scale: isWinningCell ? withSpring(1.05) : withSpring(1) }],
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[styles.cell, cellAnimatedStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {Platform.OS !== 'web' || value ? (
        <Animated.View style={[styles.symbolContainer, animatedStyle]}>
          {value === 'X' && (
            <X size={36} color={theme.xColor} strokeWidth={2.5} />
          )}
          {value === 'O' && (
            <Circle size={36} color={theme.oColor} strokeWidth={2.5} />
          )}
        </Animated.View>
      ) : (
        <View style={styles.symbolContainer}>
          {value === 'X' && (
            <X size={36} color={theme.xColor} strokeWidth={2.5} />
          )}
          {value === 'O' && (
            <Circle size={36} color={theme.oColor} strokeWidth={2.5} />
          )}
        </View>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});