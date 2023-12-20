import React, { useState, useEffect } from "react";
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
import XYZLayer from "./Layers/XYZLayer";
import baseMapData from "../../public/data/basemap_data";
import WeatherPlayer from "../Animation/Players";

function Home() {
  const [center] = useState(fromLonLat([-74, 56]));
  const [zoom] = useState(4);
  const [layers, setLayers] = useState([]);
  const [toggleWeather, setToggleWeather] = useState(false);
  const [toggleWindDirection, setToggleWindDirection] = useState(false);
  const [toggleEllipsis, setToggleEllipsis] = useState(false);
  const [toggleCurrentConditions, setToggleCurrentConditions] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [activeBaseMap, setActiveBaseMap] = useState("Open Street Map");

  useEffect(() => {
    if (WMS && WMS[0] && WMS[0].Setting) {
      const newLayers = WMS[0].Setting.map(createLayer);
      setLayers(newLayers);
    } else {
      console.error("WMS data is not in the expected format:", WMS);
    }
    return () => {
      setLayers([]);
    };
  }, []);

  const selectBaseMap = (baseMapName) => {
    setActiveBaseMap(baseMapName);
  };

  const createBaseMap = (baseMapName) => {
    const baseMapConfig = baseMapData.find((map) => map.name === baseMapName);
    if (!baseMapConfig) return null;
    return (
      <XYZLayer
        sourceOptions={{
          URL: baseMapConfig.URL,
          maxZoom: baseMapConfig.maxZoom,
          attributions: baseMapConfig.attributions,
        }}
        opacity={opacity / 100}
        zIndex={1000}
      />
    );
  };

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
          zIndex={5}
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
    } else if (layerConfig.type === "XYZLayer") {
      console.log(layerConfig.URL);
      return (
        <XYZLayer
          sourceOptions={{
            URL: layerConfig.URL,
            maxZoom: layerConfig.maxZoom,
            attributions: layerConfig.attributions,
          }}
          opacity={opacity / 100}
          zIndex={1000}
          visible={isVisible}
        />
      );
    }

    return () => ({});
  };

  const shouldLayerBeVisible = (layerName) => {
    switch (layerName) {
      case "Air Temperature":
        return toggleWeather;
      case "Wind Direction":
        return toggleWindDirection;
      case "Current Conditions":
        return toggleCurrentConditions;
      case "USGS Imagery":
        return toggleEllipsis;
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
          <Box className="map-container" sx={{ position: "relative" }}>
            <Map center={center} zoom={zoom}>
              <Layers>
                <TileLayer source={new OSM()} zIndex={0} opacity={1} />
                {console.log(WMS[0].Setting.map(createLayer))}
                {createBaseMap(activeBaseMap)}
                {WMS[0].Setting.map(createLayer)}
              </Layers>
              <FullScreenMapControl />
              <WeatherPlayer />
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
              setToggleEllipsis={setToggleEllipsis}
            />
            <DrawerComponent
              opacity={opacity}
              handleOpacityChange={handleOpacityChange}
              selectBasedMap={selectBaseMap}
            />
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default Home;
