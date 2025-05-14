import { Image, Text, TouchableOpacity, View } from "react-native";

import { TaskProps } from "@/src/screens/Home";

import styles from "@/src/constants/TaskStyles";

import checked from "@/src/assets/checked.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome6';

interface Props {
  data: TaskProps;
  handleCheck: (id: string) => void;
  handleDelete: (id: string) => void;
  onPressTask?: (task: TaskProps) => void; //Ajout du callback
  onToggleImportant?: (id: string) => void;
}

export function Task({ data, handleCheck, handleDelete, onPressTask, onToggleImportant }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleCheck(data.id)}
        activeOpacity={0.7}
        style={data.checked ? styles.checked : styles.unchecked}
      >
        {data.checked && <Image source={checked} />}
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => onPressTask?.(data)}
      style={{ flex: 1 }} 
      activeOpacity={0.6}
      >
        <Text style={data.checked ? styles.textChecked : styles.text}>
          {data.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onToggleImportant(data.id)}>
        {data.important ? (
          <AntDesign name="star" size={25} style={{
            color: 'gold',
            marginRight: 20
          }} />
        ) : (
          <AntDesign name="staro" size={25} style={{
            color: 'grey',
            marginRight: 20
          }} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleDelete(data.id)}
        activeOpacity={0.7}
      >
        <FontAwesome name="trash" size={20} style={{
            paddingRight: 15, 
            color: '#d1cbc9'
        }}/>
      </TouchableOpacity>
    </View>
  );
}