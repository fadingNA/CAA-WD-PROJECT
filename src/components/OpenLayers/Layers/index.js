import Layers from "./Layers";
import React from "react";
import TileLayer from "./TileLayer";
import VectorLayer from "./VectorLayer";
import ImageLayer from "./ImageLayer";
import { useContext } from "react";
import MapContext from "../Maps/MapContext";

export { Layers, TileLayer, VectorLayer, ImageLayer };

function LayerSwitcher({ selectedLayer }) {
  const { map } = useContext(MapContext);
  React.useEffect(() => {
    if (!map) return;
    const layerSwitcher = map.getLayers().getArray();
    console.log("Debug LayerSwitcher", layerSwitcher);
    layerSwitcher.forEach((layer) => {
      if (layer.get("name") === selectedLayer) {
        layer.setVisible(true);
      } else {
        layer.setVisible(false);
      }
    });
  }, [selectedLayer, map]);
}
