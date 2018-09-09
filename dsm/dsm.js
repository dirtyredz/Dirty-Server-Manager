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
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _commander = __webpack_require__(/*! commander */ \"commander\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _commands = __webpack_require__(/*! ../commands/ */ \"./src/commands/index.js\");\n\nvar commands = _interopRequireWildcard(_commands);\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Remove for production\nprocess.on('warning', e => console.warn(e.stack));\n\n// Add recursive options to Commander\n_commander.Command.prototype.recursiveOptions = function (options) {\n  if (options.length > 0) {\n    options.map(opt => {\n      return this.option(opt.flag, opt.description);\n    });\n    // return this.option(cmd.option[0], cmd.option[1])\n  }\n  return this;\n};\n\nlet Commander = new _commander.Command();\n/*******************************************/\n// process all commands\nconst Commands = Object.keys(commands);\nCommands.map((cmd, index) => {\n  cmd = commands[cmd];\n  if (cmd.command && cmd.description && typeof cmd.action == 'function') {\n    Commander.command(cmd.command).alias(cmd.alias ? cmd.alias : \"\").recursiveOptions(cmd.options || []).description(cmd.description).action((env, options) => {\n      // env and options switches depending on whats in the command, which is kinda silly\n      let parent = {};\n      let newOptions = null;\n      if (typeof env == \"object\" && env.parent) {\n        parent = env.parent;\n        newOptions = env;\n      } else if (typeof options == 'object' && options.parent) {\n        parent = options.parent;\n        newOptions = _extends({}, options, { env });\n      }\n      (0, _galaxies.getGalaxy)(parent.galaxy, (err, galaxy) => {\n        if (err) {\n          if (err.code == 1) {\n            if (typeof parent.galaxy == 'undefined') {\n              if (cmd.galaxyRequired) console.log('Unable to identify the galaxy for this command. please use \"-g name\"');\n            } else {\n              console.log(_colors2.default.red('Galaxy:'), parent.galaxy, _colors2.default.red('does not exsist!'));\n            }\n          } else if (err.code == 2) {\n            console.log('Select one of these galaxies:');\n            (0, _galaxies.getGalaxies)().map(galaxy => console.log('   ', galaxy.name));\n          } else if (err.code == 3) {\n            console.log('No galaxies are available,\\nPlease use \"' + _colors2.default.blue('dsm create <name>') + '\" to create your first galaxy.');\n          } else {\n            console.log(err.message);\n          }\n          if (cmd.galaxyRequired) {\n            process.exit(1);\n          }\n        }\n        if (typeof parent.galaxy !== 'undefined') {\n          cmd.action(newOptions, galaxy, parent);\n        } else {\n          cmd.action(newOptions, null, parent);\n        }\n      });\n    });\n  } else {\n    console.error('%s', _colors2.default.red('Unable to process command: ' + Commands[index]));\n  }\n});\n\n// error on unknown commands\nCommander.on('command:*', function () {\n  console.error(_colors2.default.red('Invalid command: %s') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.', Commander.args.join(' '));\n  process.exit(1);\n});\n\n// error when no command is given\nif (typeof process.argv[2] === 'undefined') {\n  console.error(_colors2.default.red('no command given!') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.');\n  process.exit(1);\n}\n\nCommander.version('0.1.0').usage('[options] <cmd ...>').option('-g, --galaxy <galaxy name>', 'Run commands against a specific galaxy').parse(process.argv);\n\n//# sourceURL=webpack:///./src/bin/dsm.js?");

/***/ }),

/***/ "./src/bin/helpers/startGameServer.js":
/*!********************************************!*\
  !*** ./src/bin/helpers/startGameServer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// npm install --global --production windows-build-tools\nvar pty = __webpack_require__(/*! node-pty */ \"node-pty\"); // dont use import, webpack is set to not touch node-pty as it will mess with it.\n// https://github.com/Microsoft/node-pty/issues/78\n\n\nconst startGameServer = (GameServerEmitter, startupParams, dataPath, AvorionFileToUse, supressLogs = false) => {\n\n  const windows = {\n    exec: _path2.default.resolve(globals.InstallationDir() + dataPath + '/bin/' + AvorionFileToUse + '.exe')\n  };\n\n  const linux = {\n    exec: _path2.default.resolve(globals.InstallationDir() + dataPath + '/bin/' + AvorionFileToUse)\n    // ????\n    // execvp(3) failed.: Permission denied\n    // execvp(3) failed.: No such file or directory\n\n    // NEED TO SWITCH .EXE for windows and nothing for linux\n  };const GameServer = pty.spawn(process.platform === \"win32\" ? windows.exec : linux.exec, startupParams.split(\" \"), { cwd: _path2.default.resolve(globals.InstallationDir() + dataPath) });\n  if (!supressLogs) console.log('Started server with these params:', startupParams);\n  // if stdout-to-log option is used, dsm cant detect data using GameServer\n  // need fall back for tracking logfile output\n  GameServerEmitter.emit('spawned', GameServer);\n\n  // Main STDOUT\n  GameServer.on('data', function (data) {\n    // events to listen to:\n    // An exception occurred: unrecognised option\n\n    // Remove unwanted char and log\n    const cleanedData = data.replace(/(\\u001b|\\[0K|\\[\\?25l|\\[\\?25h|\\[\\?)/gm, \"\");\n    if (!supressLogs) console.log(cleanedData); //\\u001b[0K\\u001b[?25l\n\n    GameServerEmitter.emit('data', data);\n\n    if (cleanedData.match(/^An exception occurred:/)) {\n      GameServerEmitter.emit('exception', cleanedData);\n      return;\n    }\n\n    if (data.includes('Memory used by scripts')) {\n      const dataArr = data.split('\\n');\n      const newData = dataArr.slice(0, dataArr.findIndex(line => line.includes('profiling')));\n      GameServerEmitter.emit('status', newData.join('\\n'));\n      return;\n    }\n\n    if (data.includes('Server startup complete')) {\n      GameServerEmitter.emit('startup', GameServer);\n      return;\n    }\n\n    if (cleanedData.match(/^<.*>/)) {\n      const name = cleanedData.match(/(?<=<).*(?=>)/);\n      const message = cleanedData.match(/(?<=> ).*/);\n      //add error handling\n      GameServerEmitter.emit('chat', name[0], message[0]);\n      return;\n    }\n\n    if (data.includes('DSM: Player Log Off')) {\n      // DSM: Player Log Off, name:  Dirtyredz  index:  1\n      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/);\n      const index = cleanedData.match(/(?<=index:  ).*/);\n      if (name && index) {\n        GameServerEmitter.emit('logoff', name[0], index[0]);\n        return;\n      }\n    }\n\n    if (data.includes('DSM: Player Log On')) {\n      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/);\n      const index = cleanedData.match(/(?<=index:  ).*/);\n      if (name && index) {\n        GameServerEmitter.emit('logon', name[0], index[0]);\n        return;\n      }\n    }\n\n    if (data.includes('Server shutdown')) {\n      GameServerEmitter.emit('shutdown', GameServer);\n      return;\n    }\n\n    if (data.includes('Creating minidump') || data.includes('Entered exception handler') || data.includes('Server startup FAILED')) {\n      GameServerEmitter.emit('crash', GameServer);\n      return;\n    }\n\n    // Server startup FAILED\n  });\n\n  GameServer.on('error', error => {\n    if (!supressLogs) console.log('Server Error:', error);\n  });\n\n  // emitted when process exits or when /stop is used\n  GameServer.on('exit', code => {\n    if (!supressLogs) console.log('exit', code);\n    // code == 0, server was shutdown, or failed to start\n    if (code === 0) {\n      GameServerEmitter.emit('exit');\n    } else if (code === 1) {\n      // code == 1, server process crashed\n      GameServerEmitter.emit('exit');\n      GameServerEmitter.emit('crash', GameServer);\n    }\n  });\n};\nexports.default = startGameServer;\n\n//# sourceURL=webpack:///./src/bin/helpers/startGameServer.js?");

