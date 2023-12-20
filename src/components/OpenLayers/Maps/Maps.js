import React, { useRef, useEffect, useState } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { toStringXY } from "ol/coordinate";
import { toLonLat } from "ol/proj";
import { FullScreen, defaults as defaultControls } from "ol/control.js";

function Map({ children, center, zoom, selectedLayer }) {
  const mapRef = React.useRef();
  const popupRef = React.useRef();
  const popupContentRef = React.useRef();
  const legendContentRef = React.useRef();
  const overlayRef = React.useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const options = {
      controls: defaultControls().extend([new FullScreen()]),
      layers: [],
      view: new ol.View({ center: center, zoom: zoom }),
    };

    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    // clean up
    return () => mapObject.setTarget(undefined);
  }, [center, zoom]);

  useEffect(() => {
    if (!map) return;
    const layers = map.getLayers().getArray();
    layers.forEach((layer) => {
      const isLayerVisible = layer.get("name") === selectedLayer;
      layer.setVisible(isLayerVisible);
    });
    // clean up
    return () => map.setTarget(undefined);
  }, [map, selectedLayer]);

  //update map center
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
    map.getView().setZoom(zoom);
  }, [center, zoom, map]);

  //add popup
  useEffect(() => {
    if (!map) return;
    overlayRef.current = new ol.Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    map.addOverlay(overlayRef.current);
  }, [map]);

  useEffect(() => {
    if (!map) return;
    const handleMapClick = (evt) => {
      const coordinate = evt.coordinate;
      const xyCoordinates = toStringXY(toLonLat(coordinate), 4);
      let viewResolution = map.getView().getResolution();
      let wms_source = map.getLayers().item(1)?.getSource();
      let url = wms_source?.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        "EPSG:3857",
        { INFO_FORMAT: "application/json" }
      );
      
      //console.log(urlLgend)
      
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
    };
    map.on("click", handleMapClick);
    return () => {
      map.un("click", handleMapClick);
      map.removeOverlay(overlayRef);
    };
  }, [center, zoom, selectedLayer, map]);

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

/*

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;
    overlayRef.current = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
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

*/
