// components/TaskModeToggle.tsx
import styles from '@/src/constants/TaskModalStyle';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  mode: 'text' | 'list';
  setMode: (mode: 'text' | 'list') => void;
}

export const TaskModeToggle = ({ mode, setMode }: Props) => (
  <View style={styles.modeToggle}>
    {['text', 'list'].map((m) => (
      <TouchableOpacity
        key={m}
        style={[styles.modeButton, mode === m && styles.modeButtonActive]}
        onPress={() => setMode(m as 'text' | 'list')}
      >
        <Text style={[styles.modeText, mode === m && styles.modeTextActive]}>
          {m === 'text' ? 'Texte' : 'Liste'}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
