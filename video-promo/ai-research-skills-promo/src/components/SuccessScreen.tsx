import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";

const { fontFamily: monoFont } = loadFont();
const { fontFamily: interFont } = loadInterFont();

const COLORS = {
  green: "#3fb950",
  cyan: "#58a6ff",
  dim: "#8b949e",
  text: "#e6edf3",
};

const EXAMPLE_PROMPTS = [
  '"Help me set up GRPO training with verl"',
  '"How do I serve a model with vLLM?"',
  '"Write a NeurIPS paper introduction"',
];

type SuccessScreenProps = {
  startDelay?: number;
};

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - startDelay);

  // Main title animation
  const titleSpring = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);

  // Stats animation
  const statsDelay = 0.5 * fps;
  const statsSpring = spring({
    frame: adjustedFrame - statsDelay,
    fps,
    config: { damping: 200 },
  });

  const statsOpacity = interpolate(statsSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Examples animation
  const examplesDelay = 1 * fps;
  const staggerDelay = 0.2 * fps;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        textAlign: "center",
      }}
    >
      {/* Success title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <div
          style={{
            fontFamily: interFont,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.green,
            marginBottom: 16,
          }}
        >
          ✓ Installation Complete
        </div>
        <div
          style={{
            fontFamily: monoFont,
            fontSize: 24,
            color: COLORS.text,
          }}
        >
          Installed <span style={{ color: COLORS.cyan }}>82</span> skills to{" "}
          <span style={{ color: COLORS.cyan }}>5</span> agents
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: monoFont,
          fontSize: 18,
          color: COLORS.dim,
          opacity: statsOpacity,
          maxWidth: 600,
        }}
      >
        Your skills are now active and will appear when relevant.
      </div>

      {/* Example prompts */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: interFont,
            fontSize: 20,
            color: COLORS.text,
            opacity: statsOpacity,
            marginBottom: 8,
          }}
        >
          Try asking:
        </div>
        {EXAMPLE_PROMPTS.map((prompt, index) => {
          const promptSpring = spring({
            frame: adjustedFrame - examplesDelay - index * staggerDelay,
            fps,
            config: { damping: 20, stiffness: 150 },
          });

          const promptOpacity = interpolate(promptSpring, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const promptTranslateX = interpolate(promptSpring, [0, 1], [20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={prompt}
              style={{
                fontFamily: monoFont,
                fontSize: 16,
                color: COLORS.dim,
                opacity: promptOpacity,
                transform: `translateX(${promptTranslateX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ color: COLORS.cyan }}>→</span>
              <span style={{ color: COLORS.text }}>{prompt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
