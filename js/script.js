import "./targetblank"; // pro otvírání odkazů v novém okně

// mapa
var hst = 'https://data.irozhlas.cz/senat18_2_okrsky/';
if (window.location.hostname == 'localhost') {
  hst = './scratch/'
};

var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 15});

var background = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_b1/{z}/{x}/{y}.png',
    attributions: [
      new ol.Attribution({ html: 'obrazový podkres <a target="_blank" href="http://stamen.com">Stamen</a>, <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="https://www.volby.cz">ČSÚ</a> a <a target="_blank" href="http://vdp.cuzk.cz/vdp/ruian/vymennyformatspecialni/vyhledej?vf.cr=U&_vf.vu=on&vf.vu=VOH&_vf.vu=on&search=Vyhledat">ČÚZK</a>'})
    ]
  })
})

var labels = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_l1/{z}/{x}/{y}.png',
    maxZoom: 15
   })
})

function drawMap() {
  $('#map').empty()
  var layer = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      format: new ol.format.MVT(),
      tileGrid: tilegrid,
      tilePixelRatio: 8,
      url: 'tiles/{z}/{x}/{y}.pbf'
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "lightgray",
          width: 0.3
        }),
        fill: new ol.style.Fill({
          color: 'red'
        })
      })
  });

  var initZoom;

  if (window.innerWidth < 768) {
    initZoom = 6;
    document.getElementById('tooltip').innerHTML = 'Kliknutím vyberte okrsek.'
  } else {
    initZoom = 7;
  }

  var map = new ol.Map({
    interactions: ol.interaction.defaults({mouseWheelZoom:false}),
    target: 'map',
    view: new ol.View({
      center: ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'), //Číhošť
      zoom: initZoom,
      minZoom: 6,
      maxZoom: 15
    })
  });

  map.addLayer(background);
  map.addLayer(layer);
  map.addLayer(labels);

var form = document.getElementById("frm-geocode");
var geocoder = null;
var geocodeMarker = null;
form.onsubmit = function(event) {
  event.preventDefault();
  var text = document.getElementById("inp-geocode").value;
  if (text == '') {
    map.getView().setCenter(ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'))
    map.getView().setZoom(8)
  } else {
    $.get( "https://api.mapy.cz/geocode?query=" + text, function(data) {
      if (typeof $(data).find('item').attr('x') == 'undefined') {
        alert("Bohužel, danou adresu nebylo možné najít");
        return;
      }
      var x = parseFloat($(data).find('item').attr('x'))
      var y = parseFloat($(data).find('item').attr('y'))
      map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'))
      map.getView().setZoom(12)
    }, 'xml');
  } 
};
};

drawMap();


