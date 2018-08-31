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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bin/serverWrapper.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bin/helpers/chatLogger.js":
/*!***************************************!*\
  !*** ./src/bin/helpers/chatLogger.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _logger = __webpack_require__(/*! ../../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst name = exports.name = 'Chat Logger';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = (GameServerEmitter, Config, DB, GalaxyName) => {\n\n  let ChatLog;\n  GameServerEmitter.on('chat', (name, message) => {\n    const date = new Date();\n    ChatLog.log(`${date.toUTCString()} | <${name}> ${message}`);\n  });\n\n  GameServerEmitter.on('spawned', () => {\n    ChatLog = new _logger2.default(GalaxyName, 'chat');\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/chatLogger.js?");

/***/ }),

/***/ "./src/bin/helpers/eventHandlers.js":
/*!******************************************!*\
  !*** ./src/bin/helpers/eventHandlers.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.playerTracker = exports.chatLogger = exports.statusChecker = exports.ipcLayer = undefined;\n\nvar _ipcLayer = __webpack_require__(/*! ./ipcLayer */ \"./src/bin/helpers/ipcLayer.js\");\n\nvar ipcLayer = _interopRequireWildcard(_ipcLayer);\n\nvar _statusChecker = __webpack_require__(/*! ./statusChecker */ \"./src/bin/helpers/statusChecker.js\");\n\nvar statusChecker = _interopRequireWildcard(_statusChecker);\n\nvar _chatLogger = __webpack_require__(/*! ./chatLogger */ \"./src/bin/helpers/chatLogger.js\");\n\nvar chatLogger = _interopRequireWildcard(_chatLogger);\n\nvar _playerTracker = __webpack_require__(/*! ./playerTracker */ \"./src/bin/helpers/playerTracker.js\");\n\nvar playerTracker = _interopRequireWildcard(_playerTracker);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nexports.ipcLayer = ipcLayer;\nexports.statusChecker = statusChecker;\nexports.chatLogger = chatLogger;\nexports.playerTracker = playerTracker;\n\n//# sourceURL=webpack:///./src/bin/helpers/eventHandlers.js?");

/***/ }),

/***/ "./src/bin/helpers/ipcLayer.js":
/*!*************************************!*\
  !*** ./src/bin/helpers/ipcLayer.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _https = __webpack_require__(/*! https */ \"https\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst name = exports.name = 'IPC Layer';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = (GameServerEmitter, Config, DB, GalaxyName) => {\n  let server;\n\n  GameServerEmitter.on('spawned', function (GameServer) {\n    console.log('DSM: IPC Initializing...\\n');\n    // Socket layer to listen for incoming mesages.\n    server = _net2.default.createServer(ClientSock => {\n      // Callback for the attach command to recieve data\n      const SendServerData = ServerData => {\n        ClientSock.write(ServerData); // Write data to Client\n      };\n\n      const WaitToClose = () => {\n        ClientSock.write(\"SUCCESS\");\n        ClientSock.end(); // tell client were closing\n      };\n      // listen to server exit event\n      const ServerExitCallback = () => {\n        console.log('Shutting down connected client');\n        ClientSock.end(); // tell client were closing\n      };\n      console.log('Client connected to IPC Layer');\n      GameServerEmitter.on('exit', ServerExitCallback);\n\n      // console.log('DSM Client ');\n      ClientSock.on('end', () => {\n        // console.log('DSM Socket Closed');\n        GameServerEmitter.removeListener('data', SendServerData); // Remove the listener since the client is not listening\n        GameServerEmitter.removeListener('exit', ServerExitCallback); // Remove the listener since the client is not listening\n        GameServerEmitter.removeListener('status', SendServerData);\n        GameServerEmitter.removeListener('shutdown', WaitToClose);\n        GameServerEmitter.removeListener('startup', WaitToClose);\n        console.log('Closing client from IPC Layer');\n      });\n      ClientSock.on('data', function (data) {\n        if (data.toString() === 'ATTACH') {\n          // attach command has been run, start sending data to the client\n          console.log('Client is listening to server output.');\n          GameServerEmitter.on('data', SendServerData);\n        } else if (data.toString() === '/status') {\n          // if when attached and you use /status this will fire attaching both data and status listeners to the attached client\n          console.log('STATUS COMMAND');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('status', SendServerData);\n        } else if (data.toString() === '/stop') {\n          console.log('SHUTDOWN COMMAND');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('shutdown', WaitToClose);\n        } else if (data.toString() === 'STARTUP') {\n          GameServerEmitter.on('startup', WaitToClose);\n        } else if (data.toString().match(/^SENDING/)) {\n          GameServer.write(data.toString().replace(/^SENDING/, \"\") + '\\n');\n          GameServerEmitter.on('data', SendServerData);\n        } else {\n          // dont create event as the client is likely to close immediatly after writing\n          GameServer.write(data + '\\n');\n        }\n      });\n    });\n    server.on('error', e => {\n      console.log(e);\n      // NEED TO CHECK IF THE SOCK FILE IS IN USE.\n      // IF IT IS WE HAVE A RUNNAWAY SERVER THAT NEEDS TO BE KILLED\n      // PERHAPS WE SHOULDENT ERASE/RESET PID UNTIL WE KNOW FOR SURE\n      // { Error: listen EADDRINUSE /tmp/dsm_testing.sock\n      //   at Object._errnoException (util.js:992:11)\n      //   at _exceptionWithHostPort (util.js:1014:20)\n      //   at Server.setupListenHandle [as _listen2] (net.js:1338:19)\n      //   at listenInCluster (net.js:1396:12)\n      //   at Server.listen (net.js:1491:5)\n      //   at EventEmitter.eval (webpack:///./src/bin/helpers/ipcLayer.js?:99:12)\n      //   at emitOne (events.js:121:20)\n      //   at EventEmitter.emit (events.js:211:7)\n      //   at startGameServer (webpack:///./src/bin/helpers/startGameServer.js?:101:21)\n      //   at Timeout.setTimeout [as _onTimeout] (webpack:///./src/bin/serverWrapper.js?:97:37)\n      // code: 'EADDRINUSE',\n      // errno: 'EADDRINUSE',\n      // syscall: 'listen',\n      // address: '/tmp/dsm_testing.sock',\n      // port: -1 }\n    });\n\n    // server.on('connection', (socket) => {\n    //   socket.end()\n    // });\n\n    server.listen(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm_' + GalaxyName + '.sock')), () => {\n      console.log('DSM: IPC Initialized.\\n');\n    });\n  });\n\n  GameServerEmitter.on('exit', () => {\n    console.log('DSM: CLOSING IPC SERVER');\n    server.close(); // will not close exsiting connections\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/ipcLayer.js?");

