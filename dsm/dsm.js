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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bin/dsm.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bin/dsm.js":
/*!************************!*\
  !*** ./src/bin/dsm.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _commander = __webpack_require__(/*! commander */ \"commander\");\n\nvar _commander2 = _interopRequireDefault(_commander);\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _commands = __webpack_require__(/*! ../commands/ */ \"./src/commands/index.js\");\n\nvar commands = _interopRequireWildcard(_commands);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Remove for production\nprocess.on('warning', e => console.warn(e.stack));\n\n/*******************************************/\n// process all commands\nconst Commands = Object.keys(commands);\nCommands.map((cmd, index) => {\n  cmd = commands[cmd];\n  if (cmd.command && cmd.description && typeof cmd.action == 'function') {\n    _commander2.default.command(cmd.command).version(cmd.version ? cmd.version : _colors2.default.red(\"No version available\"), '-v, --version').alias(cmd.alias ? cmd.alias : \"\").description(cmd.description).action(cmd.action);\n  } else {\n    console.error('%s', _colors2.default.red('Unable to process command: ' + Commands[index]));\n  }\n});\n\n// error on unknown commands\n_commander2.default.on('command:*', function () {\n  console.error(_colors2.default.red('Invalid command: %s') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.', _commander2.default.args.join(' '));\n  process.exit(1);\n});\n\n// error when no command is given\nif (typeof process.argv[2] === 'undefined') {\n  console.error(_colors2.default.red('no command given!') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.');\n  process.exit(1);\n}\n\n_commander2.default.version('0.1.0').usage('[options] <cmd ...>').option('-f, --foo', 'enable some foo').parse(process.argv);\n\n//# sourceURL=webpack:///./src/bin/dsm.js?");

/***/ }),

/***/ "./src/commands/attach.js":
/*!********************************!*\
  !*** ./src/commands/attach.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _readline = __webpack_require__(/*! readline */ \"readline\");\n\nvar _readline2 = _interopRequireDefault(_readline);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"attach\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"attaches to server terminal (kinda)\";\n\n// Command Action *required\nconst action = exports.action = message => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  var sock = _net2.default.connect(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm.sock')));\n  sock.write(\"ATTACH\", 'utf8', () => {\n    console.log('ATTACHING...');\n  });\n  sock.on('data', function (data) {\n    console.log(`${data}`); // Write data from server to terminal\n  });\n\n  const rl = _readline2.default.createInterface({\n    input: process.stdin // hook into terminal\n  });\n\n  rl.on('line', line => {\n    sock.write(line, 'utf8'); // Write terminal input to the server\n  });\n  sock.on('end', function (data) {\n    console.log(`IPC layer has been shutdown (Server Shutdown)`);\n    sock.destroy();\n    rl.close();\n    process.stdin.destroy();\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/attach.js?");

/***/ }),

