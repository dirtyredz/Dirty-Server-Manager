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

/***/ "./node_modules/graceful-fs/fs.js":
/*!****************************************!*\
  !*** ./node_modules/graceful-fs/fs.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar fs = __webpack_require__(/*! fs */ \"fs\")\n\nmodule.exports = clone(fs)\n\nfunction clone (obj) {\n  if (obj === null || typeof obj !== 'object')\n    return obj\n\n  if (obj instanceof Object)\n    var copy = { __proto__: obj.__proto__ }\n  else\n    var copy = Object.create(null)\n\n  Object.getOwnPropertyNames(obj).forEach(function (key) {\n    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))\n  })\n\n  return copy\n}\n\n\n//# sourceURL=webpack:///./node_modules/graceful-fs/fs.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/graceful-fs.js":
/*!*************************************************!*\
  !*** ./node_modules/graceful-fs/graceful-fs.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\")\nvar polyfills = __webpack_require__(/*! ./polyfills.js */ \"./node_modules/graceful-fs/polyfills.js\")\nvar legacy = __webpack_require__(/*! ./legacy-streams.js */ \"./node_modules/graceful-fs/legacy-streams.js\")\nvar queue = []\n\nvar util = __webpack_require__(/*! util */ \"util\")\n\nfunction noop () {}\n\nvar debug = noop\nif (util.debuglog)\n  debug = util.debuglog('gfs4')\nelse if (/\\bgfs4\\b/i.test(process.env.NODE_DEBUG || ''))\n  debug = function() {\n    var m = util.format.apply(util, arguments)\n    m = 'GFS4: ' + m.split(/\\n/).join('\\nGFS4: ')\n    console.error(m)\n  }\n\nif (/\\bgfs4\\b/i.test(process.env.NODE_DEBUG || '')) {\n  process.on('exit', function() {\n    debug(queue)\n    __webpack_require__(/*! assert */ \"assert\").equal(queue.length, 0)\n  })\n}\n\nmodule.exports = patch(__webpack_require__(/*! ./fs.js */ \"./node_modules/graceful-fs/fs.js\"))\nif (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {\n  module.exports = patch(fs)\n}\n\n// Always patch fs.close/closeSync, because we want to\n// retry() whenever a close happens *anywhere* in the program.\n// This is essential when multiple graceful-fs instances are\n// in play at the same time.\nmodule.exports.close =\nfs.close = (function (fs$close) { return function (fd, cb) {\n  return fs$close.call(fs, fd, function (err) {\n    if (!err)\n      retry()\n\n    if (typeof cb === 'function')\n      cb.apply(this, arguments)\n  })\n}})(fs.close)\n\nmodule.exports.closeSync =\nfs.closeSync = (function (fs$closeSync) { return function (fd) {\n  // Note that graceful-fs also retries when fs.closeSync() fails.\n  // Looks like a bug to me, although it's probably a harmless one.\n  var rval = fs$closeSync.apply(fs, arguments)\n  retry()\n  return rval\n}})(fs.closeSync)\n\nfunction patch (fs) {\n  // Everything that references the open() function needs to be in here\n  polyfills(fs)\n  fs.gracefulify = patch\n  fs.FileReadStream = ReadStream;  // Legacy name.\n  fs.FileWriteStream = WriteStream;  // Legacy name.\n  fs.createReadStream = createReadStream\n  fs.createWriteStream = createWriteStream\n  var fs$readFile = fs.readFile\n  fs.readFile = readFile\n  function readFile (path, options, cb) {\n    if (typeof options === 'function')\n      cb = options, options = null\n\n    return go$readFile(path, options, cb)\n\n    function go$readFile (path, options, cb) {\n      return fs$readFile(path, options, function (err) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$readFile, [path, options, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  var fs$writeFile = fs.writeFile\n  fs.writeFile = writeFile\n  function writeFile (path, data, options, cb) {\n    if (typeof options === 'function')\n      cb = options, options = null\n\n    return go$writeFile(path, data, options, cb)\n\n    function go$writeFile (path, data, options, cb) {\n      return fs$writeFile(path, data, options, function (err) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$writeFile, [path, data, options, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  var fs$appendFile = fs.appendFile\n  if (fs$appendFile)\n    fs.appendFile = appendFile\n  function appendFile (path, data, options, cb) {\n    if (typeof options === 'function')\n      cb = options, options = null\n\n    return go$appendFile(path, data, options, cb)\n\n    function go$appendFile (path, data, options, cb) {\n      return fs$appendFile(path, data, options, function (err) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$appendFile, [path, data, options, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  var fs$readdir = fs.readdir\n  fs.readdir = readdir\n  function readdir (path, options, cb) {\n    var args = [path]\n    if (typeof options !== 'function') {\n      args.push(options)\n    } else {\n      cb = options\n    }\n    args.push(go$readdir$cb)\n\n    return go$readdir(args)\n\n    function go$readdir$cb (err, files) {\n      if (files && files.sort)\n        files.sort()\n\n      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n        enqueue([go$readdir, [args]])\n      else {\n        if (typeof cb === 'function')\n          cb.apply(this, arguments)\n        retry()\n      }\n    }\n  }\n\n  function go$readdir (args) {\n    return fs$readdir.apply(fs, args)\n  }\n\n  if (process.version.substr(0, 4) === 'v0.8') {\n    var legStreams = legacy(fs)\n    ReadStream = legStreams.ReadStream\n    WriteStream = legStreams.WriteStream\n  }\n\n  var fs$ReadStream = fs.ReadStream\n  ReadStream.prototype = Object.create(fs$ReadStream.prototype)\n  ReadStream.prototype.open = ReadStream$open\n\n  var fs$WriteStream = fs.WriteStream\n  WriteStream.prototype = Object.create(fs$WriteStream.prototype)\n  WriteStream.prototype.open = WriteStream$open\n\n  fs.ReadStream = ReadStream\n  fs.WriteStream = WriteStream\n\n  function ReadStream (path, options) {\n    if (this instanceof ReadStream)\n      return fs$ReadStream.apply(this, arguments), this\n    else\n      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)\n  }\n\n  function ReadStream$open () {\n    var that = this\n    open(that.path, that.flags, that.mode, function (err, fd) {\n      if (err) {\n        if (that.autoClose)\n          that.destroy()\n\n        that.emit('error', err)\n      } else {\n        that.fd = fd\n        that.emit('open', fd)\n        that.read()\n      }\n    })\n  }\n\n  function WriteStream (path, options) {\n    if (this instanceof WriteStream)\n      return fs$WriteStream.apply(this, arguments), this\n    else\n      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)\n  }\n\n  function WriteStream$open () {\n    var that = this\n    open(that.path, that.flags, that.mode, function (err, fd) {\n      if (err) {\n        that.destroy()\n        that.emit('error', err)\n      } else {\n        that.fd = fd\n        that.emit('open', fd)\n      }\n    })\n  }\n\n  function createReadStream (path, options) {\n    return new ReadStream(path, options)\n  }\n\n  function createWriteStream (path, options) {\n    return new WriteStream(path, options)\n  }\n\n  var fs$open = fs.open\n  fs.open = open\n  function open (path, flags, mode, cb) {\n    if (typeof mode === 'function')\n      cb = mode, mode = null\n\n    return go$open(path, flags, mode, cb)\n\n    function go$open (path, flags, mode, cb) {\n      return fs$open(path, flags, mode, function (err, fd) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$open, [path, flags, mode, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  return fs\n}\n\nfunction enqueue (elem) {\n  debug('ENQUEUE', elem[0].name, elem[1])\n  queue.push(elem)\n}\n\nfunction retry () {\n  var elem = queue.shift()\n  if (elem) {\n    debug('RETRY', elem[0].name, elem[1])\n    elem[0].apply(null, elem[1])\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/graceful-fs/graceful-fs.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/legacy-streams.js":