/***/ }),

/***/ "./src/commands/attach.js":
/*!********************************!*\
  !*** ./src/commands/attach.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _readline = __webpack_require__(/*! readline */ \"readline\");\n\nvar _readline2 = _interopRequireDefault(_readline);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"attach\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Description *required\nconst description = exports.description = \"attaches to server terminal (kinda)\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if (!(0, _galaxies.isWrapperOnline)(galaxy.name)) {\n    console.log('Server is Offline');\n    return;\n  }\n  var sock = _net2.default.connect(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm_' + galaxy.name + '.sock')));\n  sock.write(\"ATTACH\", 'utf8', () => {\n    console.log('ATTACHING...');\n  });\n  sock.on('data', function (data) {\n    console.log(`${data}`); // Write data from server to terminal\n  });\n\n  const rl = _readline2.default.createInterface({\n    input: process.stdin // hook into terminal\n  });\n\n  rl.on('line', line => {\n    sock.write(line, 'utf8'); // Write terminal input to the server\n  });\n  sock.on('end', function (data) {\n    console.log(`IPC layer has been shutdown (Server Shutdown)`);\n    sock.destroy();\n    rl.close();\n    process.stdin.destroy();\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/attach.js?");

/***/ }),

/***/ "./src/commands/config.js":
/*!********************************!*\
  !*** ./src/commands/config.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.options = exports.alias = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"config\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Options\nconst options = exports.options = [{ flag: '-s, --set <value>', description: 'Sets the config option' }, { flag: '-c, --config <name>', description: 'gets the specified configs value' }];\n\n// Command Description *required\nconst description = exports.description = \"displays or sets config values\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if (options.set && !options.config) {\n    console.log('usage: dsm config -c MOTD -s \"My new motd text\"');\n    return;\n  }\n  let ConfigToShow;\n  if (galaxy) {\n    ConfigToShow = new _MainConfig.ServerConfig(galaxy.name);\n    console.log(_colors2.default.blue('------ ' + galaxy.name + ' Config ------'));\n  } else {\n    ConfigToShow = new _MainConfig.DSMConfig();\n    console.log(_colors2.default.blue('------ DSM Config ------'));\n  }\n  if (options.config) {\n    if (ConfigToShow.options.indexOf(options.config) > -1) {\n      if (options.set) {\n        ConfigToShow[options.config].value = options.set;\n        console.log('Set config option ' + _colors2.default.green(options.config) + ' to:');\n        console.log('   ' + ConfigToShow[options.config].value);\n        ConfigToShow.save();\n      } else {\n        DisplayConfig(ConfigToShow[options.config]);\n      }\n    } else {\n      console.log(_colors2.default.red('No Config option: ') + options.config);\n    }\n    return;\n  }\n  ConfigToShow.options.map(opt => {\n    DisplayConfig(ConfigToShow[opt]);\n  });\n};\n\nconst DisplayConfig = Config => {\n  console.log(_colors2.default.green(Config.name + ' - '));\n  console.log('    ' + Config.description);\n  console.log('    Type: ' + Config.type);\n  console.log('    Default: ' + Config.default);\n  console.log('    Current: ' + Config.value);\n};\n\n//# sourceURL=webpack:///./src/commands/config.js?");

/***/ }),

