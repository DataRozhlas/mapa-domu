import "./targetblank"; // pro otvírání odkazů v novém okně

// mapa
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaXpkYXRjeiIsImEiOiJjam55a2V6NHgwY2N5M2twY3BqN3p0M2tqIn0.Neq0yohOIiIanf5T8FYhWQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 7,
    maxZoom: 15,
    attributionControl: false,
    center: [15.3350758, 49.7417517]
});

map.addControl(new mapboxgl.AttributionControl({
    compact: true,
    customAttribution: 'obrazový podkres <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="http://vdp.cuzk.cz/">ČÚZK</a>'
}));
 
map.on('load', function () {
    map.addLayer({
        "id": "barakygeojson",
        "type": "fill",
        "source": {
            type: 'vector',
            tiles: ['https://data.irozhlas.cz/mapa-domu/tiles/{z}/{x}/{y}.pbf']
        },
        "source-layer": "barakygeojson",
        "paint": {
            "fill-color": "red"
        }
    });
});

// geocoder
var form = document.getElementById("frm-geocode");
var geocoder = null;
var geocodeMarker = null;
form.onsubmit = function(event) {
  event.preventDefault();
  var text = document.getElementById("inp-geocode").value;
  if (text == '') {
    map.flyTo({
        center: [15.3350758, 49.7417517],
        zoom: 7
    })
  } else {
    $.get( "https://api.mapy.cz/geocode?query=" + text, function(data) {
      if (typeof $(data).find('item').attr('x') == 'undefined') {
        alert("Bohužel, danou adresu nebylo možné najít");
        return;
      }
      var x = parseFloat($(data).find('item').attr('x'))
      var y = parseFloat($(data).find('item').attr('y'))
      map.flyTo({
          center: [x, y],
          zoom: 12
      })
    }, 'xml');
  } 
};


