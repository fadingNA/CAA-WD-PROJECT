import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import Map from "./Maps/Maps";
import { Layers, TileLayer } from "./Layers/index";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import SideBar from "../Layout/Sidebar/sidebar";
import ImageWMS from "ol/source/ImageWMS";
import ImageLayer from "./Layers/ImageLayer";
import FullScreenMapControl from "./ControlButton/FullScreen";
import { ThemeProvider, BaseStyles } from "@primer/react";
import WMS from "../public/data/data";

function Home() {
  const [center] = useState(fromLonLat([-74, 56]));
  const [zoom] = useState(4);
  const dynamicLayers = useRef([]);
  const [toggleWeather, setToggleWeather] = React.useState(false);
  const [toggleName, setToggleName] = React.useState(false);
  const [toggleCurrentCondition, setToggleCurrentCondition] =
    React.useState(false);
  const [toggleWindDirection, setToggleWindDirection] = React.useState(false);
  const [toggleLand, setToggleLand] = React.useState(false);
  useEffect(() => {
    console.log("WMS Data:", WMS); // Debugging statement

    if (WMS && WMS[0] && WMS[0].Setting) {
      dynamicLayers.current = WMS[0].Setting.map(createLayer);
    } else {
      console.error("WMS data is not in the expected format:", WMS);
    }
  }, []);
  const createLayer = (layerConfig) => {
    if (layerConfig.type === "TileLayer") {
      console.log(layerConfig.zIndex); // Debugging statement
      return (
        <TileLayer
          source={
            new TileWMS({
              url: WMS[0].URL,
              params: {
                LAYERS: layerConfig.params.LAYERS, // Corrected here
                TILED: layerConfig.params.TILED,
                ...layerConfig.params,
              },
              transition: layerConfig.transition || 0,
            })
          }
          zIndex={layerConfig.zIndex || 1}
          opacity={layerConfig.opacity || 1}
          visible={layerConfig.visible !== false}
        />
      );
    } else if (layerConfig.type.continas("ImageLayer")) {
      return (
        <ImageLayer
          source={
            new ImageWMS({
              url: WMS[0].URL,
              params: {
                LAYERS: layerConfig.params.LAYERS, // Corrected here
                TILED: layerConfig.params.TILED,
                ...layerConfig.params,
              },
              transition: layerConfig.transition || 0,
            })
          }
          zIndex={layerConfig.zIndex || 1}
          opacity={layerConfig.opacity || 1}
          visible={layerConfig.visible !== false}
        />
      );
    }

    return null;
  };

  return (
    <ThemeProvider>
      <BaseStyles>
        <div className="main-container">
          <div className="map-container">
            <Map center={center} zoom={zoom}>
              <Layers>
                <TileLayer source={new OSM()} zIndex={1} opacity={1} />
                {WMS[0].Setting.map(createLayer)}
              </Layers>
              <FullScreenMapControl />
            </Map>
            <SideBar
              setToggleWeather={setToggleWeather}
              setToggleName={setToggleName}
              setToggleCurrentCondition={setToggleCurrentCondition}
              setToggleWindDirection={setToggleWindDirection}
              setToggleLand={setToggleLand}
            />
            <div className="legend">0</div>
            <div className="control-button">====</div>
          </div>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default Home;

/*
<TileLayer
                  source={
                    new TileWMS({
                      url: "https://geo.weather.gc.ca/geomet/",
                      params: {
                        LAYERS: "GDPS.ETA_TT",
                        TILED: true,
                      },
                      transition: 0,
                    })
                  }
                  zIndex={100}
                  opacity={0.5}
                />

*/
