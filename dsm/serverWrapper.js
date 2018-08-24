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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _logger = __webpack_require__(/*! ../../lib/logger */ \"./src/lib/logger.js\");\n\nconst name = exports.name = 'Chat Logger';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = GameServerEmitter => {\n  GameServerEmitter.on('chat', (name, message) => {\n    const date = new Date();\n    _logger.Chat.log(`${date.toUTCString()} | <${name}> ${message}`);\n  });\n  GameServerEmitter.on('spawned', () => {\n    _logger.Chat.init();\n    _logger.Chat.clear();\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/chatLogger.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst name = exports.name = 'IPC Layer';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = GameServerEmitter => {\n  let server;\n\n  GameServerEmitter.once('spawned', function (GameServer) {\n    console.log('SPAWNED');\n    // Socket layer to listen for incoming mesages.\n    server = _net2.default.createServer(ClientSock => {\n      // Callback for the attach command to recieve data\n      const SendServerData = ServerData => {\n        ClientSock.write(ServerData); // Write data to Client\n      };\n\n      const WaitToClose = () => {\n        ClientSock.write(\"Shutdow succesfull\");\n        ClientSock.end(); // tell client were closing\n      };\n      // listen to server exit event\n      const ServerExitCallback = () => {\n        console.log('Shutting down connected client');\n        ClientSock.end(); // tell client were closing\n      };\n      console.log('Creating Exit listener');\n      GameServerEmitter.on('exit', ServerExitCallback);\n      // console.log('DSM Client ');\n      ClientSock.on('end', () => {\n        // console.log('DSM Socket Closed');\n        GameServerEmitter.removeListener('data', SendServerData); // Remove the listener since the client is not listening\n        GameServerEmitter.removeListener('exit', ServerExitCallback); // Remove the listener since the client is not listening\n        GameServerEmitter.removeListener('status', SendServerData);\n        GameServerEmitter.removeListener('shutdown', WaitToClose);\n        console.log('Closing client');\n      });\n      ClientSock.on('data', function (data) {\n        if (data.toString() === 'ATTACH') {\n          // attach command has been run, start sending data to the client\n          GameServerEmitter.on('data', SendServerData);\n        } else if (data.toString() === '/status') {\n          console.log('STATUS COMMAND');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('status', SendServerData);\n        } else if (data.toString() === '/stop') {\n          console.log('SHUTDOWN COMMAND');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('shutdown', WaitToClose);\n        } else {\n          console.log('NORMAL');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('data', SendServerData);\n        }\n      });\n    });\n    server.on('error', e => {\n      console.log(e);\n    });\n\n    // server.on('connection', (socket) => {\n    //   socket.end()\n    // });\n\n    server.listen(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm.sock')), () => {\n      GameServer.write('DSM IPC Initialized.\\n');\n    });\n  });\n\n  GameServerEmitter.on('exit', () => {\n    console.log('CLOSING IPC SERVER');\n    server.close(); // will not close exsiting connections\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/ipcLayer.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// npm install --global --production windows-build-tools\nvar pty = __webpack_require__(/*! node-pty */ \"node-pty\"); // dont use import, webpack is set to not touch node-pty as it will mess with it.\n\nconst startGameServer = GameServerEmitter => {\n  const GameServer = pty.spawn(_path2.default.resolve(globals.InstallationDir() + '/avorion/bin/AvorionServer.exe'), ['--galaxy-name', 'avorion_galaxy', '--admin', 'avorion_admin'], { cwd: process.cwd() + '\\\\avorion' });\n\n  GameServerEmitter.emit('spawned', GameServer);\n\n  GameServer.write('DSM IPC Initializing...\\n');\n\n  GameServer.on('error', err => {\n    console.log(err);\n  });\n  // Main STDOUT\n  GameServer.on('data', function (data) {\n    // Remove unwanted char and log\n    const cleanedData = data.replace(/(\\u001b|\\[0K|\\[\\?25l|\\[\\?25h|\\[\\?)/gm, \"\");\n    console.log(cleanedData); //\\u001b[0K\\u001b[?25l\n\n    GameServerEmitter.emit('data', data);\n\n    if (data.includes('Memory used by scripts')) {\n      const dataArr = data.split('\\n');\n      const newData = dataArr.slice(0, dataArr.findIndex(line => line.includes('profiling')));\n      GameServerEmitter.emit('status', newData.join('\\n'));\n      return;\n    }\n\n    if (data.includes('Server startup complete')) {\n      GameServerEmitter.emit('startup', GameServer);\n      return;\n    }\n\n    if (cleanedData.match(/^<.*>/)) {\n      const name = cleanedData.match(/(?<=<).*(?=>)/);\n      const message = cleanedData.match(/(?<=> ).*/);\n      //add error handling\n      GameServerEmitter.emit('chat', name[0], message[0]);\n      return;\n    }\n\n    if (data.includes('DSM: Player Log Off')) {\n      // DSM: Player Log Off, name:  Dirtyredz  index:  1\n      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/);\n      const index = cleanedData.match(/(?<=index:  ).*/);\n      if (name && index) {\n        GameServerEmitter.emit('logoff', name[0], index[0]);\n        return;\n      }\n    }\n\n    if (data.includes('DSM: Player Log On')) {\n      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/);\n      const index = cleanedData.match(/(?<=index:  ).*/);\n      if (name && index) {\n        GameServerEmitter.emit('logon', name[0], index[0]);\n        return;\n      }\n    }\n\n    if (data.includes('Server shutdown')) {\n      GameServerEmitter.emit('shutdown', GameServer);\n      return;\n    }\n  });\n\n  GameServer.on('error', error => {\n    console.log('Server Error:', error);\n  });\n\n  // emitted when process exits or when /stop is used\n  GameServer.on('exit', code => {\n    console.log('exit', code);\n    // code == 0, server was shutdown\n    // GameServerEmitter.emit('');\n    if (code === 0) {\n      GameServerEmitter.emit('exit');\n    } else if (code === 1) {\n      // code == 1, server process crashed\n      GameServerEmitter.emit('exit');\n      GameServerEmitter.emit('crash', GameServer);\n    }\n  });\n};\nexports.default = startGameServer;\n\n//# sourceURL=webpack:///./src/bin/helpers/startGameServer.js?");

