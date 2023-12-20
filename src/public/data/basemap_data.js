const baseMapData = [
  {
    name: "Open Street Map",
  },
  {
    name: "Open Forest Map",
    URL: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
    type: "XYZLayer",
    maxZoom: 17,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
  {
    name: "Cycle Map",
    URL: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0690466e61b44e11bc9970199f4bffee",
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: "0690466e61b44e11bc9970199f4bffee",
    maxZoom: 22,
  },
  {
    name: "Transport Map",
  },
  {
    name: "Spinal Map",
  },
  {
    name: "Landscape Map",
  },
  {
    name: "Pioneer Map",
    URL: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=0690466e61b44e11bc9970199f4bffee",
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: "0690466e61b44e11bc9970199f4bffee",
    maxZoom: 22,
  },
  {
    name: "MobileAtlas Map",
  },
  {
    name: "Atlas Map",
    URL: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=0690466e61b44e11bc9970199f4bffee",
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: "0690466e61b44e11bc9970199f4bffee",
    maxZoom: 22,
  },
  {
    name: "Jawg Matrix Map",
  },
  {
    name: "Jawg Dark Map",
    URL: "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=W4ps2rtpvxokEk5JvpOLHMBlS0rQSyofTmW4eDQ8RNbcsl2fVQ63NwLlj3BmQrvx",
    minZoom: 0,
    maxZoom: 22,
    subdomains: "abcd",
    accessToken: "vbnEiqNL6y3HuRClLPADRFIqfAhwn0ilpRZWoSQbNzJfvrQ0bTvUtQibdThiZ5z4",
  },
  {
    name: "World Image Map",
  },
  {
    name: "National Geo Map",
  },
  {
    name: "NASA Map",
  },
  {
    URL: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
    type: "XYZLayer",
    name: "USGS Imagery",
    maxZoom: 20,
    attributions:
      'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
  },
];

export default baseMapData;