/***/ "./src/commands/create.js":
/*!********************************!*\
  !*** ./src/commands/create.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _startGameServer = __webpack_require__(/*! ../bin/helpers/startGameServer */ \"./src/bin/helpers/startGameServer.js\");\n\nvar _startGameServer2 = _interopRequireDefault(_startGameServer);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar events = __webpack_require__(/*! events */ \"events\").EventEmitter;\nvar GameServerEmitter = new events.EventEmitter();\n\n\n// Command Name *required\nconst command = exports.command = \"create <galaxy_name>\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"Creates a new galaxy\";\n\n// Command Action *required\nconst action = exports.action = options => {\n  console.log(_colors2.default.blue('----------  Creating Galaxy ----------'));\n\n  if ((0, _galaxies.galaxyExsist)(options.env)) {\n    console.log('This galaxy already exsists');\n    return;\n  }\n\n  (0, _startGameServer2.default)(GameServerEmitter, `--datapath ${_path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies')} --galaxy-name ${options.env}`, '/dsm/avorion', 'AvorionServer', true);\n  GameServerEmitter.on('startup', GameServer => {\n    console.log('Startup succesfull, Shutting down...');\n    GameServer.write('/stop\\n');\n  });\n  GameServerEmitter.on('exit', () => {\n    console.log('Shutdown succesfull, Modifing server.ini');\n\n    const rawConfig = (0, _fs.readFileSync)(_path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + options.env + '/server.ini'), 'utf-8');\n\n    const parsedConfig = _ini2.default.parse(rawConfig);\n    parsedConfig.Administration.name = options.env;\n    parsedConfig.Administration.description = options.env;\n    (0, _fs.writeFileSync)(_path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + options.env + '/server.ini'), _ini2.default.stringify(parsedConfig));\n    console.log('Modifications Complete, setting up DSM intergration...');\n\n    (0, _fs.writeFileSync)(_path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + options.env + '/config.ini'), '; Visit DirtyServerManager for configuration options.');\n    console.log('DSM Intergration complete.');\n\n    console.log('Galaxy', _colors2.default.green(options.env), 'Created!!');\n    process.exit(0);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/create.js?");

/***/ }),

/***/ "./src/commands/helpers/avorion.js":
/*!*****************************************!*\
  !*** ./src/commands/helpers/avorion.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.update = exports.install = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// const cliSpinners = require('cli-spinners');\n// import colors from 'colors'\n\n// import { createMultiline } from './createSingleLineLogger';\n\nconst config = new _MainConfig.DSMConfig();\n// import readline from 'readline'\n\n\nconst windows = {\n  exec: _path2.default.resolve(globals.InstallationDir() + '/' + config.STEAM_DIR.value + '/steamcmd.exe'),\n  args: []\n};\n\nconst linux = {\n  exec: _path2.default.resolve(globals.InstallationDir() + '/' + config.STEAM_DIR.value + '/steamcmd.sh'),\n  args: []\n\n  // let multiLog;\n\n};const steamCmd = onFinish => {\n  var isWin = process.platform === \"win32\";\n\n  const avorionPath = _path2.default.resolve(globals.InstallationDir() + '/dsm/avorion');\n  const Beta = config.BETA.value ? ' -beta beta' : '';\n  let steamArgs = ['+login anonymous', `+force_install_dir ${avorionPath}`, `+app_update 565060${Beta}`, 'validate', '+quit'];\n  // Continue using config option for steam directory?\n  const steamCmd = _child_process2.default.spawn(isWin ? windows.exec : linux.exec, steamArgs);\n  // const rl = readline.createInterface({\n  //   input: steamCmd.stdout\n  // });\n  steamCmd.stdout.pipe(process.stdout);\n  // rl.on('line', (line) => {\n  //   // multiLog.log(line)\n  //   console.log(line)\n  // });\n  // steamCmd.stderr.on('data', (data) => {\n  //   console.log(data);\n  // });\n\n  steamCmd.on('close', code => {\n    // console.groupEnd();\n    // rl.close()\n    onFinish();\n  });\n};\n\nconst update = () => {\n  console.log('Updating Avorion');\n  // multiLog = createMultiline(5)\n  // console.group(\"Updating Avorion ...\")\n  steamCmd(() => console.log('Finished Updating Avorion.'));\n};\nconst install = () => {\n  console.log('Installing Avorion');\n  // multiLog = createMultiline(5)\n  // multiLog.writeTitle(colors.green('---------- Installing Avorion ----------'))\n  // let index = 0\n  // let inter = setInterval(()=>{\n  //   multiLog.writeTitle(colors.green('---------- '+cliSpinners.dots.frames[index]+' Installing Avorion ----------'))\n  //   if(cliSpinners.dots.frames.length-1 > index)\n  //   index += 1\n  //   else\n  //     index = 0\n  // },80)\n  steamCmd(() => {\n    console.log('Finished Installing Avorion');\n    // clearInterval(inter)\n    // multiLog.writeTitle(colors.green('---------- Avorion Installed -----------'))\n    // multiLog.clear()\n    // multiLog.stop()\n  });\n};\nexports.install = install;\nexports.update = update;\n\n//# sourceURL=webpack:///./src/commands/helpers/avorion.js?");

/***/ }),

/***/ "./src/commands/helpers/spinner.js":
/*!*****************************************!*\
  !*** ./src/commands/helpers/spinner.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n\nclass Spinner {\n  constructor(message, color = 'blue') {\n    this._message = message;\n    this.start(color);\n  }\n  start(color = 'blue') {\n    let index = 0;\n    this.spinner = setInterval(() => {\n      (0, _singleLineLog.stdout)(_colors2.default[color]('---------- ' + cliSpinners.dots.frames[index] + ' ' + this._message + ' ----------'));\n      if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n    }, 80);\n  }\n  log(message, color = 'blue') {\n    this._message = message;\n  }\n  stop(message, color = 'blue') {\n    clearInterval(this.spinner);\n    (0, _singleLineLog.stdout)(_colors2.default[color]('---------- ' + message + ' ----------'));\n    _singleLineLog.stdout.clear();\n    console.log('\\n');\n  }\n}\nexports.default = Spinner;\n\n//# sourceURL=webpack:///./src/commands/helpers/spinner.js?");

/***/ }),

