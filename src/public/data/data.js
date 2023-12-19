const wmsdata = [
  {
    URL: "https://geo.weather.gc.ca/geomet/?service=WMS&version=1.3.0&request=GetCapabilities",
    Setting: [
      {
        type: "TileLayer",
        name: "Air Temperature",
        params: {
          LAYERS: "GDPS.ETA_TT",
          TILED: true,
        },
        transition: 0,
        opacity: 0.5,
        zIndex: 3,
      },
      {
        type: "ImageLayer",
        name: "Wind Direction",
        TILED: true,
        params: {
          crs: "EPSG:4326",
          LAYERS: "GDWPS_25km_Winds_10m_PT1H",
          dpiMode: 7,
          format: "image/png",
          tilePixelRatio: 0,
          styles: "",
          transition: 0,
          visible: true,
          maxZoom: 20,
        },
        ratio: 1,
        serverType: "geoserver",
      },
      {
        type: "ImageLayer",
        name: "Current Conditions",
        params: {
          crs: "EPSG:4326",
          LAYERS: "CURRENT_CONDITIONS",
          dpiMode: 7,
          format: "image/png",
          tilePixelRatio: 0,
          styles: "",
          TILED: true,
        },
        ratio: 1,
        serverType: "geoserver",
      },
      {
        type: "ImageLayer",
        name: "Wind Direction Visualization",
        params: {
          crs: "EPSG:4326",
          LAYERS: "GDWPS_25km_WVDIR_PT1H",
          dpiMode: 7,
          format: "image/png",
          tilePixelRatio: 0,
          styles: "",
          transition: 0,
          visible: true,
          maxZoom: 20,
          TILED: true,
        },
        ratio: 1,
        serverType: "geoserver",
      },
      {
        type: "ImageLayer",
        name: "Land Air Temperature",
        params: {
          crs: "EPSG:4326",
          LAYERS: "CaLDAS-NSRPS_2.5km_AirTemp_1.5m",
          dpiMode: 7,
          format: "image/png",
          tilePixelRatio: 0,
          styles: "",
          transition: 0,
          visible: true,
          maxZoom: 20,
          TILED: true,
        },
        ratio: 1,
        serverType: "geoserver",
      },
    ],
  },
  {
    URL: "https://api.ellipsis-drive.com/v3/ogc/wmts/58da67a5-db74-446f-ab75-e2672f2eaf5d",
    Setting: [
      {
        type: "TileLayer",
        name: "Ellipsis Drive Layer - January 2010",
        params: {
          LAYERS:
            "55d4eab4-cff7-460a-ae66-f62601fb565d_5c2ee154-20c1-4c4f-97c5-fc887ff5e737",
          format: "image/png",
          version: "1.0.0",
          TILED: true,
          token:
            "epat_VY51YX0ThQDmYunn56PITp7Ln1f1YSwJagiB056zRboxX5DivzePcftBSybOp953",
          tileSize: 256,
        },
        opacity: 0.5,
        zIndex: 3,
        serverType: "wmts",
        matrixSet: "matrix_5",
      },
    ],
  },
];

export default wmsdata;