/***/ }),

/***/ "./src/bin/helpers/playerTracker.js":
/*!******************************************!*\
  !*** ./src/bin/helpers/playerTracker.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _db = __webpack_require__(/*! ../../lib/db */ \"./src/lib/db.js\");\n\nvar _db2 = _interopRequireDefault(_db);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst name = exports.name = 'Player Tracker';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = GameServerEmitter => {\n  GameServerEmitter.on('logon', (name, index) => {\n    _db2.default.open();\n    // check if player exists\n    if (_db.players.PlayerExists(index) === undefined) {\n      console.log('Player does not exist');\n      // create player if doesnt exist\n      _db.players.CreatePlayer(index, name);\n    }\n    _db.players.UpdatePlayerLogStatus(1, index);\n    _db.server.incrementPlayers();\n    // log player in\n    _db2.default.close();\n  });\n\n  GameServerEmitter.on('logoff', (name, index) => {\n    _db2.default.open();\n    // check if player exists\n    if (_db.players.PlayerExists(index) === undefined) {\n      console.log('Player does not exist');\n      // create player if doesnt exist\n      _db.players.CreatePlayer(index, name);\n    }\n    _db.players.UpdatePlayerLogStatus(0, index);\n    _db.server.decrementPlayers();\n    // log player in\n    _db2.default.close();\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/playerTracker.js?");

/***/ }),

