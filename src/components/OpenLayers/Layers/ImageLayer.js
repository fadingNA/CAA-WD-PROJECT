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

    const updateLegend = function () {
      // Manually construct the legend URL

      const layerName = imageLayer.getSource().getParams().LAYERS;
      const legendUrl = `${source.getUrl()}?REQUEST=GetLegendGraphic&VERSION=1.3.0&FORMAT=image/png&LAYER=${layerName}`;
      console.log("Debug ImageLayer", legendUrl);
      const img = document.getElementById("legend");
      if (img) {
        img.src = legendUrl;
      }
    };

    const resolution = map.getView().getResolution();
    updateLegend(resolution);

    // Update the legend when the resolution changes
    map.getView().on("change:resolution", function (event) {
      const resolution = event.target.getResolution();
      updateLegend(resolution);
    });

    map.addLayer(imageLayer);
    imageLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(imageLayer);
      }
    };
  }, [map, source, zIndex, opacity, time]);

  return (
    <>
     
    </>
  );
}

export default ImageLayer;
