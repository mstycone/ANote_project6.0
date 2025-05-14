import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

export function EmptyFavList() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="star-check" size={80} color="#808080"/>
      <Text style={styles.text}>
        Aucune tâche urgente à afficher
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 150,
        paddingHorizontal: 20,
    },
      text: {
        fontWeight: "700",
        fontSize: 14,
        textAlign: "center",
        color: "#808080",
        marginTop: 30,
    },
})