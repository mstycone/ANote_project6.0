import { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { TaskProps } from "@/src/screens/Home";
import api from "@/src/lib/api";

export function useTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tasks/"); 
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<TaskProps>) => {
    try {
      const response = await api.post("/tasks/", task);
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  const updateTask = async (task: TaskProps) => {
    try {
      await api.put(`/tasks/${task.id}`, task);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setTasks,
  };
}
