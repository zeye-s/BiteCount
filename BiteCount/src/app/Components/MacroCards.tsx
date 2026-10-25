import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../storage/ThemeContext';

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
  onPressed: () => void;
};

export default function MacroCard({
  label,
  value,
  goal,
  color,
  onPressed,
}: MacroCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPressed} style={{width:'95%'}}>
    <View style={[styles.card, { borderLeftColor: color, backgroundColor: colors.header }]}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]}>{value} / <Text style={[styles.goal, { color: colors.textSecondary }]}>{goal}</Text></Text>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 5,
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    fontWeight:'bold',
    marginLeft: 5,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 5,
  },
  goal: {
    fontSize: 14,
    marginTop: 2,
    marginLeft: 5,
  },
});