import React from "react";
import {Button} from '@primer/react';

export default function Player({ layers, setLayers, isPlaying, setIsPlaying }) {
  const [currentLayer, setCurrentLayer] = React.useState(0);
  return (
    <div className="player-container">
      <div className="title">
        <p>{currentLayer}</p>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper">
          <div className="player_bar" style={{ width: "50%" }}>
            <Button>Click me</Button>
          </div>
        </div>
      </div>
      <div className="controls">

      </div>
    </div>
  );
}
