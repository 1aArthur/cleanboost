import React from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { HealthRing } from "@/components/health-ring";
import { InfoCard } from "@/components/info-card";
import { QuickActionCard } from "@/components/quick-action-card";
import { useDeviceInfo } from "@/hooks/use-device-info";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { deviceInfo, loading } = useDeviceInfo();
  const router = useRouter();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  const healthScore = deviceInfo
    ? Math.round(100 - (deviceInfo.storagePercentage + deviceInfo.ramPercentage) / 2)
    : 0;

  return (
    <ThemedView style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Dashboard</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Visão geral do seu dispositivo
          </ThemedText>
        </View>

        {loading || !deviceInfo ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D9FF" />
          </View>
        ) : (
          <>
            {/* Health Ring */}
            <View style={styles.healthSection}>
              <HealthRing percentage={healthScore} label="Saúde Geral" color="#00D9FF" />
            </View>

            {/* Info Cards */}
            <View style={styles.infoSection}>
              <InfoCard
                title="Armazenamento"
                value={formatBytes(deviceInfo.usedStorage)}
                subtitle={`de ${formatBytes(deviceInfo.totalStorage)} (${Math.round(deviceInfo.storagePercentage)}%)`}
                color="#00D9FF"
              />
              <InfoCard
                title="Memória RAM"
                value={formatBytes(deviceInfo.ramUsed)}
                subtitle={`de ${formatBytes(deviceInfo.ramTotal)} (${Math.round(deviceInfo.ramPercentage)}%)`}
                color="#00C853"
              />
              <InfoCard
                title="Lixo Estimado"
                value={formatBytes(deviceInfo.cacheSize)}
                subtitle="Pronto para limpar"
                color="#FFD60A"
              />
            </View>

            {/* Quick Actions */}
            <View style={styles.actionsSection}>
              <ThemedText type="subtitle" style={styles.actionsTitle}>
                Ações Rápidas
              </ThemedText>

              <QuickActionCard
                title="Limpeza Rápida"
                subtitle={`${formatBytes(deviceInfo.cacheSize)} para liberar`}
                onPress={() => router.push("/(tabs)/cleanup")}
                color="#00D9FF"
              />

              <QuickActionCard
                title="Arquivos Grandes"
                subtitle="Encontre e gerencie arquivos"
                onPress={() => router.push("/(tabs)/files")}
                color="#00D9FF"
              />

              <QuickActionCard
                title="Monitor de RAM"
                subtitle={`${Math.round(deviceInfo.ramPercentage)}% em uso`}
                onPress={() => router.push("/(tabs)/monitor")}
                color="#00C853"
              />

              <QuickActionCard
                title="Apps em 2º Plano"
                subtitle={`${deviceInfo.appCount} apps instalados`}
                onPress={() => router.push("/(tabs)/apps")}
                color="#00D9FF"
              />
            </View>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
  healthSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 16,
  },
  infoSection: {
    marginBottom: 32,
  },
  actionsSection: {
    marginBottom: 16,
  },
  actionsTitle: {
    marginBottom: 12,
  },
});