/*!****************************************************!*\
  !*** ./node_modules/graceful-fs/legacy-streams.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stream = __webpack_require__(/*! stream */ \"stream\").Stream\n\nmodule.exports = legacy\n\nfunction legacy (fs) {\n  return {\n    ReadStream: ReadStream,\n    WriteStream: WriteStream\n  }\n\n  function ReadStream (path, options) {\n    if (!(this instanceof ReadStream)) return new ReadStream(path, options);\n\n    Stream.call(this);\n\n    var self = this;\n\n    this.path = path;\n    this.fd = null;\n    this.readable = true;\n    this.paused = false;\n\n    this.flags = 'r';\n    this.mode = 438; /*=0666*/\n    this.bufferSize = 64 * 1024;\n\n    options = options || {};\n\n    // Mixin options into this\n    var keys = Object.keys(options);\n    for (var index = 0, length = keys.length; index < length; index++) {\n      var key = keys[index];\n      this[key] = options[key];\n    }\n\n    if (this.encoding) this.setEncoding(this.encoding);\n\n    if (this.start !== undefined) {\n      if ('number' !== typeof this.start) {\n        throw TypeError('start must be a Number');\n      }\n      if (this.end === undefined) {\n        this.end = Infinity;\n      } else if ('number' !== typeof this.end) {\n        throw TypeError('end must be a Number');\n      }\n\n      if (this.start > this.end) {\n        throw new Error('start must be <= end');\n      }\n\n      this.pos = this.start;\n    }\n\n    if (this.fd !== null) {\n      process.nextTick(function() {\n        self._read();\n      });\n      return;\n    }\n\n    fs.open(this.path, this.flags, this.mode, function (err, fd) {\n      if (err) {\n        self.emit('error', err);\n        self.readable = false;\n        return;\n      }\n\n      self.fd = fd;\n      self.emit('open', fd);\n      self._read();\n    })\n  }\n\n  function WriteStream (path, options) {\n    if (!(this instanceof WriteStream)) return new WriteStream(path, options);\n\n    Stream.call(this);\n\n    this.path = path;\n    this.fd = null;\n    this.writable = true;\n\n    this.flags = 'w';\n    this.encoding = 'binary';\n    this.mode = 438; /*=0666*/\n    this.bytesWritten = 0;\n\n    options = options || {};\n\n    // Mixin options into this\n    var keys = Object.keys(options);\n    for (var index = 0, length = keys.length; index < length; index++) {\n      var key = keys[index];\n      this[key] = options[key];\n    }\n\n    if (this.start !== undefined) {\n      if ('number' !== typeof this.start) {\n        throw TypeError('start must be a Number');\n      }\n      if (this.start < 0) {\n        throw new Error('start must be >= zero');\n      }\n\n      this.pos = this.start;\n    }\n\n    this.busy = false;\n    this._queue = [];\n\n    if (this.fd === null) {\n      this._open = fs.open;\n      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);\n      this.flush();\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/graceful-fs/legacy-streams.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/polyfills.js":
/*!***********************************************!*\
  !*** ./node_modules/graceful-fs/polyfills.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! ./fs.js */ \"./node_modules/graceful-fs/fs.js\")\nvar constants = __webpack_require__(/*! constants */ \"constants\")\n\nvar origCwd = process.cwd\nvar cwd = null\n\nvar platform = process.env.GRACEFUL_FS_PLATFORM || process.platform\n\nprocess.cwd = function() {\n  if (!cwd)\n    cwd = origCwd.call(process)\n  return cwd\n}\ntry {\n  process.cwd()\n} catch (er) {}\n\nvar chdir = process.chdir\nprocess.chdir = function(d) {\n  cwd = null\n  chdir.call(process, d)\n}\n\nmodule.exports = patch\n\nfunction patch (fs) {\n  // (re-)implement some things that are known busted or missing.\n\n  // lchmod, broken prior to 0.6.2\n  // back-port the fix here.\n  if (constants.hasOwnProperty('O_SYMLINK') &&\n      process.version.match(/^v0\\.6\\.[0-2]|^v0\\.5\\./)) {\n    patchLchmod(fs)\n  }\n\n  // lutimes implementation, or no-op\n  if (!fs.lutimes) {\n    patchLutimes(fs)\n  }\n\n  // https://github.com/isaacs/node-graceful-fs/issues/4\n  // Chown should not fail on einval or eperm if non-root.\n  // It should not fail on enosys ever, as this just indicates\n  // that a fs doesn't support the intended operation.\n\n  fs.chown = chownFix(fs.chown)\n  fs.fchown = chownFix(fs.fchown)\n  fs.lchown = chownFix(fs.lchown)\n\n  fs.chmod = chmodFix(fs.chmod)\n  fs.fchmod = chmodFix(fs.fchmod)\n  fs.lchmod = chmodFix(fs.lchmod)\n\n  fs.chownSync = chownFixSync(fs.chownSync)\n  fs.fchownSync = chownFixSync(fs.fchownSync)\n  fs.lchownSync = chownFixSync(fs.lchownSync)\n\n  fs.chmodSync = chmodFixSync(fs.chmodSync)\n  fs.fchmodSync = chmodFixSync(fs.fchmodSync)\n  fs.lchmodSync = chmodFixSync(fs.lchmodSync)\n\n  fs.stat = statFix(fs.stat)\n  fs.fstat = statFix(fs.fstat)\n  fs.lstat = statFix(fs.lstat)\n\n  fs.statSync = statFixSync(fs.statSync)\n  fs.fstatSync = statFixSync(fs.fstatSync)\n  fs.lstatSync = statFixSync(fs.lstatSync)\n\n  // if lchmod/lchown do not exist, then make them no-ops\n  if (!fs.lchmod) {\n    fs.lchmod = function (path, mode, cb) {\n      if (cb) process.nextTick(cb)\n    }\n    fs.lchmodSync = function () {}\n  }\n  if (!fs.lchown) {\n    fs.lchown = function (path, uid, gid, cb) {\n      if (cb) process.nextTick(cb)\n    }\n    fs.lchownSync = function () {}\n  }\n\n  // on Windows, A/V software can lock the directory, causing this\n  // to fail with an EACCES or EPERM if the directory contains newly\n  // created files.  Try again on failure, for up to 60 seconds.\n\n  // Set the timeout this long because some Windows Anti-Virus, such as Parity\n  // bit9, may lock files for up to a minute, causing npm package install\n  // failures. Also, take care to yield the scheduler. Windows scheduling gives\n  // CPU to a busy looping process, which can cause the program causing the lock\n  // contention to be starved of CPU by node, so the contention doesn't resolve.\n  if (platform === \"win32\") {\n    fs.rename = (function (fs$rename) { return function (from, to, cb) {\n      var start = Date.now()\n      var backoff = 0;\n      fs$rename(from, to, function CB (er) {\n        if (er\n            && (er.code === \"EACCES\" || er.code === \"EPERM\")\n            && Date.now() - start < 60000) {\n          setTimeout(function() {\n            fs.stat(to, function (stater, st) {\n              if (stater && stater.code === \"ENOENT\")\n                fs$rename(from, to, CB);\n              else\n                cb(er)\n            })\n          }, backoff)\n          if (backoff < 100)\n            backoff += 10;\n          return;\n        }\n        if (cb) cb(er)\n      })\n    }})(fs.rename)\n  }\n\n  // if read() returns EAGAIN, then just try it again.\n  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {\n    var callback\n    if (callback_ && typeof callback_ === 'function') {\n      var eagCounter = 0\n      callback = function (er, _, __) {\n        if (er && er.code === 'EAGAIN' && eagCounter < 10) {\n          eagCounter ++\n          return fs$read.call(fs, fd, buffer, offset, length, position, callback)\n        }\n        callback_.apply(this, arguments)\n      }\n    }\n    return fs$read.call(fs, fd, buffer, offset, length, position, callback)\n  }})(fs.read)\n\n  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {\n    var eagCounter = 0\n    while (true) {\n      try {\n        return fs$readSync.call(fs, fd, buffer, offset, length, position)\n      } catch (er) {\n        if (er.code === 'EAGAIN' && eagCounter < 10) {\n          eagCounter ++\n          continue\n        }\n        throw er\n      }\n    }\n  }})(fs.readSync)\n}\n\nfunction patchLchmod (fs) {\n  fs.lchmod = function (path, mode, callback) {\n    fs.open( path\n           , constants.O_WRONLY | constants.O_SYMLINK\n           , mode\n           , function (err, fd) {\n      if (err) {\n        if (callback) callback(err)\n        return\n      }\n      // prefer to return the chmod error, if one occurs,\n      // but still try to close, and report closing errors if they occur.\n      fs.fchmod(fd, mode, function (err) {\n        fs.close(fd, function(err2) {\n          if (callback) callback(err || err2)\n        })\n      })\n    })\n  }\n\n  fs.lchmodSync = function (path, mode) {\n    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)\n\n    // prefer to return the chmod error, if one occurs,\n    // but still try to close, and report closing errors if they occur.\n    var threw = true\n    var ret\n    try {\n      ret = fs.fchmodSync(fd, mode)\n      threw = false\n    } finally {\n      if (threw) {\n        try {\n          fs.closeSync(fd)\n        } catch (er) {}\n      } else {\n        fs.closeSync(fd)\n      }\n    }\n    return ret\n  }\n}\n\nfunction patchLutimes (fs) {\n  if (constants.hasOwnProperty(\"O_SYMLINK\")) {\n    fs.lutimes = function (path, at, mt, cb) {\n      fs.open(path, constants.O_SYMLINK, function (er, fd) {\n        if (er) {\n          if (cb) cb(er)\n          return\n        }\n        fs.futimes(fd, at, mt, function (er) {\n          fs.close(fd, function (er2) {\n            if (cb) cb(er || er2)\n          })\n        })\n      })\n    }\n\n    fs.lutimesSync = function (path, at, mt) {\n      var fd = fs.openSync(path, constants.O_SYMLINK)\n      var ret\n      var threw = true\n      try {\n        ret = fs.futimesSync(fd, at, mt)\n        threw = false\n      } finally {\n        if (threw) {\n          try {\n            fs.closeSync(fd)\n          } catch (er) {}\n        } else {\n          fs.closeSync(fd)\n        }\n      }\n      return ret\n    }\n\n  } else {\n    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }\n    fs.lutimesSync = function () {}\n  }\n}\n\nfunction chmodFix (orig) {\n  if (!orig) return orig\n  return function (target, mode, cb) {\n    return orig.call(fs, target, mode, function (er) {\n      if (chownErOk(er)) er = null\n      if (cb) cb.apply(this, arguments)\n    })\n  }\n}\n\nfunction chmodFixSync (orig) {\n  if (!orig) return orig\n  return function (target, mode) {\n    try {\n      return orig.call(fs, target, mode)\n    } catch (er) {\n      if (!chownErOk(er)) throw er\n    }\n  }\n}\n\n\nfunction chownFix (orig) {\n  if (!orig) return orig\n  return function (target, uid, gid, cb) {\n    return orig.call(fs, target, uid, gid, function (er) {\n      if (chownErOk(er)) er = null\n      if (cb) cb.apply(this, arguments)\n    })\n  }\n}\n\nfunction chownFixSync (orig) {\n  if (!orig) return orig\n  return function (target, uid, gid) {\n    try {\n      return orig.call(fs, target, uid, gid)\n    } catch (er) {\n      if (!chownErOk(er)) throw er\n    }\n  }\n}\n\n\nfunction statFix (orig) {\n  if (!orig) return orig\n  // Older versions of Node erroneously returned signed integers for\n  // uid + gid.\n  return function (target, cb) {\n    return orig.call(fs, target, function (er, stats) {\n      if (!stats) return cb.apply(this, arguments)\n      if (stats.uid < 0) stats.uid += 0x100000000\n      if (stats.gid < 0) stats.gid += 0x100000000\n      if (cb) cb.apply(this, arguments)\n    })\n  }\n}\n\nfunction statFixSync (orig) {\n  if (!orig) return orig\n  // Older versions of Node erroneously returned signed integers for\n  // uid + gid.\n  return function (target) {\n    var stats = orig.call(fs, target)\n    if (stats.uid < 0) stats.uid += 0x100000000\n    if (stats.gid < 0) stats.gid += 0x100000000\n    return stats;\n  }\n}\n\n// ENOSYS means that the fs doesn't support the op. Just ignore\n// that, because it doesn't matter.\n//\n// if there's no getuid, or if getuid() is something other\n// than 0, and the error is EINVAL or EPERM, then just ignore\n// it.\n//\n// This specific case is a silent failure in cp, install, tar,\n// and most other unix tools that manage permissions.\n//\n// When running as root, or if other types of errors are\n// encountered, then it's strict.\nfunction chownErOk (er) {\n  if (!er)\n    return true\n\n  if (er.code === \"ENOSYS\")\n    return true\n\n  var nonroot = !process.getuid || process.getuid() !== 0\n  if (nonroot) {\n    if (er.code === \"EINVAL\" || er.code === \"EPERM\")\n      return true\n  }\n\n  return false\n}\n\n\n//# sourceURL=webpack:///./node_modules/graceful-fs/polyfills.js?");

