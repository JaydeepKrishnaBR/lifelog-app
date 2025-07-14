import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function CameraLog({ onCapture }) {
  const videoRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
  const currentStream = videoRef.current?.srcObject;
  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  }
  setStream(null);
  setCameraOn(false);
};

  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Stop camera when component unmounts
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    setPreview(image);
    onCapture(image);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">📸 Capture Your Selfie</Typography>

      {preview ? (
        <img src={preview} alt="Captured" width="100%" style={{ borderRadius: 8 }} />
      ) : (
        <video
          ref={videoRef}
          style={{ width: "100%", borderRadius: 8 }}
          autoPlay
          muted
          playsInline
        />
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Button variant="outlined" fullWidth onClick={captureImage} disabled={preview}>
          Capture
        </Button>
        
      </Stack>
    </Box>
  );
}
/* 

<Button variant="outlined" fullWidth color="error" onClick={startCamera}>
          Start Camera
        </Button>
        <Button variant="outlined" fullWidth color="error" onClick={stopCamera}>
          Stop Camera
        </Button>

*/