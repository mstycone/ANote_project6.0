import { SubItem, TaskProps } from "@/src/screens/Home";
import { useEffect, useRef, useState } from "react";
import { Dimensions, TextInput } from "react-native";
import { v4 as uuidv4 } from "uuid";

export function useTaskModal(task: TaskProps | null) {
  const [mode, setMode] = useState<"text" | "list">("text");
  const [description, setDescription] = useState("");
  const [listItems, setListItems] = useState<SubItem[]>([]);
  const [title, setTitle] = useState("");

  const screenHeight = Dimensions.get("window").height;
  const listHeight = screenHeight * 0.4;

  const inputRefs = useRef<{ [key: string]: TextInput | null }>({});
  const titleRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const itemRefs = useRef<{ [key: string]: TextInput | null }>({});

  function toggleItemDone(id: string) {
    setListItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function updateItemText(id: string, newText: string) {
    setListItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }

  function addNewItem() {
    const newId = uuidv4();
    const newItem = { id: newId, text: "", done: false };

    setListItems((prev) => [...prev, newItem]);

    setTimeout(() => {
      inputRefs.current[newId]?.focus();
    }, 100);
  }

  function deleteItem(id: string) {
    setListItems((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setListItems(task.listItems || []);
      setMode(task.listItems?.length ? "list" : "text");

      if (!task.id) {
        setTimeout(() => {
          titleRef.current?.focus();
        }, 300);
      }
    }
  }, [task]);

  return {
    mode,
    setMode,
    description,
    setDescription,
    listItems,
    setListItems,
    title,
    setTitle,
    listHeight,
    inputRefs,
    titleRef,
    descriptionRef,
    itemRefs,
    toggleItemDone,
    updateItemText,
    addNewItem,
    deleteItem,
  };
}