/***/ }),

/***/ "./node_modules/imurmurhash/imurmurhash.js":
/*!*************************************************!*\
  !*** ./node_modules/imurmurhash/imurmurhash.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @preserve\n * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)\n *\n * @author <a href=\"mailto:jensyt@gmail.com\">Jens Taylor</a>\n * @see http://github.com/homebrewing/brauhaus-diff\n * @author <a href=\"mailto:gary.court@gmail.com\">Gary Court</a>\n * @see http://github.com/garycourt/murmurhash-js\n * @author <a href=\"mailto:aappleby@gmail.com\">Austin Appleby</a>\n * @see http://sites.google.com/site/murmurhash/\n */\n(function(){\n    var cache;\n\n    // Call this function without `new` to use the cached object (good for\n    // single-threaded environments), or with `new` to create a new object.\n    //\n    // @param {string} key A UTF-16 or ASCII string\n    // @param {number} seed An optional positive integer\n    // @return {object} A MurmurHash3 object for incremental hashing\n    function MurmurHash3(key, seed) {\n        var m = this instanceof MurmurHash3 ? this : cache;\n        m.reset(seed)\n        if (typeof key === 'string' && key.length > 0) {\n            m.hash(key);\n        }\n\n        if (m !== this) {\n            return m;\n        }\n    };\n\n    // Incrementally add a string to this hash\n    //\n    // @param {string} key A UTF-16 or ASCII string\n    // @return {object} this\n    MurmurHash3.prototype.hash = function(key) {\n        var h1, k1, i, top, len;\n\n        len = key.length;\n        this.len += len;\n\n        k1 = this.k1;\n        i = 0;\n        switch (this.rem) {\n            case 0: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) : 0;\n            case 1: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 8 : 0;\n            case 2: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 16 : 0;\n            case 3:\n                k1 ^= len > i ? (key.charCodeAt(i) & 0xff) << 24 : 0;\n                k1 ^= len > i ? (key.charCodeAt(i++) & 0xff00) >> 8 : 0;\n        }\n\n        this.rem = (len + this.rem) & 3; // & 3 is same as % 4\n        len -= this.rem;\n        if (len > 0) {\n            h1 = this.h1;\n            while (1) {\n                k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;\n                k1 = (k1 << 15) | (k1 >>> 17);\n                k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;\n\n                h1 ^= k1;\n                h1 = (h1 << 13) | (h1 >>> 19);\n                h1 = (h1 * 5 + 0xe6546b64) & 0xffffffff;\n\n                if (i >= len) {\n                    break;\n                }\n\n                k1 = ((key.charCodeAt(i++) & 0xffff)) ^\n                     ((key.charCodeAt(i++) & 0xffff) << 8) ^\n                     ((key.charCodeAt(i++) & 0xffff) << 16);\n                top = key.charCodeAt(i++);\n                k1 ^= ((top & 0xff) << 24) ^\n                      ((top & 0xff00) >> 8);\n            }\n\n            k1 = 0;\n            switch (this.rem) {\n                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xffff) << 16;\n                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xffff) << 8;\n                case 1: k1 ^= (key.charCodeAt(i) & 0xffff);\n            }\n\n            this.h1 = h1;\n        }\n\n        this.k1 = k1;\n        return this;\n    };\n\n    // Get the result of this hash\n    //\n    // @return {number} The 32-bit hash\n    MurmurHash3.prototype.result = function() {\n        var k1, h1;\n        \n        k1 = this.k1;\n        h1 = this.h1;\n\n        if (k1 > 0) {\n            k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;\n            k1 = (k1 << 15) | (k1 >>> 17);\n            k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;\n            h1 ^= k1;\n        }\n\n        h1 ^= this.len;\n\n        h1 ^= h1 >>> 16;\n        h1 = (h1 * 0xca6b + (h1 & 0xffff) * 0x85eb0000) & 0xffffffff;\n        h1 ^= h1 >>> 13;\n        h1 = (h1 * 0xae35 + (h1 & 0xffff) * 0xc2b20000) & 0xffffffff;\n        h1 ^= h1 >>> 16;\n\n        return h1 >>> 0;\n    };\n\n    // Reset the hash object for reuse\n    //\n    // @param {number} seed An optional positive integer\n    MurmurHash3.prototype.reset = function(seed) {\n        this.h1 = typeof seed === 'number' ? seed : 0;\n        this.rem = this.k1 = this.len = 0;\n        return this;\n    };\n\n    // A cached object to use. This can be safely used if you're in a single-\n    // threaded environment, otherwise you need to create new hashes to use.\n    cache = new MurmurHash3();\n\n    if (true) {\n        module.exports = MurmurHash3;\n    } else {}\n}());\n\n\n//# sourceURL=webpack:///./node_modules/imurmurhash/imurmurhash.js?");

/***/ }),

