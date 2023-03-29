import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}Years`;
}

export default function DiscreteSlider({ handleChange ,value }) {
  return (
    <Box sx={{ width: 250, marginLeft: 2 }}>
      <Typography id="non-linear-slider" gutterBottom>
        Experience : {value} Years
      </Typography>
      <Slider
      value={value}
        defaultValue={3}
        getAriaValueText={valuetext}
        step={1}
        marks
        min={0}
        max={30}
        valueLabelDisplay="auto"
        onChange={(e) => handleChange(e)}
      />
    </Box>
  );
}
