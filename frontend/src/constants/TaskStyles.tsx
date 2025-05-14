import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 8,
    },
    text: {
        flex: 1,
        color: "#222",
        fontSize: 17,
        marginLeft: 16,
        fontWeight: "500",
    },
    textChecked: {
        textDecorationLine: "line-through",
        color: "#808080",
        flex: 1,
        fontSize: 17,
        marginLeft: 16,
        fontWeight: "400",
    },
    unchecked: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#4EA8DE",
        alignItems: "center",
        justifyContent: "center",
    },
    checked: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#5E60CE",
        alignItems: "center",
        justifyContent: "center",
    },
})

export default styles;