/***/ "./node_modules/ini/ini.js":
/*!*********************************!*\
  !*** ./node_modules/ini/ini.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.parse = exports.decode = decode\n\nexports.stringify = exports.encode = encode\n\nexports.safe = safe\nexports.unsafe = unsafe\n\nvar eol = typeof process !== 'undefined' &&\n  process.platform === 'win32' ? '\\r\\n' : '\\n'\n\nfunction encode (obj, opt) {\n  var children = []\n  var out = ''\n\n  if (typeof opt === 'string') {\n    opt = {\n      section: opt,\n      whitespace: false\n    }\n  } else {\n    opt = opt || {}\n    opt.whitespace = opt.whitespace === true\n  }\n\n  var separator = opt.whitespace ? ' = ' : '='\n\n  Object.keys(obj).forEach(function (k, _, __) {\n    var val = obj[k]\n    if (val && Array.isArray(val)) {\n      val.forEach(function (item) {\n        out += safe(k + '[]') + separator + safe(item) + '\\n'\n      })\n    } else if (val && typeof val === 'object') {\n      children.push(k)\n    } else {\n      out += safe(k) + separator + safe(val) + eol\n    }\n  })\n\n  if (opt.section && out.length) {\n    out = '[' + safe(opt.section) + ']' + eol + out\n  }\n\n  children.forEach(function (k, _, __) {\n    var nk = dotSplit(k).join('\\\\.')\n    var section = (opt.section ? opt.section + '.' : '') + nk\n    var child = encode(obj[k], {\n      section: section,\n      whitespace: opt.whitespace\n    })\n    if (out.length && child.length) {\n      out += eol\n    }\n    out += child\n  })\n\n  return out\n}\n\nfunction dotSplit (str) {\n  return str.replace(/\\1/g, '\\u0002LITERAL\\\\1LITERAL\\u0002')\n    .replace(/\\\\\\./g, '\\u0001')\n    .split(/\\./).map(function (part) {\n      return part.replace(/\\1/g, '\\\\.')\n      .replace(/\\2LITERAL\\\\1LITERAL\\2/g, '\\u0001')\n    })\n}\n\nfunction decode (str) {\n  var out = {}\n  var p = out\n  var section = null\n  //          section     |key      = value\n  var re = /^\\[([^\\]]*)\\]$|^([^=]+)(=(.*))?$/i\n  var lines = str.split(/[\\r\\n]+/g)\n\n  lines.forEach(function (line, _, __) {\n    if (!line || line.match(/^\\s*[;#]/)) return\n    var match = line.match(re)\n    if (!match) return\n    if (match[1] !== undefined) {\n      section = unsafe(match[1])\n      p = out[section] = out[section] || {}\n      return\n    }\n    var key = unsafe(match[2])\n    var value = match[3] ? unsafe(match[4]) : true\n    switch (value) {\n      case 'true':\n      case 'false':\n      case 'null': value = JSON.parse(value)\n    }\n\n    // Convert keys with '[]' suffix to an array\n    if (key.length > 2 && key.slice(-2) === '[]') {\n      key = key.substring(0, key.length - 2)\n      if (!p[key]) {\n        p[key] = []\n      } else if (!Array.isArray(p[key])) {\n        p[key] = [p[key]]\n      }\n    }\n\n    // safeguard against resetting a previously defined\n    // array by accidentally forgetting the brackets\n    if (Array.isArray(p[key])) {\n      p[key].push(value)\n    } else {\n      p[key] = value\n    }\n  })\n\n  // {a:{y:1},\"a.b\":{x:2}} --> {a:{y:1,b:{x:2}}}\n  // use a filter to return the keys that have to be deleted.\n  Object.keys(out).filter(function (k, _, __) {\n    if (!out[k] ||\n      typeof out[k] !== 'object' ||\n      Array.isArray(out[k])) {\n      return false\n    }\n    // see if the parent section is also an object.\n    // if so, add it to that, and mark this one for deletion\n    var parts = dotSplit(k)\n    var p = out\n    var l = parts.pop()\n    var nl = l.replace(/\\\\\\./g, '.')\n    parts.forEach(function (part, _, __) {\n      if (!p[part] || typeof p[part] !== 'object') p[part] = {}\n      p = p[part]\n    })\n    if (p === out && nl === l) {\n      return false\n    }\n    p[nl] = out[k]\n    return true\n  }).forEach(function (del, _, __) {\n    delete out[del]\n  })\n\n  return out\n}\n\nfunction isQuoted (val) {\n  return (val.charAt(0) === '\"' && val.slice(-1) === '\"') ||\n    (val.charAt(0) === \"'\" && val.slice(-1) === \"'\")\n}\n\nfunction safe (val) {\n  return (typeof val !== 'string' ||\n    val.match(/[=\\r\\n]/) ||\n    val.match(/^\\[/) ||\n    (val.length > 1 &&\n     isQuoted(val)) ||\n    val !== val.trim())\n      ? JSON.stringify(val)\n      : val.replace(/;/g, '\\\\;').replace(/#/g, '\\\\#')\n}\n\nfunction unsafe (val, doUnesc) {\n  val = (val || '').trim()\n  if (isQuoted(val)) {\n    // remove the single quotes before calling JSON.parse\n    if (val.charAt(0) === \"'\") {\n      val = val.substr(1, val.length - 2)\n    }\n    try { val = JSON.parse(val) } catch (_) {}\n  } else {\n    // walk the val to find the first not-escaped ; character\n    var esc = false\n    var unesc = ''\n    for (var i = 0, l = val.length; i < l; i++) {\n      var c = val.charAt(i)\n      if (esc) {\n        if ('\\\\;#'.indexOf(c) !== -1) {\n          unesc += c\n        } else {\n          unesc += '\\\\' + c\n        }\n        esc = false\n      } else if (';#'.indexOf(c) !== -1) {\n        break\n      } else if (c === '\\\\') {\n        esc = true\n      } else {\n        unesc += c\n      }\n    }\n    if (esc) {\n      unesc += '\\\\'\n    }\n    return unesc.trim()\n  }\n  return val\n}\n\n\n//# sourceURL=webpack:///./node_modules/ini/ini.js?");

/***/ }),

