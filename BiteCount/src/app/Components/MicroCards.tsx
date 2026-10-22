import { StyleSheet, Text, View } from 'react-native';
import {colors} from '../../../styles/global'

type MicroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function MicroCard({
    label,
    value,
    goal,
    color
}: MicroCardProps){
    return(
        <View style = {[styles.card, {borderColor: color}]}>
            <Text style = {styles.label}>{label}</Text>
            <Text style = {styles.value}>{value}</Text>
            <Text style = {styles.goal}>{goal}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width:' 22%',
        padding: 10,
        borderRadius: 12,
        borderLeftWidth: 3,
        backgroundColor: colors.header,
    },
    label: {
        fontSize: 10,
        color: colors.textSecondary,
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 4,
    },
    goal: {
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 2,
},
})