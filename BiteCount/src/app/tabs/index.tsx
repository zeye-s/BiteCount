import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { globalStyles } from '../../../styles/global';
import CopyButton from '../Components/Copy';
import MacroGrid from '../Components/MacroGrid';
import MicroGrid from '../Components/MicroGrid';
import RecentMeals from '../Components/RecentMeals';
import ThemeToggleButton from '../Components/ThemeButton';
import { getMeals, Meal } from '../storage/meals';
import { useTheme } from '../storage/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();
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
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]}>
      <View style = {{flexDirection:'row', alignItems: 'center', marginBottom: 12}}>
      <Text style={[globalStyles.title, { color: colors.text }]}>BiteCount</Text>
      <View style = {{}}>
      <ThemeToggleButton></ThemeToggleButton>
      </View>
      </View>
      
      
      <MacroGrid meals={meals} />
      <MicroGrid meals={meals} />
      <CopyButton meals={meals} />
      <RecentMeals meals={meals} />
    </ScrollView>
  );
}