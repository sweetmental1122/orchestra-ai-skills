import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
import { Terminal, CommandLine, Cursor, COLORS } from "./components/Terminal";
import { OrchestraLogo } from "./components/OrchestraLogo";
import { StatsDisplay } from "./components/StatsDisplay";
import { AgentDetection } from "./components/AgentDetection";
import { CategorySelection } from "./components/CategorySelection";
import { InstallProgress } from "./components/InstallProgress";
import { SuccessScreen } from "./components/SuccessScreen";
import { CallToAction } from "./components/CallToAction";

const { fontFamily: monoFont } = loadFont();
const { fontFamily: interFont } = loadInterFont();

// Scene timing (in seconds)
const SCENE_TIMING = {
  intro: { start: 0, duration: 4 },
  stats: { start: 4, duration: 2 },
  terminalTyping: { start: 6, duration: 2.5 },
  agentDetection: { start: 8.5, duration: 4 },
  categorySelection: { start: 12.5, duration: 4 },
  installation: { start: 16.5, duration: 5 },
  success: { start: 21.5, duration: 4 },
  callToAction: { start: 25.5, duration: 4.5 },
};

// Background gradient component
const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle animated gradient
  const gradientShift = interpolate(frame, [0, 900], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(
            ellipse at 50% 0%,
            rgba(88, 166, 255, 0.1) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 80% 80%,
            rgba(63, 185, 80, 0.05) 0%,
            transparent 40%
          ),
          linear-gradient(
            180deg,
            #0d1117 0%,
            #161b22 50%,
            #0d1117 100%
          )
        `,
      }}
    />
  );
};

// Scene 1: Orchestra Logo Intro
const IntroScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OrchestraLogo showSubtitle={true} />
    </AbsoluteFill>
  );
};

// Scene 2: Stats Display
const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <StatsDisplay startDelay={5} />
    </AbsoluteFill>
  );
};

// Scene 3: Terminal with npx command
const TerminalTypingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter effect for the command
  const command = "npx @orchestra-research/ai-research-skills";
  const charsPerFrame = 0.8;
  const typedChars = Math.min(
    command.length,
    Math.floor(frame * charsPerFrame)
  );
  const displayedCommand = command.slice(0, typedChars);
  const isTypingComplete = typedChars >= command.length;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Terminal title="Terminal — zsh">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: COLORS.green }}>$ </span>
          <span style={{ color: COLORS.text }}>{displayedCommand}</span>
          {!isTypingComplete && <Cursor />}
        </div>
        {isTypingComplete && (
          <div
            style={{
              marginTop: 24,
              color: COLORS.dim,
              opacity: interpolate(
                frame - command.length / charsPerFrame,
                [0, 15],
                [0, 1],
                { extrapolateRight: "clamp" }
              ),
            }}
          >
            Running installation...
          </div>
        )}
      </Terminal>
    </AbsoluteFill>
  );
};

// Scene 4: Agent Detection
const AgentDetectionScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Terminal title="AI Research Skills — Agent Detection">
        <AgentDetection startDelay={0} />
      </Terminal>
    </AbsoluteFill>
  );
};

// Scene 5: Category Selection
const CategorySelectionScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Terminal title="AI Research Skills — Select Skills">
        <CategorySelection startDelay={0} />
      </Terminal>
    </AbsoluteFill>
  );
};

// Scene 6: Installation Progress
const InstallationScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Terminal title="AI Research Skills — Installing">
        <InstallProgress startDelay={0} />
      </Terminal>
    </AbsoluteFill>
  );
};

// Scene 7: Success
const SuccessScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SuccessScreen startDelay={0} />
    </AbsoluteFill>
  );
};

// Scene 8: Call to Action
const CallToActionScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CallToAction startDelay={0} />
    </AbsoluteFill>
  );
};

// Main composition
export const AIResearchSkillsPromo: React.FC = () => {
  const { fps } = useVideoConfig();

  // Convert seconds to frames
  const toFrames = (seconds: number) => Math.round(seconds * fps);

  return (
    <AbsoluteFill>
      <Background />

      {/* Scene 1: Intro with logo */}
      <Sequence
        from={toFrames(SCENE_TIMING.intro.start)}
        durationInFrames={toFrames(SCENE_TIMING.intro.duration)}
        premountFor={fps}
      >
        <IntroScene />
      </Sequence>

      {/* Scene 2: Stats */}
      <Sequence
        from={toFrames(SCENE_TIMING.stats.start)}
        durationInFrames={toFrames(SCENE_TIMING.stats.duration)}
        premountFor={fps}
      >
        <StatsScene />
      </Sequence>

      {/* Scene 3: Terminal typing */}
      <Sequence
        from={toFrames(SCENE_TIMING.terminalTyping.start)}
        durationInFrames={toFrames(SCENE_TIMING.terminalTyping.duration)}
        premountFor={fps}
      >
        <TerminalTypingScene />
      </Sequence>

      {/* Scene 4: Agent detection */}
      <Sequence
        from={toFrames(SCENE_TIMING.agentDetection.start)}
        durationInFrames={toFrames(SCENE_TIMING.agentDetection.duration)}
        premountFor={fps}
      >
        <AgentDetectionScene />
      </Sequence>

      {/* Scene 5: Category selection */}
      <Sequence
        from={toFrames(SCENE_TIMING.categorySelection.start)}
        durationInFrames={toFrames(SCENE_TIMING.categorySelection.duration)}
        premountFor={fps}
      >
        <CategorySelectionScene />
      </Sequence>

      {/* Scene 6: Installation */}
      <Sequence
        from={toFrames(SCENE_TIMING.installation.start)}
        durationInFrames={toFrames(SCENE_TIMING.installation.duration)}
        premountFor={fps}
      >
        <InstallationScene />
      </Sequence>

      {/* Scene 7: Success */}
      <Sequence
        from={toFrames(SCENE_TIMING.success.start)}
        durationInFrames={toFrames(SCENE_TIMING.success.duration)}
        premountFor={fps}
      >
        <SuccessScene />
      </Sequence>

      {/* Scene 8: Call to Action */}
      <Sequence
        from={toFrames(SCENE_TIMING.callToAction.start)}
        durationInFrames={toFrames(SCENE_TIMING.callToAction.duration)}
        premountFor={fps}
      >
        <CallToActionScene />
      </Sequence>
    </AbsoluteFill>
  );
};
