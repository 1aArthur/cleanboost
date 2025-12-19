import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "./themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  onPress: () => void;
  color?: string;
}

export function QuickActionCard({
  title,
  subtitle,
  icon,
  onPress,
  color = "#00D9FF",
}: QuickActionCardProps) {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={[styles.icon, { borderColor: color }]}>{icon}</View>}
        <View style={styles.textContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            {subtitle}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.arrow, { color }]}>→</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
