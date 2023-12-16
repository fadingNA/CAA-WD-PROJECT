import React, { useContext, useEffect } from 'react';
import MapContext  from '../Maps/MapContext'; // Update import based on your context structure
import 'ol/ol.css';
import FullScreenControl from 'ol/control/FullScreen';

const FullScreenMapControl = () => {
  const { map } = useContext(MapContext); // Assuming you have a MapContext to provide the map instance

  useEffect(() => {
    if (!map) return;

    const fullScreenControl = new FullScreenControl();
    map.addControl(fullScreenControl);

    return () => {
      if (map) {
        map.removeControl(fullScreenControl);
      }
    };
  }, [map]);

  return null; // This component does not render anything
};

export default FullScreenMapControl;
