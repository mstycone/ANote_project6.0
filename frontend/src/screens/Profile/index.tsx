import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { LoginModal } from "@/src/components/Connexion/LoginModal";

export default function Profile() {
  const { isAuthenticated, username, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowLogin(true);
    }
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Text style={styles.text}>Bonjour, {username} 👋</Text>
      ) : (
        <Text style={styles.text}>Vous êtes pas déconnecté.</Text>
      )}

      <Button
        title={isAuthenticated ? "Se déconnecter" : "Se connecter"}
        onPress={handleAuthAction}
      />

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 20 },
});