/***/ "./src/commands/helpers/avorion.js":
/*!*****************************************!*\
  !*** ./src/commands/helpers/avorion.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.update = exports.install = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _readline = __webpack_require__(/*! readline */ \"readline\");\n\nvar _readline2 = _interopRequireDefault(_readline);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _createSingleLineLogger = __webpack_require__(/*! ./createSingleLineLogger */ \"./src/commands/helpers/createSingleLineLogger.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n\nconst windows = {\n  exec: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/steamcmd.exe'),\n  args: []\n};\n\nconst linux = {\n  exec: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/steamcmd.sh'),\n  args: []\n};\n\nlet multiLog;\n\nconst steamCmd = onFinish => {\n  var isWin = process.platform === \"win32\";\n\n  const avorionPath = _path2.default.resolve(globals.InstallationDir() + '/avorion');\n  const Beta = _MainConfig2.default.BETA ? ' -beta beta' : '';\n  let steamArgs = ['+login anonymous', `+force_install_dir ${avorionPath}`, `+app_update 565060${Beta}`, 'validate', '+quit'];\n  // Continue using config option for steam directory?\n  const steamCmd = _child_process2.default.spawn(isWin ? windows.exec : linux.exec, steamArgs);\n  const rl = _readline2.default.createInterface({\n    input: steamCmd.stdout\n  });\n\n  rl.on('line', line => {\n    multiLog.log(line);\n  });\n  // steamCmd.stderr.on('data', (data) => {\n  //   console.log(data);\n  // });\n\n  steamCmd.on('close', code => {\n    console.groupEnd();\n    rl.close();\n    onFinish();\n  });\n};\n\nconst update = () => {\n  multiLog = (0, _createSingleLineLogger.createMultiline)(5);\n  console.group(\"Updating Avorion ...\");\n  steamCmd(() => console.log('Finished Updating Avorion.'));\n};\nconst install = () => {\n  multiLog = (0, _createSingleLineLogger.createMultiline)(5);\n  multiLog.writeTitle(_colors2.default.green('---------- Installing Avorion ----------'));\n  let index = 0;\n  let inter = setInterval(() => {\n    multiLog.writeTitle(_colors2.default.green('---------- ' + cliSpinners.dots.frames[index] + ' Installing Avorion ----------'));\n    if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n  }, 80);\n  steamCmd(() => {\n    clearInterval(inter);\n    multiLog.writeTitle(_colors2.default.green('---------- Avorion Installed -----------'));\n    multiLog.clear();\n    multiLog.stop();\n  });\n};\nexports.install = install;\nexports.update = update;\n\n//# sourceURL=webpack:///./src/commands/helpers/avorion.js?");

/***/ }),

/***/ "./src/commands/helpers/createSingleLineLogger.js":
/*!********************************************************!*\
  !*** ./src/commands/helpers/createSingleLineLogger.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createSingleLineLogger = createSingleLineLogger;\nexports.createMultiline = createMultiline;\n\nvar _stringWidth = __webpack_require__(/*! string-width */ \"string-width\");\n\nvar _stringWidth2 = _interopRequireDefault(_stringWidth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst MOVE_LEFT = Buffer.from('1b5b3130303044', 'hex').toString();\nconst MOVE_UP = Buffer.from('1b5b3141', 'hex').toString();\nconst CLEAR_LINE = Buffer.from('1b5b304b', 'hex').toString();\n//const stream = process.stdout;\n\nfunction createSingleLineLogger(stream) {\n  const write = stream.write;\n  let str;\n\n  stream.write = function (data) {\n    if (str && data !== str) str = null;\n    return write.apply(this, arguments);\n  };\n\n  process.on('exit', () => {\n    if (str !== null) stream.write('');\n  });\n\n  let prevLineCount = 0;\n\n  const log = function () {\n    str = '';\n    const nextStr = Array.prototype.join.call(arguments, ' ');\n\n    // Clear screen\n    for (let i = 0; i < prevLineCount; i++) {\n      str += MOVE_LEFT + CLEAR_LINE + (i < prevLineCount - 1 ? MOVE_UP : '');\n    }\n\n    // Actual log output\n    str += nextStr;\n    stream.write(str);\n\n    // How many lines to remove on next clear screen\n    const prevLines = nextStr.split('\\n');\n    prevLineCount = 0;\n\n    for (const prevLine of prevLines) {\n      prevLineCount += Math.ceil((0, _stringWidth2.default)(prevLine) / stream.columns) || 1;\n    }\n  };\n\n  const clear = () => stream.write('');\n\n  return { log, clear };\n}\n\nfunction createMultiline(linesToKeep) {\n  let lines = [];\n  let Title = '';\n  let MaxLines = linesToKeep;\n  const singLine = createSingleLineLogger(process.stdout);\n  let interval = setInterval(() => {\n    lines = lines.map(line => line.replace(\"\\n\", \"\"));\n    const updatedLog = ['', '', Title, ...lines];\n    singLine.log(updatedLog.join('\\n'));\n  }, 80);\n\n  const log = line => {\n    lines.push(line);\n    if (lines.length > MaxLines) lines.shift();\n  };\n  const stop = () => {\n    setTimeout(() => {\n      clearInterval(interval);\n    }, 800);\n  };\n  const writeTitle = title => {\n    Title = title;\n  };\n  const clear = () => {\n    for (let index = 0; index < MaxLines; index++) {\n      log('');\n    }\n  };\n  return { log, stop, writeTitle, clear };\n}\n\n//# sourceURL=webpack:///./src/commands/helpers/createSingleLineLogger.js?");

