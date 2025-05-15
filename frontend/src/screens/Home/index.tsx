import ButtonAdd from "@/src/components/Home/ButtonAdd";
import { EmptyList } from "@/src/components/Home/EmptyList";
import { Task } from "@/src/components/Task/Task";
import { TaskInfo } from "@/src/components/Task/TaskInfo";
import { TaskModal } from "@/src/components/Task/TaskModal";
import { useTaskHandlers } from '@/src/hooks/useTaskHandlers';
import { LoginModal } from "@/src/components/Connexion/LoginModal"; 

import React from "react";
import { FlatList, View } from "react-native";

import styles from "@/src/constants/HomeStyle";

export interface SubItem {
  id: string;
  text: string;
  done: boolean;
}

export type TaskProps = {
  id: string;
  title: string;
  checked: boolean;
  description?: string;
  listItems?: SubItem[]; //Sous-tâches 
  important?: boolean; //favoris 
};

export function Home() {
  const { 
    tasks,
    selectedTask,
    modalVisible,
    setModalVisible,
    handleProtectedCreate,
    showLogin, 
    setShowLogin,
    handleCheck,
    handleRemoveTask,
    handleOpenTask,
    handleSaveTask,
    handleToggleImportant 
  } = useTaskHandlers();

  return (
    <View style={styles.container}>
      <View style={styles.form}></View>
      <View style={styles.titleContainer}>
        <TaskInfo 
          label="Créée(s)" 
          value={tasks.length} 
          color="#4EA8DE" 
        />
        <TaskInfo
          label="Faite(s)"
          value={tasks.filter((item) => item.checked).length}
          color="#8284FA"
        />
      </View>
      
      <FlatList
        data={tasks}
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
        ListEmptyComponent={() => <EmptyList />}
        contentContainerStyle={{
          paddingBottom: 200,
          marginBottom: 50
        }}
      />
      <TaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTask}
      />
      <ButtonAdd onPress={handleProtectedCreate}/>
      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
    </View>
  );
}
