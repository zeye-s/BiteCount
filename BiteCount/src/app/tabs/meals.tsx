import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { 
  TouchableOpacity, 
  ScrollView, 
  Text, 
  View,
  StyleSheet,
  Alert } from 'react-native';
import { globalStyles,colors } from '../../../styles/global';
import MealItem from '../Components/MealItem';
import { getMeals, Meal } from '../storage/meals';

export default function MealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [confirm, setConfirm] = useState(false);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  const deleteMeals = async (): Promise <void>=> {
    try{
      await AsyncStorage.clear();
      alert('Success');
      loadMeals();
    }
    catch(error){
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  const handleConfirm = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Do you want to delete all meals?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',  
          onPress: () => deleteMeals(),
        }
      ],
      {cancelable:true}
    );
  };



  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Meals</Text>
      <TouchableOpacity style = {{marginTop: 5}} onPress = {() => handleConfirm()}>
        <Text style = {styles.button}>Delete All Meals</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 , paddingBottom: 80}}>
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

const styles = StyleSheet.create({
  button:{
    padding:12,
    color:colors.alert,
    backgroundColor: colors.header,
    width: '40%',
    borderRadius: 12,
  }

})