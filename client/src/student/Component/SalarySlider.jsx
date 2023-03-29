import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

function valueLabelFormat(value) {
  const units = ["Lakh", "Crore"];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 100 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 100;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value) {
  return value;
}

export default function NonLinearSlider({ handleChange,value }) {
  return (
    <Box sx={{ width: 250, marginLeft: 2 }}>
      <Typography id="non-linear-slider" gutterBottom>
        Salary : {valueLabelFormat(calculateValue(value))} 
      </Typography>
      <Slider
        value={value}
        aria-label="Salary"
        defaultValue={5}
        min={0}
        step={1}
        max={100}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={(e) => handleChange(e)}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
        marks
      />
    </Box>
  );
}
