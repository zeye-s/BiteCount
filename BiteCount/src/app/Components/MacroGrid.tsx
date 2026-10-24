import { StyleSheet, View } from 'react-native';
import MacroCard from '../Components/MacroCards';
import { Meal } from '../storage/meals';

type MacroGridProps = {
  meals: Meal[];
};

export default function MacroGrid({ meals }: MacroGridProps) {
  const totals = meals.reduce((amount, meal) => ({

      calories: amount.calories + meal.calories,
      protein: amount.protein + meal.protein,
      carbs: amount.carbs + meal.carbs,
      fat: amount.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return (
    <View style={styles.grid}>
      <MacroCard
        label='Calories'
        value={`${totals.calories}`}
        goal='2,000'
        color = '#ff5252'
      />
      <MacroCard
        label='Protein'
        value={`${totals.protein}g`}
        goal='150g'
        color = '#0088ff'
      />
      <MacroCard
        label='Carbs'
        value={`${totals.carbs}g`}
        goal='250g'
        color = '#ffaa00'
      />
      <MacroCard
        label='Fat'
        value={`${totals.fat}g`}
        goal='65g'
        color = '#ffee00'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 5,
  },
});