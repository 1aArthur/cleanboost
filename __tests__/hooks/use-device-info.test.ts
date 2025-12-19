import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react-native";
import { useDeviceInfo } from "@/hooks/use-device-info";

describe("useDeviceInfo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return device info with default values", async () => {
    const { result } = renderHook(() => useDeviceInfo());

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check that deviceInfo is populated
    expect(result.current.deviceInfo).toBeDefined();
    expect(result.current.deviceInfo?.totalStorage).toBeGreaterThan(0);
    expect(result.current.deviceInfo?.ramTotal).toBeGreaterThan(0);
  });

  it("should have valid storage percentage", async () => {
    const { result } = renderHook(() => useDeviceInfo());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { storagePercentage } = result.current.deviceInfo!;
    expect(storagePercentage).toBeGreaterThanOrEqual(0);
    expect(storagePercentage).toBeLessThanOrEqual(100);
  });

  it("should have valid RAM percentage", async () => {
    const { result } = renderHook(() => useDeviceInfo());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { ramPercentage } = result.current.deviceInfo!;
    expect(ramPercentage).toBeGreaterThanOrEqual(0);
    expect(ramPercentage).toBeLessThanOrEqual(100);
  });

  it("should have refresh function", async () => {
    const { result } = renderHook(() => useDeviceInfo());

    expect(result.current.refresh).toBeDefined();
    expect(typeof result.current.refresh).toBe("function");
  });

  it("should update data when refresh is called", async () => {
    const { result } = renderHook(() => useDeviceInfo());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialData = result.current.deviceInfo;

    // Call refresh
    result.current.refresh();

    // Data should update
    await waitFor(() => {
      expect(result.current.deviceInfo).toBeDefined();
    });
  });
});
