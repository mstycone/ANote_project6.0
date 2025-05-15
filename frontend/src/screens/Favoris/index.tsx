import { EmptyFavList } from "@/src/components/Favoris/EmptyFavList";
import { Task } from "@/src/components/Task/Task";
import { TaskModal } from "@/src/components/Task/TaskModal";
import { useTaskHandlers } from '@/src/hooks/useTaskHandlers';
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Favoris() {
  
  const {
    tasks,
    selectedTask,
    modalVisible,
    setModalVisible,
    handleCheck,
    handleRemoveTask,
    handleOpenTask,
    handleSaveTask,
    handleToggleImportant 
  } = useTaskHandlers();

  // Filtrer les tâches marquées comme importantes
  const importantTasks = tasks.filter((task) => task.important);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <AntDesign name="star" size={25} style={{
            color: 'gold',
            marginRight: 20
          }}
      /> Tâches Urgentes</Text>

      <FlatList
        data={importantTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            key={item.id}
            data={item}
            handleCheck={handleCheck}
            handleDelete={handleRemoveTask}
            onPressTask={handleOpenTask}
            onToggleImportant={handleToggleImportant}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyFavList />}
        contentContainerStyle={{
            paddingBottom: 200,
            marginBottom: 50,
            marginTop: 45,
            marginLeft: 4,
            marginRight: 4,
          }}
      />
      <TaskModal
         visible={modalVisible}
         task={selectedTask}
         onClose={() => setModalVisible(false)}
         onSave={handleSaveTask}
        />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
      backgroundColor: "#F5F5F5",
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#1E1E1E",
      marginBottom: 40,
      textAlign: "left",
    },
});