/***/ "./src/bin/helpers/startGameServer.js":
/*!********************************************!*\
  !*** ./src/bin/helpers/startGameServer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// npm install --global --production windows-build-tools\nvar pty = __webpack_require__(/*! node-pty */ \"node-pty\"); // dont use import, webpack is set to not touch node-pty as it will mess with it.\n\n// https://github.com/Microsoft/node-pty/issues/78\n\n// Allowed options:\n//   --help                         show help message\n//   --version                      print out version and exit\n//   --port arg                     listening port of the server\n//   --query-port arg               internal game query port of the server,\n//                                  default: 27003\n//   --steam-query-port arg         steam query port of the server, default: 27020\n//   --steam-master-port arg        steam master server port of the server,\n//                                  default: 27021\n//   --ip arg                       binds the server to a specific IP (steam\n//                                  networking only)\n//   --max-players arg              maximum number of online players\n//   --save-interval arg            timestep between savings\n//   --server-name arg              server name, will be displayed when queried\n//   --pausable arg                 whether or not the server can be paused by\n//                                  admins when there's only a single player\n//                                  online\n//   --galaxy-name arg              galaxy name, appended to datapath, final path\n//                                  will be [datapath]/[galaxyname]\n//   --datapath arg                 folder the galaxies will be stored in, will be\n//                                  prepended to galaxy name\n//   --admin arg                    steam id(s) of the administrator(s) to add to\n//                                  the server\n//   --seed arg                     seed of the server\n//   --difficulty arg               difficulty of the server, allowed values are:\n//                                  -3, -2, -1, 0, 1, 2, 3\n//   --infinite-resources arg       enable infinite resources for all players\n//   --collision-damage arg         amount of damage done to an object on\n//                                  collision, from 0 to 1. 0: no damage, 1: full\n//                                  damage. default: 1\n//   --same-start-sector arg        indicate if all players should start in the\n//                                  same sector\n//   --alive-sectors-per-player arg the amount of sectors with player property\n//                                  that are simulated in addition to that\n//                                  player's current sector\n//   --safe-player-input arg        enable to guarantee more cheat-safety, but\n//                                  players may experience more lag\n//   --threads arg                  specifies the number of threads used to update\n//                                  the sectors\n//   --generator-threads arg        specifies the number of threads used to\n//                                  generate sectors\n//   -t [ --trace ] arg             tracing options. Can be more than one. Allowed\n//                                  values are: network scripting threading io\n//                                  database input error warning exception user\n//                                  game system debug sound gl all\n//   --exit-on-last-admin-logout    shut down when last administrator logs out\n//   --stderr-to-log                redirect std error output from console to log\n//                                  file\n//   --stdout-to-log                redirect std console output from console to\n//                                  log file\n//   --public arg                   indicate if the server should allow other\n//                                  players to join\n//   --listed arg                   indicate if the server should show up on\n//                                  public server lists\n//   --authentication arg           enables authentication of players\n//   --use-steam-networking arg     use steam networking and authentication (if\n//                                  enabled) for users\n//   --immediate-writeout arg       immediately write player data to disk when it\n//                                  changes. decreases performance during sector\n//                                  changes, but makes server data more consistent\n//                                  on crash.\n//   --max-logs arg                 maximum number of logs to keep around, 0 for\n//                                  infinite, default: 15\n//   --rcon-ip arg                  binds the rcon server to a specific IP\n//   --rcon-port arg                rcon port, default: 27015\n//   --rcon-password arg            sets the password for the rcon interface.\n//                                  without password, rcon is disabled.\n//   --send-crash-reports arg       when enabled, the server will send anonymous\n//                                  system specs and a crash report when it\n//                                  crashes.\nconst startGameServer = (GameServerEmitter, startupParams, supressLogs = false) => {\n  // Console(stdout[, stderr][, ignoreErrors])\n\n  // ????\n  // execvp(3) failed.: Permission denied\n  // execvp(3) failed.: No such file or directory\n\n  // NEED TO SWITCH .EXE for windows and nothing for linux\n  const GameServer = pty.spawn(_path2.default.resolve(globals.InstallationDir() + '/dsm/avorion/bin/AvorionServer'), startupParams.split(\" \"), { cwd: _path2.default.resolve(globals.InstallationDir() + '/dsm/avorion') });\n  if (!supressLogs) console.log('Started server with these params:', startupParams);\n  // if stdout-to-log option is used, dsm cant detect data using GameServer\n  // need fall back for tracking logfile output\n  GameServerEmitter.emit('spawned', GameServer);\n\n  // Main STDOUT\n  GameServer.on('data', function (data) {\n    // events to listen to:\n    // An exception occurred: unrecognised option\n\n    // Remove unwanted char and log\n    const cleanedData = data.replace(/(\\u001b|\\[0K|\\[\\?25l|\\[\\?25h|\\[\\?)/gm, \"\");\n    if (!supressLogs) console.log(cleanedData); //\\u001b[0K\\u001b[?25l\n\n    GameServerEmitter.emit('data', data);\n\n    if (cleanedData.match(/^An exception occurred:/)) {\n      GameServerEmitter.emit('exception', cleanedData);\n      return;\n    }\n\n    if (data.includes('Memory used by scripts')) {\n      const dataArr = data.split('\\n');\n      const newData = dataArr.slice(0, dataArr.findIndex(line => line.includes('profiling')));\n      GameServerEmitter.emit('status', newData.join('\\n'));\n      return;\n    }\n\n    if (data.includes('Server startup complete')) {\n      GameServerEmitter.emit('startup', GameServer);\n      return;\n    }\n\n    if (cleanedData.match(/^<.*>/)) {\n      const name = cleanedData.match(/(?<=<).*(?=>)/);\n      const message = cleanedData.match(/(?<=> ).*/);\n      //add error handling\n      GameServerEmitter.emit('chat', name[0], message[0]);\n      return;\n    }\n\n    if (data.includes('DSM: Player Log Off')) {\n      // DSM: Player Log Off, name:  Dirtyredz  index:  1\n      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/);\n      const index = cleanedData.match(/(?<=index:  ).*/);\n      if (name && index) {\n        GameServerEmitter.emit('logoff', name[0], index[0]);\n        return;\n      }\n    }\n\n    if (data.includes('DSM: Player Log On')) {\n      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/);\n      const index = cleanedData.match(/(?<=index:  ).*/);\n      if (name && index) {\n        GameServerEmitter.emit('logon', name[0], index[0]);\n        return;\n      }\n    }\n\n    if (data.includes('Server shutdown')) {\n      GameServerEmitter.emit('shutdown', GameServer);\n      return;\n    }\n\n    if (data.includes('Creating minidump') || data.includes('Entered exception handler') || data.includes('Server startup FAILED')) {\n      GameServerEmitter.emit('crash', GameServer);\n      return;\n    }\n\n    // Server startup FAILED\n  });\n\n  GameServer.on('error', error => {\n    if (!supressLogs) console.log('Server Error:', error);\n  });\n\n  // emitted when process exits or when /stop is used\n  GameServer.on('exit', code => {\n    if (!supressLogs) console.log('exit', code);\n    // code == 0, server was shutdown, or failed to start\n    if (code === 0) {\n      GameServerEmitter.emit('exit');\n    } else if (code === 1) {\n      // code == 1, server process crashed\n      GameServerEmitter.emit('exit');\n      GameServerEmitter.emit('crash', GameServer);\n    }\n  });\n};\nexports.default = startGameServer;\n\n//# sourceURL=webpack:///./src/bin/helpers/startGameServer.js?");

