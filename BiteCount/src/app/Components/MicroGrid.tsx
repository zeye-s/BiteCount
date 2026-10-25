import { StyleSheet, View } from 'react-native';
import { Meal } from '../storage/meals';
import MicroCard from './MicroCards';

type MicroGridProps = {
    meals: Meal[];
};

export default function MicroGrid({meals}:MicroGridProps) {
  const totals = meals.reduce((amount, meal) => ({

      sugar: amount.sugar + (meal.sugar ?? 0),
      sodium: amount.sodium + (meal.sodium ?? 0),
      iron: amount.iron + (meal.iron ?? 0),
      potassium: amount.potassium + (meal.potassium ?? 0),
    }),
    { sugar: 0, sodium: 0, iron: 0, potassium: 0 },
  );
  return(
  <View style={styles.grid}>
        <MicroCard
          label='Sugar'
          value={`${totals.sugar}g`}
          goal='50g'
          color = '#eb6434'
        />
        <MicroCard
          label='Sodium'
          value={`${totals.sodium}mg`}
          goal='2000mg'
          color = '#34ebab'
        />
        <MicroCard
          label='Iron'
          value={`${totals.iron}mg`}
          goal='12mg'
          color = '#7d05fc'
        />
        <MicroCard
          label='Potassium'
          value={`${totals.potassium}mg`}
          goal='3000mg'
          color = '#fc05d7'
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
  });