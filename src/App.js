import React, { useState } from "react";
import "./App.css";
import Map from "./OpenLayers/Maps/Maps";
import { Layers, TileLayer } from "./OpenLayers/Layers/index";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import SideBar from "./Layout/Sidebar/sidebar";
import ImageWMS from "ol/source/ImageWMS";
import ImageLayer from "./OpenLayers/Layers/ImageLayer";
import ArrowController from "./Animation/ArrowController";

function App() {
  const [center] = React.useState(fromLonLat([-74, 56]));
  const [zoom] = React.useState(4);
  const [toggleWeather, setToggleWeather] = React.useState(false);
  const [toggleName, setToggleName] = React.useState(false);
  const [toggleCurrentCondition, setToggleCurrentCondition] =
    React.useState(false);
  const [toggleWindDirection, setToggleWindDirection] = React.useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const handleTimeChange = (newTime) => {
    setCurrentTime(newTime);
  };

  const toggleAnimation = () => {
    setIsAnimationActive(!isAnimationActive);
  };
  // WMS Layer URLs
  const wmsLayer1Url = "https://geo.weather.gc.ca/geomet/";

  // WMS Layer params
  const wmsLayerParams = {
    LAYERS: "GDPS.ETA_TT",
    TILED: true,
  };

  return (
    <div className="main-container">
      <SideBar
        setToggleWeather={setToggleWeather}
        setToggleName={setToggleName}
        setToggleCurrentCondition={setToggleCurrentCondition}
        setToggleWindDirection={setToggleWindDirection}
      />
      <ArrowController onTimeChange={handleTimeChange} />

      <div className="map-container">
        <Map center={center} zoom={zoom}>
          <Layers>
            <TileLayer source={new OSM()} zIndex={1} opacity={1} />
            {toggleWeather && (
              <TileLayer
                source={
                  new TileWMS({
                    url: wmsLayer1Url,
                    params: wmsLayerParams,
                    transition: 0,
                  })
                }
                zIndex={1000}
                opacity={0.2}
              />
            )}
            {toggleName && (
              <TileLayer
                source={
                  new TileWMS({
                    url: "https://ahocevar.com/geoserver/wms",
                    params: { LAYERS: "topp:states", TILED: true },
                    serverType: "geoserver",
                    transition: 0,
                  })
                }
                zIndex={1000}
                opacity={0.5}
              />
            )}
            {toggleCurrentCondition && (
              <ImageLayer
                source={
                  new ImageWMS({
                    url: wmsLayer1Url,
                    params: {
                      LAYERS: "CURRENT_CONDITIONS",
                      crs: "EPSG:4326",
                      dpiMode: 7,
                      format: "image/png",
                      tilePixelRatio: 0,
                      styles: "",
                    },
                    ratio: 1,
                    serverType: "geoserver",
                  })
                }
                zIndex={1}
                opacity={1}
              />
            )}
            <ImageLayer
              source={
                new ImageWMS({
                  url: wmsLayer1Url,
                  params: {
                    LAYERS: "Hurricane Response Zone",
                    crs: "EPSG:4326",
                    dpiMode: 7,
                    format: "image/png",
                    tilePixelRatio: 0,
                    styles: "",
                  },
                  ratio: 1,
                  serverType: "geoserver",
                })
              }
              zIndex={1}
              opacity={1}
            />

            {toggleWindDirection && (
              <>
                <ImageLayer
                  source={
                    new ImageWMS({
                      url: wmsLayer1Url,
                      params: {
                        LAYERS: "GDWPS_25km_Winds_10m_PT1H",
                        time: currentTime?.toISOString(),
                        crs: "EPSG:4326",
                        dpiMode: 7,
                        format: "image/png",
                        tilePixelRatio: 0,
                        styles: "",
                      },
                      ratio: 1,
                      serverType: "geoserver",
                    })
                  }
                  zIndex={100}
                  opacity={1}
                />

                <ImageLayer
                  source={
                    new ImageWMS({
                      url: wmsLayer1Url,
                      params: {
                        LAYERS: "GDWPS_25km_WVDIR_PT1H",
                        crs: "EPSG:4326",
                        dpiMode: 7,
                        format: "image/png",
                        tilePixelRatio: 0,
                        styles: "",
                      },
                      ratio: 1,
                      serverType: "geoserver",
                    })
                  }
                  zIndex={5}
                  opacity={0.2}
                />
              </>
            )}
          </Layers>
        </Map>
      </div>
    </div>
  );
}

export default App;
