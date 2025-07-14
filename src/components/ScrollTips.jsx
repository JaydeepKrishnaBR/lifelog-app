// src/components/ScrollTips.jsx
import React, { useRef, useEffect, useState } from "react";
import { Alert, Fade } from "@mui/material";

const tips = [
  "💡 Tip: Journaling boosts emotional clarity.",
  "🧘 Breathe. Reflect. Write it out.",
  "🎯 Your thoughts matter. Capture them.",
  "📍 Logging location helps track patterns.",
  "📸 Visual memories make moments stick.",
];

export default function ScrollTips() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(entry.isIntersecting);
        if (entry.isIntersecting) {
          setTipIndex((prev) => (prev + 1) % tips.length);
        }
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    const target = ref.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <>
      <div ref={ref} style={{ height: "60px" }}></div>
      <Fade in={show}>
        <Alert severity="info" sx={{ mb: 2 }}>
          {tips[tipIndex]}
        </Alert>
      </Fade>
    </>
  );
}
