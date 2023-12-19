import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import IconButton from "@mui/material/IconButton";
import OpacityIcon from "@mui/icons-material/Opacity";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";

function ToolList({ opacity, brightness, hue, test, handleOpacityChange }) {
  const [isVisible, setIsVisible] = React.useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box
      sx={{
        width: "100%",

        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: isVisible ? 1 : 0.7,
        transition: "opacity 0.5s ease", // Smooth transition for the opacity
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "1rem",
        }}
      >
        {/* Each control set could be refactored into its own component for cleanliness */}
        {/* Opacity Control */}
        <ControlSet
          icon={OpacityIcon}
          value={opacity}
          handleChange={handleOpacityChange}
        />
        {/* Snow Control */}
        <ControlSet
          icon={AcUnitIcon}
          value={brightness}
          handleChange={handleOpacityChange}
        />
        {/* Wind Control */}
        <ControlSet
          icon={AirIcon}
          value={hue}
          handleChange={handleOpacityChange}
        />
        {/* Temperature Control */}
        <ControlSet
          icon={ThermostatIcon}
          value={test}
          handleChange={handleOpacityChange}
        />
      </Box>
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

export function ControlSet({ icon: Icon, value, handleChange }) {
  return (
    <>
      <Typography gutterBottom>
        <Icon fontSize="small" />
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        step={10}
        marks
        min={10}
        max={100}
        valueLabelDisplay="auto"
      />
    </>
  );
}
