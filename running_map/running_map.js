import StateData from "./states_data.js";

// default settings for U.S.
var map = L.map("map").setView([38.68, -98], 4);

console.log(StateData.data["type"]);

// map.on("moveend", function () {
//   console.log(map.getCenter().toString());
//   console.log(map.getZoom().toString());
// });

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var stateGeojson;

function getStateColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

function stateStyle(feature) {
  return {
    fillColor: getStateColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

function stateHighlightState(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();
}

function resetStateHighlight(e) {
  stateGeojson.resetStyle(e.target);
}

function zoomToState(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachState(feature, layer) {
  layer.on({
    mouseover: stateHighlightState,
    mouseout: resetStateHighlight,
    click: zoomToState,
  });
}

stateGeojson = L.geoJson(StateData.data, {
  style: stateStyle,
  onEachFeature: onEachState,
}).addTo(map);
