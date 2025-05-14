import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
    onPress: () => void;
};

export default function ButtonAdd({ onPress }: Props) {
    return (
        <View style={styles.circleButtonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name="add" size={30} color="#222" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    circleButtonContainer: {
        position: 'absolute',
        right: -40,
        bottom: 120,
        elevation: 5,
        width: 70,
        height: 70,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: '#673ab7',
        borderRadius: 25,
        padding: 3,
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
    }
});