/***/ "./node_modules/node-localstorage/LocalStorage.js":
/*!********************************************************!*\
  !*** ./node_modules/node-localstorage/LocalStorage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Generated by CoffeeScript 1.10.0\n(function() {\n  var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, events, fs, path, writeSync,\n    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },\n    hasProp = {}.hasOwnProperty;\n\n  path = __webpack_require__(/*! path */ \"path\");\n\n  fs = __webpack_require__(/*! fs */ \"fs\");\n\n  events = __webpack_require__(/*! events */ \"events\");\n\n  writeSync = __webpack_require__(/*! write-file-atomic */ \"./node_modules/write-file-atomic/index.js\").sync;\n\n  KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---';\n\n  _emptyDirectory = function(target) {\n    var i, len, p, ref, results;\n    ref = fs.readdirSync(target);\n    results = [];\n    for (i = 0, len = ref.length; i < len; i++) {\n      p = ref[i];\n      results.push(_rm(path.join(target, p)));\n    }\n    return results;\n  };\n\n  _rm = function(target) {\n    if (fs.statSync(target).isDirectory()) {\n      _emptyDirectory(target);\n      return fs.rmdirSync(target);\n    } else {\n      return fs.unlinkSync(target);\n    }\n  };\n\n  _escapeKey = function(key) {\n    var newKey;\n    if (key === '') {\n      newKey = KEY_FOR_EMPTY_STRING;\n    } else {\n      newKey = key.toString();\n    }\n    return newKey;\n  };\n\n  QUOTA_EXCEEDED_ERR = (function(superClass) {\n    extend(QUOTA_EXCEEDED_ERR, superClass);\n\n    function QUOTA_EXCEEDED_ERR(message) {\n      this.message = message != null ? message : 'Unknown error.';\n      if (Error.captureStackTrace != null) {\n        Error.captureStackTrace(this, this.constructor);\n      }\n      this.name = this.constructor.name;\n    }\n\n    QUOTA_EXCEEDED_ERR.prototype.toString = function() {\n      return this.name + \": \" + this.message;\n    };\n\n    return QUOTA_EXCEEDED_ERR;\n\n  })(Error);\n\n  StorageEvent = (function() {\n    function StorageEvent(key1, oldValue1, newValue1, url, storageArea) {\n      this.key = key1;\n      this.oldValue = oldValue1;\n      this.newValue = newValue1;\n      this.url = url;\n      this.storageArea = storageArea != null ? storageArea : 'localStorage';\n    }\n\n    return StorageEvent;\n\n  })();\n\n  MetaKey = (function() {\n    function MetaKey(key1, index1) {\n      this.key = key1;\n      this.index = index1;\n      if (!(this instanceof MetaKey)) {\n        return new MetaKey(this.key, this.index);\n      }\n    }\n\n    return MetaKey;\n\n  })();\n\n  createMap = function() {\n    var Map;\n    Map = function() {};\n    Map.prototype = Object.create(null);\n    return new Map();\n  };\n\n  LocalStorage = (function(superClass) {\n    var instanceMap;\n\n    extend(LocalStorage, superClass);\n\n    instanceMap = {};\n\n    function LocalStorage(_location, quota) {\n      this._location = _location;\n      this.quota = quota != null ? quota : 5 * 1024 * 1024;\n      if (!(this instanceof LocalStorage)) {\n        return new LocalStorage(this._location, this.quota);\n      }\n      this._location = path.resolve(this._location);\n      if (instanceMap[this._location] != null) {\n        return instanceMap[this._location];\n      }\n      this.length = 0;\n      this._bytesInUse = 0;\n      this._keys = [];\n      this._metaKeyMap = createMap();\n      this._eventUrl = \"pid:\" + process.pid;\n      this._init();\n      this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;\n      instanceMap[this._location] = this;\n      return instanceMap[this._location];\n    }\n\n    LocalStorage.prototype._init = function() {\n      var _MetaKey, _decodedKey, _keys, e, error, error1, i, index, k, len, stat;\n      try {\n        stat = fs.statSync(this._location);\n        if ((stat != null) && !stat.isDirectory()) {\n          throw new Error(\"A file exists at the location '\" + this._location + \"' when trying to create/open localStorage\");\n        }\n        this._bytesInUse = 0;\n        this.length = 0;\n        _keys = fs.readdirSync(this._location);\n        for (index = i = 0, len = _keys.length; i < len; index = ++i) {\n          k = _keys[index];\n          _decodedKey = decodeURIComponent(k);\n          this._keys.push(_decodedKey);\n          _MetaKey = new MetaKey(k, index);\n          this._metaKeyMap[_decodedKey] = _MetaKey;\n          stat = this._getStat(k);\n          if ((stat != null ? stat.size : void 0) != null) {\n            _MetaKey.size = stat.size;\n            this._bytesInUse += stat.size;\n          }\n        }\n        this.length = _keys.length;\n      } catch (error) {\n        e = error;\n        if (e.code !== \"ENOENT\") {\n          throw e;\n        }\n        try {\n          fs.mkdirSync(this._location);\n        } catch (error1) {\n          e = error1;\n          if (e.code !== \"EEXIST\") {\n            throw e;\n          }\n        }\n      }\n    };\n\n    LocalStorage.prototype.setItem = function(key, value) {\n      var encodedKey, evnt, existsBeforeSet, filename, hasListeners, metaKey, oldLength, oldValue, valueString, valueStringLength;\n      hasListeners = events.EventEmitter.listenerCount(this, 'storage');\n      oldValue = null;\n      if (hasListeners) {\n        oldValue = this.getItem(key);\n      }\n      key = _escapeKey(key);\n      encodedKey = encodeURIComponent(key);\n      filename = path.join(this._location, encodedKey);\n      valueString = value.toString();\n      valueStringLength = valueString.length;\n      metaKey = this._metaKeyMap[key];\n      existsBeforeSet = !!metaKey;\n      if (existsBeforeSet) {\n        oldLength = metaKey.size;\n      } else {\n        oldLength = 0;\n      }\n      if (this._bytesInUse - oldLength + valueStringLength > this.quota) {\n        throw new QUOTA_EXCEEDED_ERR();\n      }\n      writeSync(filename, valueString, 'utf8');\n      if (!existsBeforeSet) {\n        metaKey = new MetaKey(encodedKey, (this._keys.push(key)) - 1);\n        metaKey.size = valueStringLength;\n        this._metaKeyMap[key] = metaKey;\n        this.length += 1;\n        this._bytesInUse += valueStringLength;\n      }\n      if (hasListeners) {\n        evnt = new StorageEvent(key, oldValue, value, this._eventUrl);\n        return this.emit('storage', evnt);\n      }\n    };\n\n    LocalStorage.prototype.getItem = function(key) {\n      var filename, metaKey;\n      key = _escapeKey(key);\n      metaKey = this._metaKeyMap[key];\n      if (!!metaKey) {\n        filename = path.join(this._location, metaKey.key);\n        return fs.readFileSync(filename, 'utf8');\n      } else {\n        return null;\n      }\n    };\n\n    LocalStorage.prototype._getStat = function(key) {\n      var error, filename;\n      key = _escapeKey(key);\n      filename = path.join(this._location, encodeURIComponent(key));\n      try {\n        return fs.statSync(filename);\n      } catch (error) {\n        return null;\n      }\n    };\n\n    LocalStorage.prototype.removeItem = function(key) {\n      var evnt, filename, hasListeners, k, meta, metaKey, oldValue, ref, v;\n      key = _escapeKey(key);\n      metaKey = this._metaKeyMap[key];\n      if (!!metaKey) {\n        hasListeners = events.EventEmitter.listenerCount(this, 'storage');\n        oldValue = null;\n        if (hasListeners) {\n          oldValue = this.getItem(key);\n        }\n        delete this._metaKeyMap[key];\n        this.length -= 1;\n        this._bytesInUse -= metaKey.size;\n        filename = path.join(this._location, metaKey.key);\n        this._keys.splice(metaKey.index, 1);\n        ref = this._metaKeyMap;\n        for (k in ref) {\n          v = ref[k];\n          meta = this._metaKeyMap[k];\n          if (meta.index > metaKey.index) {\n            meta.index -= 1;\n          }\n        }\n        _rm(filename);\n        if (hasListeners) {\n          evnt = new StorageEvent(key, oldValue, null, this._eventUrl);\n          return this.emit('storage', evnt);\n        }\n      }\n    };\n\n    LocalStorage.prototype.key = function(n) {\n      return this._keys[n];\n    };\n\n    LocalStorage.prototype.clear = function() {\n      var evnt;\n      _emptyDirectory(this._location);\n      this._metaKeyMap = createMap();\n      this._keys = [];\n      this.length = 0;\n      this._bytesInUse = 0;\n      if (events.EventEmitter.listenerCount(this, 'storage')) {\n        evnt = new StorageEvent(null, null, null, this._eventUrl);\n        return this.emit('storage', evnt);\n      }\n    };\n\n    LocalStorage.prototype._getBytesInUse = function() {\n      return this._bytesInUse;\n    };\n\n    LocalStorage.prototype._deleteLocation = function() {\n      delete instanceMap[this._location];\n      _rm(this._location);\n      this._metaKeyMap = {};\n      this._keys = [];\n      this.length = 0;\n      return this._bytesInUse = 0;\n    };\n\n    return LocalStorage;\n\n  })(events.EventEmitter);\n\n  JSONStorage = (function(superClass) {\n    extend(JSONStorage, superClass);\n\n    function JSONStorage() {\n      return JSONStorage.__super__.constructor.apply(this, arguments);\n    }\n\n    JSONStorage.prototype.setItem = function(key, value) {\n      var newValue;\n      newValue = JSON.stringify(value);\n      return JSONStorage.__super__.setItem.call(this, key, newValue);\n    };\n\n    JSONStorage.prototype.getItem = function(key) {\n      return JSON.parse(JSONStorage.__super__.getItem.call(this, key));\n    };\n\n    return JSONStorage;\n\n  })(LocalStorage);\n\n  exports.LocalStorage = LocalStorage;\n\n  exports.JSONStorage = JSONStorage;\n\n  exports.QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;\n\n}).call(this);\n\n\n//# sourceURL=webpack:///./node_modules/node-localstorage/LocalStorage.js?");

