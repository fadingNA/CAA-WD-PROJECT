import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function ToolList({ opacity, handleOpacityChange }) {
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          <ListItem disablePadding>
            <Typography id="discrete-slider-small-steps" gutterBottom>
              Opacity
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Slider
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
    </>
  );
}

export default ToolList;