/***/ "./src/commands/helpers/steam.js":
/*!***************************************!*\
  !*** ./src/commands/helpers/steam.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _wgetImproved = __webpack_require__(/*! wget-improved */ \"wget-improved\");\n\nvar _wgetImproved2 = _interopRequireDefault(_wgetImproved);\n\nvar _tar = __webpack_require__(/*! tar */ \"tar\");\n\nvar _tar2 = _interopRequireDefault(_tar);\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _extractZip = __webpack_require__(/*! extract-zip */ \"extract-zip\");\n\nvar _extractZip2 = _interopRequireDefault(_extractZip);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst SteamDir = new _MainConfig.DSMConfig().STEAM_DIR.value;\nconst windows = {\n  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip',\n  output: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/steamcmd.zip'),\n  unpack: callback => {\n    (0, _extractZip2.default)(_path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/steamcmd.zip'), { dir: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/') }, function (err) {\n      callback();\n    });\n  }\n};\n\nconst linux = {\n  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz',\n  output: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/steamcmd_linux.tar'),\n  unpack: callback => {\n    _tar2.default.x({\n      cwd: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/'),\n      file: SteamDir + '/steamcmd_linux.tar'\n    }).then(callback);\n  }\n};\n\nconst installSteam = () => {\n  return new Promise((resolve, reject) => {\n    // Create Steam directory\n    _fs2.default.mkdir(_path2.default.resolve(globals.InstallationDir() + '/' + SteamDir), () => {\n      console.log(\"Steam directory created at: \" + _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir));\n      const options = {\n        gunzip: true\n      };\n      var isWin = process.platform === \"win32\";\n      // Download Steam command\n      let download = _wgetImproved2.default.download(isWin ? windows.source : linux.source, isWin ? windows.output : linux.output, options);\n      download.on('error', function (err) {\n        reject(err);\n      });\n      download.on('end', function (output) {\n        // extract tarball\n        _singleLineLog.stdout.clear();\n        const completed = () => {\n          resolve('Finished Extracting/Unpacking SteamCmd');\n        };\n        if (isWin) windows.unpack(completed);else linux.unpack(completed);\n      });\n      download.on('progress', function (progress) {\n        typeof progress === 'number';\n        (0, _singleLineLog.stdout)('Downloading Steam: [' + progress * 100 + '%]');\n      });\n    });\n  });\n};\n\nexports.default = installSteam;\n\n//# sourceURL=webpack:///./src/commands/helpers/steam.js?");

/***/ }),

/***/ "./src/commands/index.js":
/*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.create = exports.config = exports.pid = exports.update = exports.startWeb = exports.stopWeb = exports.stop = exports.status = exports.attach = exports.send = exports.kill = exports.install = exports.start = undefined;\n\nvar _start = __webpack_require__(/*! ./start.js */ \"./src/commands/start.js\");\n\nvar start = _interopRequireWildcard(_start);\n\nvar _install = __webpack_require__(/*! ./install.js */ \"./src/commands/install.js\");\n\nvar install = _interopRequireWildcard(_install);\n\nvar _kill = __webpack_require__(/*! ./kill.js */ \"./src/commands/kill.js\");\n\nvar kill = _interopRequireWildcard(_kill);\n\nvar _send = __webpack_require__(/*! ./send.js */ \"./src/commands/send.js\");\n\nvar send = _interopRequireWildcard(_send);\n\nvar _status = __webpack_require__(/*! ./status.js */ \"./src/commands/status.js\");\n\nvar status = _interopRequireWildcard(_status);\n\nvar _attach = __webpack_require__(/*! ./attach.js */ \"./src/commands/attach.js\");\n\nvar attach = _interopRequireWildcard(_attach);\n\nvar _stop = __webpack_require__(/*! ./stop.js */ \"./src/commands/stop.js\");\n\nvar stop = _interopRequireWildcard(_stop);\n\nvar _startWeb = __webpack_require__(/*! ./start-web.js */ \"./src/commands/start-web.js\");\n\nvar startWeb = _interopRequireWildcard(_startWeb);\n\nvar _stopWeb = __webpack_require__(/*! ./stop-web.js */ \"./src/commands/stop-web.js\");\n\nvar stopWeb = _interopRequireWildcard(_stopWeb);\n\nvar _update = __webpack_require__(/*! ./update.js */ \"./src/commands/update.js\");\n\nvar update = _interopRequireWildcard(_update);\n\nvar _pid = __webpack_require__(/*! ./pid.js */ \"./src/commands/pid.js\");\n\nvar pid = _interopRequireWildcard(_pid);\n\nvar _config = __webpack_require__(/*! ./config.js */ \"./src/commands/config.js\");\n\nvar config = _interopRequireWildcard(_config);\n\nvar _create = __webpack_require__(/*! ./create.js */ \"./src/commands/create.js\");\n\nvar create = _interopRequireWildcard(_create);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// import * as intergrate from './intergrate.js'\nexports.start = start;\nexports.install = install;\nexports.kill = kill;\nexports.send = send;\nexports.attach = attach;\nexports.status = status;\nexports.stop = stop;\nexports.stopWeb = stopWeb;\nexports.startWeb = startWeb;\nexports.update = update;\nexports.pid = pid;\nexports.config = config;\nexports.create = create;\n\n//# sourceURL=webpack:///./src/commands/index.js?");

/***/ }),

