import { useContext, useEffect } from "react";
import MapContext from "../Maps/MapContext";
import OLTileLayer from "ol/layer/Tile";

function TileLayer({ source, zIndex = 0, opacity = 0.5 }) {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let tile = new OLTileLayer({
      source,
      zIndex,
      opacity: opacity,
    });
    map.addLayer(tile);
    tile.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tile);
      }
    };
  }, [map, source, zIndex, opacity]);
  return null;
}

export default TileLayer;
