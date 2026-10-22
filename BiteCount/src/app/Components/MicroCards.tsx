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
        <View style = {{}}>
            <Text style = {{}}>label</Text>
            <Text style = {{}}>value</Text>
            <Text style = {{}}>goal</Text>

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
    }

})