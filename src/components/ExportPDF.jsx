import React from "react";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportPDF({ targetRef, filename = "LifeLog_Entry.pdf" }) {
  const handleDownload = async () => {
    const canvas = await html2canvas(targetRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(filename);
  };

  return (
    <Button onClick={handleDownload} variant="outlined" fullWidth sx={{ mt: 1 }}>
      Export Entry as PDF
    </Button>
  );
}
