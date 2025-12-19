import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Device from "expo-device";

export interface DeviceInfo {
  totalStorage: number;
  usedStorage: number;
  freeStorage: number;
  storagePercentage: number;
  ramTotal: number;
  ramUsed: number;
  ramFree: number;
  ramPercentage: number;
  deviceName: string;
  osVersion: string;
  appCount: number;
  cacheSize: number;
}

export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDeviceInfo();
    const interval = setInterval(loadDeviceInfo, 5000); // Atualizar a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const loadDeviceInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obter informações de armazenamento
      // Nota: expo-file-system tem APIs limitadas no Android
      // Usaremos valores aproximados baseados em dados do sistema
      const storageInfo = 128 * 1024 * 1024 * 1024; // 128GB (padrão)
      const freeStorage = Math.random() * storageInfo * 0.5; // Simulado: 0-50% livre
      const usedStorage = storageInfo - freeStorage;

      // Dados simulados para RAM (em um app real, seria necessário usar módulos nativos)
      const ramTotal = 8 * 1024 * 1024 * 1024; // 8GB
      const ramUsed = Math.random() * ramTotal * 0.7; // Simulado: 0-70% de uso
      const ramFree = ramTotal - ramUsed;

      // Informações do dispositivo
      const deviceName = Device.deviceName || "Android Device";
      const osVersion = Device.osVersion || "Unknown";

      // Dados simulados para apps e cache
      const appCount = Math.floor(Math.random() * 100) + 50; // 50-150 apps
      const cacheSize = Math.random() * 5 * 1024 * 1024 * 1024; // 0-5GB de cache

      const info: DeviceInfo = {
        totalStorage: storageInfo,
        usedStorage,
        freeStorage,
        storagePercentage: (usedStorage / storageInfo) * 100,
        ramTotal,
        ramUsed,
        ramFree,
        ramPercentage: (ramUsed / ramTotal) * 100,
        deviceName,
        osVersion,
        appCount,
        cacheSize,
      };

      setDeviceInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar informações");
      console.error("Erro ao carregar informações do dispositivo:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deviceInfo, loading, error, refresh: loadDeviceInfo };
}
