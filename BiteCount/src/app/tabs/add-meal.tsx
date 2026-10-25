import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../../../styles/global';
import Search from "../Components/SearchFood";
import { addMeal } from '../storage/meals';
import { useTheme } from '../storage/ThemeContext';

interface Product{
  code?: string;
  product_name?: string;
  nutriments?: {
    'energy-kcal_100g'?: number;
    'carbohydrates_100g'?: number;
    'proteins_100g'?: number;
    'fat_100g'?: number;
    'sugars_100g'?: number;
    'sodium_100g'?: number;
    'potassium_100g'?: number;
    'iron_100g'?: number;
  }
}

export default function AddMealScreen() {
  const { colors } = useTheme();
  const themedInputStyle = { backgroundColor: colors.surface, color: colors.text };
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [iron, setIron] = useState('');
  const [potassium, setPotassium] = useState('');
  const [sugar, setSugar] = useState('');
  const [sodium, setSodium] = useState('');


  const handleSelectProduct = (product: Product) => {
      const nutrients = product.nutriments || {}
      setCalories(String(Number(calories) + (Math.round (nutrients['energy-kcal_100g'] || 0))));
      setCarbs(String(Number(carbs) + (Math.round (nutrients['carbohydrates_100g'] || 0) )));
      setFat(String(Number(fat) + (Math.round (nutrients['fat_100g'] || 0) )));
      setProtein(String(Number(protein) + (Math.round (nutrients['proteins_100g'] || 0))));
      setSugar(String(Number(sugar) + (Math.round(nutrients['sugars_100g'] || 0))));

      setPotassium(String(Number(potassium) + (Math.round(1000 * (nutrients['potassium_100g'] || 0) ))));
      setSodium(String(Number(sodium) + (Math.round(1000 * (nutrients['sodium_100g'] || 0)))));
      setIron(String(Number(iron) + (Math.round(1000 * (nutrients['iron_100g'] || 0)))));
    } 


  const handleAddMeal = async () => {
    if (!name || !calories) {
      Alert.alert('Error', 'Please enter a meal name and calories.');
      return;
    }

    await addMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      potassium: Number(potassium) || 0,

      sodium: Number(sodium) || 0,
      iron: Number(iron) || 0,
      sugar: Number(sugar) || 0,
    });

    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setSodium('');
    setPotassium('');
    setIron('');
    setSugar('');

    Alert.alert('Success', 'Meal added successfully!');

    
    router.replace('/tabs');
  };
  return (
    <ScrollView
      style={[globalStyles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='handled'
    >
      <Text style={[globalStyles.title, { color: colors.text }]}>Add Meal</Text>
      <Search onSelectProduct = {handleSelectProduct}></Search>
      <TextInput
        style={[styles.input, themedInputStyle, { marginTop: 16 }]}
        placeholder='Meal name'
        placeholderTextColor={colors.text}
        value={name}
        onChangeText={setName}
      />
      <Text style = {[styles.labelText, { color: colors.textSecondary, marginTop: 10 }]}>Calories</Text>
      <TextInput
        style={[styles.input, themedInputStyle]}
        placeholder='(kcal)'
        placeholderTextColor={colors.text}
        keyboardType='numeric'
        value={calories}
        onChangeText={setCalories}
      />
      <View style={styles.labelRow}>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Protein</Text>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Carbs</Text>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Fat</Text>
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder='(g)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={protein}          
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder='(g)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder='(g)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={fat}
          onChangeText={setFat}
        />
      </View>

      <View style={styles.labelRow}>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Sugar</Text>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Sodium</Text>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Potassium</Text>
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Iron</Text>
      </View>


       <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder=' (g)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={sugar}
          onChangeText={setSugar}
        />
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder='(mg)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={sodium}
          onChangeText={setSodium}
        />
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder=' (mg)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={potassium}
          onChangeText={setPotassium}
        />
        <TextInput
          style={[styles.input, styles.rowInput, themedInputStyle]}
          placeholder=' (mg)'
          placeholderTextColor={colors.text}
          keyboardType='numeric'
          value={iron}
          onChangeText={setIron}
        />
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddMeal}>
        <Text style={[styles.buttonText, { color: colors.header }]}>Add Meal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 300,
  },
  labelText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {  
    padding: 16,
    borderRadius: 10,
    fontSize: 14,
  },
  labelRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
    paddingHorizontal: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});