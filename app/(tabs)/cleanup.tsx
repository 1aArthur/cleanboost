import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { InfoCard } from "@/components/info-card";
import { useDeviceInfo } from "@/hooks/use-device-info";

export default function CleanupScreen() {
  const insets = useSafeAreaInsets();
  const { deviceInfo, loading, refresh } = useDeviceInfo();
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  const handleCleanup = async () => {
    setIsCleaning(true);
    // Simular limpeza
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCleaned(true);
    setIsCleaning(false);
    // Atualizar informações após limpeza
    setTimeout(() => {
      refresh();
      setCleaned(false);
    }, 2000);
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
          <ThemedText type="title">Limpeza Rápida</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Libere espaço removendo arquivos temporários e cache
          </ThemedText>
        </View>

        {loading || !deviceInfo ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D9FF" />
          </View>
        ) : (
          <>
            {/* Cache Info */}
            <InfoCard
              title="Lixo Estimado"
              value={formatBytes(deviceInfo.cacheSize)}
              subtitle="Pronto para limpar"
              color="#FFD60A"
            />

            {/* Cleanup Items */}
            <View style={styles.itemsSection}>
              <ThemedText type="subtitle" style={styles.itemsTitle}>
                Itens para Limpar
              </ThemedText>

              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <ThemedText type="defaultSemiBold">Cache de Aplicativos</ThemedText>
                  <ThemedText type="default" style={styles.itemSubtitle}>
                    {formatBytes(deviceInfo.cacheSize * 0.5)}
                  </ThemedText>
                </View>
                <View style={styles.checkbox} />
              </View>

              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <ThemedText type="defaultSemiBold">Arquivos Temporários</ThemedText>
                  <ThemedText type="default" style={styles.itemSubtitle}>
                    {formatBytes(deviceInfo.cacheSize * 0.3)}
                  </ThemedText>
                </View>
                <View style={styles.checkbox} />
              </View>

              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <ThemedText type="defaultSemiBold">Logs e Dados Antigos</ThemedText>
                  <ThemedText type="default" style={styles.itemSubtitle}>
                    {formatBytes(deviceInfo.cacheSize * 0.2)}
                  </ThemedText>
                </View>
                <View style={styles.checkbox} />
              </View>
            </View>

            {/* Status Message */}
            {cleaned && (
              <View style={styles.successMessage}>
                <ThemedText type="defaultSemiBold" style={styles.successText}>
                  ✓ Limpeza concluída com sucesso!
                </ThemedText>
              </View>
            )}

            {/* Cleanup Button */}
            <Pressable
              onPress={handleCleanup}
              disabled={isCleaning}
              style={({ pressed }) => [
                styles.cleanupButton,
                pressed && styles.cleanupButtonPressed,
                isCleaning && styles.cleanupButtonDisabled,
              ]}
            >
              {isCleaning ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.cleanupButtonText}>
                  {cleaned ? "Limpeza Concluída" : "Limpar Agora"}
                </ThemedText>
              )}
            </Pressable>
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
  itemsSection: {
    marginBottom: 24,
  },
  itemsTitle: {
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemSubtitle: {
    opacity: 0.7,
    fontSize: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#00D9FF",
    backgroundColor: "#00D9FF",
  },
  successMessage: {
    backgroundColor: "rgba(0, 200, 83, 0.2)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#00C853",
  },
  successText: {
    color: "#00C853",
  },
  cleanupButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  cleanupButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cleanupButtonDisabled: {
    opacity: 0.6,
  },
  cleanupButtonText: {
    color: "#0A0E27",
    fontSize: 16,
    fontWeight: "600",
  },
});
