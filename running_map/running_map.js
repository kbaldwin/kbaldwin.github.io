import StateData from "./states_data.js";

// default settings for U.S.
var map = L.map("map").setView([38.68, -98], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var stateGeojson;

function getStateColor(stateProperties) {
  if (stateProperties.eventType == "run") {
    return "#800026";
  } else if (stateProperties.eventType == "none") {
    return "#999999";
  }
  return stateProperties.density > 1000 ? "#800026" : "#FFEDA0";
}

function stateStyle(feature) {
  return {
    fillColor: getStateColor(feature.properties),
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
    weight: 2,
    color: "#888888",
    dashArray: "",
    fillOpacity: 0.5,
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
