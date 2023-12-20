// XYZLayer.js
import { useContext, useEffect } from "react";
import MapContext from "../Maps/MapContext";
import { Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";

const XYZLayer = ({ sourceOptions }) => {
  const { map } = useContext(MapContext);
    console.log(sourceOptions);
  useEffect(() => {
    if (!map) return;

    const xyzSource = new XYZ({
      url: sourceOptions.URL,
      maxZoom: sourceOptions.maxZoom,
      attributions: sourceOptions.attributions,
    });

    const layer = new TileLayer({
      source: xyzSource,
    });

    map.addLayer(layer);
    return () => {
      if (map) {
        map.removeLayer(layer);
      }
    };
  }, [map, sourceOptions]);

  return null;
};

export default XYZLayer;
