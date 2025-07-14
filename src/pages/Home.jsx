// src/pages/Home.jsx

import React, { useRef } from "react";
import { getEntries } from "../utils/storage";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExportPDF from "../components/ExportPDF";
import LocationMap from "../components/LocationMap"; // ✅ Import Map Component

export default function Home() {
  const entries = getEntries();
  const entryRefs = useRef([]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📓 LifeLog
      </Typography>

      <Button
        component={Link}
        to="/new"
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
      >
        Add New Entry
      </Button>

      {entries.length === 0 ? (
        <Typography>No entries yet.</Typography>
      ) : (
        entries.map((entry, index) => {
          if (!entryRefs.current[index]) {
            entryRefs.current[index] = React.createRef();
          }

          return (
            <Card key={entry.id} sx={{ mb: 2 }} ref={entryRefs.current[index]}>
              <CardContent>
                <Typography variant="h6">
                  Mood: {entry.mood} | 📍{" "}
                  {entry.location?.lat.toFixed(2)}, {entry.location?.lng.toFixed(2)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  {entry.note}
                </Typography>

                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {new Date(entry.timestamp).toLocaleString()}
                </Typography>

                {entry.selfie && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Selfie:
                    </Typography>
                    <img
                      src={entry.selfie}
                      alt="Selfie"
                      width="100%"
                      style={{ borderRadius: 8, marginTop: 4 }}
                    />
                  </Box>
                )}

                {entry.doodle && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Doodle:
                    </Typography>
                    <img
                      src={entry.doodle}
                      alt="Doodle"
                      width="100%"
                      style={{ borderRadius: 8, marginTop: 4 }}
                    />
                  </Box>
                )}

                {/* 🗺️ Show Map */}
                {entry.location && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Map Location:
                    </Typography>
                    <LocationMap lat={entry.location.lat} lng={entry.location.lng} />
                  </Box>
                )}

                {/* 📄 PDF Export */}
                <ExportPDF
                  targetRef={entryRefs.current[index]}
                  filename={`entry-${entry.id}.pdf`}
                />
              </CardContent>
            </Card>
          );
        })
      )}
    </Container>
  );
}
