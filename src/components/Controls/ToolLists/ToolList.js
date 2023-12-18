import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import OpacityIcon from "@mui/icons-material/Opacity";
import { styled } from "@mui/material/styles";
import AirTwoToneIcon from "@mui/icons-material/AirTwoTone";
import AcUnitTwoToneIcon from "@mui/icons-material/AcUnitTwoTone";

function ToolList({ opacity, handleOpacityChange }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1290,
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        position: "absolute",


      }}
    >
      <List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
        <ListItem>
          <AirTwoToneIcon />
        </ListItem>
        <ListItem>
          <Typography id="discrete-slider-small-steps" gutterBottom>
            <OpacityIcon fontSize="large" />
          </Typography>
        </ListItem>
        <ListItem>
          <PrettoSlider
            value={opacity}
            onChange={handleOpacityChange}
            step={10}
            marks
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />
        </ListItem>
      </List>
    </Box>
  );
}

export default ToolList;

export function toggleControl({
  snowToggleControl,
  windToggleControl,
  opacityToggleControl,
}) {
  if (!snowToggleControl) snowToggleControl = true;
  if (!windToggleControl) windToggleControl = true;
  if (!opacityToggleControl) opacityToggleControl = true;
}

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
