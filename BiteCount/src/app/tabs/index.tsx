import { ScrollView, Text } from 'react-native';
import { globalStyles } from '../../../styles/global';
import HomeHeader from '../Components/HomeHeader';
import MacroGrid from '../Components/MacroGrid';
import RecentMeals from '../Components/RecentMeals';

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>BiteCount</Text>
      <HomeHeader />
      <MacroGrid />
      <RecentMeals />
    </ScrollView>
  );
}