/***/ "./src/commands/install.js":
/*!*********************************!*\
  !*** ./src/commands/install.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n// [S_API FAIL] SteamAPI_Init() failed; SteamAPI_IsSteamRunning() failed.\n\n// dlopen failed trying to load:\n// steamclient.so\n// with error:\n// steamclient.so: wrong ELF class: ELFCLASS32\n// [S_API FAIL] SteamAPI_Init() failed; unable to locate a running instance of Steam, or a local steamclient.so.\n// SteamGameServer_Init call failed\n\n// Error starting steam-based networking. Falling back to standard TCP/UDP protocols.\n\n// The server will not be authenticated via Steam and won't show up in public server lists.\n\n// WARNING: The fallback TCP/UDP protocols are deprecated and potentially UNSAFE!\n//          If you're running a dedicated server, this is HIGHLY discouraged!\n//          Use steam networking instead; Enable with --use-steam-networking 1\n// Warning: No RCON password set. RCON disabled.\n\n//# sourceURL=webpack:///./src/commands/install.js?");

/***/ }),

/***/ "./src/commands/kill.js":
/*!******************************!*\
  !*** ./src/commands/kill.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nvar _db = __webpack_require__(/*! ../lib/db */ \"./src/lib/db.js\");\n\nvar _db2 = _interopRequireDefault(_db);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"kill\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Description *required\nconst description = exports.description = \"kills the server\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if (!(0, _galaxies.isWrapperOnline)(galaxy.name)) {\n    console.log('Server is already offline');\n    return;\n  }\n  const DB = new _db2.default(galaxy.name);\n  const Pid = DB.WrapperPid;\n  console.log('Killing pid:', Pid);\n  process.kill(Pid, 'SIGINT');\n  DB.close;\n};\n\n//# sourceURL=webpack:///./src/commands/kill.js?");

/***/ }),

/***/ "./src/commands/pid.js":
/*!*****************************!*\
  !*** ./src/commands/pid.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.options = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _psNode = __webpack_require__(/*! ps-node */ \"ps-node\");\n\nvar _psNode2 = _interopRequireDefault(_psNode);\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import localStorage from '../lib/localStorage'\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n// Command Name *required\nconst command = exports.command = \"pid\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Options\nconst options = exports.options = [{ flag: '-s, --search', description: 'Searchs process list for runaway DSM Wrappers' }];\n\n// Command Description *required\nconst description = exports.description = \"gets pid information\";\n\n// Command Action *required\nconst action = exports.action = (options, Galaxy) => {\n  // const WrapperPid = localStorage.getItem('WrapperPid') || colors.red('Offline')\n  // const GameServerPid = localStorage.getItem('GameServerPid') ||  colors.red('Offline')\n  // const WebServerPid = localStorage.getItem('WebServerPid') ||  colors.red('Offline')\n\n  // console.log(colors.blue('------ PID Info ------'))\n  // console.log('DSM Wrapper:',WrapperPid && colors.green(WrapperPid))\n  // console.log('Game Server:',GameServerPid && colors.green(GameServerPid))\n  // console.log('Web Server:',WebServerPid && colors.green(WebServerPid))\n\n  if (options && options.search) {\n    let index = 0;\n    const interval = setInterval(() => {\n      (0, _singleLineLog.stdout)(_colors2.default.blue(cliSpinners.dots.frames[index] + ' Searching for runaway DSM processes...'));\n      if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n    }, 80);\n    // A simple pid lookup\n    _psNode2.default.lookup({\n      command: 'node',\n      arguments: 'serverWrapper.js'\n    }, function (err, resultList) {\n      if (err) {\n        throw new Error(err);\n      }\n      clearInterval(interval);\n      (0, _singleLineLog.stdout)(_colors2.default.red('Found:'), resultList.length);\n      _singleLineLog.stdout.clear();\n      console.log('');\n      resultList.forEach(function (process) {\n        if (process) {\n          console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);\n        }\n      });\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/commands/pid.js?");

/***/ }),

/***/ "./src/commands/send.js":
/*!******************************!*\
  !*** ./src/commands/send.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.send = exports.action = exports.description = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"send <message>\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Description *required\nconst description = exports.description = \"sends command to server\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if (!(0, _galaxies.isWrapperOnline)(galaxy.name)) {\n    console.log('Server is Offline');\n    return;\n  }\n  if (!(0, _galaxies.isGameServerOnline)(galaxy.name)) {\n    console.log('Wrapper is online, but GameServer is not, Server might be in a state of transition (restart/crash).');\n    return;\n  }\n  // var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))\n  // sock.write(`${message}`,'utf8',()=>{\n  //   console.log(`Message: ${message}`);\n  // })\n  // sock.on('data', function (data) {\n  //   console.log(`Response: ${data}`);\n  //   sock.destroy()\n  // });\n  console.log(options);\n  // send('SENDING'+message,\n  //   (sock)=>{\n  //     console.log(`Message: ${message}`);\n  //   },\n  //   (data, sock)=>{\n  //     console.log(`Response: ${data}`);\n  //     sock.destroy()\n  //   }\n  // )\n};\n\nconst send = exports.send = (GalaxyName, message, write, response, error) => {\n  var sock = _net2.default.connect(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm_' + GalaxyName + '.sock')), () => {\n    sock.write(`${message}`, 'utf8', () => {\n      write(sock);\n    });\n    sock.on('data', function (data) {\n      response(data, sock);\n    });\n  });\n  sock.on('error', function (err) {\n    if (typeof error == 'function') {\n      if (err.errno === 'ENOENT') {\n        error('Could not connect to the server.');\n      } else {\n        error(err);\n      }\n    } else {\n      console.log(err);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/send.js?");

/***/ }),

/***/ "./src/commands/start-web.js":
/*!***********************************!*\
  !*** ./src/commands/start-web.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"start-web\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"starts the web server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if ((0, _serverOnline.WebServerOnline)()) {\n    console.log('Server is already online');\n    return;\n  }\n\n  console.group('Starting Web Server');\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/webServer.js');\n  const Web = new _logger2.default('../logs', 'web');\n  _localStorage2.default.removeItem('WebServerPid');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', Web.stream, Web.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath], options);\n  steamCmd.unref();\n};\n\n//# sourceURL=webpack:///./src/commands/start-web.js?");

/***/ }),

