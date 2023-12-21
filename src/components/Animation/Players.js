import * as React from "react";
import { Box, Typography } from "@mui/material";
import weather_animation from "../../public/data/weather_data";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function WeatherPlayer() {
  const [currentWeather, setCurrentWeather] = React.useState(0); // Initialize with 0
  const [isPlaying, setIsPlaying] = React.useState(false);
  const playerRef = React.useRef(null);

  const playButton = () => {
    setIsPlaying(!isPlaying); // Toggle playing state
    console.log(isPlaying ? "Pausing" : "Playing");
  };

  const backwardButton = () => {
    setCurrentWeather(
      (currentWeather - 1 + weather_animation.length) % weather_animation.length
    );
    setIsPlaying(true);
    console.log("Playing previous weather animation");
  };

  const forwardButton = () => {
    setCurrentWeather((currentWeather + 1) % weather_animation.length);
    setIsPlaying(true);
    console.log("Playing next weather animation");
  };

  React.useEffect(() => {
    playerRef.current = document.getElementById("player"); // Ensure there's an element with ID "player"
    if (isPlaying) {
      // Logic to play the animation
    } else {
      // Logic to pause the animation
    }
  }, [currentWeather, isPlaying]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          zIndex: 100,
          paddingX: 2,
          paddingY: 2,
          minWidth: "420px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1000px",
            padding: "20px",
            boxShadow: "0 0 10px",
            borderRadius: "10px",
            backgroundColor: "#333",
          }}
        >
          <Typography variant="caption" color="whitesmoke">
            Nonthachai Plodthong testing this component
          </Typography>
          <Typography variant="h6" color="whitesmoke">
            Weather Player
          </Typography>
          <div className="controls">
            <button onClick={backwardButton}>
              <SkipPreviousIcon />
            </button>
            <button onClick={playButton}>
              {isPlaying ? <PauseCircleOutlineIcon /> : <PlayArrowIcon />}
            </button>
            <button onClick={forwardButton}>
              <SkipNextIcon />
            </button>
          </div>
        </Box>
      </Box>
    </>
  );
}