/***/ }),

/***/ "./src/bin/helpers/statusChecker.js":
/*!******************************************!*\
  !*** ./src/bin/helpers/statusChecker.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _prettyMs = __webpack_require__(/*! pretty-ms */ \"pretty-ms\");\n\nvar _prettyMs2 = _interopRequireDefault(_prettyMs);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet RespondedToStatus = true;\nlet FailureTimer = false;\nlet IntervalTimer = false;\n\nconst name = exports.name = 'Status Checker';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = (GameServerEmitter, Config) => {\n  GameServerEmitter.on('startup', function (GameServer) {\n    console.log('DSM: Initilized Status Checker, checking every', (0, _prettyMs2.default)(Config.STATUS_INTERVAL_MS.value), ' with a time to failure of', (0, _prettyMs2.default)(Config.TIME_TO_STATUS_FAILURE.value) + '\\n');\n\n    IntervalTimer = setInterval(() => {\n      console.log('DSM: Performing status check');\n      RespondedToStatus = false;\n      GameServer.write('/status\\n');\n      FailureTimer = setTimeout(() => {\n        console.log('DSM: FAILED TO GET STATUS');\n        GameServerEmitter.emit('crash', GameServer);\n        // Emit crash event, which will kill GameServer\n      }, Config.TIME_TO_STATUS_FAILURE.value);\n    }, Config.STATUS_INTERVAL_MS.value);\n  });\n\n  GameServerEmitter.on('status', function (data) {\n    RespondedToStatus = true;\n    if (FailureTimer !== false) clearTimeout(FailureTimer);\n    FailureTimer = false;\n  });\n\n  // Clean up dont want to leave ant intervals or timers left around\n  GameServerEmitter.on('exit', () => {\n    RespondedToStatus = true;\n    if (FailureTimer !== false) clearTimeout(FailureTimer);\n    FailureTimer = false;\n\n    if (IntervalTimer !== false) clearTimeout(IntervalTimer);\n    IntervalTimer = false;\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/statusChecker.js?");

/***/ }),

