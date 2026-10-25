import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../storage/ThemeContext';

type MicroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
  onPressed: () => void;
};

export default function MicroCard({
    label,
    value,
    goal,
    color,
    onPressed,
}: MicroCardProps){
    const { colors } = useTheme();

    return(
        <TouchableOpacity onPress={onPressed} style = {{width: '22%'}}>
        <View style = {[styles.card, {borderColor: color, backgroundColor: colors.header}]}>
            <Text style = {[styles.label, {color: colors.textSecondary}]}>{label}</Text>
            <Text style = {[styles.value, {color: colors.text}]}>{value}/</Text>
            <Text style = {[styles.goal, {color: colors.textSecondary}]}>{goal}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        
        height: 80,   
        padding: 10,
        borderRadius: 12,
        borderLeftWidth: 3,
    },
    label: {
        fontWeight:'bold',
        fontSize: 10,
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    goal: {
        fontSize: 10,
        marginTop: 2,
},
})