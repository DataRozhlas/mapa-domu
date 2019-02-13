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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _targetblank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./targetblank */ \"./js/targetblank.js\");\n/* harmony import */ var _targetblank__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_targetblank__WEBPACK_IMPORTED_MODULE_0__);\n // pro otvírání odkazů v novém okně\n// mapa\n\nvar map = new mapboxgl.Map({\n  container: \"map\",\n  style: \"https://data.irozhlas.cz/mapa-domu/map_styl/style.json\",\n  zoom: 12,\n  maxZoom: 15,\n  pitch: 30,\n  attributionControl: false,\n  //center: [15.3350758, 49.7417517],\n  center: [14.4266722, 50.0814917] // Václavák\n\n});\nmap.addControl(new mapboxgl.AttributionControl({\n  compact: true,\n  customAttribution: \"obrazový podkres <a target=\\\"_blank\\\" href=\\\"https://samizdat.cz\\\">Samizdat</a>, data <a target=\\\"_blank\\\" href=\\\"http://vdp.cuzk.cz/\\\">ČÚZK</a>\"\n}));\nmap.on(\"load\", function () {\n  map.addLayer({\n    // pridat vrstvu domu\n    id: \"barakygeojson\",\n    type: \"fill\",\n    source: {\n      type: \"vector\",\n      tiles: [\"https://data.irozhlas.cz/mapa-domu/tiles/{z}/{x}/{y}.pbf\"]\n    },\n    \"source-layer\": \"barakygeojson\",\n    paint: {\n      // \"fill-color\": \"black\",\n      \"fill-opacity\": [\"interpolate\", [\"linear\"], [\"zoom\"], 10, 0.5, 10.1, 1],\n      \"fill-outline-color\": \"hsl(0, 0%, 52%)\"\n    }\n  });\n  map.addLayer({\n    id: \"labels\",\n    source: {\n      tiles: [\"https://interaktivni.rozhlas.cz/tiles/ton_l2/{z}/{x}/{y}.png\"],\n      type: \"raster\",\n      tileSize: 256\n    },\n    type: \"raster\"\n  });\n});\n$(\"#inp-geocode\").on(\"focus input\", function () {\n  return $(\"#inp-geocode\").css(\"border-color\", \"black\");\n}); // geocoder\n\nvar form = document.getElementById(\"frm-geocode\");\n\nform.onsubmit = function submitForm(event) {\n  event.preventDefault();\n  var text = document.getElementById(\"inp-geocode\").value;\n\n  if (text === \"\") {\n    map.flyTo({\n      center: [15.3350758, 49.7417517],\n      zoom: 7\n    });\n  } else {\n    $.get(\"https://api.mapy.cz/geocode?query=\".concat(text), function (data) {\n      console.log($(data).find(\"item\"));\n\n      if (typeof $(data).find(\"item\").attr(\"x\") === \"undefined\") {\n        $(\"#inp-geocode\").css(\"border-color\", \"red\");\n        return;\n      }\n\n      var x = parseFloat($(data).find(\"item\").attr(\"x\"));\n      var y = parseFloat($(data).find(\"item\").attr(\"y\"));\n\n      if (x < 12 || x > 19 || y < 48 || y > 52) {\n        // omezení geosearche na česko, plus mínus\n        $(\"#inp-geocode\").css(\"border-color\", \"red\");\n        return;\n      }\n\n      map.flyTo({\n        center: [x, y],\n        zoom: 12\n      });\n    }, \"xml\");\n  }\n};\n\n//# sourceURL=webpack:///./js/script.js?");

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