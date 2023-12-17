import { useContext, useEffect } from "react";
import MapContext from "../Maps/MapContext";
import OLVectorLayer from "ol/layer/Vector";

function VectorLayer({ source, style, zIndex = 0 }) {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let vector = new OLVectorLayer({ source, style });
    map.addLayer(vector);
    vector.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vector);
      }
    };
  }, [map]);
  return null;
}

export default VectorLayer;