/***/ }),

/***/ "./src/bin/helpers/statusChecker.js":
/*!******************************************!*\
  !*** ./src/bin/helpers/statusChecker.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RegisterToWrapperEmitter = exports.name = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _prettyMs = __webpack_require__(/*! pretty-ms */ \"pretty-ms\");\n\nvar _prettyMs2 = _interopRequireDefault(_prettyMs);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet RespondedToStatus = true;\nlet FailureTimer = false;\nlet IntervalTimer = false;\n\nconst name = exports.name = 'Status Checker';\n\nconst RegisterToWrapperEmitter = exports.RegisterToWrapperEmitter = GameServerEmitter => {\n  GameServerEmitter.on('startup', function (GameServer) {\n    GameServer.write('/echo DSM: Initilized Status Checker, checking every ' + (0, _prettyMs2.default)(_MainConfig2.default.STATUS_INTERVAL_MS) + '\\n');\n    IntervalTimer = setInterval(() => {\n      console.log('DSM: Performing status check');\n      RespondedToStatus = false;\n      GameServer.write('/status\\n');\n      FailureTimer = setTimeout(() => {\n        console.log('DSM: FAILED TO GET STATUS');\n        GameServerEmitter.emit('crash', GameServer);\n        // Emit crash event, which will kill GameServer\n      }, 1000 * 30); // 30 seconds\n      // is 30 seconds to short?\n      // attach config option\n    }, _MainConfig2.default.STATUS_INTERVAL_MS);\n  });\n\n  GameServerEmitter.on('status', function (data) {\n    RespondedToStatus = true;\n    if (FailureTimer !== false) clearTimeout(FailureTimer);\n    FailureTimer = false;\n  });\n\n  GameServerEmitter.on('exit', () => {\n    RespondedToStatus = true;\n    if (FailureTimer !== false) clearTimeout(FailureTimer);\n    FailureTimer = false;\n\n    if (IntervalTimer !== false) clearTimeout(IntervalTimer);\n    IntervalTimer = false;\n  });\n};\n\n//# sourceURL=webpack:///./src/bin/helpers/statusChecker.js?");

/***/ }),

