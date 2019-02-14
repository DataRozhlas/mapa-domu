import "./targetblank"; // pro otvírání odkazů v novém okně

// mapa
const map = new mapboxgl.Map({
  container: "map",
  style: "https://data.irozhlas.cz/mapa-domu/map_styl/style.json",
  zoom: 13,
  maxZoom: 15,
  pitch: window.location.href.includes("?nahni") ? 30 : 0,
  attributionControl: false,
  // center: [15.3350758, 49.7417517],
  center: [14.4266722, 50.0814917], // Václavák
});

map.addControl(new mapboxgl.AttributionControl({
  compact: true,
  customAttribution: "obrazový podkres <a target=\"_blank\" href=\"https://samizdat.cz\">Samizdat</a>, data <a target=\"_blank\" href=\"http://vdp.cuzk.cz/\">ČÚZK</a>",
}));

map.scrollZoom.disable(); // zoom myší teprve až po interakci s mapou
map.on("click", (e) => {
  map.scrollZoom.enable();
});

map.addControl(new mapboxgl.NavigationControl(), "top-left"); // buttonky pro zoom a rotaci


map.on("load", () => {
  map.addLayer({ // pridat vrstvu domu
    id: "barakygeojson",
    type: "fill",
    source: {
      type: "vector",
      tiles: ["https://data.irozhlas.cz/mapa-domu/tiles/{z}/{x}/{y}.pbf"],
    },
    "source-layer": "barakygeojson",
    paint: {
      // "fill-color": "black",
      "fill-opacity": [
        "interpolate",
        [
          "linear",
        ],
        [
          "zoom",
        ],
        10,
        0.5,
        10.1,
        1,
      ],
      "fill-outline-color": "hsl(0, 0%, 52%)",
    },
  });

  map.addLayer({
    id: "labels",
    source: {
      tiles: [
        "https://interaktivni.rozhlas.cz/tiles/ton_l2/{z}/{x}/{y}.png",
      ],
      type: "raster",
      tileSize: 256,
    },
    type: "raster",
  });
});

$("#inp-geocode").on("focus input", () => $("#inp-geocode").css("border-color", "black"));

// geocoder
const form = document.getElementById("frm-geocode");
form.onsubmit = function submitForm(event) {
  event.preventDefault();
  const text = document.getElementById("inp-geocode").value;
  if (text === "") {
    map.flyTo({
      center: [15.3350758, 49.7417517],
      zoom: 7,
    });
  } else {
    $.get(`https://api.mapy.cz/geocode?query=${text}`, (data) => {
      if (typeof $(data).find("item").attr("x") === "undefined") {
        $("#inp-geocode").css("border-color", "red");
        return;
      }
      const x = parseFloat($(data).find("item").attr("x"));
      const y = parseFloat($(data).find("item").attr("y"));

      if (x < 12 || x > 19 || y < 48 || y > 52) { // omezení geosearche na česko, plus mínus
        $("#inp-geocode").css("border-color", "red");
        return;
      }
      map.flyTo({
        center: [x, y],
        zoom: 12,
      });
    }, "xml");
  }
};