/***/ }),

/***/ "./src/commands/helpers/steam.js":
/*!***************************************!*\
  !*** ./src/commands/helpers/steam.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _wgetImproved = __webpack_require__(/*! wget-improved */ \"wget-improved\");\n\nvar _wgetImproved2 = _interopRequireDefault(_wgetImproved);\n\nvar _tar = __webpack_require__(/*! tar */ \"tar\");\n\nvar _tar2 = _interopRequireDefault(_tar);\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _extractZip = __webpack_require__(/*! extract-zip */ \"extract-zip\");\n\nvar _extractZip2 = _interopRequireDefault(_extractZip);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst windows = {\n  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip',\n  output: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/steamcmd.zip'),\n  unpack: callback => {\n    (0, _extractZip2.default)(_path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/steamcmd.zip'), { dir: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/') }, function (err) {\n      callback();\n    });\n  }\n};\n\nconst linux = {\n  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz',\n  output: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/steamcmd_linux.tar'),\n  unpack: callback => {\n    _tar2.default.x({\n      cwd: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR + '/'),\n      file: _MainConfig2.default.STEAM_DIR + '/steamcmd_linux.tar'\n    }).then(callback);\n  }\n};\n\nconst installSteam = () => {\n  return new Promise((resolve, reject) => {\n    // Create Steam directory\n    _fs2.default.mkdir(_path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR), () => {\n      console.log(\"Steam directory created at: \" + _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR));\n      const options = {\n        gunzip: true\n      };\n      var isWin = process.platform === \"win32\";\n      // Download Steam command\n      let download = _wgetImproved2.default.download(isWin ? windows.source : linux.source, isWin ? windows.output : linux.output, options);\n      download.on('error', function (err) {\n        reject(err);\n      });\n      download.on('end', function (output) {\n        // extract tarball\n        _singleLineLog.stdout.clear();\n        const completed = () => {\n          resolve('Finished Extracting/Unpacking SteamCmd');\n        };\n        if (isWin) windows.unpack(completed);else linux.unpack(completed);\n      });\n      download.on('progress', function (progress) {\n        typeof progress === 'number';\n        (0, _singleLineLog.stdout)('Downloading Steam: [' + progress * 100 + '%]');\n      });\n    });\n  });\n};\n\nexports.default = installSteam;\n\n//# sourceURL=webpack:///./src/commands/helpers/steam.js?");

/***/ }),

/***/ "./src/commands/index.js":
/*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.update = exports.intergrate = exports.startWeb = exports.stopWeb = exports.stop = exports.status = exports.attach = exports.send = exports.kill = exports.install = exports.start = undefined;\n\nvar _start = __webpack_require__(/*! ./start.js */ \"./src/commands/start.js\");\n\nvar start = _interopRequireWildcard(_start);\n\nvar _install = __webpack_require__(/*! ./install.js */ \"./src/commands/install.js\");\n\nvar install = _interopRequireWildcard(_install);\n\nvar _kill = __webpack_require__(/*! ./kill.js */ \"./src/commands/kill.js\");\n\nvar kill = _interopRequireWildcard(_kill);\n\nvar _send = __webpack_require__(/*! ./send.js */ \"./src/commands/send.js\");\n\nvar send = _interopRequireWildcard(_send);\n\nvar _status = __webpack_require__(/*! ./status.js */ \"./src/commands/status.js\");\n\nvar status = _interopRequireWildcard(_status);\n\nvar _attach = __webpack_require__(/*! ./attach.js */ \"./src/commands/attach.js\");\n\nvar attach = _interopRequireWildcard(_attach);\n\nvar _stop = __webpack_require__(/*! ./stop.js */ \"./src/commands/stop.js\");\n\nvar stop = _interopRequireWildcard(_stop);\n\nvar _startWeb = __webpack_require__(/*! ./start-web.js */ \"./src/commands/start-web.js\");\n\nvar startWeb = _interopRequireWildcard(_startWeb);\n\nvar _stopWeb = __webpack_require__(/*! ./stop-web.js */ \"./src/commands/stop-web.js\");\n\nvar stopWeb = _interopRequireWildcard(_stopWeb);\n\nvar _intergrate = __webpack_require__(/*! ./intergrate.js */ \"./src/commands/intergrate.js\");\n\nvar intergrate = _interopRequireWildcard(_intergrate);\n\nvar _update = __webpack_require__(/*! ./update.js */ \"./src/commands/update.js\");\n\nvar update = _interopRequireWildcard(_update);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nexports.start = start;\nexports.install = install;\nexports.kill = kill;\nexports.send = send;\nexports.attach = attach;\nexports.status = status;\nexports.stop = stop;\nexports.stopWeb = stopWeb;\nexports.startWeb = startWeb;\nexports.intergrate = intergrate;\nexports.update = update;\n\n//# sourceURL=webpack:///./src/commands/index.js?");

