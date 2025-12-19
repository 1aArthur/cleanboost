import React, { useState } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useDeviceInfo } from "@/hooks/use-device-info";

interface AppItem {
  id: string;
  name: string;
  size: number;
  batteryUsage: number;
  dataUsage: number;
}

export default function AppsScreen() {
  const insets = useSafeAreaInsets();
  const { deviceInfo, loading } = useDeviceInfo();
  const [sortBy, setSortBy] = useState<"size" | "battery" | "data">("battery");

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  // Simular lista de apps
  const mockApps: AppItem[] = [
    {
      id: "1",
      name: "Chrome",
      size: 250 * 1024 * 1024,
      batteryUsage: 35,
      dataUsage: 500,
    },
    {
      id: "2",
      name: "WhatsApp",
      size: 150 * 1024 * 1024,
      batteryUsage: 25,
      dataUsage: 300,
    },
    {
      id: "3",
      name: "Instagram",
      size: 200 * 1024 * 1024,
      batteryUsage: 20,
      dataUsage: 400,
    },
    {
      id: "4",
      name: "YouTube",
      size: 300 * 1024 * 1024,
      batteryUsage: 15,
      dataUsage: 600,
    },
    {
      id: "5",
      name: "Spotify",
      size: 100 * 1024 * 1024,
      batteryUsage: 10,
      dataUsage: 200,
    },
    {
      id: "6",
      name: "Maps",
      size: 180 * 1024 * 1024,
      batteryUsage: 8,
      dataUsage: 150,
    },
    {
      id: "7",
      name: "Gmail",
      size: 120 * 1024 * 1024,
      batteryUsage: 5,
      dataUsage: 100,
    },
    {
      id: "8",
      name: "Telegram",
      size: 140 * 1024 * 1024,
      batteryUsage: 12,
      dataUsage: 250,
    },
  ];

  const sortedApps = [...mockApps].sort((a, b) => {
    if (sortBy === "size") return b.size - a.size;
    if (sortBy === "battery") return b.batteryUsage - a.batteryUsage;
    return b.dataUsage - a.dataUsage;
  });

  const renderApp = ({ item }: { item: AppItem }) => (
    <View style={styles.appItem}>
      <View style={styles.appHeader}>
        <View style={styles.appIcon} />
        <View style={styles.appInfo}>
          <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
          <ThemedText type="default" style={styles.appSize}>
            {formatBytes(item.size)}
          </ThemedText>
        </View>
      </View>
      <View style={styles.appStats}>
        <View style={styles.stat}>
          <ThemedText type="default" style={styles.statLabel}>
            Bateria
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {item.batteryUsage}%
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="default" style={styles.statLabel}>
            Dados
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {formatBytes(item.dataUsage * 1024 * 1024)}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title">Apps em 2º Plano</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Otimize apps que consomem bateria e dados
        </ThemedText>
      </View>

      {/* Sort Buttons */}
      <View style={styles.sortContainer}>
        <View style={styles.sortButtons}>
          {["battery", "size", "data"].map((option) => (
            <View
              key={option}
              style={[
                styles.sortButton,
                sortBy === option && styles.sortButtonActive,
              ]}
            >
              <ThemedText
                type="default"
                style={[
                  styles.sortButtonText,
                  sortBy === option && styles.sortButtonTextActive,
                ]}
              >
                {option === "battery"
                  ? "Bateria"
                  : option === "size"
                    ? "Tamanho"
                    : "Dados"}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {loading || !deviceInfo ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00D9FF" />
        </View>
      ) : (
        <FlatList
          data={sortedApps}
          renderItem={renderApp}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  sortContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortButtons: {
    flexDirection: "row",
    gap: 8,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
    alignItems: "center",
  },
  sortButtonActive: {
    backgroundColor: "#00D9FF",
    borderColor: "#00D9FF",
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.6)",
  },
  sortButtonTextActive: {
    color: "#0A0E27",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  appItem: {
    backgroundColor: "#1A1F3A",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0, 217, 255, 0.2)",
  },
  appInfo: {
    flex: 1,
    gap: 4,
  },
  appSize: {
    fontSize: 12,
    opacity: 0.7,
  },
  appStats: {
    flexDirection: "row",
    gap: 12,
  },
  stat: {
    flex: 1,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 13,
    color: "#00D9FF",
  },
});
