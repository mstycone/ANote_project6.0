import TabBar from '@/src/components/TabBar/TabBar';
import { TasksProvider } from "@/src/context/TasksContext";
import { Tabs } from 'expo-router';
import React from 'react';





export default function TabLayout() {

  return (
    <TasksProvider>
      <Tabs 
        tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" 
          options={{ 
            title: 'Home',
            headerShown: false,
          }} 
        />
        <Tabs.Screen name="favoris" 
          options={{ 
            title: 'Favoris',
            headerShown: false,
          }} 
        />
        <Tabs.Screen name="profile" 
          options={{ 
            title: 'Profile',
            headerShown: false,
          }} 
        />
      </Tabs>
    </TasksProvider>
  );
}
