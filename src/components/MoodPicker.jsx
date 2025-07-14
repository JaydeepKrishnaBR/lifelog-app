import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const moods = [
  { emoji: "😊", value: "happy" },
  { emoji: "😐", value: "neutral" },
  { emoji: "😢", value: "sad" },
  { emoji: "😡", value: "angry" },
  { emoji: "😴", value: "tired" },
];

export default function MoodPicker({ mood, setMood }) {
  return (
    <ToggleButtonGroup
      value={mood}
      exclusive
      onChange={(e, newMood) => {
        if (newMood !== null) setMood(newMood);
      }}
      fullWidth
    >
      {moods.map((m) => (
        <ToggleButton key={m.value} value={m.value}>
          {m.emoji}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
