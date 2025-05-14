import { Text, View } from "react-native";

import styles from "@/src/constants/TaskInfoStyle";

interface Props {
  label: string;
  value: number;
  color: string;
}

export function TaskInfo({ label, value, color }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color }]}>{label}</Text>

      <View style={styles.countContainer}>
        <Text style={styles.count}>{value}</Text>
      </View>
    </View>
  );
}