/***/ "./src/bin/serverWrapper.js":
/*!**********************************!*\
  !*** ./src/bin/serverWrapper.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _startGameServer = __webpack_require__(/*! ./helpers/startGameServer */ \"./src/bin/helpers/startGameServer.js\");\n\nvar _startGameServer2 = _interopRequireDefault(_startGameServer);\n\nvar _eventHandlers = __webpack_require__(/*! ./helpers/eventHandlers */ \"./src/bin/helpers/eventHandlers.js\");\n\nvar eventHandler = _interopRequireWildcard(_eventHandlers);\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nvar _db = __webpack_require__(/*! ../lib/db */ \"./src/lib/db.js\");\n\nvar _db2 = _interopRequireDefault(_db);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// We then pipe the main process stdin (which is a readable stream)\n// into the child process stdin (which is a writable stream).\nvar events = __webpack_require__(/*! events */ \"events\").EventEmitter;\nvar GameServerEmitter = new events.EventEmitter();\n\n\nconst exitHandler = message => {\n  if (message) console.log(message);\n  console.log('DSM: Closing wrapper GoodBye!');\n  DB.close();\n  process.exit(0);\n};\n\nconst Config = new _MainConfig.ServerConfig(process.argv[2]);\nconst DB = new _db2.default(process.argv[2]);\n\nconsole.log('-----Dirty Server Manager-----');\nconsole.log('DSM: Server Wrapper Initilized on pid: ' + process.pid);\n\nlet startupParams = Config.STARTUP_PARAMS.value;\nstartupParams += ' --galaxy-name ' + process.argv[2];\nstartupParams += ' --datapath ' + (0, _path.resolve)(globals.InstallationDir() + '/dsm/galaxies');\n\nconsole.log('Getting Ports to use...');\nconst Ports = (0, _galaxies.getOpenPort)();\n// if(Ports.avorion !== 27000)\nstartupParams += ` --port ${Ports.avorion} --steam-query-port ${Ports.steamQuery} --steam-master-port ${Ports.steamMaster}`;\n\nconsole.log('Checking IP address..');\nconst IP = Config.IP_ADDRESS.value;\nif ((0, _galaxies.isAddressInUse)(IP)) exitHandler(`DSM ERROR: IP \"${IP}\" is already in use!`);\nif (IP !== 'localhost') startupParams += ` --ip ${IP}`;\n\nGameServerEmitter.on('spawned', GameServer => {\n  console.log('Game Server process initiated.');\n  DB.GameServerPid = GameServer.pid;\n});\n\nDB.WrapperPid = process.pid;\nDB.ip = IP;\n\nconsole.log('Registering Event handlers..');\n// Register events handlers\nconst handlers = Object.keys(eventHandler);\nhandlers.map((handle, index) => {\n  handle = eventHandler[handle];\n  handle.RegisterToWrapperEmitter(GameServerEmitter, Config, DB, process.argv[2]);\n\n  console.log('DSM: Event Handler:', handle.name, ', has been registered.');\n});\n\nconsole.log('Starting Galaxy:', process.argv[2]);\n\n(0, _startGameServer2.default)(GameServerEmitter, startupParams);\n\n// *************** WRAPPER EMITTER **************** \\\\\n\nGameServerEmitter.on('error', err => {\n  console.log(err);\n});\n\nGameServerEmitter.on('crash', GameServer => {\n  console.log('Detected server crash, waiting 7 seconds');\n  GameServer.write('/save\\n'); // send save command just incase\n  setTimeout(() => {\n    GameServer.destroy(); // will trigger a GameServer Exit event\n    console.log('processing events...');\n    setTimeout(() => {\n      (0, _startGameServer2.default)(GameServerEmitter, startupParams);\n      console.log('Restarted');\n    }, 7000); // 7 seconds\n  }, 7000);\n});\n\nGameServerEmitter.on('shutdown', GameServer => {\n  GameServer.destroy(); // server shutdown, send exit event to wrapper\n});\n\n// *************** WRAPPER PROCESS **************** \\\\\n\n\nprocess.on('erro', exitHandler);\nprocess.on('beforeExit', exitHandler);\n\n//do something when app is closing\nprocess.on('exit', exitHandler);\n\n//catches ctrl+c event\nprocess.on('SIGINT', exitHandler);\n\n// catches \"kill pid\" (for example: nodemon restart)\nprocess.on('SIGUSR1', exitHandler);\nprocess.on('SIGUSR2', exitHandler);\n\n//catches uncaught exceptions\nprocess.on('uncaughtException', err => {\n  console.log(err);\n  exitHandler();\n});\n\n//# sourceURL=webpack:///./src/bin/serverWrapper.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ServerConfig = exports.DSMConfig = undefined;\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _ip = __webpack_require__(/*! ip */ \"ip\");\n\nvar _ip2 = _interopRequireDefault(_ip);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Option {\n  constructor(name, def, description, type, init) {\n    this.default = def;\n    this.description = description;\n    this.type = type;\n    this.name = name;\n    this.parse(def);\n    this.parse(init);\n  }\n  get value() {\n    return this._value;\n  }\n  set value(incValue) {\n    if (incValue) {\n      this.parse(incValue);\n    }\n  }\n  parse(unparsed) {\n    if (unparsed == null) return;\n    switch (this.type) {\n      case 'number':\n        this._value = parseInt(unparsed, 10);\n        break;\n      case 'boolean':\n        this._value = unparsed === 'true';\n        break;\n      case 'string':\n        this._value = String(unparsed);\n        break;\n      default:\n        this._value = unparsed;\n    }\n  }\n}\n\n// create object for each config option to support type checking, defaults, and required options.\n// then use a command to parse it all\nclass DSMConfig {\n  constructor() {\n    this._parsed = [];\n\n    this._raw = _fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8');\n    this._parsed = _ini2.default.parse(this._raw);\n    this.STEAM_DIR = new Option(\"STEAM_DIR\", \"steam\", 'directory relative to dsm installation for steam to be installed', 'string', this._parsed['STEAM_DIR']);\n    this.WEB_PORT = new Option(\"WEB_PORT\", 8080, 'Port assigned to the Wen Interface', 'number', this._parsed['WEB_PORT']);\n    this.WEB_IP_ADDRESS = new Option(\"WEB_IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string', this._parsed['WEB_IP_ADDRESS']);\n    this.BETA = new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean', this._parsed['BETA']);\n  }\n  get options() {\n    const PublicProperties = Object.getOwnPropertyNames(this).filter(property => property.match(/^(?!_.*).*/));\n    return PublicProperties;\n  }\n  save() {\n    let objectToSave = {};\n    this.options.map(opt => {\n      if (this[opt].value.toString() !== this[opt].default.toString()) {\n        objectToSave[opt] = this[opt].value.toString();\n      }\n    });\n    _fs2.default.writeFileSync(this._path, _ini2.default.encode(objectToSave));\n  }\n}\n\nclass ServerConfig {\n  constructor(galaxyName) {\n    this._parsed = [];\n\n    this._galaxyName = galaxyName;\n    this._path = _path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + galaxyName + '/config.ini');\n    this._raw = _fs2.default.readFileSync(this._path, 'utf-8');\n    this._parsed = _ini2.default.parse(this._raw);\n    this.MOTD = new Option(\"MOTD\", \"Welcome to the server, Enjoy!!\", 'Message to be displayed on user login', 'string', this._parsed['MOTD']);\n    this.STATUS_INTERVAL_MS = new Option(\"STATUS_INTERVAL_MS\", 1000 * 60 * 5, 'interval in MS to run the status check', 'number', this._parsed['STATUS_INTERVAL_MS']);\n    this.BETA = new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean', this._parsed['BETA']);\n    this.STARTUP_PARAMS = new Option(\"STARTUP_PARAMS\", '--public true --listed true --same-start-sector false', 'Parameters to be applied to server when starting. see \"dsm info\" for more info', 'string', this._parsed['STARTUP_PARAMS']);\n    this.AUTO_RESTART = new Option(\"AUTO_RESTART\", 'true', 'if true will automatically restart the server when a crash is detected', 'boolean', this._parsed['AUTO_RESTART']);\n    this.IP_ADDRESS = new Option(\"IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string');\n    this.TIME_TO_STATUS_FAILURE = new Option(\"TIME_TO_STATUS_FAILURE\", 30000, 'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.', 'number', this._parsed['TIME_TO_STATUS_FAILURE']);\n  }\n  get options() {\n    const PublicProperties = Object.getOwnPropertyNames(this).filter(property => property.match(/^(?!_.*).*/));\n    return PublicProperties;\n  }\n  save() {\n    let objectToSave = {};\n    this.options.map(opt => {\n      if (this[opt].value.toString() !== this[opt].default.toString()) {\n        objectToSave[opt] = this[opt].value.toString();\n      }\n    });\n    _fs2.default.writeFileSync(this._path, _ini2.default.encode(objectToSave));\n  }\n  // SERVER_PORT: new Option(\n  //   \"SERVER_PORT\",\n  //   27000,\n  //   'Port assigned to the game server',\n  //   'number'),\n}\n// const Write\nexports.DSMConfig = DSMConfig;\nexports.ServerConfig = ServerConfig;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

