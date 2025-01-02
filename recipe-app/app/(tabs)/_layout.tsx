import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Use a transparent background on iOS to show the blur effect
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="minhas_receitas"
        options={{
          title: 'Minhas Receitas',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="food-bank" color={color} />,
        }}
      />
      <Tabs.Screen
        name="criar_receitas"
        options={{
          title: 'Criar Receita',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="post-add" color={color} />,
        }}
      />
     <Tabs.Screen
        name="receitas/[id]"
        options={{
          title: 'Receita',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="receitas/edit/[id]"
        options={{
          title: 'Editar Receita',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
    
  );
}
