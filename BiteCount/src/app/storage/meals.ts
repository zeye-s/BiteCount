import AsyncStorage from '@react-native-async-storage/async-storage';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number,
  potassium: number,
  iron: number,
  sugar: number,

  createdAt: string;
};

const MEALS_KEY = 'meals';




export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMeal = async (
  meal: Omit<Meal, 'id' | 'createdAt'>,
): Promise<Meal> => {

  const date = new Date();
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1);
  const day: string = String(date.getDate()); 
  const fullDate = `${month}/${day}/${year}`


  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
    createdAt: fullDate.toString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  return newMeal;
};