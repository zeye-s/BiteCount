import { StyleSheet, View } from 'react-native';
import MacroCard from '../Components/MacroCards';
import { Meal } from '../storage/meals';
import ChangeGoal from './ChangeGoals';
import {useState} from 'react';

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

  const[calorieGoal, setCalorieGoal] = useState('2000');
  const[carbGoal, setCarbGoal] = useState('250');
  const[proteinGoal, setProteinGoal] = useState('125');
  const[fatGoal, setFatGoal] = useState('60')
  const [activeModal, setActiveModal] = useState<'calorie' | 'carb' | 'protein' | 'fat' | null>(null);

  const handleSaveGoal = (newGoal: string) => {
    if(activeModal === 'calorie'){
      setCalorieGoal(newGoal);
    }
    if(activeModal === 'carb'){
      setCarbGoal(newGoal);
    }
    if(activeModal === 'protein'){
      setProteinGoal(newGoal);
    }
    if(activeModal === 'fat'){
      setFatGoal(newGoal);
    }
  }

  const getModalData = () => {
    switch(activeModal){
      case 'calorie': return {label: 'Calorie', goal: calorieGoal};
      case 'carb': return {label: 'Carbs', goal: carbGoal};
      case 'protein': return{label:'Protein',goal:proteinGoal};
      case 'fat': return{label: 'Fat',goal: fatGoal}
      default: return{label:'', goal: ''};
    }
  }
  const modalData = getModalData();



  return (
    <View>
    <View style={styles.grid}>
      <MacroCard
        label='Calories'
        value={`${totals.calories}kcal`}
        goal= {`${calorieGoal}`}
        color = '#ff5252'
        onPressed={() => setActiveModal('calorie')}
      />
      <MacroCard
        label='Protein'
        value={`${totals.protein}g`}
        goal={`${proteinGoal}`}
        color = '#0088ff'
        onPressed={() => setActiveModal('protein')}
      />
      <MacroCard
        label='Carbs'
        value={`${totals.carbs}g`}
        goal={`${carbGoal}`}
        color = '#ffaa00'
        onPressed={() => setActiveModal('carb')}
      />
      <MacroCard
        label='Fat'
        value={`${totals.fat}g`}
        goal={`${fatGoal}`}
        color = '#ffee00'
        onPressed={() => setActiveModal('fat')}
      />
    </View>
    {activeModal && (
        <ChangeGoal
            visible={!!activeModal}
            label={modalData.label}
            currentGoal={modalData.goal}
            onClose={() => setActiveModal(null)}
            onSave={handleSaveGoal}
        />
      )}
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