/***/ }),

/***/ "./node_modules/parse-ms/index.js":
/*!****************************************!*\
  !*** ./node_modules/parse-ms/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = function (ms) {\n\tif (typeof ms !== 'number') {\n\t\tthrow new TypeError('Expected a number');\n\t}\n\n\tvar roundTowardZero = ms > 0 ? Math.floor : Math.ceil;\n\n\treturn {\n\t\tdays: roundTowardZero(ms / 86400000),\n\t\thours: roundTowardZero(ms / 3600000) % 24,\n\t\tminutes: roundTowardZero(ms / 60000) % 60,\n\t\tseconds: roundTowardZero(ms / 1000) % 60,\n\t\tmilliseconds: roundTowardZero(ms) % 1000\n\t};\n};\n\n\n//# sourceURL=webpack:///./node_modules/parse-ms/index.js?");

/***/ }),

/***/ "./node_modules/pretty-ms/index.js":
/*!*****************************************!*\
  !*** ./node_modules/pretty-ms/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst parseMs = __webpack_require__(/*! parse-ms */ \"./node_modules/parse-ms/index.js\");\n\nconst plur = (word, count) => count === 1 ? word : word + 's';\n\nmodule.exports = (ms, opts) => {\n\tif (!Number.isFinite(ms)) {\n\t\tthrow new TypeError('Expected a finite number');\n\t}\n\n\topts = opts || {};\n\n\tif (ms < 1000) {\n\t\tconst msDecimalDigits = typeof opts.msDecimalDigits === 'number' ? opts.msDecimalDigits : 0;\n\t\treturn (msDecimalDigits ? ms.toFixed(msDecimalDigits) : Math.ceil(ms)) + (opts.verbose ? ' ' + plur('millisecond', Math.ceil(ms)) : 'ms');\n\t}\n\n\tconst ret = [];\n\n\tconst add = (val, long, short, valStr) => {\n\t\tif (val === 0) {\n\t\t\treturn;\n\t\t}\n\n\t\tconst postfix = opts.verbose ? ' ' + plur(long, val) : short;\n\n\t\tret.push((valStr || val) + postfix);\n\t};\n\n\tconst parsed = parseMs(ms);\n\n\tadd(Math.trunc(parsed.days / 365), 'year', 'y');\n\tadd(parsed.days % 365, 'day', 'd');\n\tadd(parsed.hours, 'hour', 'h');\n\tadd(parsed.minutes, 'minute', 'm');\n\n\tif (opts.compact) {\n\t\tadd(parsed.seconds, 'second', 's');\n\t\treturn '~' + ret[0];\n\t}\n\n\tconst sec = ms / 1000 % 60;\n\tconst secDecimalDigits = typeof opts.secDecimalDigits === 'number' ? opts.secDecimalDigits : 1;\n\tconst secFixed = sec.toFixed(secDecimalDigits);\n\tconst secStr = opts.keepDecimalsOnWholeSeconds ? secFixed : secFixed.replace(/\\.0+$/, '');\n\tadd(sec, 'second', 's', secStr);\n\n\treturn ret.join(' ');\n};\n\n\n//# sourceURL=webpack:///./node_modules/pretty-ms/index.js?");

/***/ }),

/***/ "./node_modules/slide/lib/async-map.js":
/*!*********************************************!*\
  !*** ./node_modules/slide/lib/async-map.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/*\nusage:\n\n// do something to a list of things\nasyncMap(myListOfStuff, function (thing, cb) { doSomething(thing.foo, cb) }, cb)\n// do more than one thing to each item\nasyncMap(list, fooFn, barFn, cb)\n\n*/\n\nmodule.exports = asyncMap\n\nfunction asyncMap () {\n  var steps = Array.prototype.slice.call(arguments)\n    , list = steps.shift() || []\n    , cb_ = steps.pop()\n  if (typeof cb_ !== \"function\") throw new Error(\n    \"No callback provided to asyncMap\")\n  if (!list) return cb_(null, [])\n  if (!Array.isArray(list)) list = [list]\n  var n = steps.length\n    , data = [] // 2d array\n    , errState = null\n    , l = list.length\n    , a = l * n\n  if (!a) return cb_(null, [])\n  function cb (er) {\n    if (er && !errState) errState = er\n\n    var argLen = arguments.length\n    for (var i = 1; i < argLen; i ++) if (arguments[i] !== undefined) {\n      data[i - 1] = (data[i - 1] || []).concat(arguments[i])\n    }\n    // see if any new things have been added.\n    if (list.length > l) {\n      var newList = list.slice(l)\n      a += (list.length - l) * n\n      l = list.length\n      process.nextTick(function () {\n        newList.forEach(function (ar) {\n          steps.forEach(function (fn) { fn(ar, cb) })\n        })\n      })\n    }\n\n    if (--a === 0) cb_.apply(null, [errState].concat(data))\n  }\n  // expect the supplied cb function to be called\n  // \"n\" times for each thing in the array.\n  list.forEach(function (ar) {\n    steps.forEach(function (fn) { fn(ar, cb) })\n  })\n}\n\n\n//# sourceURL=webpack:///./node_modules/slide/lib/async-map.js?");

/***/ }),

/***/ "./node_modules/slide/lib/bind-actor.js":
/*!**********************************************!*\
  !*** ./node_modules/slide/lib/bind-actor.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = bindActor\nfunction bindActor () {\n  var args = \n        Array.prototype.slice.call\n        (arguments) // jswtf.\n    , obj = null\n    , fn\n  if (typeof args[0] === \"object\") {\n    obj = args.shift()\n    fn = args.shift()\n    if (typeof fn === \"string\")\n      fn = obj[ fn ]\n  } else fn = args.shift()\n  return function (cb) {\n    fn.apply(obj, args.concat(cb)) }\n}\n\n\n//# sourceURL=webpack:///./node_modules/slide/lib/bind-actor.js?");

/***/ }),

/***/ "./node_modules/slide/lib/chain.js":
/*!*****************************************!*\
  !*** ./node_modules/slide/lib/chain.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = chain\nvar bindActor = __webpack_require__(/*! ./bind-actor.js */ \"./node_modules/slide/lib/bind-actor.js\")\nchain.first = {} ; chain.last = {}\nfunction chain (things, cb) {\n  var res = []\n  ;(function LOOP (i, len) {\n    if (i >= len) return cb(null,res)\n    if (Array.isArray(things[i]))\n      things[i] = bindActor.apply(null,\n        things[i].map(function(i){\n          return (i===chain.first) ? res[0]\n           : (i===chain.last)\n             ? res[res.length - 1] : i }))\n    if (!things[i]) return LOOP(i + 1, len)\n    things[i](function (er, data) {\n      if (er) return cb(er, res)\n      if (data !== undefined) res = res.concat(data)\n      LOOP(i + 1, len)\n    })\n  })(0, things.length) }\n\n\n//# sourceURL=webpack:///./node_modules/slide/lib/chain.js?");

/***/ }),

/***/ "./node_modules/slide/lib/slide.js":
/*!*****************************************!*\
  !*** ./node_modules/slide/lib/slide.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.asyncMap = __webpack_require__(/*! ./async-map */ \"./node_modules/slide/lib/async-map.js\")\nexports.bindActor = __webpack_require__(/*! ./bind-actor */ \"./node_modules/slide/lib/bind-actor.js\")\nexports.chain = __webpack_require__(/*! ./chain */ \"./node_modules/slide/lib/chain.js\")\n\n\n//# sourceURL=webpack:///./node_modules/slide/lib/slide.js?");

/***/ }),

