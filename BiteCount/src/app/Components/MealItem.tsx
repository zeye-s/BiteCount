import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../../../styles/global';

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
  createdAt: string;
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
  createdAt,
}: MealItemProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{name}                                         {createdAt}</Text>
      <Text style={styles.nutrients}>
        {calories} Calories, {protein}g Protein, {carbs}g Carbs , {fat}g Fat, 
      </Text>
      <Text style = {styles.nutrients}>
        {sodium}mg Sod, {iron}mg Iron, {potassium}mg Potass, {sugar}g Sug,
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: colors.header,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  nutrients: {
    
    fontSize: 13,
    color: colors.text,
    marginTop: 4,
    
  },
});