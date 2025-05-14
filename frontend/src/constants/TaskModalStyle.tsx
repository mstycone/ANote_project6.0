import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: "#fff",
    },
    titleInput: {
      fontSize: 22,
      fontWeight: "600",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginBottom: 16,
    },
    descriptionInput: {
      height: 500,
      padding: 10,
      textAlignVertical: "top",
      backgroundColor: "#fff",
    },
    modeToggle: {
      flexDirection: "row",
      alignSelf: "center",
      marginBottom: 16,
      borderRadius: 20,
      backgroundColor: "#E0E0E0",
    },
    modeButton: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    modeButtonActive: {
      backgroundColor: "#4EA8DE",
    },
    modeText: {
      fontSize: 16,
      color: "#555",
    },
    modeTextActive: {
      color: "#fff",
      fontWeight: "600",
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    text: {
      flex: 1,
      color: "#222",
      fontSize: 16,
      marginLeft: 12,
    },
    textChecked: {
      flex: 1,
      color: "#999",
      fontSize: 16,
      marginLeft: 12,
      textDecorationLine: "line-through",
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
    deleteIcon: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#d1cbc9",
      marginRight: 10,
    },
    addItemButton: {
      borderWidth: 1,
      borderColor: "#5E60CE",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignSelf: "center",
      marginTop: 20,
    },
    addItemText: {
      color: "#5E60CE",
      fontSize: 16,
      fontWeight: "600",
    },
    emptyMessage: {
      textAlign: "center",
      color: "#999",
      fontStyle: "italic",
      marginVertical: 20,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 30,
    },
    actionButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
    },
    cancelButton: {
      backgroundColor: "#ccc",
    },
    saveButton: {
      backgroundColor: "#5E60CE",
    },
    actionText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  export default styles;