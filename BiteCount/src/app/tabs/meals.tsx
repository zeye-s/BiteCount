import MealItem from '../Components/MealItem';
import { getMeals, Meal } from '../storage/meals';
import { globalStyles } from '../../../styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function MealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Meals</Text>
      <View style={{ marginTop: 30 , paddingBottom: 80}}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
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
              createdAt={meal.createdAt}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}