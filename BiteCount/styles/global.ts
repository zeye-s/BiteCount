import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0D1F17',     // Deep dark forest background for ultra-high contrast
  header: '#16422e',         // Rich dark green for card backgrounds
  surface: '#254D3A',        // Elevated green surface for inputs and containers
  primary: '#00FF9D',        // Glowing electric mint for main action buttons & highlights
  text: '#FFFFFF',           // Bright crisp white for primary headers and values
  textSecondary: '#A3C9B8',  // Soft pastel sage for secondary labels and units
  alert: '#FF4D6D',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});