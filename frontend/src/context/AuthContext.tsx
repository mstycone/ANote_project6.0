import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  login: (username: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
  username: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUsername = await AsyncStorage.getItem("username");

      if (storedToken) {
        setToken(storedToken);
        setUsername(storedUsername);
        setIsAuthenticated(true);
      }
    };

    loadStoredAuth();
  }, []);

  const login = async (username: string, newToken: string) => {
    setToken(newToken);
    setUsername(username);
    setIsAuthenticated(true);
    await AsyncStorage.setItem("token", newToken);
    await AsyncStorage.setItem("username", username);
  };

  const logout = async () => {
    setToken(null);
    setUsername(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider 
        value={{ 
            isAuthenticated, 
            token, 
            username, 
            login, 
            logout 
        }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
