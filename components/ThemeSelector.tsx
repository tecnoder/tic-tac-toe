import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useThemeStore';
import { ThemeType } from '@/constants/themes';
import { Check } from 'lucide-react-native';

export default function ThemeSelector() {
  const { theme, setTheme, allThemes } = useTheme();
  
  const handleThemeChange = (themeId: ThemeType) => {
    setTheme(themeId);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Theme</Text>
      
      {/* <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.themesContainer}
      > */}
        {Object.entries(allThemes).map(([id, themeOption]) => (
          <TouchableOpacity
            key={id}
            style={[
              styles.themeOption,
              { 
                backgroundColor: themeOption.surface,
                borderColor: theme.id === id ? themeOption.primary : 'transparent',
              }
            ]}
            onPress={() => handleThemeChange(id as ThemeType)}
          >
            <View style={styles.themePreview}>
              <View style={[styles.previewColor, { backgroundColor: themeOption.primary }]} />
              <View style={[styles.previewColor, { backgroundColor: themeOption.secondary }]} />
              <View style={[styles.previewColor, { backgroundColor: themeOption.xColor }]} />
              <View style={[styles.previewColor, { backgroundColor: themeOption.oColor }]} />
            </View>
            
            <Text style={[styles.themeName, { color: themeOption.text }]}>
              {themeOption.name}
            </Text>
            
            {theme.id === id && (
              <View style={[styles.checkmark, { backgroundColor: themeOption.primary }]}>
                <Check size={14} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      {/* </ScrollView> */}
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
  themesContainer: {
    paddingVertical: 8,
  },
  themeOption: {
    width: 100,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    padding: 8,
    justifyContent: 'space-between',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  themePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  previewColor: {
    width: 38,
    height: 38,
    borderRadius: 6,
    marginBottom: 4,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});