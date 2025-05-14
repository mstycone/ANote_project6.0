import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";

export function EmptyList() {
  return (
    <View style={styles.container}>
      <FontAwesome name="clipboard-list" size={70} color="#808080"/>
      <Text style={styles.text}>
        Aucune tâche à afficher {"\n"} 
        Pour commencer{"\n"}
        Veuillez presser le bouton + 
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
        // padding: 48px 20px;
    },
      text: {
        fontWeight: "700",
        fontSize: 14,
        textAlign: "center",
        color: "#808080",
        marginTop: 30,
    },
})