/***/ }),

/***/ "./src/commands/install.js":
/*!*********************************!*\
  !*** ./src/commands/install.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.version = exports.alias = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/install.js?");

/***/ }),

/***/ "./src/commands/intergrate.js":
/*!************************************!*\
  !*** ./src/commands/intergrate.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RemoveDSM = exports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name\nconst command = exports.command = \"intergrate <onOff>\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"enables/disables intergration\";\n\n// Command Action\nconst action = exports.action = onOff => {\n  const ServerFile = _path2.default.resolve(globals.InstallationDir() + '/avorion/data/scripts/server/server.lua');\n  const DSMFile = _path2.default.resolve(globals.InstallationDir() + '/avorion/dsm.lua');\n\n  RemoveDSM(ServerFile, () => {\n    const dsm = `\\nlocal s, b = pcall(require, 'dsm') if s then if b.onStartUp then local a = onStartUp; onStartUp = function(c) a(c); b.onStartUp(c); end end else print(b); end --Added by DSM\\n`;\n\n    _fs2.default.writeFile(ServerFile, dsm, { flag: 'a' }, err => {\n      if (err) {\n        throw err;\n      }\n      console.log('Attached DSM Server mod to server.lua');\n    });\n\n    _fs2.default.readFile(_path2.default.resolve(globals.InstallationDir() + '/dsm/dsm.lua'), 'utf8', function (err, data) {\n      if (err) {\n        throw err;\n      }\n      const newData = data.replace(\"__MOTD__\", _MainConfig2.default.MOTD);\n      _fs2.default.writeFile(DSMFile, newData, err => {\n        if (err) {\n          throw err;\n        }\n      });\n    });\n  });\n};\n\nconst RemoveDSM = exports.RemoveDSM = (avorionFile, callback) => {\n  _fs2.default.readFile(avorionFile, 'utf8', function (err, data) {\n    if (err) {\n      throw err;\n    }\n    // Remove all DSM injected lines\n    let removedDSM = data.split(\"\\n\").filter(line => !line.includes('--Added by DSM'));\n    _fs2.default.writeFile(avorionFile, removedDSM.join('\\n'), err => {\n      if (err) {\n        throw err;\n      }\n      console.log('Removed DSM intergration.');\n      if (typeof callback === 'function') {\n        callback();\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/intergrate.js?");

/***/ }),

/***/ "./src/commands/kill.js":
/*!******************************!*\
  !*** ./src/commands/kill.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"kill\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"kills the server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is already Offline');\n    return;\n  }\n  const ServerWrapperPid = _localStorage2.default.getItem('WrapperPid');\n  process.kill(ServerWrapperPid, 'SIGINT');\n};\n\n//# sourceURL=webpack:///./src/commands/kill.js?");

/***/ }),

