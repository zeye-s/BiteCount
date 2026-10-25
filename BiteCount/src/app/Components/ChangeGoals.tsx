import MicroCard from './MicroCards';
import MacroCard from '../Components/MacroCards';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal} from 'react-native'
import {colors} from '../../../styles/global'
import {useState} from 'react'

type changeGoalProps = {
    visible: boolean,
    label: string,
    currentGoal: string,
    onClose: () => void,
    onSave: (newGoal: string) => void,
}


export default function changeGoal(
    {
        visible,
        label,
        currentGoal,
        onClose,
        onSave,
    }:changeGoalProps){
     
    
    const[newGoal,setNewGoal] = useState(currentGoal);
    return(
        <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit Goal for {label}</Text>
          
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={newGoal}
            onChangeText={setNewGoal}
            placeholder="Enter new goal"
            placeholderTextColor={colors.textSecondary}
            autoFocus
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={() => {
                onSave(newGoal);
                onClose();
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
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
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  input: {
    backgroundColor: colors.header,
    color: colors.text,
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
  cancelButton: {
    backgroundColor: colors.header,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: colors.background,
    fontWeight: 'bold',
  },
});