/***/ "./src/commands/start.js":
/*!*******************************!*\
  !*** ./src/commands/start.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _spinner = __webpack_require__(/*! ./helpers/spinner */ \"./src/commands/helpers/spinner.js\");\n\nvar _spinner2 = _interopRequireDefault(_spinner);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"start\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Description *required\nconst description = exports.description = \"starts the server\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if ((0, _galaxies.isWrapperOnline)(galaxy.name)) {\n    console.log('Server is already online');\n    return;\n  }\n  const spinner = new _spinner2.default('Starting Server');\n\n  const Log = new _logger2.default(galaxy.name, 'avorion');\n  // intergrate('on') // enable intergration on wrapper startup\n\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/serverWrapper.js');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', Log.stream, Log.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath, galaxy.name], options);\n  // console.log(steamCmd.pid)\n  steamCmd.unref();\n\n  let errorIndex = 0;\n  const Finish = () => {\n    clearInterval(int);\n    return;\n  };\n  const int = setInterval(() => {\n    errorIndex += 1;\n    if (errorIndex >= 25) {\n      spinner.stop('ERROR');\n      clearInterval(int);\n    }\n    const LogOutput = _fs2.default.readFileSync(Log.logFile).toString();\n    // can this be abstracted into an event emitter that the GameServer and other commands can share\n    // by passing in lines of data and the emitter object we wish to send?\n    // other commands might not need to listen on the IPC layer and instead listen to the log files events.\n    const unrecognisedOption = LogOutput.match(/An exception occurred: unrecognised option.*/);\n    if (unrecognisedOption) {\n      spinner.stop('ERROR');\n      console.log(unrecognisedOption[0]);\n      clearInterval(int);\n      return;\n    }\n    const DSMError = LogOutput.match(/DSM ERROR.*/);\n    if (DSMError) {\n      spinner.stop('ERROR');\n      console.log(DSMError[0]);\n      clearInterval(int);\n      return;\n    }\n    const ServerStarted = LogOutput.includes('Server startup complete.');\n    if (ServerStarted) {\n      spinner.stop('✔️  Server Started');\n      clearInterval(int);\n      return;\n    }\n  }, 500);\n};\n\n//# sourceURL=webpack:///./src/commands/start.js?");

/***/ }),

/***/ "./src/commands/status.js":
/*!********************************!*\
  !*** ./src/commands/status.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nvar _spinner = __webpack_require__(/*! ./helpers/spinner */ \"./src/commands/helpers/spinner.js\");\n\nvar _spinner2 = _interopRequireDefault(_spinner);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"status\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Description *required\nconst description = exports.description = \"gets status from server\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if (!(0, _galaxies.isWrapperOnline)(galaxy.name)) {\n    console.log('Server is Offline');\n    return;\n  }\n  const spinner = new _spinner2.default('Checking Status');\n  (0, _send.send)(galaxy.name, '/status', sock => {\n    spinner.log('Status Command Sent');\n  }, (data, sock) => {\n    setTimeout(() => {\n      //we want the user to enjoy our pretty spinner\n      spinner.stop('✔️ Received Status');\n      console.log(data.toString());\n      sock.destroy();\n    }, 1000);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/status.js?");

/***/ }),

/***/ "./src/commands/stop-web.js":
/*!**********************************!*\
  !*** ./src/commands/stop-web.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"stop-web\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"stops the web server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.WebServerOnline)()) {\n    console.log('Server is already offline');\n    return;\n  }\n  const WebServerPID = _localStorage2.default.getItem('WebServerPid');\n  process.kill(WebServerPID, 'SIGINT');\n};\n\n//# sourceURL=webpack:///./src/commands/stop-web.js?");

/***/ }),

/***/ "./src/commands/stop.js":
/*!******************************!*\
  !*** ./src/commands/stop.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.galaxyRequired = exports.alias = exports.command = undefined;\n\nvar _galaxies = __webpack_require__(/*! ../lib/galaxies */ \"./src/lib/galaxies.js\");\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nvar _spinner = __webpack_require__(/*! ./helpers/spinner */ \"./src/commands/helpers/spinner.js\");\n\nvar _spinner2 = _interopRequireDefault(_spinner);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"stop\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Galaxy Required\nconst galaxyRequired = exports.galaxyRequired = true;\n\n// Command Description *required\nconst description = exports.description = \"stops the server\";\n\n// Command Action *required\nconst action = exports.action = (options, galaxy) => {\n  if (!(0, _galaxies.isWrapperOnline)(galaxy.name)) {\n    console.log('Server is already Offline');\n    return;\n  }\n  if (!(0, _galaxies.isGameServerOnline)(galaxy.name)) {\n    console.log('Wrapper is online, but GameServer is not, Server might be in a state of transition (restart/crash).');\n    console.log('Use the KILL command to force shutdown the wrapper, or wait until the server is out of its transition phase.');\n    return;\n  }\n  const spinner = new _spinner2.default('Stopping Server');\n  setTimeout(() => {\n    // pretty spinner\n    (0, _send.send)(galaxy.name, '/stop', sock => {\n      spinner.log('Stop Command Sent');\n    }, (data, sock) => {\n      spinner.stop('Stop Succesful');\n      sock.destroy();\n    });\n  }, 1000);\n};\n\n//# sourceURL=webpack:///./src/commands/stop.js?");

/***/ }),

