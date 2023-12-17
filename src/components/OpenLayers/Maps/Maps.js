import React, { useRef, useEffect, useState } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { toStringXY } from "ol/coordinate";
import { toLonLat } from "ol/proj";
import Overlay from "ol/Overlay";

import { FullScreen, defaults as defaultControls } from "ol/control.js";

function Map({ children, center, zoom, selectedLayer }) {
  const mapRef = useRef();
  const popupRef = useRef();
  const popupContentRef = useRef();
  const [map, setMap] = useState(null);
  const overlayRef = useRef("");
  let content = useRef("");

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;
    overlayRef.current = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    const labelFeature = new Feature({
      geometry: new Point(fromLonLat(center)),
      name: "Label",
    });

    const updateLayerVisibility = () => {
      if (!map) return;
      const layers = map.getLayers().getArray();
      layers.forEach((layer) => {
        const isLayerVisible = layer.get("name") === selectedLayer;
        layer.setVisible(isLayerVisible);
      });
    };

    let options = {
      controls: defaultControls().extend([new FullScreen()]),
      layers: [],
      view: new ol.View({ zoom, center, minZoom: 4 }),
      overlays: [overlayRef.current],
    };

    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    console.log("Debug Popup", popupRef.current);

    mapObject.on("click", function (evt) {
      const coordinate = evt.coordinate;
      const xyCoordinates = toStringXY(toLonLat(coordinate), 4);
      let viewResolution = mapObject.getView().getResolution();
      let wms_source = mapObject.getLayers().item(1)?.getSource();
      let url = wms_source?.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        "EPSG:3857",
        { INFO_FORMAT: "application/json" }
      );
      content.innerHTML = '<p align="center">Fetching data...</p>';
      overlayRef.current.setPosition(coordinate);
      if (url) {
        console.log("Fetching data from URL:", url); // For debugging
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((json) => {
            const contentHtml = `Temperature Surface<br>
              Coordinates (Lon/Lat): <code>${xyCoordinates}</code><br>
              Value: <code>${Math.round(
                json.features[0].properties.value
              )} °C</code>`;
            popupContentRef.current.innerHTML = contentHtml;
            overlayRef.current.setPosition(coordinate);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            popupContentRef.current.innerHTML = "Error loading data";
          });
      }
    });
    updateLayerVisibility();
    return () => mapObject.setTarget(undefined);
  }, [center, zoom, selectedLayer]);

  const closePopup = () => {
    if (overlayRef.current) {
      console.log("Debug closePopup");
      overlayRef.current.setPosition(undefined);
    }
  };

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
    map.getView().setZoom(zoom);
  }, [center, zoom, map]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
      <div ref={popupRef} className="ol-popup">
        <button
          id="popup-closer"
          className="ol-popup-closer"
          onClick={closePopup}
        >
          X
        </button>
        <div ref={popupContentRef} id="popup-content"></div>
      </div>
    </MapContext.Provider>
  );
}

export default Map;
