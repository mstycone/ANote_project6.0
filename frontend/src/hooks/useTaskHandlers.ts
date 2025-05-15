import { useTasks } from "@/src/hooks/useTasksApi";
import { TaskProps } from "@/src/screens/Home";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import { Alert } from "react-native";


export function useTaskHandlers() {
  const {
    tasks,
    setTasks,
    createTask,
    updateTask,
    deleteTask
  } = useTasks();

  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();

  function handleCheck(id: string) {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find((t) => t.id === id);
    if (updatedTask) updateTask(updatedTask); // ici on persiste
  }

  function handleRemoveTask(id: string) {
    Alert.alert(
      "Supprimer",
      "Êtes-vous sûr de vouloir supprimer cette tâche ?",
      [
        {
          text: "Oui",
          onPress: () => {
            deleteTask(id); // API + setTasks inclus
          },
        },
        { text: "Non", style: "cancel" },
      ]
    );
  }

  function handleSaveTask(updatedTask: TaskProps) {
    if (tasks.some((t) => t.id === updatedTask.id)) {
      updateTask(updatedTask);
    } else {
      createTask(updatedTask);
    }
    setSelectedTask(null);
  }

  function handleToggleImportant(id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find((t) => t.id === id);
    if (updatedTask) updateTask(updatedTask);
  }

  function handleOpenTask(task: TaskProps) {
    setSelectedTask(task);
    setModalVisible(true);
  }

  function handleCreateNewTask() {
    const newTask: TaskProps = {
      id: new Date().getTime().toString(),
      title: "",
      checked: false,
      description: "",
      listItems: [],
      important: false
    };
    setSelectedTask(newTask);
    setModalVisible(true);
  }

  function handleProtectedCreate() {
    if (isAuthenticated) {
      handleCreateNewTask();
    } else {
      setShowLogin(true);
    }
  }

  return {
    tasks,
    taskTitle,
    setTaskTitle,
    selectedTask,
    modalVisible,
    setModalVisible,
    setSelectedTask,
    handleProtectedCreate,
    showLogin,
    setShowLogin,
    handleCheck,
    handleRemoveTask,
    handleOpenTask,
    handleSaveTask,
    handleToggleImportant,
  };
}