/***/ "./src/commands/update.js":
/*!********************************!*\
  !*** ./src/commands/update.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/update.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ServerConfig = exports.DSMConfig = undefined;\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _ip = __webpack_require__(/*! ip */ \"ip\");\n\nvar _ip2 = _interopRequireDefault(_ip);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Option {\n  constructor(name, def, description, type, init) {\n    this.default = def;\n    this.description = description;\n    this.type = type;\n    this.name = name;\n    this.parse(def);\n    this.parse(init);\n  }\n  get value() {\n    return this._value;\n  }\n  set value(incValue) {\n    if (incValue) {\n      this.parse(incValue);\n    }\n  }\n  parse(unparsed) {\n    if (unparsed == null) return;\n    switch (this.type) {\n      case 'number':\n        this._value = parseInt(unparsed, 10);\n        break;\n      case 'boolean':\n        this._value = unparsed === 'true';\n        break;\n      case 'string':\n        this._value = String(unparsed);\n        break;\n      default:\n        this._value = unparsed;\n    }\n  }\n}\n\n// create object for each config option to support type checking, defaults, and required options.\n// then use a command to parse it all\nclass DSMConfig {\n  constructor() {\n    this._parsed = [];\n\n    this._raw = _fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8');\n    this._parsed = _ini2.default.parse(this._raw);\n    this.STEAM_DIR = new Option(\"STEAM_DIR\", \"steam\", 'directory relative to dsm installation for steam to be installed', 'string', this._parsed['STEAM_DIR']);\n    this.WEB_PORT = new Option(\"WEB_PORT\", 8080, 'Port assigned to the Wen Interface', 'number', this._parsed['WEB_PORT']);\n    this.WEB_IP_ADDRESS = new Option(\"WEB_IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string', this._parsed['WEB_IP_ADDRESS']);\n    this.BETA = new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean', this._parsed['BETA']);\n  }\n  get options() {\n    const PublicProperties = Object.getOwnPropertyNames(this).filter(property => property.match(/^(?!_.*).*/));\n    return PublicProperties;\n  }\n  save() {\n    let objectToSave = {};\n    this.options.map(opt => {\n      if (this[opt].value.toString() !== this[opt].default.toString()) {\n        objectToSave[opt] = this[opt].value.toString();\n      }\n    });\n    _fs2.default.writeFileSync(this._path, _ini2.default.encode(objectToSave));\n  }\n}\n\nclass ServerConfig {\n  constructor(galaxyName) {\n    this._parsed = [];\n\n    this._galaxyName = galaxyName;\n    this._path = _path2.default.resolve(globals.InstallationDir() + '/dsm/galaxies/' + galaxyName + '/config.ini');\n    this._raw = _fs2.default.readFileSync(this._path, 'utf-8');\n    this._parsed = _ini2.default.parse(this._raw);\n    this.MOTD = new Option(\"MOTD\", \"Welcome to the server, Enjoy!!\", 'Message to be displayed on user login', 'string', this._parsed['MOTD']);\n    this.STATUS_INTERVAL_MS = new Option(\"STATUS_INTERVAL_MS\", 1000 * 60 * 5, 'interval in MS to run the status check', 'number', this._parsed['STATUS_INTERVAL_MS']);\n    this.BETA = new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean', this._parsed['BETA']);\n    this.STARTUP_PARAMS = new Option(\"STARTUP_PARAMS\", '--public true --listed true --same-start-sector false', 'Parameters to be applied to server when starting. see \"dsm info\" for more info', 'string', this._parsed['STARTUP_PARAMS']);\n    this.AUTO_RESTART = new Option(\"AUTO_RESTART\", 'true', 'if true will automatically restart the server when a crash is detected', 'boolean', this._parsed['AUTO_RESTART']);\n    this.IP_ADDRESS = new Option(\"IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string');\n    this.TIME_TO_STATUS_FAILURE = new Option(\"TIME_TO_STATUS_FAILURE\", 30000, 'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.', 'number', this._parsed['TIME_TO_STATUS_FAILURE']);\n    this.AVORION_DATAPATH = new Option(\"AVORION_DATAPATH\", '/dsm/avorion', 'Path to avorion directory. Relative to dsm.js installed by default in your home directory', 'string', this._parsed['AVORION_DATAPATH']);\n  }\n  get options() {\n    const PublicProperties = Object.getOwnPropertyNames(this).filter(property => property.match(/^(?!_.*).*/));\n    return PublicProperties;\n  }\n  save() {\n    let objectToSave = {};\n    this.options.map(opt => {\n      if (this[opt].value.toString() !== this[opt].default.toString()) {\n        objectToSave[opt] = this[opt].value.toString();\n      }\n    });\n    _fs2.default.writeFileSync(this._path, _ini2.default.encode(objectToSave));\n  }\n  // SERVER_PORT: new Option(\n  //   \"SERVER_PORT\",\n  //   27000,\n  //   'Port assigned to the game server',\n  //   'number'),\n}\n// const Write\nexports.DSMConfig = DSMConfig;\nexports.ServerConfig = ServerConfig;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isAddressInUse = exports.getOpenPort = exports.isGameServerOnline = exports.isWrapperOnline = exports.getGalaxy = exports.getGalaxySync = exports.getSingleGalaxy = exports.count = exports.galaxyExsist = exports.getGalaxies = undefined;\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _db = __webpack_require__(/*! ./db */ \"./src/lib/db.js\");\n\nvar _db2 = _interopRequireDefault(_db);\n\nvar _isRunning = __webpack_require__(/*! is-running */ \"is-running\");\n\nvar _isRunning2 = _interopRequireDefault(_isRunning);\n\nvar _nodeNetstat = __webpack_require__(/*! node-netstat */ \"node-netstat\");\n\nvar _nodeNetstat2 = _interopRequireDefault(_nodeNetstat);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst getGalaxies = exports.getGalaxies = (dontParseDB = false) => {\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  return (0, _fs.readdirSync)(GalaxiesDir).map(name => {\n    return { path: (0, _path.join)(GalaxiesDir, name), name };\n  }).filter(fileDir => (0, _fs.lstatSync)(fileDir.path).isDirectory()).map(galaxy => {\n    // if(!dontParseDB){\n    //   const DB = new db(galaxy.name)\n    //   if(!isRunning(DB.WrapperPid)){\n    //     DB.WrapperPid = 0\n    //     DB.GameServerPid = 0\n    //     DB.ip = 0\n    //   }\n    //   DB.close()\n    // }\n    return galaxy;\n  });\n};\n\nconst galaxyExsist = exports.galaxyExsist = galaxyName => {\n  if (typeof galaxyName !== 'string') return false;\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  const GalaxyDir = (0, _path.join)(GalaxiesDir, galaxyName);\n  if ((0, _fs.existsSync)(GalaxyDir)) return (0, _fs.lstatSync)(GalaxyDir).isDirectory();\n  return false;\n};\n\nconst count = exports.count = () => {\n  return getGalaxies(true).length;\n};\nconst getSingleGalaxy = exports.getSingleGalaxy = () => {\n  return getGalaxies()[0];\n};\n\nconst getGalaxySync = exports.getGalaxySync = name => {\n  if (!galaxyExsist(name)) {\n    if (count() == 1 && typeof name == 'undefined') {\n      return getSingleGalaxy();\n    }\n    return false;\n  }\n  if (count() > 1 && !name) {\n    return false;\n  }\n  if (count() == 0) {\n    return false;\n  }\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  return { path: (0, _path.join)(GalaxiesDir, name), name };\n};\n\nconst getGalaxy = exports.getGalaxy = (name, callback) => {\n  if (typeof callback !== 'function') throw new Error('Callback is required');\n  if (!galaxyExsist(name)) {\n    if (count() == 1 && typeof name == 'undefined') {\n      callback(null, getSingleGalaxy());\n      return true;\n    }\n    callback({ code: 1, message: 'Galaxy does not exsist' });\n    return false;\n  }\n  if (count() > 1 && !name) {\n    callback({ code: 1, message: 'More then one galaxy available, please select a galaxy.' });\n    return false;\n  }\n  if (count() == 0) {\n    callback({ code: 3, message: 'No Galaxies Available.' });\n    return false;\n  }\n  const GalaxiesDir = (0, _path.resolve)((0, _globals.InstallationDir)() + '/dsm/galaxies');\n  callback(null, { path: (0, _path.join)(GalaxiesDir, name), name });\n  return true;\n};\n\nconst isWrapperOnline = exports.isWrapperOnline = GalaxyName => {\n  if (typeof GalaxyName !== 'string') throw new Error('Required string Galaxy Name');\n  const DB = new _db2.default(GalaxyName);\n  const PID = DB.WrapperPid;\n  const Running = PID !== 0 && (0, _isRunning2.default)(PID);\n  DB.close();\n  return Running;\n};\n\nconst isGameServerOnline = exports.isGameServerOnline = GalaxyName => {\n  if (typeof GalaxyName !== 'string') throw new Error('Required string Galaxy Name');\n\n  const DB = new _db2.default(GalaxyName);\n  const PID = DB.GameServerPid;\n  const Running = PID !== 0 && (0, _isRunning2.default)(PID);\n  DB.close();\n  return Running;\n};\n\nconst getOpenPort = exports.getOpenPort = () => {\n  const ports = [27020, 27120, 27220, 27320, 27420, 27520, 27620, 27720, 27820, 27920];\n  (0, _nodeNetstat2.default)({\n    sync: true,\n    done: err => {\n      if (err) console.log(err);\n    }\n  }, function (data) {\n    let index = ports.indexOf(data.local.port);\n    if (index > -1) ports.splice(index, 1);\n  });\n  const portNum = (ports[0] - 27020) / 100;\n  return {\n    avorion: 27000 + 100 * portNum,\n    steamQuery: 27020 + 100 * portNum,\n    steamMaster: 27021 + 100 * portNum\n  };\n};\n\nconst isAddressInUse = exports.isAddressInUse = ip => {\n  return typeof getGalaxies().find(galaxy => {\n    const DB = new _db2.default(galaxy.name);\n    const IP = DB.ip;\n    DB.close();\n    return IP == ip;\n    return false;\n  }) != 'undefined';\n};\n\n//# sourceURL=webpack:///./src/lib/galaxies.js?");

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