/***/ }),

/***/ "./src/lib/db.js":
/*!***********************!*\
  !*** ./src/lib/db.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _betterSqlite = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n\nvar _betterSqlite2 = _interopRequireDefault(_betterSqlite);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// ColumnExists(table,column){\n//   const columns =  this.db.prepare(\"PRAGMA table_info(?)\")\n//     .all(table);\n//   return columns.filter(col=>col.name == column).length > 0\n// },\n\nclass Common {\n  constructor(GalaxyName) {\n    this.db = new _betterSqlite2.default(_path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + GalaxyName + '/dsm.sqlite'));\n    this.db.prepare(`CREATE TABLE IF NOT EXISTS 'server' (\n        'numPlayers'\tINTEGER NOT NULL DEFAULT 0,\n        'lastAccess'\tINTEGER NOT NULL DEFAULT 0,\n        'WrapperPid'\tINTEGER NOT NULL DEFAULT 0,\n        'GameServerPid'\tINTEGER NOT NULL DEFAULT 0,\n        'ip'\tTEXT NOT NULL DEFAULT 0,\n        'id'\tINTEGER CHECK(id = 0) UNIQUE,\n        PRIMARY KEY('id')\n      );`).run();\n    this.db.prepare(`INSERT or REPLACE INTO \n    server (numPlayers, lastAccess, id, WrapperPid, GameServerPid, ip) \n    VALUES (\n      (SELECT numPlayers FROM server WHERE id=0)\n      ,?,0,\n      (SELECT WrapperPid FROM server WHERE id=0),\n      (SELECT GameServerPid FROM server WHERE id=0),\n      (SELECT ip FROM server WHERE id=0)\n    )`).run(Date.now());\n    this.db.prepare(`CREATE TABLE IF NOT EXISTS 'players' (\n        'id'\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n        'playerID'\tINTEGER NOT NULL UNIQUE,\n        'name'\tTEXT NOT NULL,\n        'loggedIn'\tINTEGER,\n        'lastSeen'\tINTEGER\n      );`).run();\n  }\n  // SERVER\n  incrementPlayers() {\n    this.db.prepare(\"UPDATE server SET numPlayers = numPlayers + 1 WHERE id=0\").run();\n  }\n  decrementPlayers() {\n    this.db.prepare(\"UPDATE server SET numPlayers = numPlayers - 1 WHERE id=0\").run();\n  }\n  set WrapperPid(Pid) {\n    this.db.prepare(\"UPDATE server SET WrapperPid = ? WHERE id=0\").run(Pid);\n  }\n  get WrapperPid() {\n    return this.db.prepare(\"SELECT WrapperPid FROM server WHERE id=0\").get().WrapperPid;\n  }\n  set GameServerPid(Pid) {\n    this.db.prepare(\"UPDATE server SET GameServerPid = ? WHERE id=0\").run(Pid);\n  }\n  get GameServerPid() {\n    return this.db.prepare(\"SELECT GameServerPid FROM server WHERE id=0\").get().GameServerPid;\n  }\n  get NumberPlayers() {\n    return this.db.prepare(\"SELECT numPlayers FROM server WHERE id=0\").get().numPlayers;\n  }\n  get ip() {\n    return this.db.prepare(\"SELECT ip FROM server WHERE id=0\").get().ip;\n  }\n  set ip(ip) {\n    return this.db.prepare(\"UPDATE server SET ip = ? WHERE id=0\").run(ip);\n  }\n  // PLAYERS\n  CreatePlayer(playerID, name) {\n    this.db.prepare(\"INSERT INTO players (playerID, name) VALUES (?,?)\").run(playerID, name);\n    console.log('Created Player:', name, 'in DB.');\n  }\n  PlayerExists(playerID) {\n    return this.db.prepare(\"SELECT 1 FROM players WHERE playerID=?\").get(playerID);\n  }\n  UpdatePlayerLogStatus(status, playerID) {\n    this.db.prepare(\"UPDATE players SET loggedIn = ? WHERE playerID = ?\").run(status, playerID);\n  }\n  close() {\n    this.db.close();\n  }\n}\nexports.default = Common;\n\n\nclass Server {\n  constructor(db) {\n    this.db = db;\n    this.db.prepare(`CREATE TABLE IF NOT EXISTS 'server' (\n        'numPlayers'\tINTEGER NOT NULL DEFAULT 0,\n        'lastAccess'\tINTEGER NOT NULL DEFAULT 0,\n        'WrapperPid'\tINTEGER NOT NULL DEFAULT 0,\n        'GameServerPid'\tINTEGER NOT NULL DEFAULT 0,\n        'id'\tINTEGER CHECK(id = 0) UNIQUE,\n        PRIMARY KEY('id')\n      );`).run();\n    this.db.prepare(`INSERT or REPLACE INTO \n    server (numPlayers, lastAccess, id, WrapperPid, GameServerPid) \n    VALUES (\n      (SELECT numPlayers FROM server WHERE id=0)\n      ,?,0,\n      (SELECT WrapperPid FROM server WHERE id=0),\n      (SELECT GameServerPid FROM server WHERE id=0)\n    )`).run(Date.now());\n  }\n  incrementPlayers() {\n    this.db.prepare(\"UPDATE server SET numPlayers = numPlayers + 1 WHERE id=0\").run();\n  }\n  decrementPlayers() {\n    this.db.prepare(\"UPDATE server SET numPlayers = numPlayers - 1 WHERE id=0\").run();\n  }\n  set WrapperPid(Pid) {\n    this.db.prepare(\"UPDATE server SET WrapperPid = ? WHERE id=0\").run(Pid);\n  }\n  get WrapperPid() {\n    return this.db.prepare(\"SELECT WrapperPid FROM server WHERE id=0\").get();\n  }\n  set GameServerPid(Pid) {\n    this.db.prepare(\"UPDATE server SET GameServerPid = ? WHERE id=0\").run(Pid);\n  }\n  get GameServerPid() {\n    return this.db.prepare(\"SELECT GameServerPid FROM server WHERE id=0\").get();\n  }\n  get NumberPlayers() {\n    return this.db.prepare(\"SELECT numPlayers FROM server WHERE id=0\").get().numPlayers;\n  }\n}\n\nclass Players {\n  constructor(db) {\n    this.db = db;\n    this.db.prepare(`CREATE TABLE IF NOT EXISTS 'players' (\n        'id'\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n        'playerID'\tINTEGER NOT NULL UNIQUE,\n        'name'\tTEXT NOT NULL,\n        'loggedIn'\tINTEGER,\n        'lastSeen'\tINTEGER\n      );`).run();\n  }\n  CreatePlayer(playerID, name) {\n    this.db.prepare(\"INSERT INTO players (playerID, name) VALUES (?,?)\").run(playerID, name);\n    console.log('Created Player:', name, 'in DB.');\n  }\n  PlayerExists(playerID) {\n    return this.db.prepare(\"SELECT 1 FROM players WHERE playerID=?\").get(playerID);\n  }\n  UpdatePlayerLogStatus(status, playerID) {\n    this.db.prepare(\"UPDATE players SET loggedIn = ? WHERE playerID = ?\").run(status, playerID);\n  }\n}\n\n//# sourceURL=webpack:///./src/lib/db.js?");

/***/ }),