/***/ "./src/bin/serverWrapper.js":
/*!**********************************!*\
  !*** ./src/bin/serverWrapper.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _startGameServer = __webpack_require__(/*! ./helpers/startGameServer */ \"./src/bin/helpers/startGameServer.js\");\n\nvar _startGameServer2 = _interopRequireDefault(_startGameServer);\n\nvar _eventHandlers = __webpack_require__(/*! ./helpers/eventHandlers */ \"./src/bin/helpers/eventHandlers.js\");\n\nvar eventHandler = _interopRequireWildcard(_eventHandlers);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar events = __webpack_require__(/*! events */ \"events\").EventEmitter;\nvar GameServerEmitter = new events.EventEmitter();\n\n\nconsole.log('-----Dirty Server Manager-----');\nconsole.log('DSM: Server Wrapper Initilized on pid: ' + process.pid);\n\n// Register events handlers\nconst handlers = Object.keys(eventHandler);\nhandlers.map((handle, index) => {\n  handle = eventHandler[handle];\n  handle.RegisterToWrapperEmitter(GameServerEmitter);\n\n  console.log('DSM: Event Handler:', handle.name, ', has been registered.');\n});\n\n// We then pipe the main process stdin (which is a readable stream)\n// into the child process stdin (which is a writable stream).\n\n_localStorage2.default.setItem('WrapperPid', process.pid);\n\n// var lockFile = require('lockfile')\n// // opts is optional, and defaults to {}\n// lockFile.lock(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), {}, function (er) {\n//   // if the er happens, then it failed to acquire a lock.\n// })\n\n// Start the game\n(0, _startGameServer2.default)(GameServerEmitter);\n\nGameServerEmitter.on('error', err => {\n  console.log(err);\n});\n\nGameServerEmitter.on('crash', GameServer => {\n  console.log('Detected server crash, waiting 7 seconds');\n  GameServer.write('/save\\n'); // send save command just incase\n  setTimeout(() => {\n    GameServer.destroy(); // will trigger a GameServer Exit event\n    setTimeout(() => {\n      console.log('processing events...');\n      (0, _startGameServer2.default)(GameServerEmitter);\n      console.log('Restarted');\n    }, 7000); // 7 seconds\n  }, 7000);\n});\n\nGameServerEmitter.on('shutdown', GameServer => {\n  GameServer.destroy(); // server shutdown, send exit event to wrapper\n});\n\nconst exitHandler = () => {\n  console.log('DSM: Closing wrapper GoodBye!');\n  _localStorage2.default.removeItem('WrapperPid');\n  process.exit(0);\n};\n\nprocess.on('beforeExit', exitHandler);\n\n//do something when app is closing\nprocess.on('exit', exitHandler);\n\n//catches ctrl+c event\nprocess.on('SIGINT', exitHandler);\n\n// catches \"kill pid\" (for example: nodemon restart)\nprocess.on('SIGUSR1', exitHandler);\nprocess.on('SIGUSR2', exitHandler);\n\n//catches uncaught exceptions\nprocess.on('uncaughtException', err => {\n  console.log(err);\n  exitHandler();\n});\n\n//# sourceURL=webpack:///./src/bin/serverWrapper.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst config = _ini2.default.parse(_fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8'));\n\nif (!config.STEAM_DIR) config.STEAM_DIR = \"steam\"; // default steam\n\nif (!config.STATUS_INTERVAL_MS) config.STATUS_INTERVAL_MS = 1000 * 60 * 5; // default 5 minutes\nconfig.STATUS_INTERVAL_MS = parseInt(config.STATUS_INTERVAL_MS, 10);\n\nif (!config.MOTD) config.MOTD = \"Welcome to the server, Enjoy!!\";\n\nexports.default = config;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

/***/ }),

