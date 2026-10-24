import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../styles/global';

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function MacroCard({
  label,
  value,
  goal,
  color,
}: MacroCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value} / <Text style = {styles.goal}>{goal}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.header,
    borderRadius: 12,
    padding: 5,
    width: '95%',
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 2,
    marginLeft: 5,
  },
  goal: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    marginLeft: 5,
  },
});