/***/ "./src/lib/galaxies.js":
/*!*****************************!*\
  !*** ./src/lib/galaxies.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isAddressInUse = exports.getOpenPort = exports.isGameServerOnline = exports.isWrapperOnline = exports.getGalaxy = exports.getGalaxySync = exports.getSingleGalaxy = exports.count = exports.galaxyExsist = exports.getGalaxies = undefined;\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _isRunning = __webpack_require__(/*! is-running */ \"is-running\");\n\nvar _isRunning2 = _interopRequireDefault(_isRunning);\n\nvar _nodeNetstat = __webpack_require__(/*! node-netstat */ \"node-netstat\");\n\nvar _nodeNetstat2 = _interopRequireDefault(_nodeNetstat);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//import db from './db'\nconst getGalaxies = exports.getGalaxies = (dontParseDB = false) => {\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  return (0, _fs.readdirSync)(GalaxiesDir).map(name => {\n    return { path: (0, _path.join)(GalaxiesDir, name), name };\n  }).filter(fileDir => (0, _fs.lstatSync)(fileDir.path).isDirectory()).map(galaxy => {\n    // if(!dontParseDB){\n    //   const DB = new db(galaxy.name)\n    //   if(!isRunning(DB.WrapperPid)){\n    //     DB.WrapperPid = 0\n    //     DB.GameServerPid = 0\n    //     DB.ip = 0\n    //   }\n    //   DB.close()\n    // }\n    return galaxy;\n  });\n};\n\nconst galaxyExsist = exports.galaxyExsist = galaxyName => {\n  if (typeof galaxyName !== 'string') return false;\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  const GalaxyDir = (0, _path.join)(GalaxiesDir, galaxyName);\n  if ((0, _fs.existsSync)(GalaxyDir)) return (0, _fs.lstatSync)(GalaxyDir).isDirectory();\n  return false;\n};\n\nconst count = exports.count = () => {\n  return getGalaxies(true).length;\n};\nconst getSingleGalaxy = exports.getSingleGalaxy = () => {\n  return getGalaxies()[0];\n};\n\nconst getGalaxySync = exports.getGalaxySync = name => {\n  if (!galaxyExsist(name)) {\n    if (count() == 1 && typeof name == 'undefined') {\n      return getSingleGalaxy();\n    }\n    return false;\n  }\n  if (count() > 1 && !name) {\n    return false;\n  }\n  if (count() == 0) {\n    return false;\n  }\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  return { path: (0, _path.join)(GalaxiesDir, name), name };\n};\n\nconst getGalaxy = exports.getGalaxy = (name, callback) => {\n  if (typeof callback !== 'function') throw new Error('Callback is required');\n  if (!galaxyExsist(name)) {\n    if (count() == 1 && typeof name == 'undefined') {\n      callback(null, getSingleGalaxy());\n      return true;\n    }\n    callback({ code: 1, message: 'Galaxy does not exsist' });\n    return false;\n  }\n  if (count() > 1 && !name) {\n    callback({ code: 1, message: 'More then one galaxy available, please select a galaxy.' });\n    return false;\n  }\n  if (count() == 0) {\n    callback({ code: 3, message: 'No Galaxies Available.' });\n    return false;\n  }\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  callback(null, { path: (0, _path.join)(GalaxiesDir, name), name });\n  return true;\n};\n\nconst isWrapperOnline = exports.isWrapperOnline = GalaxyName => {\n  if (typeof GalaxyName !== 'string') throw new Error('Required string Galaxy Name');\n  // const DB = new db(GalaxyName)\n  // const PID = DB.WrapperPid\n  // const Running = PID !== 0 && isRunning(PID)\n  // DB.close()\n  return false; //Running\n};\n\nconst isGameServerOnline = exports.isGameServerOnline = GalaxyName => {\n  if (typeof GalaxyName !== 'string') throw new Error('Required string Galaxy Name');\n\n  // const DB = new db(GalaxyName)\n  // const PID = DB.GameServerPid\n  // const Running = PID !== 0 && isRunning(PID)\n  // DB.close()\n  return false; //Running\n};\n\nconst getOpenPort = exports.getOpenPort = () => {\n  const ports = [27020, 27120, 27220, 27320, 27420, 27520, 27620, 27720, 27820, 27920];\n  (0, _nodeNetstat2.default)({\n    sync: true,\n    done: err => {\n      if (err) console.log(err);\n    }\n  }, function (data) {\n    let index = ports.indexOf(data.local.port);\n    if (index > -1) ports.splice(index, 1);\n  });\n  const portNum = (ports[0] - 27020) / 100;\n  return {\n    avorion: 27000 + 100 * portNum,\n    steamQuery: 27020 + 100 * portNum,\n    steamMaster: 27021 + 100 * portNum\n  };\n};\n\nconst isAddressInUse = exports.isAddressInUse = ip => {\n  return typeof getGalaxies().find(galaxy => {\n    // const DB = new db(galaxy.name)\n    // const IP = DB.ip\n    // DB.close()\n    // return IP == ip\n    return false;\n  }) != 'undefined';\n};\n\n//# sourceURL=webpack:///./src/lib/galaxies.js?");

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

