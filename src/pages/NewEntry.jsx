// src/pages/NewEntry.jsx
import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import useGeolocation from "../hooks/useGeolocation";
import MoodPicker from "../components/MoodPicker";
import { saveEntry } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import CameraLog from "../components/CameraLog";
import CanvasDoodle from "../components/CanvasDoodle";
import OfflineAlert from "../components/OfflineAlert";
import { useThemeMode } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function NewEntry() {
  const location = useGeolocation();
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [doodle, setDoodle] = useState(null);
  const navigate = useNavigate();
  const { toggleMode, mode } = useThemeMode();

  const handleSave = () => {
    const entry = {
      id: Date.now(),
      mood,
      note,
      location,
      timestamp: new Date().toISOString(),
    };
    saveEntry(entry);
    navigate("/");
  };

  return (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Box sx={{ textAlign: "right", mb: 1 }}>
        <Button onClick={toggleMode} startIcon={mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}>
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
    </Box>
    <Typography variant="h5" gutterBottom>
      New Journal Entry
    </Typography>

    <OfflineAlert />
    <MoodPicker mood={mood} setMood={setMood} />

    <TextField
      label="What's on your mind?"
      multiline
      fullWidth
      rows={4}
      margin="normal"
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />

    <CameraLog onCapture={setSelfie} />
    <CanvasDoodle onSave={setDoodle} />

    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          const entry = {
            id: Date.now(),
            mood,
            note,
            location,
            selfie,
            doodle,
            timestamp: new Date().toISOString(),
          };
          saveEntry(entry);
          navigate("/");
        }}
        disabled={!mood || !location}
      >
        Save Entry
      </Button>
    </Box>
  </Container>
);
}
