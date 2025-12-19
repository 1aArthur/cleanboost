import React from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useDeviceInfo } from "@/hooks/use-device-info";

interface FileItem {
  id: string;
  name: string;
  size: number;
  path: string;
  type: string;
}

export default function FilesScreen() {
  const insets = useSafeAreaInsets();
  const { deviceInfo, loading } = useDeviceInfo();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  // Simular lista de arquivos grandes
  const mockFiles: FileItem[] = [
    {
      id: "1",
      name: "video_viagem.mp4",
      size: 2.5 * 1024 * 1024 * 1024,
      path: "/storage/emulated/0/Movies/",
      type: "Vídeo",
    },
    {
      id: "2",
      name: "backup_fotos.zip",
      size: 1.8 * 1024 * 1024 * 1024,
      path: "/storage/emulated/0/Downloads/",
      type: "Arquivo",
    },
    {
      id: "3",
      name: "instalador_app.apk",
      size: 950 * 1024 * 1024,
      path: "/storage/emulated/0/Downloads/",
      type: "Aplicativo",
    },
    {
      id: "4",
      name: "musicas_offline.zip",
      size: 750 * 1024 * 1024,
      path: "/storage/emulated/0/Music/",
      type: "Arquivo",
    },
    {
      id: "5",
      name: "documentos_antigos.pdf",
      size: 520 * 1024 * 1024,
      path: "/storage/emulated/0/Documents/",
      type: "Documento",
    },
    {
      id: "6",
      name: "fotos_backup.tar",
      size: 450 * 1024 * 1024,
      path: "/storage/emulated/0/DCIM/",
      type: "Arquivo",
    },
    {
      id: "7",
      name: "cache_navegador.db",
      size: 320 * 1024 * 1024,
      path: "/data/data/com.android.chrome/",
      type: "Cache",
    },
  ];

  const renderFile = ({ item }: { item: FileItem }) => (
    <View style={styles.fileItem}>
      <View style={styles.fileIcon} />
      <View style={styles.fileInfo}>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText type="default" style={styles.filePath}>
          {item.path}
        </ThemedText>
        <View style={styles.fileType}>
          <ThemedText type="default" style={styles.fileTypeText}>
            {item.type}
          </ThemedText>
        </View>
      </View>
      <View style={styles.fileSize}>
        <ThemedText type="defaultSemiBold" style={styles.fileSizeText}>
          {formatBytes(item.size)}
        </ThemedText>
      </View>
    </View>
  );

  const totalSize = mockFiles.reduce((sum, file) => sum + file.size, 0);

  return (
    <ThemedView style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title">Arquivos Grandes</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Encontre e gerencie arquivos que ocupam mais espaço
        </ThemedText>
      </View>

      {loading || !deviceInfo ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00D9FF" />
        </View>
      ) : (
        <>
          {/* Summary */}
          <View style={styles.summaryCard}>
            <View>
              <ThemedText type="default" style={styles.summaryLabel}>
                Espaço em Arquivos Grandes
              </ThemedText>
              <ThemedText type="title" style={styles.summaryValue}>
                {formatBytes(totalSize)}
              </ThemedText>
            </View>
            <View style={styles.summaryBadge}>
              <ThemedText type="defaultSemiBold" style={styles.summaryBadgeText}>
                {mockFiles.length}
              </ThemedText>
            </View>
          </View>

          {/* Files List */}
          <FlatList
            data={mockFiles}
            renderItem={renderFile}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryCard: {
    backgroundColor: "#1A1F3A",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  summaryValue: {
    color: "#00D9FF",
    fontSize: 28,
  },
  summaryBadge: {
    backgroundColor: "#00D9FF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 50,
    alignItems: "center",
  },
  summaryBadgeText: {
    color: "#0A0E27",
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  fileItem: {
    backgroundColor: "#1A1F3A",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0, 217, 255, 0.2)",
  },
  fileInfo: {
    flex: 1,
    gap: 4,
  },
  filePath: {
    fontSize: 11,
    opacity: 0.6,
  },
  fileType: {
    backgroundColor: "rgba(255, 214, 10, 0.2)",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  fileTypeText: {
    fontSize: 10,
    color: "#FFD60A",
  },
  fileSize: {
    alignItems: "flex-end",
  },
  fileSizeText: {
    color: "#00D9FF",
    fontSize: 12,
  },
});
