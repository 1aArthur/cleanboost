import React from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { HealthRing } from "@/components/health-ring";
import { InfoCard } from "@/components/info-card";
import { useDeviceInfo } from "@/hooks/use-device-info";

export default function MonitorScreen() {
  const insets = useSafeAreaInsets();
  const { deviceInfo, loading } = useDeviceInfo();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Monitor de RAM</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Acompanhe o uso de memória em tempo real
          </ThemedText>
        </View>

        {loading || !deviceInfo ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D9FF" />
          </View>
        ) : (
          <>
            {/* RAM Ring */}
            <View style={styles.ringSection}>
              <HealthRing
                percentage={deviceInfo.ramPercentage}
                label="Uso de RAM"
                color="#00C853"
              />
            </View>

            {/* RAM Info */}
            <InfoCard
              title="Memória em Uso"
              value={formatBytes(deviceInfo.ramUsed)}
              subtitle={`de ${formatBytes(deviceInfo.ramTotal)}`}
              color="#00C853"
            />

            <InfoCard
              title="Memória Disponível"
              value={formatBytes(deviceInfo.ramFree)}
              subtitle={`${Math.round((deviceInfo.ramFree / deviceInfo.ramTotal) * 100)}% livre`}
              color="#00D9FF"
            />

            {/* Top Apps */}
            <View style={styles.appsSection}>
              <ThemedText type="subtitle" style={styles.appsTitle}>
                Apps com Maior Consumo
              </ThemedText>

              {[
                { name: "Chrome", usage: 0.35 },
                { name: "WhatsApp", usage: 0.25 },
                { name: "Instagram", usage: 0.2 },
                { name: "YouTube", usage: 0.15 },
                { name: "Spotify", usage: 0.05 },
              ].map((app, index) => (
                <View key={index} style={styles.appItem}>
                  <View style={styles.appInfo}>
                    <ThemedText type="defaultSemiBold">{app.name}</ThemedText>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${app.usage * 100}%` },
                        ]}
                      />
                    </View>
                  </View>
                  <ThemedText type="default" style={styles.appUsage}>
                    {formatBytes(deviceInfo.ramUsed * app.usage)}
                  </ThemedText>
                </View>
              ))}
            </View>

            {/* Tips */}
            <View style={styles.tipsSection}>
              <ThemedText type="subtitle" style={styles.tipsTitle}>
                Dicas para Otimizar
              </ThemedText>

              <View style={styles.tip}>
                <ThemedText type="default">
                  • Feche apps que não está usando para liberar RAM
                </ThemedText>
              </View>

              <View style={styles.tip}>
                <ThemedText type="default">
                  • Desative notificações de apps em segundo plano
                </ThemedText>
              </View>

              <View style={styles.tip}>
                <ThemedText type="default">
                  • Limpe o cache regularmente para melhor desempenho
                </ThemedText>
              </View>
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
  ringSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 16,
  },
  appsSection: {
    marginBottom: 32,
  },
  appsTitle: {
    marginBottom: 12,
  },
  appItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    gap: 12,
  },
  appInfo: {
    flex: 1,
    gap: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00C853",
  },
  appUsage: {
    fontSize: 12,
    opacity: 0.7,
    minWidth: 60,
    textAlign: "right",
  },
  tipsSection: {
    marginBottom: 16,
  },
  tipsTitle: {
    marginBottom: 12,
  },
  tip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#00D9FF",
  },
});