/***/ "./src/lib/logger.js":
/*!***************************!*\
  !*** ./src/lib/logger.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Logger {\n  constructor(GalaxyName, fileName) {\n    const dir = _path2.default.resolve(globals.InstallationDir() + '/dsm/logs/' + GalaxyName);\n    this._logFile = _path2.default.resolve(dir + '/' + fileName + '.txt');\n    if (!_fs2.default.existsSync(dir)) _fs2.default.mkdirSync(dir);\n    this.fd = _fs2.default.openSync(this._logFile, 'a');\n    this._stream = _fs2.default.createWriteStream(null, { fd: this.fd });\n    this.clear();\n  }\n  get logFile() {\n    return this._logFile;\n  }\n  get stream() {\n    return this._stream;\n  }\n  log(msg) {\n    this.stream.write(msg + '\\n');\n    // console.log(fs.fstatSync(this.fd).size)\n  }\n  clear() {\n    _fs2.default.truncateSync(this.logFile);\n  }\n  rotate(output) {}\n};\nexports.default = Logger;\n\n//# sourceURL=webpack:///./src/lib/logger.js?");

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

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"better-sqlite3\");\n\n//# sourceURL=webpack:///external_%22better-sqlite3%22?");

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

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

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

/***/ "node-localstorage":
/*!************************************!*\
  !*** external "node-localstorage" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-localstorage\");\n\n//# sourceURL=webpack:///external_%22node-localstorage%22?");

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

/***/ "ps-node":
/*!**************************!*\
  !*** external "ps-node" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ps-node\");\n\n//# sourceURL=webpack:///external_%22ps-node%22?");

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