/***/ "./node_modules/write-file-atomic/index.js":
/*!*************************************************!*\
  !*** ./node_modules/write-file-atomic/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__filename) {\nmodule.exports = writeFile\nmodule.exports.sync = writeFileSync\nmodule.exports._getTmpname = getTmpname // for testing\n\nvar fs = __webpack_require__(/*! graceful-fs */ \"./node_modules/graceful-fs/graceful-fs.js\")\nvar chain = __webpack_require__(/*! slide */ \"./node_modules/slide/lib/slide.js\").chain\nvar MurmurHash3 = __webpack_require__(/*! imurmurhash */ \"./node_modules/imurmurhash/imurmurhash.js\")\nvar extend = Object.assign || __webpack_require__(/*! util */ \"util\")._extend\n\nvar invocations = 0\nfunction getTmpname (filename) {\n  return filename + '.' +\n    MurmurHash3(__filename)\n      .hash(String(process.pid))\n      .hash(String(++invocations))\n      .result()\n}\n\nfunction writeFile (filename, data, options, callback) {\n  if (options instanceof Function) {\n    callback = options\n    options = null\n  }\n  if (!options) options = {}\n  fs.realpath(filename, function (_, realname) {\n    _writeFile(realname || filename, data, options, callback)\n  })\n}\nfunction _writeFile (filename, data, options, callback) {\n  var tmpfile = getTmpname(filename)\n\n  if (options.mode && options.chown) {\n    return thenWriteFile()\n  } else {\n    // Either mode or chown is not explicitly set\n    // Default behavior is to copy it from original file\n    return fs.stat(filename, function (err, stats) {\n      if (err || !stats) return thenWriteFile()\n\n      options = extend({}, options)\n      if (!options.mode) {\n        options.mode = stats.mode\n      }\n      if (!options.chown && process.getuid) {\n        options.chown = { uid: stats.uid, gid: stats.gid }\n      }\n      return thenWriteFile()\n    })\n  }\n\n  function thenWriteFile () {\n    chain([\n      [writeFileAsync, tmpfile, data, options.mode, options.encoding || 'utf8'],\n      options.chown && [fs, fs.chown, tmpfile, options.chown.uid, options.chown.gid],\n      options.mode && [fs, fs.chmod, tmpfile, options.mode],\n      [fs, fs.rename, tmpfile, filename]\n    ], function (err) {\n      err ? fs.unlink(tmpfile, function () { callback(err) })\n        : callback()\n    })\n  }\n\n  // doing this instead of `fs.writeFile` in order to get the ability to\n  // call `fsync`.\n  function writeFileAsync (file, data, mode, encoding, cb) {\n    fs.open(file, 'w', options.mode, function (err, fd) {\n      if (err) return cb(err)\n      if (Buffer.isBuffer(data)) {\n        return fs.write(fd, data, 0, data.length, 0, syncAndClose)\n      } else if (data != null) {\n        return fs.write(fd, String(data), 0, String(encoding), syncAndClose)\n      } else {\n        return syncAndClose()\n      }\n      function syncAndClose (err) {\n        if (err) return cb(err)\n        fs.fsync(fd, function (err) {\n          if (err) return cb(err)\n          fs.close(fd, cb)\n        })\n      }\n    })\n  }\n}\n\nfunction writeFileSync (filename, data, options) {\n  if (!options) options = {}\n  try {\n    filename = fs.realpathSync(filename)\n  } catch (ex) {\n    // it's ok, it'll happen on a not yet existing file\n  }\n  var tmpfile = getTmpname(filename)\n\n  try {\n    if (!options.mode || !options.chown) {\n      // Either mode or chown is not explicitly set\n      // Default behavior is to copy it from original file\n      try {\n        var stats = fs.statSync(filename)\n        options = extend({}, options)\n        if (!options.mode) {\n          options.mode = stats.mode\n        }\n        if (!options.chown && process.getuid) {\n          options.chown = { uid: stats.uid, gid: stats.gid }\n        }\n      } catch (ex) {\n        // ignore stat errors\n      }\n    }\n\n    var fd = fs.openSync(tmpfile, 'w', options.mode)\n    if (Buffer.isBuffer(data)) {\n      fs.writeSync(fd, data, 0, data.length, 0)\n    } else if (data != null) {\n      fs.writeSync(fd, String(data), 0, String(options.encoding || 'utf8'))\n    }\n    fs.fsyncSync(fd)\n    fs.closeSync(fd)\n    if (options.chown) fs.chownSync(tmpfile, options.chown.uid, options.chown.gid)\n    if (options.mode) fs.chmodSync(tmpfile, options.mode)\n    fs.renameSync(tmpfile, filename)\n  } catch (err) {\n    try { fs.unlinkSync(tmpfile) } catch (e) {}\n    throw err\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/index.js\"))\n\n//# sourceURL=webpack:///./node_modules/write-file-atomic/index.js?");

/***/ }),

/***/ "./src/bin/helpers/ipcLayer.js":
/*!*************************************!*\
  !*** ./src/bin/helpers/ipcLayer.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst RegisterToWrapperEmitter = GameServerEmitter => {\n  let server;\n\n  GameServerEmitter.on('spawned', function (GameServer) {\n    // Socket layer to listen for incoming mesages.\n    server = _net2.default.createServer(ClientSock => {\n      // Callback for the attach command to recieve data\n      const SendServerData = ServerData => {\n        ClientSock.write(ServerData); // Write data to Client\n      };\n\n      const WaitToClose = () => {\n        ClientSock.write(\"Shutdow succesfull\");\n        ClientSock.end(); // tell client were closing\n      };\n      // listen to server exit event\n      const ServerExitCallback = () => {\n        console.log('Shutting down connected client');\n        ClientSock.end(); // tell client were closing\n      };\n\n      GameServerEmitter.on('exit', ServerExitCallback);\n      // console.log('DSM Client ');\n      ClientSock.on('end', () => {\n        // console.log('DSM Socket Closed');\n        GameServerEmitter.removeListener('data', SendServerData); // Remove the listener since the client is not listening\n        GameServerEmitter.removeListener('exit', ServerExitCallback); // Remove the listener since the client is not listening\n        GameServerEmitter.removeListener('status', SendServerData);\n        GameServerEmitter.removeListener('shutdown', WaitToClose);\n      });\n      ClientSock.on('data', function (data) {\n        if (data.toString() === 'ATTACH') {\n          // attach command has been run, start sending data to the client\n          GameServerEmitter.on('data', SendServerData);\n        } else if (data.toString() === '/status') {\n          console.log('STATUS COMMAND');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('status', SendServerData);\n        } else if (data.toString() === '/stop') {\n          console.log('SHUTDOWN COMMAND');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('shutdown', WaitToClose);\n        } else {\n          console.log('NORMAL');\n          GameServer.write(data + '\\n');\n          GameServerEmitter.on('data', SendServerData);\n        }\n      });\n    });\n    server.on('error', e => {\n      console.log(e);\n    });\n\n    server.listen(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm.sock')), () => {\n      GameServer.write('DSM IPC Initialized.\\n');\n    });\n  });\n\n  GameServerEmitter.on('exit', () => {\n    console.log('CLOSING IPC SERVER');\n    server.close(); // will not close exsiting connections\n  });\n};\n\nexports.default = { RegisterToWrapperEmitter };\n\n//# sourceURL=webpack:///./src/bin/helpers/ipcLayer.js?");

/***/ }),

