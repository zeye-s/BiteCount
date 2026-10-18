import { StyleSheet, Text, View } from 'react-native';

type MealItemProps = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
  potassium: number;
  iron: number;
  sugar: number;
};

export default function MealItem({
  name,
  calories,
  protein,
  carbs,
  fat,
  sodium,
  iron,
  sugar,
  potassium,
}: MealItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {calories} cal , {protein}g P , {carbs}g C , {fat}g F
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#344e41',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f2e8cf',
  },
  macros: {
    fontSize: 13,
    color: '#ecf39e',
    marginTop: 4,
  },
});