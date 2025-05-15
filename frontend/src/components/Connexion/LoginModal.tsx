import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import api from "@/src/lib/api";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LoginModal = ({ visible, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
        const response = await api.post("/auth/login", {
            username,
            password,
        });

        await login(username, response.data.access_token);
        onClose();

    } catch(error: any) {
        const message = error.response?.data?.msg || "Connexion échouée";
        Alert.alert("Erreur", message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Se connecter" onPress={handleLogin} />
          <Button title="Annuler" onPress={onClose} color="gray" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
