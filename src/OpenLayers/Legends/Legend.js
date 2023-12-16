import React from "react";
import ImageWMS from "ol/source/ImageWMS";
import MapContext from "../Maps/MapContext";

function LegendSymbol() {
  const { map } = React.useContext(MapContext);
  

  return (
    <div className="legend-symbol">
      
    </div>
  );
}


export default LegendSymbol;