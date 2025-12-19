import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { ThemedText } from "./themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

interface HealthRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export function HealthRing({
  percentage,
  size = 150,
  strokeWidth = 12,
  label = "Saúde",
  color = "#00D9FF",
}: HealthRingProps) {
  const textColor = useThemeColor({}, "text");
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.ringContainer}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            stroke="rgba(255, 255, 255, 0.1)"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <Circle
            stroke={color}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
          {/* Percentage text */}
          <SvgText
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dy="0.3em"
            fontSize="32"
            fontWeight="bold"
            fill={color}
          >
            {Math.round(percentage)}%
          </SvgText>
        </Svg>
      </View>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ringContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 4,
  },
});
