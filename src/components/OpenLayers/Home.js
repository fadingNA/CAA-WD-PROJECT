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
import { ThemeProvider, BaseStyles, Box } from "@primer/react";
import WMS from "../../public/data/data";
import SearchBar from "../Controls/SearchBars/SearchBar";
import DrawerComponent from "../Controls/Drawyers/DrawyerCompo";

function Home() {
  const [center] = useState(fromLonLat([-74, 56]));
  const [zoom] = useState(4);
  const [layers, setLayers] = useState([]);
  const [toggleWeather, setToggleWeather] = useState(false);
  const [toggleWindDirection, setToggleWindDirection] = useState(false);
  const [toggleCurrentConditions, setToggleCurrentConditions] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (WMS && WMS[0] && WMS[0].Setting) {
      const newLayers = WMS[0].Setting.map(createLayer);
      setLayers(newLayers);
    } else {
      console.error("WMS data is not in the expected format:", WMS);
    }
  }, [toggleWeather, toggleWindDirection, toggleCurrentConditions]);

  const createLayer = (layerConfig) => {
    const isVisible = shouldLayerBeVisible(layerConfig.name);
    if (!isVisible) return null;
    if (layerConfig.type === "TileLayer") {
      console.log(opacity);

      console.log(layerConfig.zIndex);
      return (
        <TileLayer
          source={
            new TileWMS({
              url: WMS[0].URL,
              style: {},
              params: {
                LAYERS: layerConfig.params.LAYERS,
                TILED: layerConfig.params.TILED,
                ...layerConfig.params,
              },
              transition: layerConfig.transition || 0,
            })
          }
          zIndex={layerConfig.zIndex || 1}
          opacity={opacity / 100}
          visible={isVisible}
        />
      );
    } else if (layerConfig.type === "ImageLayer") {
      console.log(layerConfig);
      return (
        <ImageLayer
          source={
            new ImageWMS({
              url: WMS[0].URL,
              params: {
                LAYERS: layerConfig.params.LAYERS,
                TILED: layerConfig.params.TILED,
                ...layerConfig.params,
                STYLES: "temperature",
              },
              transition: layerConfig.transition || 0,
            })
          }
          opacity={opacity / 100}
          zIndex={layerConfig.zIndex || 1000}
          visible={isVisible}
        />
      );
    }

    return null;
  };

  const shouldLayerBeVisible = (layerName) => {
    switch (layerName) {
      case "Air Temperature":
        return toggleWeather;
      case "Wind Direction":
        return toggleWindDirection;
      case "Current Conditions":
        return toggleCurrentConditions;
      default:
        return false;
    }
  };
  const handleOpacityChange = (event, newOpacity) => {
    setOpacity(newOpacity);
  };

  return (
    <ThemeProvider>
      <BaseStyles>
        <Box className="main-container">
          <Box className="map-container">
            <Map center={center} zoom={zoom}>
              <Layers>
                <TileLayer source={new OSM()} zIndex={1} opacity={1} />
                {WMS[0].Setting.map(createLayer)}
              </Layers>
              <FullScreenMapControl />
            </Map>
          </Box>

          <Box
            className="search-bar"
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <SearchBar />
            <SideBar
              setToggleCurrentCondition={setToggleCurrentConditions}
              setToggleWeather={setToggleWeather}
              setToggleWindDirection={setToggleWindDirection}
            />
            <DrawerComponent
              opacity={opacity}
              handleOpacityChange={handleOpacityChange}
            />
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default Home;
