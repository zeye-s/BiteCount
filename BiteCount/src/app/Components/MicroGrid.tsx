import { StyleSheet, View } from 'react-native';
import { Meal } from '../storage/meals';
import MicroCard from './MicroCards';

type MicroGridProps = {
    meals: Meal[];
};

export default function MicroGrid({ meals }: MicroGridProps) {
  const totals = meals.reduce((amount, meal) => ({

      sugar: amount.sugar + meal.sugar,
      sodium: amount.sodium + meal.sodium,
      iron: amount.iron + meal.iron,
      potassium: amount.potassium + meal.potassium,
    }),
    { sugar: 0, sodium: 0, iron: 0, potassium: 0 },
  );
  return(
  <View style={styles.grid}>
        <MicroCard
          label='Sugar'
          value={`${totals.sugar}`}
          goal='50g'
          color = '#ff5252'
        />
        <MicroCard
          label='Sodium'
          value={`${totals.sodium}g`}
          goal='< 2g'
          color = '#0088ff'
        />
        <MicroCard
          label='Iron'
          value={`${totals.iron}g`}
          goal='250g'
          color = '#ffaa00'
        />
        <MicroCard
          label='Potassium'
          value={`${totals.potassium}g`}
          goal='65g'
          color = '#ffee00'
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