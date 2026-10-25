import { Meal } from '../storage/meals';
import { globalStyles } from '../../../styles/global';
import { Text, View } from 'react-native';
import MealItem from './MealItem';
import { useTheme } from '../storage/ThemeContext';

type RecentMealsProps = {
  meals: Meal[];
};

export default function RecentMeals({ meals }: RecentMealsProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginTop: 30, paddingBottom: 80}}>
      <Text style={[globalStyles.sectionTitle, { color: colors.textSecondary }]}>Recent Meals</Text>
      {meals.length === 0 && meals.length <= 5 ? (
        <Text style={[globalStyles.empty, { color: colors.textSecondary }]}>No meals logged yet.</Text>
      ) : (
        meals
          .slice(0, 5)
          .map((meal) => (
            <MealItem
              key = {meal.id}
              name = {meal.name}
              calories = {meal.calories}
              protein = {meal.protein}
              carbs = {meal.carbs}
              fat = {meal.fat}
              sodium = {meal.sodium}
              potassium = {meal.potassium}
              iron = {meal.iron}
              sugar = {meal.sugar}
              createdAt = {meal.createdAt}
            />
          ))
      )}
    </View>
  );
}