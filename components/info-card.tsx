import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

interface InfoCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
}

export function InfoCard({ title, value, subtitle, icon, color = "#00D9FF" }: InfoCardProps) {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.header}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <ThemedText type="title" style={[styles.value, { color }]}>
        {value}
      </ThemedText>
      {subtitle && (
        <ThemedText type="default" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
});
