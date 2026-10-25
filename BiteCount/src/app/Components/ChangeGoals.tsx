import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal} from 'react-native'
import { useTheme } from '../storage/ThemeContext';
import { useState } from 'react';

type changeGoalProps = {
    visible: boolean,
    label: string,
    currentGoal: string,
    onClose: () => void,
    onSave: (newGoal: string) => void,
}


export default function ChangeGoal(
    {
        visible,
        label,
        currentGoal,
        onClose,
        onSave,
    }:changeGoalProps){
    const { colors } = useTheme();
    const[newGoal,setNewGoal] = useState(currentGoal);
    return(
        <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Edit Goal for {label}</Text>
          
          <TextInput
            style={[styles.input, { backgroundColor: colors.header, color: colors.text }]}
            keyboardType="numeric"
            value={newGoal}
            onChangeText={setNewGoal}
            placeholder="Enter new goal"
            placeholderTextColor={colors.textSecondary}
            autoFocus
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.header }]} onPress={onClose}>
              <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {
                onSave(newGoal);
                onClose();
              }}
            >
              <Text style={[styles.saveButtonText, { color: colors.header }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontWeight: 'bold',
  },
});
