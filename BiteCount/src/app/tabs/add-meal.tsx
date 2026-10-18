import { addMeal } from '../storage/meals';
import { colors, globalStyles } from '../../../styles/global';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Search from "../Components/SearchFood"

export default function AddMealScreen() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [iron, setIron] = useState('');
  const [potassium, setPotassium] = useState('');
  const [sugar, setSugar] = useState('');
  const [sodium, setSodium] = useState('');

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
      style={globalStyles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='handled'
    >
      <Text style={globalStyles.title}>Add Meal</Text>
      <Search></Search>
      <TextInput
        style={styles.input}
        placeholder='Meal name'
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder='Calories'
        placeholderTextColor={colors.textSecondary}
        keyboardType='numeric'
        value={calories}
        onChangeText={setCalories}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Protein (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Carbs (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Fat (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={fat}
          onChangeText={setFat}
        />
      </View>

       <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Sugar (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={sugar}
          onChangeText={setSugar}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Sodium (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={sodium}
          onChangeText={setSodium}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Potassium (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={potassium}
          onChangeText={setPotassium}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Iron (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={iron}
          onChangeText={setIron}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 300,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});