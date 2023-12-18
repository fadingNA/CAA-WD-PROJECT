import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import IconButton from "@mui/material/IconButton";
import OpacityIcon from "@mui/icons-material/Opacity";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';


function ToolList({ opacity, handleOpacityChange }) {
  const [isVisible, setIsVisible] = React.useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 150,
        bgcolor: "background.paper",
        padding: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        opacity: isVisible ? 1 : 0.7,
        transition: "opacity 0.5s ease", // Smooth transition for the opacity
      }}
    >
      <IconButton onClick={toggleVisibility} sx={{ color: "black" , zIndex: "1000"}}>
        {isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      
      {isVisible && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography id="discrete-slider-small-steps" gutterBottom>
            <OpacityIcon fontSize="large" />
          </Typography>
          <Slider
            value={opacity}
            onChange={handleOpacityChange}
            step={10}
            marks
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />
          <Typography id="discrete-slider-small-steps" gutterBottom>
            <AcUnitIcon fontSize="large" />
          </Typography>
          <Slider
            value={opacity}
            onChange={handleOpacityChange}
            step={10}
            marks
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />
          <Typography id="discrete-slider-small-steps" gutterBottom>
            <AirIcon fontSize="large" />
          </Typography>
          <Slider
            value={opacity}
            onChange={handleOpacityChange}
            step={10}
            marks
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />
          <Typography id="discrete-slider-small-steps" gutterBottom>
            <ThermostatIcon fontSize="large" />
          </Typography>
          <Slider
            value={opacity}
            onChange={handleOpacityChange}
            step={10}
            marks
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />
        </Box>
        
      )}
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
