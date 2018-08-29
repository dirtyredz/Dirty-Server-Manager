#!/usr/bin/env node
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bin/webServer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bin/helpers/webUpdater.js":
/*!***************************************!*\
  !*** ./src/bin/helpers/webUpdater.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet inter = false;\n\nconst RegisterToWebEmitter = WebServerEmitter => {\n  WebServerEmitter.on('connection', socket => {\n    console.log('a user connected');\n\n    inter = setInterval(() => {\n      // var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))\n      // sock.on('error',(err)=>{\n      //   if(err.code === \"ENOENT\")\n      //     socket.emit('offline')\n      // })\n      // socket.emit('some event','test');\n      // console.log('inter')\n      // sock.destroy()\n    }, 5000);\n\n    socket.on('disconnect', () => {\n      console.log('user disconnected');\n      if (inter !== false) clearTimeout(inter);\n      inter = false;\n    });\n  });\n  WebServerEmitter.on('exit', () => {\n    console.log('force user disconnected');\n    if (inter !== false) clearTimeout(inter);\n    inter = false;\n  });\n};\n\nexports.default = { RegisterToWebEmitter };\n\n//# sourceURL=webpack:///./src/bin/helpers/webUpdater.js?");

/***/ }),

/***/ "./src/bin/webServer.js":
/*!******************************!*\
  !*** ./src/bin/webServer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _http = __webpack_require__(/*! http */ \"http\");\n\nvar _http2 = _interopRequireDefault(_http);\n\nvar _socket = __webpack_require__(/*! socket.io */ \"socket.io\");\n\nvar _socket2 = _interopRequireDefault(_socket);\n\nvar _webUpdater = __webpack_require__(/*! ./helpers/webUpdater */ \"./src/bin/helpers/webUpdater.js\");\n\nvar _webUpdater2 = _interopRequireDefault(_webUpdater);\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar events = __webpack_require__(/*! events */ \"events\").EventEmitter;\nvar WebServerEmitter = new events.EventEmitter();\n\n\nconst config = new _MainConfig.DSMConfig();\n_webUpdater2.default.RegisterToWebEmitter(WebServerEmitter);\n\nconst app = (0, _express2.default)();\nconst httpServer = _http2.default.Server(app);\nconst io = (0, _socket2.default)(httpServer, {\n  serveClient: false // do not serve the client file, in that case the brfs loader is not needed\n});\n\n_localStorage2.default.setItem('WebServerPid', process.pid);\n\n// server.use(express.static(path.join(__dirname, 'build')));\napp.use('/public', _express2.default.static(_path2.default.resolve(globals.InstallationDir() + '/dsm/public')));\napp.get('/*', function (req, res) {\n  res.sendFile(_path2.default.resolve(globals.InstallationDir() + '/dsm/public/index.html'));\n});\n\nio.on('connection', function (socket) {\n  WebServerEmitter.emit('connection', socket);\n});\n\nhttpServer.listen(config.WEB_PORT.value, config.WEB_IP_ADDRESS.value, () => console.log('Example app listening on port 3000!'));\nhttpServer.on('close', function (socket) {\n  console.log('http close');\n});\n\nconst exitHandler = () => {\n  console.log('Closing WebServer');\n  WebServerEmitter.emit('exit');\n  io.close();\n  _localStorage2.default.removeItem('WebServerPid');\n  process.exit(0);\n};\n\nprocess.on('beforeExit', exitHandler);\n\n//do something when app is closing\nprocess.on('exit', exitHandler);\n\n//catches ctrl+c event\nprocess.on('SIGINT', exitHandler);\n\n// catches \"kill pid\" (for example: nodemon restart)\nprocess.on('SIGUSR1', exitHandler);\nprocess.on('SIGUSR2', exitHandler);\n\n//catches uncaught exceptions\nprocess.on('uncaughtException', exitHandler);\n\n//# sourceURL=webpack:///./src/bin/webServer.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ServerConfig = exports.DSMConfig = undefined;\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _ip = __webpack_require__(/*! ip */ \"ip\");\n\nvar _ip2 = _interopRequireDefault(_ip);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Option {\n  constructor(name, def, description, type, init) {\n    this.default = def;\n    this.description = description;\n    this.type = type;\n    this.name = name;\n    this.parse(def);\n    this.parse(init);\n  }\n  get value() {\n    return this._value;\n  }\n  set value(incValue) {\n    if (incValue) {\n      this.parse(incValue);\n    }\n  }\n  parse(unparsed) {\n    if (unparsed == null) return;\n    switch (this.type) {\n      case 'number':\n        this._value = parseInt(unparsed, 10);\n        break;\n      case 'boolean':\n        this._value = unparsed === 'true';\n        break;\n      case 'string':\n        this._value = String(unparsed);\n        break;\n      default:\n        this._value = unparsed;\n    }\n  }\n}\n\n// create object for each config option to support type checking, defaults, and required options.\n// then use a command to parse it all\nclass DSMConfig {\n  constructor() {\n    this.raw = _fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8');\n    this.parsed = _ini2.default.parse(this.raw);\n  }\n  get STEAM_DIR() {\n    return new Option(\"STEAM_DIR\", \"steam\", 'directory relative to dsm installation for steam to be installed', 'string', this.parsed['STEAM_DIR']);\n  }\n  get WEB_PORT() {\n    return new Option(\"WEB_PORT\", 8080, 'Port assigned to the Wen Interface', 'number', this.parsed['WEB_PORT']);\n  }\n  get WEB_IP_ADDRESS() {\n    return new Option(\"WEB_IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string', this.parsed['WEB_IP_ADDRESS']);\n  }\n}\n\nclass ServerConfig {\n  constructor(galaxyName) {\n    this.parsed = [];\n\n    this.galaxyName = galaxyName;\n    this.raw = _fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + galaxyName + '/config.ini'), 'utf-8');\n    this.parsed = _ini2.default.parse(this.raw);\n  }\n  get MOTD() {\n    return new Option(\"MOTD\", \"Welcome to the server, Enjoy!!\", 'Message to be displayed on user login', 'string', this.parsed['MOTD']);\n  }\n  get STATUS_INTERVAL_MS() {\n    return new Option(\"STATUS_INTERVAL_MS\", 1000 * 60 * 5, 'interval in MS to run the status check', 'number', this.parsed['STATUS_INTERVAL_MS']);\n  }\n  get BETA() {\n    return new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean', this.parsed['BETA']);\n  }\n  get STARTUP_PARAMS() {\n    return new Option(\"STARTUP_PARAMS\", '--public true --listed true --same-start-sector false', 'Parameters to be applied to server when starting. see \"dsm info\" for more info', 'string', this.parsed['STARTUP_PARAMS']);\n  }\n  // SERVER_PORT: new Option(\n  //   \"SERVER_PORT\",\n  //   27000,\n  //   'Port assigned to the game server',\n  //   'number'),\n  get AUTO_RESTART() {\n    return new Option(\"AUTO_RESTART\", 'true', 'if true will automatically restart the server when a crash is detected', 'boolean', this.parsed['AUTO_RESTART']);\n  }\n  get IP_ADDRESS() {\n    return new Option(\"IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string');\n  }\n  get TIME_TO_STATUS_FAILURE() {\n    return new Option(\"TIME_TO_STATUS_FAILURE\", 30000, 'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.', 'number', this.parsed['TIME_TO_STATUS_FAILURE']);\n  }\n}\n// const Write\nexports.DSMConfig = DSMConfig;\nexports.ServerConfig = ServerConfig;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