/***/ "./src/commands/send.js":
/*!******************************!*\
  !*** ./src/commands/send.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.send = exports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"send <message>\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"sends command to server\";\n\n// Command Action *required\nconst action = exports.action = message => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  // var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))\n  // sock.write(`${message}`,'utf8',()=>{\n  //   console.log(`Message: ${message}`);\n  // })\n  // sock.on('data', function (data) {\n  //   console.log(`Response: ${data}`);\n  //   sock.destroy()\n  // });\n\n  send('SENDING' + message, sock => {\n    console.log(`Message: ${message}`);\n  }, (data, sock) => {\n    console.log(`Response: ${data}`);\n    sock.destroy();\n  });\n};\n\nconst send = exports.send = (message, write, response) => {\n  var sock = _net2.default.connect(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm.sock')));\n  sock.write(`${message}`, 'utf8', () => {\n    write(sock);\n  });\n  sock.on('data', function (data) {\n    response(data, sock);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/send.js?");

/***/ }),

/***/ "./src/commands/start-web.js":
/*!***********************************!*\
  !*** ./src/commands/start-web.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"start-web\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"starts the web server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if ((0, _serverOnline.WebServerOnline)()) {\n    console.log('Server is already online');\n    return;\n  }\n\n  console.group('Starting Web Server');\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/webServer.js');\n  _logger.Web.init();\n  _logger.Web.clear();\n  _localStorage2.default.removeItem('WebServerPid');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', _logger.Web.stream, _logger.Web.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath], options);\n  steamCmd.unref();\n};\n\n//# sourceURL=webpack:///./src/commands/start-web.js?");

/***/ }),

/***/ "./src/commands/start.js":
/*!*******************************!*\
  !*** ./src/commands/start.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _intergrate = __webpack_require__(/*! ./intergrate */ \"./src/commands/intergrate.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"start\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"starts the server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is already online');\n    return;\n  }\n\n  console.group('Starting Server');\n  _logger2.default.init();\n  _logger2.default.clear();\n  _localStorage2.default.removeItem('WrapperPid');\n  (0, _intergrate.action)('on'); // enable intergration on wrapper startup\n\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/serverWrapper.js');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', _logger2.default.stream, _logger2.default.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath], options);\n  steamCmd.unref();\n};\n\n//# sourceURL=webpack:///./src/commands/start.js?");

/***/ }),

/***/ "./src/commands/status.js":
/*!********************************!*\
  !*** ./src/commands/status.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\n// Command Name *required\nconst command = exports.command = \"status\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"gets status from server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  (0, _send.send)('/status', sock => {\n    console.log('Sent status command, Waiting....');\n  }, (data, sock) => {\n    console.log('Received: ' + data);\n    sock.destroy();\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/status.js?");

/***/ }),

/***/ "./src/commands/stop-web.js":
/*!**********************************!*\
  !*** ./src/commands/stop-web.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"stop-web\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"stops the web server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.WebServerOnline)()) {\n    console.log('Server is already offline');\n    return;\n  }\n  const WebServerPID = _localStorage2.default.getItem('WebServerPid');\n  process.kill(WebServerPID, 'SIGINT');\n};\n\n//# sourceURL=webpack:///./src/commands/stop-web.js?");

/***/ }),

/***/ "./src/commands/stop.js":
/*!******************************!*\
  !*** ./src/commands/stop.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"stop\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"stops the server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is already Offline');\n    return;\n  }\n  (0, _send.send)('/stop', sock => {\n    console.log('Sent stop command, Waiting....');\n  }, (data, sock) => {\n    console.log('Received: ' + data);\n    sock.destroy();\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/stop.js?");

/***/ }),