/***/ "./src/lib/logger.js":
/*!***************************!*\
  !*** ./src/lib/logger.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Logger {\n  constructor(GalaxyName, fileName) {\n    const dir = _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/' + GalaxyName);\n    this._logFile = _path2.default.resolve(dir + '/' + fileName + '.txt');\n    if (!_fs2.default.existsSync(dir)) _fs2.default.mkdirSync(dir);\n    this.fd = _fs2.default.openSync(this._logFile, 'a');\n    this._stream = _fs2.default.createWriteStream(null, { fd: this.fd });\n    this.clear();\n  }\n  get logFile() {\n    return this._logFile;\n  }\n  get stream() {\n    return this._stream;\n  }\n  log(msg) {\n    this.stream.write(msg + '\\n');\n    // console.log(fs.fstatSync(this.fd).size)\n  }\n  clear() {\n    _fs2.default.truncateSync(this.logFile);\n  }\n  rotate(output) {}\n};\nexports.default = Logger;\n\n//# sourceURL=webpack:///./src/lib/logger.js?");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"better-sqlite3\");\n\n//# sourceURL=webpack:///external_%22better-sqlite3%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

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

/***/ "is-running":
/*!*****************************!*\
  !*** external "is-running" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-running\");\n\n//# sourceURL=webpack:///external_%22is-running%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ }),

/***/ "node-netstat":
/*!*******************************!*\
  !*** external "node-netstat" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-netstat\");\n\n//# sourceURL=webpack:///external_%22node-netstat%22?");

/***/ }),

/***/ "node-pty":
/*!***************************!*\
  !*** external "node-pty" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-pty\");\n\n//# sourceURL=webpack:///external_%22node-pty%22?");

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

/***/ "pretty-ms":
/*!****************************!*\
  !*** external "pretty-ms" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pretty-ms\");\n\n//# sourceURL=webpack:///external_%22pretty-ms%22?");

/***/ })

/******/ });