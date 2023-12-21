import React, { useRef, useEffect, useState } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import TileWMS from "ol/source/TileWMS";
import ImageWMS from "ol/source/ImageWMS";
import { toStringXY } from "ol/coordinate";
import { toLonLat } from "ol/proj";
import { FullScreen, defaults as defaultControls } from "ol/control.js";

function Map({ children, center, zoom, selectedLayer }) {
  const mapRef = useRef();
  const popupRef = useRef();
  const popupContentRef = useRef();
  const overlayRef = useRef();
  const [map, setMap] = useState(null);

  // Initialize map
  useEffect(() => {
    const options = {
      controls: defaultControls().extend([new FullScreen()]),
      layers: [],
      view: new ol.View({ center: center, zoom: zoom }),
    };

    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);

    // Create and add overlay
    const overlay = new ol.Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: { duration: 250 },
    });
    mapObject.addOverlay(overlay);
    overlayRef.current = overlay;

    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
      mapObject.removeOverlay(overlay);
    };
  }, [center, zoom]);

  // Handle layer visibility
  useEffect(() => {
    if (!map) return;
    const layers = map.getLayers().getArray();
    layers.forEach((layer) => {
      const isLayerVisible = layer.get("name") === selectedLayer;
      layer.setVisible(isLayerVisible);
    });
  }, [map, selectedLayer]);

  // Handle map click
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (evt) => {
      const coordinate = evt.coordinate;
      const xyCoordinates = toStringXY(toLonLat(coordinate), 4);
      let viewResolution = map.getView().getResolution();

      map.getLayers().forEach((layer) => {
        let source = layer.getSource();
        if (source instanceof TileWMS || source instanceof ImageWMS) {
          let url = source.getFeatureInfoUrl(
            coordinate,
            viewResolution,
            "EPSG:3857",
            { INFO_FORMAT: "application/json" }
          );
          if (url) {
            fetch(url)
              .then((res) => res.json())
              .then((json) => {
                const contentHtml = `Temperature Surface<br>Coordinates (Lon/Lat): <code>${xyCoordinates}</code><br>Value: <code>${Math.round(
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
        }
      });
    };

    map.on("click", handleMapClick);

    return () => map.un("click", handleMapClick);
  }, [map]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
      <div ref={popupRef} className="ol-popup">
        <button
          id="popup-closer"
          className="ol-popup-closer"
          onClick={() => overlayRef.current.setPosition(undefined)}
        ></button>
        <div ref={popupContentRef} id="popup-content"></div>
      </div>
    </MapContext.Provider>
  );
}

export default Map;
