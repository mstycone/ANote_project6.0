// src/hooks/useHomeTasks.ts
import { useTasks } from "@/src/context/TasksContext";
import { TaskProps } from "@/src/screens/Home";
import { useState } from "react";
import { Alert } from "react-native";

export function useTaskHandlers() {
  const { tasks, setTasks } = useTasks();
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function handleCreateNewTask() {
    const newTask: TaskProps = {
      id: new Date().getTime().toString(),
      title: "",
      checked: false,
      description: "",
      listItems: [],
    };

    setSelectedTask(newTask);
    setModalVisible(true);
  }

  function handleCheck(id: string) {
    const newTasks = tasks.map((item) => {
      if (item.id === id) item.checked = !item.checked;
      return item;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: string) {
    Alert.alert(
      "Supprimer",
      `Êtes-vous sûre de vouloir supprimer cette tâche`,
      [
        {
          text: "Oui",
          onPress: () => {
            const newTasks = tasks.filter((item) => item.id !== id);
            setTasks(newTasks);
          },
        },
        { text: "Non", style: "cancel" },
      ]
    );
  }

  function handleOpenTask(task: TaskProps) {
    setSelectedTask(task);
    setModalVisible(true);
  }

  function handleSaveTask(updatedTask: TaskProps) {
    const exists = tasks.some((task) => task.id === updatedTask.id);

    if (exists) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } else {
      setTasks((prev) => [...prev, updatedTask]);
    }

    setSelectedTask(null);
  }

  function handleToggleImportant(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, important: !task.important };
      }
      return task;
    });
  
    setTasks(newTasks);
  }  

  return {
    tasks,
    taskTitle,
    setTaskTitle,
    selectedTask,
    modalVisible,
    setModalVisible,
    setSelectedTask,
    handleCreateNewTask,
    handleCheck,
    handleRemoveTask,
    handleOpenTask,
    handleSaveTask,
    handleToggleImportant
  };
}
