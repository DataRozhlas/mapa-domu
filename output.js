/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _targetblank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./targetblank */ \"./js/targetblank.js\");\n/* harmony import */ var _targetblank__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_targetblank__WEBPACK_IMPORTED_MODULE_0__);\n // pro otvírání odkazů v novém okně\n// mapa\n\nvar hst = 'https://data.irozhlas.cz/senat18_2_okrsky/';\n\nif (window.location.hostname == 'localhost') {\n  hst = './scratch/';\n}\n\n;\nvar isFirefox = typeof InstallTrigger !== 'undefined';\nvar isIE =\n/*@cc_on!@*/\n false || !!document.documentMode;\nvar isEdge = !isIE && !!window.StyleMedia;\nvar tilegrid = ol.tilegrid.createXYZ({\n  tileSize: 512,\n  maxZoom: 15\n});\nvar background = new ol.layer.Tile({\n  source: new ol.source.TileImage({\n    url: 'https://interaktivni.rozhlas.cz/tiles/ton_b1/{z}/{x}/{y}.png',\n    attributions: [new ol.Attribution({\n      html: 'obrazový podkres <a target=\"_blank\" href=\"http://stamen.com\">Stamen</a>, <a target=\"_blank\" href=\"https://samizdat.cz\">Samizdat</a>, data <a target=\"_blank\" href=\"https://www.volby.cz\">ČSÚ</a> a <a target=\"_blank\" href=\"http://vdp.cuzk.cz/vdp/ruian/vymennyformatspecialni/vyhledej?vf.cr=U&_vf.vu=on&vf.vu=VOH&_vf.vu=on&search=Vyhledat\">ČÚZK</a>'\n    })]\n  })\n});\nvar labels = new ol.layer.Tile({\n  source: new ol.source.TileImage({\n    url: 'https://interaktivni.rozhlas.cz/tiles/ton_l1/{z}/{x}/{y}.png',\n    maxZoom: 15\n  })\n});\n\nfunction drawMap() {\n  $('#map').empty();\n  var layer = new ol.layer.VectorTile({\n    source: new ol.source.VectorTile({\n      format: new ol.format.MVT(),\n      tileGrid: tilegrid,\n      tilePixelRatio: 8,\n      url: 'tiles/{z}/{x}/{y}.pbf'\n    }),\n    style: new ol.style.Style({\n      stroke: new ol.style.Stroke({\n        color: \"lightgray\",\n        width: 0.3\n      }),\n      fill: new ol.style.Fill({\n        color: 'red'\n      })\n    })\n  });\n  var initZoom;\n\n  if (window.innerWidth < 768) {\n    initZoom = 6;\n    document.getElementById('tooltip').innerHTML = 'Kliknutím vyberte okrsek.';\n  } else {\n    initZoom = 7;\n  }\n\n  var map = new ol.Map({\n    interactions: ol.interaction.defaults({\n      mouseWheelZoom: false\n    }),\n    target: 'map',\n    view: new ol.View({\n      center: ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'),\n      //Číhošť\n      zoom: initZoom,\n      minZoom: 6,\n      maxZoom: 15\n    })\n  });\n  map.addLayer(background);\n  map.addLayer(layer);\n  map.addLayer(labels);\n  var form = document.getElementById(\"frm-geocode\");\n  var geocoder = null;\n  var geocodeMarker = null;\n\n  form.onsubmit = function (event) {\n    event.preventDefault();\n    var text = document.getElementById(\"inp-geocode\").value;\n\n    if (text == '') {\n      map.getView().setCenter(ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'));\n      map.getView().setZoom(8);\n    } else {\n      $.get(\"https://api.mapy.cz/geocode?query=\" + text, function (data) {\n        if (typeof $(data).find('item').attr('x') == 'undefined') {\n          alert(\"Bohužel, danou adresu nebylo možné najít\");\n          return;\n        }\n\n        var x = parseFloat($(data).find('item').attr('x'));\n        var y = parseFloat($(data).find('item').attr('y'));\n        map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));\n        map.getView().setZoom(12);\n      }, 'xml');\n    }\n  };\n}\n\n;\ndrawMap();\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ }),

/***/ "./js/targetblank.js":
/*!***************************!*\
  !*** ./js/targetblank.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  var links = document.getElementsByTagName(\"a\");\n  Array.prototype.forEach.call(links, function (link) {\n    if (link.hostname !== window.location.hostname) {\n      link.target = \"_blank\";\n      link.rel = \"noopener noreferrer\";\n    }\n  });\n});\n\n//# sourceURL=webpack:///./js/targetblank.js?");

/***/ })

/******/ });