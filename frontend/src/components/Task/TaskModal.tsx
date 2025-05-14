
import TaskActions from '@/src/components/Task/TaskActions';
import { TaskListEditor } from '@/src/components/Task/TaskListEditor';
import { TaskModeToggle } from '@/src/components/Task/TaskModeToggle';
import { useTaskModal } from "@/src/hooks/useTaskModalHandlers";
import { TaskProps } from '@/src/screens/Home';
import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, TextInput, View } from 'react-native';

import styles from '@/src/constants/TaskModalStyle';

interface TaskModalProps {
    visible: boolean;
    task: TaskProps | null;
    onClose: () => void;
    onSave: (updatedTask: TaskProps) => void;
}

export function TaskModal({ visible, task, onClose, onSave }: TaskModalProps) {
  const {
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
    //itemRefs,
    toggleItemDone,
    updateItemText,
    addNewItem,
    deleteItem,
  } = useTaskModal(task);

  if (!task) return null;

  return(
    <Modal visible={visible} animationType='slide'>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // ajuste si nécessaire
      >
        <View style={[styles.container]}>
          <TextInput
            ref={titleRef}
            placeholder="Titre de la tâche"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            blurOnSubmit={false}
            style={styles.titleInput}
          />
          <TaskModeToggle mode={mode} setMode={setMode} />

            {mode === "text" ? (
              <TextInput
                ref={descriptionRef}
                multiline
                placeholder="Ajouter une description..."
                value={description}
                onChangeText={setDescription}
                style={styles.descriptionInput}
              />
            ) : (
              <View style={{ 
                maxHeight: listHeight,
                minHeight: 500, 
              }}>
                <TaskListEditor
                  listItems={listItems}
                  setListItems={setListItems}
                  inputRefs={inputRefs}
                  addNewItem={addNewItem}
                  toggleItemDone={toggleItemDone}
                  updateItemText={updateItemText}
                  deleteItem={deleteItem}
                  listHeight={listHeight}
                />

              </View>
            )}
            <TaskActions 
              onCancel={onClose} 
              onSave={() => {
                onSave({
                  ...task,
                  title,
                  description: mode === "text" ? description : "",
                  listItems: mode === "list" ? listItems : [],
                });
                onClose();
              }} 
            />

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

