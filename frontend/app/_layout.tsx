import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from "@/src/context/AuthContext";


export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false
          }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar 
        style="dark"
        backgroundColor="transparent"
       />
    </AuthProvider>
  );
}

