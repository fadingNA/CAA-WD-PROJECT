import { useContext, useEffect } from "react";
import MapContext from "../Maps/MapContext";
import OLImageLayer from "ol/layer/Image"; // Renamed for clarity

function ImageLayer({ source, zIndex = 0, opacity = 0.5, time }) {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const imageLayer = new OLImageLayer({ source, zIndex, opacity });
    if (time) {
      const params = { ...source.getParams(), TIME: time };
      imageLayer.getSource().updateParams(params);
    }

    map.addLayer(imageLayer);
    imageLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(imageLayer);
      }
    };
  }, [map, source, zIndex, opacity, time]);
  return null;
}

export default ImageLayer;