/***/ "./src/lib/db.js":
/*!***********************!*\
  !*** ./src/lib/db.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.players = exports.server = undefined;\n\nvar _betterSqlite = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n\nvar _betterSqlite2 = _interopRequireDefault(_betterSqlite);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// ColumnExists(table,column){\n//   const columns =  this.db.prepare(\"PRAGMA table_info(?)\")\n//     .all(table);\n//   return columns.filter(col=>col.name == column).length > 0\n// },\n\nconst common = {\n  open() {\n    this.db = new _betterSqlite2.default(_path2.default.resolve(globals.InstallationDir() + '/dsm/dsm.sqlite'));\n    server.init(this.db);\n    players.init(this.db);\n  },\n  close() {\n    this.db.close();\n  }\n};\nexports.default = common;\nconst server = exports.server = {\n  init(db) {\n    this.db = db;\n    this.db.prepare(`CREATE TABLE IF NOT EXISTS 'server' (\n        'numPlayers'\tINTEGER NOT NULL DEFAULT 0,\n        'lastAccess'\tINTEGER NOT NULL DEFAULT 0,\n        'id'\tINTEGER CHECK(id = 0) UNIQUE,\n        PRIMARY KEY('id')\n      );`).run();\n    this.db.prepare(`INSERT or REPLACE INTO \n    server (numPlayers, lastAccess, id) \n    VALUES ((SELECT numPlayers \n      FROM server \n      WHERE id=0)\n      ,?,0)`).run(Date.now());\n  },\n  incrementPlayers() {\n    this.db.prepare(\"UPDATE server SET numPlayers = numPlayers + 1 WHERE id=0\").run();\n  },\n  decrementPlayers() {\n    this.db.prepare(\"UPDATE server SET numPlayers = numPlayers - 1 WHERE id=0\").run();\n  },\n  getNumberPlayers() {\n    return this.db.prepare(\"SELECT numPlayers FROM server WHERE id=0\").get().numPlayers;\n  }\n};\n\nconst players = exports.players = {\n  init(db) {\n    this.db = db;\n    this.db.prepare(`CREATE TABLE IF NOT EXISTS 'players' (\n        'id'\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n        'playerID'\tINTEGER NOT NULL UNIQUE,\n        'name'\tTEXT NOT NULL,\n        'loggedIn'\tINTEGER,\n        'lastSeen'\tINTEGER\n      );`).run();\n  },\n  CreatePlayer(playerID, name) {\n    this.db.prepare(\"INSERT INTO players (playerID, name) VALUES (?,?)\").run(playerID, name);\n    console.log('Created Player:', name, 'in DB.');\n  },\n  PlayerExists(playerID) {\n    return this.db.prepare(\"SELECT 1 FROM players WHERE playerID=?\").get(playerID);\n  },\n  UpdatePlayerLogStatus(status, playerID) {\n    this.db.prepare(\"UPDATE players SET loggedIn = ? WHERE playerID = ?\").run(status, playerID);\n  }\n};\n\n//# sourceURL=webpack:///./src/lib/db.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet localStorage;\nif (typeof localStorage === \"undefined\" || localStorage === null) {\n  var LocalStorage = __webpack_require__(/*! node-localstorage */ \"node-localstorage\").LocalStorage;\n\n  localStorage = new LocalStorage(_path2.default.resolve(globals.InstallationDir() + '/dsm/.storage'));\n}\n\nexports.default = localStorage;\n\n// length\n// setItem(key, value)\n// getItem(key)\n// removeItem(key)\n// key(n)\n// clear()\n\n\n// let MyLocalStorage = {}\n// export const setItem = MyLocalStorage.setItem = (key, value) => {\n//   localStorage.setItem(key, value);\n// }\n\n//# sourceURL=webpack:///./src/lib/localStorage.js?");

/***/ }),

/***/ "./src/lib/logger.js":
/*!***************************!*\
  !*** ./src/lib/logger.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Chat = exports.Web = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst Logger = {\n  logFile: _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/avorion.txt'),\n  init() {\n    if (!this.stream) {\n      //Create FD\n      this.fd = _fs2.default.openSync(this.logFile, 'a');\n      this.stream = _fs2.default.createWriteStream(null, { fd: this.fd });\n    }\n  },\n  log(msg) {\n    this.stream.write(msg + '\\n');\n    // console.log(fs.fstatSync(this.fd).size)\n  },\n  clear() {\n    _fs2.default.truncate(this.logFile);\n  },\n  rotate(output) {}\n};\nexports.default = Logger;\nconst Web = exports.Web = _extends({}, Logger, {\n  logFile: _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/web.txt')\n});\n\nconst Chat = exports.Chat = _extends({}, Logger, {\n  logFile: _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/chat.txt')\n});\n\n//# sourceURL=webpack:///./src/lib/logger.js?");

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

/***/ "ini":
/*!**********************!*\
  !*** external "ini" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ini\");\n\n//# sourceURL=webpack:///external_%22ini%22?");

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