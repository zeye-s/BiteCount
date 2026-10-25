import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../storage/ThemeContext';

export default function ThemeToggleButton() {
  const { colors, toggleTheme, themeName } = useTheme();

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Ionicons 
        name={themeName === 'DarkGreen' ? 'moon-outline' : 'sunny-outline'} 
        size={18} 
        color={colors.primary} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});