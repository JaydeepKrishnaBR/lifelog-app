// src/components/OfflineAlert.jsx
import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";

export default function OfflineAlert() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return isOffline ? (
    <Alert severity="warning" sx={{ my: 2 }}>
      You are currently offline. Entries will be saved locally.
    </Alert>
  ) : null;
}