/***/ "./src/bin/helpers/startGameServer.js":
/*!********************************************!*\
  !*** ./src/bin/helpers/startGameServer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// npm install --global --production windows-build-tools\nvar pty = __webpack_require__(/*! node-pty */ \"node-pty\"); // dont use import, webpack is set to not touch node-pty as it will mess with it.\n\nconst startGameServer = GameServerEmitter => {\n  const GameServer = pty.spawn(_path2.default.resolve(globals.InstallationDir() + '/avorion/bin/AvorionServer.exe'), ['--galaxy-name', 'avorion_galaxy', '--admin', 'avorion_admin'], { cwd: process.cwd() + '\\\\avorion' });\n\n  GameServerEmitter.emit('spawned', GameServer);\n\n  GameServer.write('DSM IPC Initializing...\\n');\n\n  GameServer.on('error', err => {\n    console.log(err);\n  });\n  // Main STDOUT\n  GameServer.on('data', function (data) {\n    // Remove unwanted char and log\n    const cleanedData = data.replace(/(\\u001b|\\[0K|\\[\\?25l|\\[\\?25h|\\[\\?)/gm, \"\");\n    console.log(cleanedData); //\\u001b[0K\\u001b[?25l\n\n    GameServerEmitter.emit('data', data);\n\n    if (data.includes('Memory used by scripts')) {\n      const dataArr = data.split('\\n');\n      const newData = dataArr.slice(0, dataArr.findIndex(line => line.includes('profiling')));\n      GameServerEmitter.emit('status', newData.join('\\n'));\n      return;\n    }\n\n    if (data.includes('Server startup complete')) {\n      GameServerEmitter.emit('startup', GameServer);\n      return;\n    }\n\n    if (data.includes('DSM: Player Log Off')) {\n      // DSM: Player Log Off, name:  Dirtyredz  index:  1\n      const name = cleanedData.substring(cleanedData.indexOf(\"  \") + 1, cleanedData.indexOf(\"  index:\"));\n      const index = cleanedData.substring(cleanedData.lastIndexOf(\"  \") + 1, cleanedData.length);\n      GameServerEmitter.emit('logOff', name, index);\n      return;\n    }\n\n    if (data.includes('DSM: Player Log On')) {\n      const name = cleanedData.substring(cleanedData.indexOf(\"  \") + 1, cleanedData.indexOf(\"  index:\"));\n      const index = cleanedData.substring(cleanedData.lastIndexOf(\"  \") + 1, cleanedData.length);\n      GameServerEmitter.emit('logOn', name, index);\n      return;\n    }\n\n    if (data.includes('Server shutdown')) {\n      GameServerEmitter.emit('shutdown', GameServer);\n      return;\n    }\n  });\n\n  GameServer.on('error', error => {\n    console.log('Server Error:', error);\n  });\n\n  // emitted when process exits or when /stop is used\n  GameServer.on('exit', code => {\n    console.log('exit', code);\n    // code == 0, server was shutdown\n    // GameServerEmitter.emit('');\n    if (code === 0) {\n      GameServerEmitter.emit('exit');\n    } else if (code === 1) {\n      // code == 1, server process crashed\n      GameServerEmitter.emit('exit');\n      GameServerEmitter.emit('crash', GameServer);\n    }\n  });\n};\nexports.default = startGameServer;\n\n//# sourceURL=webpack:///./src/bin/helpers/startGameServer.js?");

/***/ }),

/***/ "./src/bin/helpers/statusChecker.js":
/*!******************************************!*\
  !*** ./src/bin/helpers/statusChecker.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _prettyMs = __webpack_require__(/*! pretty-ms */ \"./node_modules/pretty-ms/index.js\");\n\nvar _prettyMs2 = _interopRequireDefault(_prettyMs);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar pty = __webpack_require__(/*! node-pty */ \"node-pty\");\nlet RespondedToStatus = true;\nlet FailureTimer = false;\nlet IntervalTimer = false;\n\nconst RegisterToWrapperEmitter = GameServerEmitter => {\n  GameServerEmitter.on('startup', function (GameServer) {\n    GameServer.write('/echo DSM: Initilized Status Checker, checking every ' + (0, _prettyMs2.default)(_MainConfig2.default.STATUS_INTERVAL_MS) + '\\n');\n    IntervalTimer = setInterval(() => {\n      console.log('INTERVAL');\n      RespondedToStatus = false;\n      GameServer.write('/status\\n');\n      FailureTimer = setTimeout(() => {\n        console.log('/FAILED TO GET STATUS');\n        GameServerEmitter.emit('crash', GameServer);\n        // Emit crash event, which will kill GameServer\n      }, 1000 * 30); // 30 seconds\n    }, _MainConfig2.default.STATUS_INTERVAL_MS);\n  });\n\n  GameServerEmitter.on('status', function (data) {\n    RespondedToStatus = true;\n    if (FailureTimer !== false) clearTimeout(FailureTimer);\n    FailureTimer = false;\n  });\n\n  GameServerEmitter.on('exit', () => {\n    RespondedToStatus = true;\n    if (FailureTimer !== false) clearTimeout(FailureTimer);\n    FailureTimer = false;\n\n    if (IntervalTimer !== false) clearTimeout(IntervalTimer);\n    IntervalTimer = false;\n  });\n};\n\nexports.default = { RegisterToWrapperEmitter };\n\n//# sourceURL=webpack:///./src/bin/helpers/statusChecker.js?");

/***/ }),

/***/ "./src/bin/serverWrapper.js":
/*!**********************************!*\
  !*** ./src/bin/serverWrapper.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _ipcLayer = __webpack_require__(/*! ./helpers/ipcLayer */ \"./src/bin/helpers/ipcLayer.js\");\n\nvar _ipcLayer2 = _interopRequireDefault(_ipcLayer);\n\nvar _statusChecker = __webpack_require__(/*! ./helpers/statusChecker */ \"./src/bin/helpers/statusChecker.js\");\n\nvar _statusChecker2 = _interopRequireDefault(_statusChecker);\n\nvar _startGameServer = __webpack_require__(/*! ./helpers/startGameServer */ \"./src/bin/helpers/startGameServer.js\");\n\nvar _startGameServer2 = _interopRequireDefault(_startGameServer);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar events = __webpack_require__(/*! events */ \"events\").EventEmitter;\nvar GameServerEmitter = new events.EventEmitter();\n\n_ipcLayer2.default.RegisterToWrapperEmitter(GameServerEmitter);\n\n_statusChecker2.default.RegisterToWrapperEmitter(GameServerEmitter);\n\n\n// We then pipe the main process stdin (which is a readable stream)\n// into the child process stdin (which is a writable stream).\n\nconsole.log('-----Dirty Server Manager-----');\nconsole.log('DSM: Server Wrapper Initilized on pid: ' + process.pid);\n\n_localStorage2.default.setItem('WrapperPid', process.pid);\n\n// var lockFile = require('lockfile')\n// // opts is optional, and defaults to {}\n// lockFile.lock(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), {}, function (er) {\n//   // if the er happens, then it failed to acquire a lock.\n// })\n\n// Start the game\n(0, _startGameServer2.default)(GameServerEmitter);\n\nGameServerEmitter.on('crash', GameServer => {\n  console.log('Detected server crash, waiting 7 seconds');\n  GameServer.write('/save\\n'); // send save command just incase\n  setTimeout(() => {\n    GameServer.destroy(); // will trigger a GameServer Exit event\n    setTimeout(() => {\n      console.log('processing events...');\n      (0, _startGameServer2.default)(GameServerEmitter);\n      console.log('Restarted');\n    }, 7000); // 7 seconds\n  }, 7000);\n});\n\nGameServerEmitter.on('shutdown', GameServer => {\n  GameServer.destroy(); // server shutdown, send exit event to wrapper\n});\n\nprocess.on('beforeExit', () => {\n  console.log('DSM: Closing wrapper GoodBye!');\n  _localStorage2.default.clear();\n  process.exit(0);\n});\n\n//# sourceURL=webpack:///./src/bin/serverWrapper.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"./node_modules/ini/ini.js\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst config = _ini2.default.parse(_fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8'));\n\nif (!config.STEAM_DIR) config.STEAM_DIR = \"steam\"; // default steam\n\nif (!config.STATUS_INTERVAL_MS) config.STATUS_INTERVAL_MS = 1000 * 60 * 5; // default 5 minutes\nconfig.STATUS_INTERVAL_MS = parseInt(config.STATUS_INTERVAL_MS, 10);\n\nexports.default = config;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet localStorage;\nif (typeof localStorage === \"undefined\" || localStorage === null) {\n  var LocalStorage = __webpack_require__(/*! node-localstorage */ \"./node_modules/node-localstorage/LocalStorage.js\").LocalStorage;\n\n  localStorage = new LocalStorage(_path2.default.resolve(globals.InstallationDir() + '/dsm/.storage'));\n}\n\nexports.default = localStorage;\n\n// length\n// setItem(key, value)\n// getItem(key)\n// removeItem(key)\n// key(n)\n// clear()\n\n\n// let MyLocalStorage = {}\n// export const setItem = MyLocalStorage.setItem = (key, value) => {\n//   localStorage.setItem(key, value);\n// }\n\n//# sourceURL=webpack:///./src/lib/localStorage.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"constants\");\n\n//# sourceURL=webpack:///external_%22constants%22?");

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

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

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

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });