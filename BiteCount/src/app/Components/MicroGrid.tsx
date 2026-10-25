import { StyleSheet, View } from 'react-native';
import { Meal } from '../storage/meals';
import MicroCard from './MicroCards';
import ChangeGoal from './ChangeGoals';
import {useState} from 'react';

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
  const[sugarGoal, setSugarGoal] = useState('50');
  const[sodiumGoal, setSodiumGoal] = useState('2000');
  const[ironGoal, setIronGoal] = useState('12');
  const[potassiumGoal, setPotassiumGoal] = useState('3000');
  const [activeModal, setActiveModal] = useState<'sugar' | 'sodium' | 'iron' | 'potassium' | null>(null);

  const handleSaveGoal = (newGoal: string) => {
    if(activeModal === 'sugar'){
      setSugarGoal(newGoal);
    }
    if(activeModal === 'sodium'){
      setSodiumGoal(newGoal);
    }
    if(activeModal === 'iron'){
      setIronGoal(newGoal);
    }
    if(activeModal === 'potassium'){
      setPotassiumGoal(newGoal);
    }
  }

  const getModalData = () => {
    switch(activeModal){
      case 'sugar': return {label: 'Sugar', goal: sugarGoal};
      case 'sodium': return {label: 'Sodium', goal: sodiumGoal};
      case 'iron': return{label:'iron',goal:ironGoal};
      case 'potassium': return{label:'potassium', goal:potassiumGoal};
      default: return{label:'', goal: ''};
    }
  }
  const modalData = getModalData();

  return(
    <View>
  <View style={styles.grid}>
        <MicroCard
          label='Sugar'
          value={`${totals.sugar}g`}
          goal={`${sugarGoal}g`}
          color = '#eb6434'
          onPressed={() => setActiveModal('sugar')}
        />
        <MicroCard
          label='Sodium'
          value={`${totals.sodium}mg`}
          goal={`${sodiumGoal}mg`}
          color = '#34ebab'
          onPressed ={() => setActiveModal('sodium')}
        />
        <MicroCard
          label='Iron'
          value={`${totals.iron}mg`}
          goal={`${ironGoal}mg`}
          color = '#7d05fc'
          onPressed={() => setActiveModal('iron')}
        />
        <MicroCard
          label='Potassium'
          value={`${totals.potassium}mg`}
          goal={`${potassiumGoal}mg`}
          color = '#fc05d7'
          onPressed={() => setActiveModal('potassium')}
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
  });