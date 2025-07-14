// src/components/CanvasDoodle.jsx
import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function CanvasDoodle({ onSave }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctxRef.current = ctx;
  }, []);

  const startDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const dataUrl = canvasRef.current.toDataURL();
    onSave(dataUrl);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">🎨 Mood Doodle</Typography>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Button onClick={clearCanvas}>Clear</Button>
        <Button variant="outlined" onClick={saveCanvas}>
          Save Doodle
        </Button>
      </Stack>
    </Box>
  );
}
