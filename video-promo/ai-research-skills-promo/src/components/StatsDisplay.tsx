import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const COLORS = {
  cyan: "#58a6ff",
  green: "#3fb950",
  yellow: "#d29922",
  purple: "#a371f7",
  text: "#e6edf3",
  dim: "#8b949e",
};

type StatItemProps = {
  value: string;
  label: string;
  color: string;
  delay: number;
};

const StatItem: React.FC<StatItemProps> = ({ value, label, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const itemSpring = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
  const translateY = interpolate(itemSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 64,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 20,
          color: COLORS.dim,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
};

type StatsDisplayProps = {
  startDelay?: number;
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  startDelay = 0,
}) => {
  const { fps } = useVideoConfig();
  const staggerDelay = 0.15 * fps;

  const stats = [
    { value: "82", label: "Skills", color: COLORS.cyan },
    { value: "20", label: "Categories", color: COLORS.green },
    { value: "5", label: "Agents", color: COLORS.yellow },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 120,
      }}
    >
      {stats.map((stat, index) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          color={stat.color}
          delay={startDelay + index * staggerDelay}
        />
      ))}
    </div>
  );
};
