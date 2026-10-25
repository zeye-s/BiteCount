import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { globalStyles } from '../../../styles/global';
import CopyButton from '../Components/Copy';
import MacroGrid from '../Components/MacroGrid';
import MicroGrid from '../Components/MicroGrid';
import RecentMeals from '../Components/RecentMeals';
import { getMeals, Meal } from '../storage/meals';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log('Loaded meals:', data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={[globalStyles.container]}>
      <Text style={[globalStyles.title, {marginBottom: 16}]}>BiteCount</Text>
      
      
      <MacroGrid meals={meals} />
      <MicroGrid meals={meals} />
      <CopyButton meals={meals} />
      <RecentMeals meals={meals} />
    </ScrollView>
  );
}