// components/TaskListEditor.tsx
import checked from "@/src/assets/checked.png";
import styles from '@/src/constants/TaskModalStyle';
import { SubItem } from '@/src/screens/Home';
import React from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TaskListEditorProps {
  listItems: SubItem[];
  setListItems: React.Dispatch<React.SetStateAction<SubItem[]>>;
  inputRefs: React.MutableRefObject<{ [key: string]: TextInput | null }>;
  addNewItem: () => void;
  toggleItemDone: (id: string) => void;
  updateItemText: (id: string, text: string) => void;
  deleteItem: (id: string) => void;
  listHeight: number;
}

export const TaskListEditor = ({
  listItems,
  setListItems,
  inputRefs,
  addNewItem,
  toggleItemDone,
  updateItemText,
  deleteItem,
  listHeight
}: TaskListEditorProps) => {
  return (
    <View style={{ maxHeight: listHeight, minHeight: 500 }}>
      <FlatList
        data={listItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Aucun élément dans la liste</Text>}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => toggleItemDone(item.id)}
              style={item.done ? styles.checked : styles.unchecked}
            >
              {item.done && <Image source={checked} style={{ width: 12, height: 12 }} />}
            </TouchableOpacity>

            <TextInput
              ref={(ref) => (inputRefs.current[item.id] = ref)}
              value={item.text}
              onChangeText={(text) => updateItemText(item.id, text)}
              onSubmitEditing={addNewItem}
              blurOnSubmit={false}
              returnKeyType="next"
              style={item.done ? styles.textChecked : styles.text}
            />

            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteIcon}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addItemButton} onPress={addNewItem}>
            <Text style={styles.addItemText}>Ajouter un item</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
