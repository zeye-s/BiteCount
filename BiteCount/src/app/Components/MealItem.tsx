import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../storage/ThemeContext';

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
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.header }]}>
      <View style = {{flexDirection:'row', justifyContent:'space-between', width: '100%'}}>
      <Text style={[styles.name, { color: colors.textSecondary }]}>{name}</Text>
      <Text style={[styles.name, { color: colors.textSecondary }]}>{createdAt}</Text>
      </View>
      <Text style={[styles.nutrients, { color: colors.text }]}>
        {calories} Calories, {protein}g Protein, {carbs}g Carbs , {fat}g Fat, 
      </Text>
      <Text style = {[styles.nutrients, { color: colors.text }]}>
        {sugar}g Sug, {sodium}mg S, {iron}mg I, {potassium}mg P, 
      </Text> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  nutrients: {
    
    fontSize: 13,
    marginTop: 4,
    
  },
});