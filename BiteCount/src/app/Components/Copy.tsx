import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/global';
import { Meal } from '../storage/meals';

type CopyButtonProps = {
  meals: Meal[];
};

export default function CopyButton({ meals }: CopyButtonProps) {
  const handleCopy = async () => {
    const totals = meals.reduce(
      (amount, meal) => ({
        calories: amount.calories + meal.calories,
        protein: amount.protein + meal.protein,
        carbs: amount.carbs + meal.carbs,
        fat: amount.fat + meal.fat,
        sugar: amount.sugar + (meal.sugar ?? 0),
        sodium: amount.sodium + (meal.sodium ?? 0),
        iron: amount.iron + (meal.iron ?? 0),
        potassium: amount.potassium + (meal.potassium ?? 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, sodium: 0, iron: 0, potassium: 0 },
    );

    const summary = `BiteCount Daily Summary\n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${meals.length} logged today`;

    await Clipboard.setStringAsync(summary);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name='copy-outline' size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});