/***/ "./src/commands/update.js":
/*!********************************!*\
  !*** ./src/commands/update.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/update.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst config = _ini2.default.parse(_fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8'));\n\n// create object for each config option to support type checking, defaults, and required options.\n// then use a command to parse it all\nconst main = {\n  MOTD: {\n    default: \"Welcome to the server, Enjoy!!\",\n    type: 'string'\n  }\n};\n\nif (!config.STEAM_DIR) config.STEAM_DIR = \"steam\"; // default steam\n\nif (!config.STATUS_INTERVAL_MS) config.STATUS_INTERVAL_MS = 1000 * 60 * 5; // default 5 minutes\nconfig.STATUS_INTERVAL_MS = parseInt(config.STATUS_INTERVAL_MS, 10);\n\nif (!config.MOTD) config.MOTD = \"Welcome to the server, Enjoy!!\";\n\nexports.default = config;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Chat = exports.Web = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst Logger = {\n  logFile: _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/avorion.txt'),\n  init() {\n    if (!this.stream) {\n      //Create FD\n      this.fd = _fs2.default.openSync(this.logFile, 'a');\n      this.stream = _fs2.default.createWriteStream(null, { fd: this.fd });\n    }\n  },\n  log(msg) {\n    this.stream.write(msg + '\\n');\n    // console.log(fs.fstatSync(this.fd).size)\n  },\n  clear() {\n    _fs2.default.truncateSync(this.logFile);\n  },\n  rotate(output) {}\n};\nexports.default = Logger;\nconst Web = exports.Web = _extends({}, Logger, {\n  logFile: _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/web.txt')\n});\n\nconst Chat = exports.Chat = _extends({}, Logger, {\n  logFile: _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/chat.txt')\n});\n\n//# sourceURL=webpack:///./src/lib/logger.js?");

/***/ }),

/***/ "./src/lib/serverOnline.js":
/*!*********************************!*\
  !*** ./src/lib/serverOnline.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.WebServerOnline = exports.GameServerOnline = undefined;\n\nvar _localStorage = __webpack_require__(/*! ./localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _isRunning = __webpack_require__(/*! is-running */ \"is-running\");\n\nvar _isRunning2 = _interopRequireDefault(_isRunning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst GameServerOnline = () => {\n  const WrapperPID = _localStorage2.default.getItem('WrapperPid');\n  if (WrapperPID === null) {\n    return false;\n  }\n  // this only checks if the wrapper is online, a game server could be inbetween restarts or hanging and will still report its online\n\n  return (0, _isRunning2.default)(WrapperPID);\n};\n// require('is-running')(897245) // returns true if a process with pid 897245 is running\n\n\nconst WebServerOnline = () => {\n  const WebServerPid = _localStorage2.default.getItem('WebServerPid');\n  if (WebServerPid === null) {\n    return false;\n  }\n\n  return (0, _isRunning2.default)(WebServerPid);\n};\n\nexports.GameServerOnline = GameServerOnline;\nexports.WebServerOnline = WebServerOnline;\n\n//# sourceURL=webpack:///./src/lib/serverOnline.js?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "cli-spinners":
/*!*******************************!*\
  !*** external "cli-spinners" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cli-spinners\");\n\n//# sourceURL=webpack:///external_%22cli-spinners%22?");

/***/ }),

/***/ "colors":
/*!*************************!*\
  !*** external "colors" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"colors\");\n\n//# sourceURL=webpack:///external_%22colors%22?");

/***/ }),

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"commander\");\n\n//# sourceURL=webpack:///external_%22commander%22?");

/***/ }),

/***/ "extract-zip":
/*!******************************!*\
  !*** external "extract-zip" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"extract-zip\");\n\n//# sourceURL=webpack:///external_%22extract-zip%22?");

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

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"readline\");\n\n//# sourceURL=webpack:///external_%22readline%22?");

/***/ }),

/***/ "single-line-log":
/*!**********************************!*\
  !*** external "single-line-log" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"single-line-log\");\n\n//# sourceURL=webpack:///external_%22single-line-log%22?");

/***/ }),

/***/ "string-width":
/*!*******************************!*\
  !*** external "string-width" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"string-width\");\n\n//# sourceURL=webpack:///external_%22string-width%22?");

/***/ }),

/***/ "tar":
/*!**********************!*\
  !*** external "tar" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tar\");\n\n//# sourceURL=webpack:///external_%22tar%22?");

/***/ }),

/***/ "wget-improved":
/*!********************************!*\
  !*** external "wget-improved" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"wget-improved\");\n\n//# sourceURL=webpack:///external_%22wget-improved%22?");

/***/ })

/******/ });