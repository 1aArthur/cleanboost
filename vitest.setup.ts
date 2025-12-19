import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react-native";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock expo modules
vi.mock("expo-file-system", () => ({
  getTotalDiskCapacityAsync: vi.fn(),
  getFreeDiskCapacityAsync: vi.fn(),
}));

vi.mock("expo-device", () => ({
  deviceName: "Test Device",
  osVersion: "14.0",
}));

vi.mock("expo-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
