import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // Ensure tab bar respects bottom safe area for devices with home indicators
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 49 + insets.bottom, // Default tab bar height (49) + safe area
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cleanup"
        options={{
          title: "Limpeza",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trash.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="files"
        options={{
          title: "Arquivos",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="monitor"
        options={{
          title: "Monitor",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="apps"
        options={{
          title: "Apps",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
