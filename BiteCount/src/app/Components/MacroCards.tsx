import { StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.goal}>/ {goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#344e41',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: '#ecf39e',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f2e8cf',
    marginTop: 4,
  },
  goal: {
    fontSize: 14,
    color: '#ecf39e',
    marginTop: 2,
  },
});