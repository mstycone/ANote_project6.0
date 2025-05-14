import styles from '@/src/constants/TaskModalStyle';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TaskActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function TaskActions({ onCancel, onSave }: TaskActionsProps) {
  return (
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={onCancel}
        style={[styles.actionButton, styles.cancelButton]}
      >
        <Text style={styles.actionText}>Annuler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSave}
        style={[styles.actionButton, styles.saveButton]}
      >
        <Text style={styles.actionText}>Sauvegarder</Text>
      </TouchableOpacity>
    </View>
  );
}