/***/ }),

/***/ "./src/lib/globals.js":
/*!****************************!*\
  !*** ./src/lib/globals.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.cleanPipeName = exports.InstallationDir = undefined;\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Global function incase we need to change this in the future\nconst InstallationDir = exports.InstallationDir = () => {\n    if (true) return '.';\n    return _os2.default.homedir();\n};\n\nconst cleanPipeName = exports.cleanPipeName = str => {\n    if (process.platform === 'win32') {\n        str = str.replace(/^\\//, '');\n        str = str.replace(/\\//g, '-');\n        return '\\\\\\\\.\\\\pipe\\\\' + str;\n    } else {\n        return str;\n    }\n};\n\n//# sourceURL=webpack:///./src/lib/globals.js?");

/***/ }),

/***/ "./src/lib/localStorage.js":
/*!*********************************!*\
  !*** ./src/lib/localStorage.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _nodeLocalstorage = __webpack_require__(/*! node-localstorage */ \"node-localstorage\");\n\nvar _nodeLocalstorage2 = _interopRequireDefault(_nodeLocalstorage);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet localStorage;\nif (typeof localStorage === \"undefined\" || localStorage === null) {\n  localStorage = new _nodeLocalstorage2.default.LocalStorage(_path2.default.resolve(globals.InstallationDir() + '/dsm/.storage'));\n}\n\nexports.default = localStorage;\n\n// length\n// setItem(key, value)\n// getItem(key)\n// removeItem(key)\n// key(n)\n// clear()\n\n\n// let MyLocalStorage = {}\n// export const setItem = MyLocalStorage.setItem = (key, value) => {\n//   localStorage.setItem(key, value);\n// }\n\n//# sourceURL=webpack:///./src/lib/localStorage.js?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "ini":
/*!**********************!*\
  !*** external "ini" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ini\");\n\n//# sourceURL=webpack:///external_%22ini%22?");

/***/ }),

/***/ "ip":
/*!*********************!*\
  !*** external "ip" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ip\");\n\n//# sourceURL=webpack:///external_%22ip%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ }),

/***/ "node-localstorage":
/*!************************************!*\
  !*** external "node-localstorage" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-localstorage\");\n\n//# sourceURL=webpack:///external_%22node-localstorage%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });