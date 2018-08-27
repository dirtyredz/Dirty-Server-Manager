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

/***/ "./node_modules/Commander/index.js":
/*!*****************************************!*\
  !*** ./node_modules/Commander/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Module dependencies.\n */\n\nvar EventEmitter = __webpack_require__(/*! events */ \"events\").EventEmitter;\nvar spawn = __webpack_require__(/*! child_process */ \"child_process\").spawn;\nvar path = __webpack_require__(/*! path */ \"path\");\nvar dirname = path.dirname;\nvar basename = path.basename;\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\n/**\n * Inherit `Command` from `EventEmitter.prototype`.\n */\n\n__webpack_require__(/*! util */ \"util\").inherits(Command, EventEmitter);\n\n/**\n * Expose the root command.\n */\n\nexports = module.exports = new Command();\n\n/**\n * Expose `Command`.\n */\n\nexports.Command = Command;\n\n/**\n * Expose `Option`.\n */\n\nexports.Option = Option;\n\n/**\n * Initialize a new `Option` with the given `flags` and `description`.\n *\n * @param {String} flags\n * @param {String} description\n * @api public\n */\n\nfunction Option(flags, description) {\n  this.flags = flags;\n  this.required = flags.indexOf('<') >= 0;\n  this.optional = flags.indexOf('[') >= 0;\n  this.bool = flags.indexOf('-no-') === -1;\n  flags = flags.split(/[ ,|]+/);\n  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();\n  this.long = flags.shift();\n  this.description = description || '';\n}\n\n/**\n * Return option name.\n *\n * @return {String}\n * @api private\n */\n\nOption.prototype.name = function() {\n  return this.long\n    .replace('--', '')\n    .replace('no-', '');\n};\n\n/**\n * Return option name, in a camelcase format that can be used\n * as a object attribute key.\n *\n * @return {String}\n * @api private\n */\n\nOption.prototype.attributeName = function() {\n  return camelcase(this.name());\n};\n\n/**\n * Check if `arg` matches the short or long flag.\n *\n * @param {String} arg\n * @return {Boolean}\n * @api private\n */\n\nOption.prototype.is = function(arg) {\n  return this.short === arg || this.long === arg;\n};\n\n/**\n * Initialize a new `Command`.\n *\n * @param {String} name\n * @api public\n */\n\nfunction Command(name) {\n  this.commands = [];\n  this.options = [];\n  this._execs = {};\n  this._allowUnknownOption = false;\n  this._args = [];\n  this._name = name || '';\n}\n\n/**\n * Add command `name`.\n *\n * The `.action()` callback is invoked when the\n * command `name` is specified via __ARGV__,\n * and the remaining arguments are applied to the\n * function for access.\n *\n * When the `name` is \"*\" an un-matched command\n * will be passed as the first arg, followed by\n * the rest of __ARGV__ remaining.\n *\n * Examples:\n *\n *      program\n *        .version('0.0.1')\n *        .option('-C, --chdir <path>', 'change the working directory')\n *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')\n *        .option('-T, --no-tests', 'ignore test hook')\n *\n *      program\n *        .command('setup')\n *        .description('run remote setup commands')\n *        .action(function() {\n *          console.log('setup');\n *        });\n *\n *      program\n *        .command('exec <cmd>')\n *        .description('run the given remote command')\n *        .action(function(cmd) {\n *          console.log('exec \"%s\"', cmd);\n *        });\n *\n *      program\n *        .command('teardown <dir> [otherDirs...]')\n *        .description('run teardown commands')\n *        .action(function(dir, otherDirs) {\n *          console.log('dir \"%s\"', dir);\n *          if (otherDirs) {\n *            otherDirs.forEach(function (oDir) {\n *              console.log('dir \"%s\"', oDir);\n *            });\n *          }\n *        });\n *\n *      program\n *        .command('*')\n *        .description('deploy the given env')\n *        .action(function(env) {\n *          console.log('deploying \"%s\"', env);\n *        });\n *\n *      program.parse(process.argv);\n  *\n * @param {String} name\n * @param {String} [desc] for git-style sub-commands\n * @return {Command} the new command\n * @api public\n */\n\nCommand.prototype.command = function(name, desc, opts) {\n  if (typeof desc === 'object' && desc !== null) {\n    opts = desc;\n    desc = null;\n  }\n  opts = opts || {};\n  var args = name.split(/ +/);\n  var cmd = new Command(args.shift());\n\n  if (desc) {\n    cmd.description(desc);\n    this.executables = true;\n    this._execs[cmd._name] = true;\n    if (opts.isDefault) this.defaultExecutable = cmd._name;\n  }\n  cmd._noHelp = !!opts.noHelp;\n  this.commands.push(cmd);\n  cmd.parseExpectedArgs(args);\n  cmd.parent = this;\n\n  if (desc) return this;\n  return cmd;\n};\n\n/**\n * Define argument syntax for the top-level command.\n *\n * @api public\n */\n\nCommand.prototype.arguments = function(desc) {\n  return this.parseExpectedArgs(desc.split(/ +/));\n};\n\n/**\n * Add an implicit `help [cmd]` subcommand\n * which invokes `--help` for the given command.\n *\n * @api private\n */\n\nCommand.prototype.addImplicitHelpCommand = function() {\n  this.command('help [cmd]', 'display help for [cmd]');\n};\n\n/**\n * Parse expected `args`.\n *\n * For example `[\"[type]\"]` becomes `[{ required: false, name: 'type' }]`.\n *\n * @param {Array} args\n * @return {Command} for chaining\n * @api public\n */\n\nCommand.prototype.parseExpectedArgs = function(args) {\n  if (!args.length) return;\n  var self = this;\n  args.forEach(function(arg) {\n    var argDetails = {\n      required: false,\n      name: '',\n      variadic: false\n    };\n\n    switch (arg[0]) {\n      case '<':\n        argDetails.required = true;\n        argDetails.name = arg.slice(1, -1);\n        break;\n      case '[':\n        argDetails.name = arg.slice(1, -1);\n        break;\n    }\n\n    if (argDetails.name.length > 3 && argDetails.name.slice(-3) === '...') {\n      argDetails.variadic = true;\n      argDetails.name = argDetails.name.slice(0, -3);\n    }\n    if (argDetails.name) {\n      self._args.push(argDetails);\n    }\n  });\n  return this;\n};\n\n/**\n * Register callback `fn` for the command.\n *\n * Examples:\n *\n *      program\n *        .command('help')\n *        .description('display verbose help')\n *        .action(function() {\n *           // output help here\n *        });\n *\n * @param {Function} fn\n * @return {Command} for chaining\n * @api public\n */\n\nCommand.prototype.action = function(fn) {\n  var self = this;\n  var listener = function(args, unknown) {\n    // Parse any so-far unknown options\n    args = args || [];\n    unknown = unknown || [];\n\n    var parsed = self.parseOptions(unknown);\n\n    // Output help if necessary\n    outputHelpIfNecessary(self, parsed.unknown);\n\n    // If there are still any unknown options, then we simply\n    // die, unless someone asked for help, in which case we give it\n    // to them, and then we die.\n    if (parsed.unknown.length > 0) {\n      self.unknownOption(parsed.unknown[0]);\n    }\n\n    // Leftover arguments need to be pushed back. Fixes issue #56\n    if (parsed.args.length) args = parsed.args.concat(args);\n\n    self._args.forEach(function(arg, i) {\n      if (arg.required && args[i] == null) {\n        self.missingArgument(arg.name);\n      } else if (arg.variadic) {\n        if (i !== self._args.length - 1) {\n          self.variadicArgNotLast(arg.name);\n        }\n\n        args[i] = args.splice(i);\n      }\n    });\n\n    // Always append ourselves to the end of the arguments,\n    // to make sure we match the number of arguments the user\n    // expects\n    if (self._args.length) {\n      args[self._args.length] = self;\n    } else {\n      args.push(self);\n    }\n\n    fn.apply(self, args);\n  };\n  var parent = this.parent || this;\n  var name = parent === this ? '*' : this._name;\n  parent.on('command:' + name, listener);\n  if (this._alias) parent.on('command:' + this._alias, listener);\n  return this;\n};\n\n/**\n * Define option with `flags`, `description` and optional\n * coercion `fn`.\n *\n * The `flags` string should contain both the short and long flags,\n * separated by comma, a pipe or space. The following are all valid\n * all will output this way when `--help` is used.\n *\n *    \"-p, --pepper\"\n *    \"-p|--pepper\"\n *    \"-p --pepper\"\n *\n * Examples:\n *\n *     // simple boolean defaulting to false\n *     program.option('-p, --pepper', 'add pepper');\n *\n *     --pepper\n *     program.pepper\n *     // => Boolean\n *\n *     // simple boolean defaulting to true\n *     program.option('-C, --no-cheese', 'remove cheese');\n *\n *     program.cheese\n *     // => true\n *\n *     --no-cheese\n *     program.cheese\n *     // => false\n *\n *     // required argument\n *     program.option('-C, --chdir <path>', 'change the working directory');\n *\n *     --chdir /tmp\n *     program.chdir\n *     // => \"/tmp\"\n *\n *     // optional argument\n *     program.option('-c, --cheese [type]', 'add cheese [marble]');\n *\n * @param {String} flags\n * @param {String} description\n * @param {Function|*} [fn] or default\n * @param {*} [defaultValue]\n * @return {Command} for chaining\n * @api public\n */\n\nCommand.prototype.option = function(flags, description, fn, defaultValue) {\n  var self = this,\n    option = new Option(flags, description),\n    oname = option.name(),\n    name = option.attributeName();\n\n  // default as 3rd arg\n  if (typeof fn !== 'function') {\n    if (fn instanceof RegExp) {\n      var regex = fn;\n      fn = function(val, def) {\n        var m = regex.exec(val);\n        return m ? m[0] : def;\n      };\n    } else {\n      defaultValue = fn;\n      fn = null;\n    }\n  }\n\n  // preassign default value only for --no-*, [optional], or <required>\n  if (!option.bool || option.optional || option.required) {\n    // when --no-* we make sure default is true\n    if (!option.bool) defaultValue = true;\n    // preassign only if we have a default\n    if (defaultValue !== undefined) {\n      self[name] = defaultValue;\n      option.defaultValue = defaultValue;\n    }\n  }\n\n  // register the option\n  this.options.push(option);\n\n  // when it's passed assign the value\n  // and conditionally invoke the callback\n  this.on('option:' + oname, function(val) {\n    // coercion\n    if (val !== null && fn) {\n      val = fn(val, self[name] === undefined ? defaultValue : self[name]);\n    }\n\n    // unassigned or bool\n    if (typeof self[name] === 'boolean' || typeof self[name] === 'undefined') {\n      // if no value, bool true, and we have a default, then use it!\n      if (val == null) {\n        self[name] = option.bool\n          ? defaultValue || true\n          : false;\n      } else {\n        self[name] = val;\n      }\n    } else if (val !== null) {\n      // reassign\n      self[name] = val;\n    }\n  });\n\n  return this;\n};\n\n/**\n * Allow unknown options on the command line.\n *\n * @param {Boolean} arg if `true` or omitted, no error will be thrown\n * for unknown options.\n * @api public\n */\nCommand.prototype.allowUnknownOption = function(arg) {\n  this._allowUnknownOption = arguments.length === 0 || arg;\n  return this;\n};\n\n/**\n * Parse `argv`, settings options and invoking commands when defined.\n *\n * @param {Array} argv\n * @return {Command} for chaining\n * @api public\n */\n\nCommand.prototype.parse = function(argv) {\n  // implicit help\n  if (this.executables) this.addImplicitHelpCommand();\n\n  // store raw args\n  this.rawArgs = argv;\n\n  // guess name\n  this._name = this._name || basename(argv[1], '.js');\n\n  // github-style sub-commands with no sub-command\n  if (this.executables && argv.length < 3 && !this.defaultExecutable) {\n    // this user needs help\n    argv.push('--help');\n  }\n\n  // process argv\n  var parsed = this.parseOptions(this.normalize(argv.slice(2)));\n  var args = this.args = parsed.args;\n\n  var result = this.parseArgs(this.args, parsed.unknown);\n\n  // executable sub-commands\n  var name = result.args[0];\n\n  var aliasCommand = null;\n  // check alias of sub commands\n  if (name) {\n    aliasCommand = this.commands.filter(function(command) {\n      return command.alias() === name;\n    })[0];\n  }\n\n  if (this._execs[name] && typeof this._execs[name] !== 'function') {\n    return this.executeSubCommand(argv, args, parsed.unknown);\n  } else if (aliasCommand) {\n    // is alias of a subCommand\n    args[0] = aliasCommand._name;\n    return this.executeSubCommand(argv, args, parsed.unknown);\n  } else if (this.defaultExecutable) {\n    // use the default subcommand\n    args.unshift(this.defaultExecutable);\n    return this.executeSubCommand(argv, args, parsed.unknown);\n  }\n\n  return result;\n};\n\n/**\n * Execute a sub-command executable.\n *\n * @param {Array} argv\n * @param {Array} args\n * @param {Array} unknown\n * @api private\n */\n\nCommand.prototype.executeSubCommand = function(argv, args, unknown) {\n  args = args.concat(unknown);\n\n  if (!args.length) this.help();\n  if (args[0] === 'help' && args.length === 1) this.help();\n\n  // <cmd> --help\n  if (args[0] === 'help') {\n    args[0] = args[1];\n    args[1] = '--help';\n  }\n\n  // executable\n  var f = argv[1];\n  // name of the subcommand, link `pm-install`\n  var bin = basename(f, '.js') + '-' + args[0];\n\n  // In case of globally installed, get the base dir where executable\n  //  subcommand file should be located at\n  var baseDir,\n    link = fs.lstatSync(f).isSymbolicLink() ? fs.readlinkSync(f) : f;\n\n  // when symbolink is relative path\n  if (link !== f && link.charAt(0) !== '/') {\n    link = path.join(dirname(f), link);\n  }\n  baseDir = dirname(link);\n\n  // prefer local `./<bin>` to bin in the $PATH\n  var localBin = path.join(baseDir, bin);\n\n  // whether bin file is a js script with explicit `.js` extension\n  var isExplicitJS = false;\n  if (exists(localBin + '.js')) {\n    bin = localBin + '.js';\n    isExplicitJS = true;\n  } else if (exists(localBin)) {\n    bin = localBin;\n  }\n\n  args = args.slice(1);\n\n  var proc;\n  if (process.platform !== 'win32') {\n    if (isExplicitJS) {\n      args.unshift(bin);\n      // add executable arguments to spawn\n      args = (process.execArgv || []).concat(args);\n\n      proc = spawn(process.argv[0], args, { stdio: 'inherit', customFds: [0, 1, 2] });\n    } else {\n      proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });\n    }\n  } else {\n    args.unshift(bin);\n    proc = spawn(process.execPath, args, { stdio: 'inherit' });\n  }\n\n  var signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'];\n  signals.forEach(function(signal) {\n    process.on(signal, function() {\n      if (proc.killed === false && proc.exitCode === null) {\n        proc.kill(signal);\n      }\n    });\n  });\n  proc.on('close', process.exit.bind(process));\n  proc.on('error', function(err) {\n    if (err.code === 'ENOENT') {\n      console.error('\\n  %s(1) does not exist, try --help\\n', bin);\n    } else if (err.code === 'EACCES') {\n      console.error('\\n  %s(1) not executable. try chmod or run with root\\n', bin);\n    }\n    process.exit(1);\n  });\n\n  // Store the reference to the child process\n  this.runningCommand = proc;\n};\n\n/**\n * Normalize `args`, splitting joined short flags. For example\n * the arg \"-abc\" is equivalent to \"-a -b -c\".\n * This also normalizes equal sign and splits \"--abc=def\" into \"--abc def\".\n *\n * @param {Array} args\n * @return {Array}\n * @api private\n */\n\nCommand.prototype.normalize = function(args) {\n  var ret = [],\n    arg,\n    lastOpt,\n    index;\n\n  for (var i = 0, len = args.length; i < len; ++i) {\n    arg = args[i];\n    if (i > 0) {\n      lastOpt = this.optionFor(args[i - 1]);\n    }\n\n    if (arg === '--') {\n      // Honor option terminator\n      ret = ret.concat(args.slice(i));\n      break;\n    } else if (lastOpt && lastOpt.required) {\n      ret.push(arg);\n    } else if (arg.length > 1 && arg[0] === '-' && arg[1] !== '-') {\n      arg.slice(1).split('').forEach(function(c) {\n        ret.push('-' + c);\n      });\n    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {\n      ret.push(arg.slice(0, index), arg.slice(index + 1));\n    } else {\n      ret.push(arg);\n    }\n  }\n\n  return ret;\n};\n\n/**\n * Parse command `args`.\n *\n * When listener(s) are available those\n * callbacks are invoked, otherwise the \"*\"\n * event is emitted and those actions are invoked.\n *\n * @param {Array} args\n * @return {Command} for chaining\n * @api private\n */\n\nCommand.prototype.parseArgs = function(args, unknown) {\n  var name;\n\n  if (args.length) {\n    name = args[0];\n    if (this.listeners('command:' + name).length) {\n      this.emit('command:' + args.shift(), args, unknown);\n    } else {\n      this.emit('command:*', args);\n    }\n  } else {\n    outputHelpIfNecessary(this, unknown);\n\n    // If there were no args and we have unknown options,\n    // then they are extraneous and we need to error.\n    if (unknown.length > 0) {\n      this.unknownOption(unknown[0]);\n    }\n  }\n\n  return this;\n};\n\n/**\n * Return an option matching `arg` if any.\n *\n * @param {String} arg\n * @return {Option}\n * @api private\n */\n\nCommand.prototype.optionFor = function(arg) {\n  for (var i = 0, len = this.options.length; i < len; ++i) {\n    if (this.options[i].is(arg)) {\n      return this.options[i];\n    }\n  }\n};\n\n/**\n * Parse options from `argv` returning `argv`\n * void of these options.\n *\n * @param {Array} argv\n * @return {Array}\n * @api public\n */\n\nCommand.prototype.parseOptions = function(argv) {\n  var args = [],\n    len = argv.length,\n    literal,\n    option,\n    arg;\n\n  var unknownOptions = [];\n\n  // parse options\n  for (var i = 0; i < len; ++i) {\n    arg = argv[i];\n\n    // literal args after --\n    if (literal) {\n      args.push(arg);\n      continue;\n    }\n\n    if (arg === '--') {\n      literal = true;\n      continue;\n    }\n\n    // find matching Option\n    option = this.optionFor(arg);\n\n    // option is defined\n    if (option) {\n      // requires arg\n      if (option.required) {\n        arg = argv[++i];\n        if (arg == null) return this.optionMissingArgument(option);\n        this.emit('option:' + option.name(), arg);\n      // optional arg\n      } else if (option.optional) {\n        arg = argv[i + 1];\n        if (arg == null || (arg[0] === '-' && arg !== '-')) {\n          arg = null;\n        } else {\n          ++i;\n        }\n        this.emit('option:' + option.name(), arg);\n      // bool\n      } else {\n        this.emit('option:' + option.name());\n      }\n      continue;\n    }\n\n    // looks like an option\n    if (arg.length > 1 && arg[0] === '-') {\n      unknownOptions.push(arg);\n\n      // If the next argument looks like it might be\n      // an argument for this option, we pass it on.\n      // If it isn't, then it'll simply be ignored\n      if ((i + 1) < argv.length && argv[i + 1][0] !== '-') {\n        unknownOptions.push(argv[++i]);\n      }\n      continue;\n    }\n\n    // arg\n    args.push(arg);\n  }\n\n  return { args: args, unknown: unknownOptions };\n};\n\n/**\n * Return an object containing options as key-value pairs\n *\n * @return {Object}\n * @api public\n */\nCommand.prototype.opts = function() {\n  var result = {},\n    len = this.options.length;\n\n  for (var i = 0; i < len; i++) {\n    var key = this.options[i].attributeName();\n    result[key] = key === this._versionOptionName ? this._version : this[key];\n  }\n  return result;\n};\n\n/**\n * Argument `name` is missing.\n *\n * @param {String} name\n * @api private\n */\n\nCommand.prototype.missingArgument = function(name) {\n  console.error();\n  console.error(\"  error: missing required argument `%s'\", name);\n  console.error();\n  process.exit(1);\n};\n\n/**\n * `Option` is missing an argument, but received `flag` or nothing.\n *\n * @param {String} option\n * @param {String} flag\n * @api private\n */\n\nCommand.prototype.optionMissingArgument = function(option, flag) {\n  console.error();\n  if (flag) {\n    console.error(\"  error: option `%s' argument missing, got `%s'\", option.flags, flag);\n  } else {\n    console.error(\"  error: option `%s' argument missing\", option.flags);\n  }\n  console.error();\n  process.exit(1);\n};\n\n/**\n * Unknown option `flag`.\n *\n * @param {String} flag\n * @api private\n */\n\nCommand.prototype.unknownOption = function(flag) {\n  if (this._allowUnknownOption) return;\n  console.error();\n  console.error(\"  error: unknown option `%s'\", flag);\n  console.error();\n  process.exit(1);\n};\n\n/**\n * Variadic argument with `name` is not the last argument as required.\n *\n * @param {String} name\n * @api private\n */\n\nCommand.prototype.variadicArgNotLast = function(name) {\n  console.error();\n  console.error(\"  error: variadic arguments must be last `%s'\", name);\n  console.error();\n  process.exit(1);\n};\n\n/**\n * Set the program version to `str`.\n *\n * This method auto-registers the \"-V, --version\" flag\n * which will print the version number when passed.\n *\n * @param {String} str\n * @param {String} [flags]\n * @return {Command} for chaining\n * @api public\n */\n\nCommand.prototype.version = function(str, flags) {\n  if (arguments.length === 0) return this._version;\n  this._version = str;\n  flags = flags || '-V, --version';\n  var versionOption = new Option(flags, 'output the version number');\n  this._versionOptionName = versionOption.long.substr(2) || 'version';\n  this.options.push(versionOption);\n  this.on('option:' + this._versionOptionName, function() {\n    process.stdout.write(str + '\\n');\n    process.exit(0);\n  });\n  return this;\n};\n\n/**\n * Set the description to `str`.\n *\n * @param {String} str\n * @param {Object} argsDescription\n * @return {String|Command}\n * @api public\n */\n\nCommand.prototype.description = function(str, argsDescription) {\n  if (arguments.length === 0) return this._description;\n  this._description = str;\n  this._argsDescription = argsDescription;\n  return this;\n};\n\n/**\n * Set an alias for the command\n *\n * @param {String} alias\n * @return {String|Command}\n * @api public\n */\n\nCommand.prototype.alias = function(alias) {\n  var command = this;\n  if (this.commands.length !== 0) {\n    command = this.commands[this.commands.length - 1];\n  }\n\n  if (arguments.length === 0) return command._alias;\n\n  if (alias === command._name) throw new Error('Command alias can\\'t be the same as its name');\n\n  command._alias = alias;\n  return this;\n};\n\n/**\n * Set / get the command usage `str`.\n *\n * @param {String} str\n * @return {String|Command}\n * @api public\n */\n\nCommand.prototype.usage = function(str) {\n  var args = this._args.map(function(arg) {\n    return humanReadableArgName(arg);\n  });\n\n  var usage = '[options]' +\n    (this.commands.length ? ' [command]' : '') +\n    (this._args.length ? ' ' + args.join(' ') : '');\n\n  if (arguments.length === 0) return this._usage || usage;\n  this._usage = str;\n\n  return this;\n};\n\n/**\n * Get or set the name of the command\n *\n * @param {String} str\n * @return {String|Command}\n * @api public\n */\n\nCommand.prototype.name = function(str) {\n  if (arguments.length === 0) return this._name;\n  this._name = str;\n  return this;\n};\n\n/**\n * Return prepared commands.\n *\n * @return {Array}\n * @api private\n */\n\nCommand.prototype.prepareCommands = function() {\n  return this.commands.filter(function(cmd) {\n    return !cmd._noHelp;\n  }).map(function(cmd) {\n    var args = cmd._args.map(function(arg) {\n      return humanReadableArgName(arg);\n    }).join(' ');\n\n    return [\n      cmd._name +\n        (cmd._alias ? '|' + cmd._alias : '') +\n        (cmd.options.length ? ' [options]' : '') +\n        (args ? ' ' + args : ''),\n      cmd._description\n    ];\n  });\n};\n\n/**\n * Return the largest command length.\n *\n * @return {Number}\n * @api private\n */\n\nCommand.prototype.largestCommandLength = function() {\n  var commands = this.prepareCommands();\n  return commands.reduce(function(max, command) {\n    return Math.max(max, command[0].length);\n  }, 0);\n};\n\n/**\n * Return the largest option length.\n *\n * @return {Number}\n * @api private\n */\n\nCommand.prototype.largestOptionLength = function() {\n  var options = [].slice.call(this.options);\n  options.push({\n    flags: '-h, --help'\n  });\n  return options.reduce(function(max, option) {\n    return Math.max(max, option.flags.length);\n  }, 0);\n};\n\n/**\n * Return the largest arg length.\n *\n * @return {Number}\n * @api private\n */\n\nCommand.prototype.largestArgLength = function() {\n  return this._args.reduce(function(max, arg) {\n    return Math.max(max, arg.name.length);\n  }, 0);\n};\n\n/**\n * Return the pad width.\n *\n * @return {Number}\n * @api private\n */\n\nCommand.prototype.padWidth = function() {\n  var width = this.largestOptionLength();\n  if (this._argsDescription && this._args.length) {\n    if (this.largestArgLength() > width) {\n      width = this.largestArgLength();\n    }\n  }\n\n  if (this.commands && this.commands.length) {\n    if (this.largestCommandLength() > width) {\n      width = this.largestCommandLength();\n    }\n  }\n\n  return width;\n};\n\n/**\n * Return help for options.\n *\n * @return {String}\n * @api private\n */\n\nCommand.prototype.optionHelp = function() {\n  var width = this.padWidth();\n\n  // Append the help information\n  return this.options.map(function(option) {\n    return pad(option.flags, width) + '  ' + option.description +\n      ((option.bool && option.defaultValue !== undefined) ? ' (default: ' + option.defaultValue + ')' : '');\n  }).concat([pad('-h, --help', width) + '  ' + 'output usage information'])\n    .join('\\n');\n};\n\n/**\n * Return command help documentation.\n *\n * @return {String}\n * @api private\n */\n\nCommand.prototype.commandHelp = function() {\n  if (!this.commands.length) return '';\n\n  var commands = this.prepareCommands();\n  var width = this.padWidth();\n\n  return [\n    '  Commands:',\n    '',\n    commands.map(function(cmd) {\n      var desc = cmd[1] ? '  ' + cmd[1] : '';\n      return (desc ? pad(cmd[0], width) : cmd[0]) + desc;\n    }).join('\\n').replace(/^/gm, '    '),\n    ''\n  ].join('\\n');\n};\n\n/**\n * Return program help documentation.\n *\n * @return {String}\n * @api private\n */\n\nCommand.prototype.helpInformation = function() {\n  var desc = [];\n  if (this._description) {\n    desc = [\n      '  ' + this._description,\n      ''\n    ];\n\n    var argsDescription = this._argsDescription;\n    if (argsDescription && this._args.length) {\n      var width = this.padWidth();\n      desc.push('  Arguments:');\n      desc.push('');\n      this._args.forEach(function(arg) {\n        desc.push('    ' + pad(arg.name, width) + '  ' + argsDescription[arg.name]);\n      });\n      desc.push('');\n    }\n  }\n\n  var cmdName = this._name;\n  if (this._alias) {\n    cmdName = cmdName + '|' + this._alias;\n  }\n  var usage = [\n    '',\n    '  Usage: ' + cmdName + ' ' + this.usage(),\n    ''\n  ];\n\n  var cmds = [];\n  var commandHelp = this.commandHelp();\n  if (commandHelp) cmds = [commandHelp];\n\n  var options = [\n    '  Options:',\n    '',\n    '' + this.optionHelp().replace(/^/gm, '    '),\n    ''\n  ];\n\n  return usage\n    .concat(desc)\n    .concat(options)\n    .concat(cmds)\n    .join('\\n');\n};\n\n/**\n * Output help information for this command\n *\n * @api public\n */\n\nCommand.prototype.outputHelp = function(cb) {\n  if (!cb) {\n    cb = function(passthru) {\n      return passthru;\n    };\n  }\n  process.stdout.write(cb(this.helpInformation()));\n  this.emit('--help');\n};\n\n/**\n * Output help information and exit.\n *\n * @api public\n */\n\nCommand.prototype.help = function(cb) {\n  this.outputHelp(cb);\n  process.exit();\n};\n\n/**\n * Camel-case the given `flag`\n *\n * @param {String} flag\n * @return {String}\n * @api private\n */\n\nfunction camelcase(flag) {\n  return flag.split('-').reduce(function(str, word) {\n    return str + word[0].toUpperCase() + word.slice(1);\n  });\n}\n\n/**\n * Pad `str` to `width`.\n *\n * @param {String} str\n * @param {Number} width\n * @return {String}\n * @api private\n */\n\nfunction pad(str, width) {\n  var len = Math.max(0, width - str.length);\n  return str + Array(len + 1).join(' ');\n}\n\n/**\n * Output help information if necessary\n *\n * @param {Command} command to output help for\n * @param {Array} array of options to search for -h or --help\n * @api private\n */\n\nfunction outputHelpIfNecessary(cmd, options) {\n  options = options || [];\n  for (var i = 0; i < options.length; i++) {\n    if (options[i] === '--help' || options[i] === '-h') {\n      cmd.outputHelp();\n      process.exit(0);\n    }\n  }\n}\n\n/**\n * Takes an argument an returns its human readable equivalent for help usage.\n *\n * @param {Object} arg\n * @return {String}\n * @api private\n */\n\nfunction humanReadableArgName(arg) {\n  var nameOutput = arg.name + (arg.variadic === true ? '...' : '');\n\n  return arg.required\n    ? '<' + nameOutput + '>'\n    : '[' + nameOutput + ']';\n}\n\n// for versions before node v0.8 when there weren't `fs.existsSync`\nfunction exists(file) {\n  try {\n    if (fs.statSync(file).isFile()) {\n      return true;\n    }\n  } catch (e) {\n    return false;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/Commander/index.js?");

/***/ }),

/***/ "./node_modules/connected-domain/index.js":
/*!************************************************!*\
  !*** ./node_modules/connected-domain/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__( /*! ./lib/connected-domain */ \"./node_modules/connected-domain/lib/connected-domain.js\" );\n\n//# sourceURL=webpack:///./node_modules/connected-domain/index.js?");

/***/ }),

/***/ "./node_modules/connected-domain/lib/connected-domain.js":
/*!***************************************************************!*\
  !*** ./node_modules/connected-domain/lib/connected-domain.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * calculate all the connected domains based on the given two-dimensional array\n */\n\n/**\n * @param {Array} tdArray\n * @param {Function} indicator It receive the raw point data as the first parameter and decide what kind of domain the point belongs to, it should return a string as a domain identifier.\n * @param {Boolean} hardlink If use hard link. Default to false.\n * @return {Object} [{ bounding: { w: 12, h: 19, x: 0, y: 1 }, points: [ { x: 1, y: 2, point: {} } ], identifier: 'blue', domainId: 1 } ]\n */\nmodule.exports = function( tdArray, indicator, hardlink ){\n\n    hardlink = hardlink || false;\n\n    if( !tdArray ){\n        throw new Error( 'tdArray must be provided' );\n    }\n\n    if( !indicator ){\n        throw new Error( 'indicator must be provided' );\n    }\n\n    // clone 一份数据，因为需要对饮用进行修改，方便执行\n    tdArray = JSON.parse( JSON.stringify( tdArray ) );\n\n    // Result\n    var domains = {};\n    var domainUUID = 0;\n    var pointsHash = {};\n\n    // 遍历数组，划分domain\n\n    tdArray.forEach(function( row, y ){\n\n        row.forEach(function( colItem, x ){\n\n            // get the current point identifier.\n            var identifier = indicator( colItem, x, y );\n\n            // get neighbours\n            // Except for Undefined every data type is valid.\n            var neighbours = [];\n\n            // top neighbour\n            if( tdArray[ y - 1 ] && tdArray[ y - 1 ][ x ] !== undefined ){\n                neighbours.push( pointsHash[ x + '_' + ( y - 1 ) ] );\n            }\n\n            // left neighbour\n            if( row[ x - 1 ] !== undefined ){\n                neighbours.push( pointsHash[ ( x - 1 ) + '_' + y ] );\n            }\n\n            // soft link will treat corner link as domain link.\n            if( !hardlink ){\n                // top left neighbour\n                if( tdArray[ y - 1 ] && tdArray[ y - 1 ][ x - 1 ] !== undefined ){\n                    neighbours.push( pointsHash[ ( x - 1 ) + '_' + ( y - 1 ) ] );\n                }\n\n                // top right neighbour\n                if( tdArray[ y - 1 ] && tdArray[ y - 1 ][ x + 1 ] !== undefined ){\n                    neighbours.push( pointsHash[ ( x + 1 ) + '_' + ( y - 1 ) ] );\n                }\n            }\n\n            if( neighbours.length ){\n                var matched = false;\n\n                neighbours.forEach(function( neighbour ){\n\n                    if( neighbour.identifier == identifier ){\n\n                        // If the neighbour is the first neighbour has the same identifier\n                        if( !matched ){\n                            addPointToDomain( colItem, x, y, neighbour.domainId );\n                            matched = true;\n                        }\n\n                        // If more than one neighbour matched, check if these neighbours belong to the same domain\n                        // If not, merge these domains since they connects to each other.\n                        else {\n                            var colItemPoint = pointsHash[ x + '_' + y ];\n                            if( neighbour.domainId != colItemPoint.domainId ){\n                                mergeDomains( neighbour.domainId, colItemPoint.domainId );\n                            }\n                        }\n                    }\n                });\n\n                if( !matched ){\n                    addNewDomain( colItem, x, y, identifier );\n                }\n            }\n            else {\n                addNewDomain( colItem, x, y, identifier );\n            }\n        });\n    });\n\n    // some summary\n    var result = {\n        domains: [],\n        totalDomains: 0,\n        groupByIdentifier: {},\n        totalIdentifiers: 0\n    };\n\n    var domainId = null;\n    var identifier = null;\n    var domain = null;\n    for( domainId in domains ){\n        domain = domains[ domainId ];\n        domain.bounding = calculateBounding( domain.points );\n        identifier = domain.identifier;\n\n        result.domains.push( domain );\n        result.totalDomains++;\n\n        if( !( identifier in result.groupByIdentifier ) ){\n            result.groupByIdentifier[ identifier ] = [];\n            result.totalIdentifiers++;\n        }\n\n        result.groupByIdentifier[ identifier ].push( domain );\n    }\n\n\n    function calculateBounding( points ){\n\n        var minX = null;\n        var minY = null;\n        var maxX = null;\n        var maxY = null;\n\n        points.forEach(function( point ){\n\n            if( minX === null || point.x < minX ){\n                minX = point.x;\n            }\n\n            if( minY === null || point.y < minY ){\n                minY = point.y;\n            }\n\n            if( maxX === null || point.x > maxX ){\n                maxX = point.x;\n            }\n\n            if( maxY === null || point.y > maxY ){\n                maxY = point.y;\n            }\n        });\n\n        var w = maxX - minX;\n        var h = maxY - minY;\n\n        return {\n            x: minX,\n            y: minY,\n            w: w,\n            h: h\n        };\n    }\n\n    /**\n     *\n     * @param point\n     * @param x\n     * @param y\n     * @param identifier\n     */\n    function addNewDomain( point, x, y, identifier ){\n\n        var newDomain = {\n            identifier: identifier,\n            domainId: ++domainUUID,\n            bounding: {},\n            points: []\n        };\n\n        var newPoint = {\n            value: point,\n            x: x,\n            y: y,\n            identifier: identifier,\n            domainId: newDomain.domainId\n        };\n\n        pointsHash[ x + '_' + y ] = {\n            value: point,\n            identifier: identifier,\n            domainId: newDomain.domainId\n        };\n\n        newDomain.points.push( newPoint );\n\n        domains[ newDomain.domainId ] = newDomain;\n    }\n\n    /**\n     * add a point to a existing domain, and attach properties domainId and identifier to point.\n     * @param point\n     * @param x\n     * @param y\n     * @param domainId\n     */\n    function addPointToDomain( point, x, y, domainId ){\n\n        var domain = domains[ domainId ];\n        var newPoint = {\n            value: point,\n            x: x,\n            y: y,\n            identifier: domain.identifier,\n            domainId: domainId\n        };\n\n        pointsHash[ x + '_' + y ] = {\n            value: point,\n            identifier: domain.identifier,\n            domainId: domainId\n        };\n\n        domain.points.push( newPoint );\n    }\n\n    /**\n     * 将 domainB 合并到 domainA\n     * @param domainAId\n     * @param domainBId\n     */\n    function mergeDomains( domainAId, domainBId ){\n\n        var domainA = domains[ domainAId ];\n        var domainB = domains[ domainBId ];\n\n        if( domainA.identifier == domainB.identifier ){\n            // 更新 domainB 的domainId\n\n            domainB.domainId = domainA.domainId;\n\n            domainB.points.forEach(function( point ){\n                point.domainId = domainA.domainId;\n                pointsHash[ point.x + '_' + point.y ].domainId = domainA.domainId;\n            });\n\n            domainA.points = domainA.points.concat( domainB.points );\n\n            // 删除domainB\n            delete domains[ domainBId ];\n        }\n    }\n\n    return result;\n};\n\n//# sourceURL=webpack:///./node_modules/connected-domain/lib/connected-domain.js?");

/***/ }),

/***/ "./node_modules/ps-node/index.js":
/*!***************************************!*\
  !*** ./node_modules/ps-node/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib */ \"./node_modules/ps-node/lib/index.js\");\n\n\n//# sourceURL=webpack:///./node_modules/ps-node/index.js?");

/***/ }),

/***/ "./node_modules/ps-node/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/ps-node/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ChildProcess = __webpack_require__(/*! child_process */ \"child_process\");\nvar IS_WIN = process.platform === 'win32';\nvar TableParser = __webpack_require__(/*! table-parser */ \"./node_modules/table-parser/index.js\");\n/**\n * End of line.\n * Basically, the EOL should be:\n * - windows: \\r\\n\n * - *nix: \\n\n * But i'm trying to get every possibilities covered.\n */\nvar EOL = /(\\r\\n)|(\\n\\r)|\\n|\\r/;\nvar SystemEOL = __webpack_require__(/*! os */ \"os\").EOL;\n\n/**\n * Execute child process\n * @type {Function}\n * @param {String[]} args\n * @param {Function} callback\n * @param {Object=null} callback.err\n * @param {Object[]} callback.stdout\n */\n\nvar Exec = module.exports = exports = function (args, callback) {\n  var spawn = ChildProcess.spawn;\n\n  // on windows, if use ChildProcess.exec(`wmic process get`), the stdout will gives you nothing\n  // that's why I use `cmd` instead\n  if (IS_WIN) {\n\n    var CMD = spawn('cmd');\n    var stdout = '';\n    var stderr = null;\n\n    CMD.stdout.on('data', function (data) {\n      stdout += data.toString();\n    });\n\n    CMD.stderr.on('data', function (data) {\n\n      if (stderr === null) {\n        stderr = data.toString();\n      }\n      else {\n        stderr += data.toString();\n      }\n    });\n\n    CMD.on('exit', function () {\n\n      var beginRow;\n      stdout = stdout.split(EOL);\n\n      // Find the line index for the titles\n      stdout.forEach(function (out, index) {\n        if (out && typeof beginRow == 'undefined' && out.indexOf('CommandLine') === 0) {\n          beginRow = index;\n        }\n      });\n\n      // get rid of the start (copyright) and the end (current pwd)\n      stdout.splice(stdout.length - 1, 1);\n      stdout.splice(0, beginRow);\n\n      callback(stderr, stdout.join(SystemEOL) || false);\n    });\n\n    CMD.stdin.write('wmic process get ProcessId,ParentProcessId,CommandLine \\n');\n    CMD.stdin.end();\n  }\n  else {\n    if (typeof args === 'string') {\n      args = args.split(/\\s+/);\n    }\n    const child = spawn('ps', args);\n    var stdout = '';\n    var stderr = null;\n\n    child.stdout.on('data', function (data) {\n      stdout += data.toString();\n    });\n\n    child.stderr.on('data', function (data) {\n\n      if (stderr === null) {\n        stderr = data.toString();\n      }\n      else {\n        stderr += data.toString();\n      }\n    });\n\n    child.on('exit', function () {\n      if (stderr) {\n        return callback(stderr.toString());\n      }\n      else {\n        callback(null, stdout || false);\n      }\n    });\n  }\n};\n\n/**\n * Query Process: Focus on pid & cmd\n * @param query\n * @param {String|String[]} query.pid\n * @param {String} query.command RegExp String\n * @param {String} query.arguments RegExp String\n * @param {String|array} query.psargs\n * @param {Function} callback\n * @param {Object=null} callback.err\n * @param {Object[]} callback.processList\n * @return {Object}\n */\n\nexports.lookup = function (query, callback) {\n\n  /**\n   * add 'lx' as default ps arguments, since the default ps output in linux like \"ubuntu\", wont include command arguments\n   */\n  var exeArgs = query.psargs || ['lx'];\n  var filter = {};\n  var idList;\n\n  // Lookup by PID\n  if (query.pid) {\n\n    if (Array.isArray(query.pid)) {\n      idList = query.pid;\n    }\n    else {\n      idList = [query.pid];\n    }\n\n    // Cast all PIDs as Strings\n    idList = idList.map(function (v) {\n      return String(v);\n    });\n\n  }\n\n\n  if (query.command) {\n    filter['command'] = new RegExp(query.command, 'i');\n  }\n\n  if (query.arguments) {\n    filter['arguments'] = new RegExp(query.arguments, 'i');\n  }\n\n  if (query.ppid) {\n    filter['ppid'] = new RegExp(query.ppid);\n  }\n\n  return Exec(exeArgs, function (err, output) {\n    if (err) {\n      return callback(err);\n    }\n    else {\n      var processList = parseGrid(output);\n      var resultList = [];\n\n      processList.forEach(function (p) {\n\n        var flt;\n        var type;\n        var result = true;\n\n        if (idList && idList.indexOf(String(p.pid)) < 0) {\n          return;\n        }\n\n        for (type in filter) {\n          flt = filter[type];\n          result = flt.test(p[type]) ? result : false;\n        }\n\n        if (result) {\n          resultList.push(p);\n        }\n      });\n\n      callback(null, resultList);\n    }\n  });\n};\n\n/**\n * Kill process\n * @param pid\n * @param {Object|String} signal\n * @param {String} signal.signal\n * @param {number} signal.timeout\n * @param next\n */\n\nexports.kill = function( pid, signal, next ){\n  //opts are optional\n  if(arguments.length == 2 && typeof signal == 'function'){\n    next = signal;\n    signal = undefined;\n  }\n\n  var checkTimeoutSeconds = (signal && signal.timeout) || 30;\n\n  if (typeof signal === 'object') {\n    signal = signal.signal;\n  }\n\n  try {\n    process.kill(pid, signal);\n  } catch(e) {\n    return next && next(e);\n  }\n\n  var checkConfident = 0;\n  var checkTimeoutTimer = null;\n  var checkIsTimeout = false;\n\n  function checkKilled(finishCallback) {\n    exports.lookup({ pid: pid }, function(err, list) {\n      if (checkIsTimeout) return;\n\n      if (err) {\n        clearTimeout(checkTimeoutTimer);\n        finishCallback && finishCallback(err);\n      } else if(list.length > 0) {\n        checkConfident = (checkConfident - 1) || 0;\n        checkKilled(finishCallback);\n      } else {\n        checkConfident++;\n        if (checkConfident === 5) {\n          clearTimeout(checkTimeoutTimer);\n          finishCallback && finishCallback();\n        } else {\n          checkKilled(finishCallback);\n        }\n      }\n    });\n  }\n\n  next && checkKilled(next);\n\n  checkTimeoutTimer = next && setTimeout(function() {\n    checkIsTimeout = true;\n    next(new Error('Kill process timeout'));\n  }, checkTimeoutSeconds * 1000);\n};\n\n/**\n * Parse the stdout into readable object.\n * @param {String} output\n */\n\nfunction parseGrid(output) {\n  if (!output) {\n    return [];\n  }\n  return formatOutput(TableParser.parse(output));\n}\n\n/**\n * format the structure, extract pid, command, arguments, ppid\n * @param data\n * @return {Array}\n */\n\nfunction formatOutput(data) {\n  var formatedData = [];\n  data.forEach(function (d) {\n    var pid = ( d.PID && d.PID[0] ) || ( d.ProcessId && d.ProcessId[0] ) || undefined;\n    var cmd = d.CMD || d.CommandLine || d.COMMAND || undefined;\n    var ppid = ( d.PPID && d.PPID[0] ) || ( d.ParentProcessId && d.ParentProcessId[0] ) || undefined;\n\n    if (pid && cmd) {\n      var command = cmd[0];\n      var args = '';\n\n      if (cmd.length > 1) {\n        args = cmd.slice(1);\n      }\n\n      formatedData.push({\n        pid: pid,\n        command: command,\n        arguments: args,\n        ppid: ppid\n      });\n    }\n  });\n\n  return formatedData;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ps-node/lib/index.js?");

/***/ }),

/***/ "./node_modules/table-parser/index.js":
/*!********************************************!*\
  !*** ./node_modules/table-parser/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__( /*! ./lib/index */ \"./node_modules/table-parser/lib/index.js\" );\n\n//# sourceURL=webpack:///./node_modules/table-parser/index.js?");

/***/ }),

/***/ "./node_modules/table-parser/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/table-parser/lib/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n *\n * 1, define the edge ( begin and end ) of every title field\n * 2, parse all the lines except the title line, get all the connected-domains\n * 3, group all the connected-domains vertically overlapped.\n * 4, a domain group belongs to a title field if they vertically overlapped\n * 5, calculate all the edge info through the group domain and title field relations.\n */\nvar ConnectedDomain = __webpack_require__(/*! connected-domain */ \"./node_modules/connected-domain/index.js\");\nvar EMPTY_EX = /\\s/;\n\n/**\n * The output sting of cmd to parse\n * @param output\n * @returns {Array}\n */\nmodule.exports.parse = function (output) {\n\n  // Split into lines\n  // Basically, the EOL should be:\n  // - windows: \\r\\n\n  // - *nix: \\n\n  // But i'm trying to get every possibilities covered.\n  var linesTmp = output.split(/(\\r\\n)|(\\n\\r)|\\n|\\r/);\n\n  // valid lines\n  var lines = [];\n  // title field info, mapped with filed name.\n  var titleInfo = {};\n  // the two dimensional array of the lines\n  var twoDimArray = [];\n\n  // get rid of all the empty lines.\n  linesTmp.forEach(function (line) {\n    if (line && line.trim()) {\n      lines.push(line);\n    }\n  });\n\n  // build title fields edge info\n  // build two dimensional array for Connected-Domain to parse.\n  lines.forEach(function (line, index) {\n\n    // Treat the first line as the title fields line\n    if (index == 0) {\n      var fields = line.split(/\\s+/);\n\n      // record the beginning and ending for each field\n      fields.forEach(function (field, idx) {\n\n        if (field) {\n          var info = titleInfo[field] = {};\n          var indexBegin = line.indexOf(field);\n          var indexEnd = indexBegin + field.length;\n\n          if (idx == 0) {\n            info.titleBegin = 0;\n          }\n          else {\n            info.titleBegin = indexBegin;\n          }\n\n          if (idx == fields.length - 1) {\n            info.titleEnd = line.length - 1;\n          }\n          else {\n            info.titleEnd = indexEnd;\n          }\n        }\n      });\n    }\n    else {\n      twoDimArray[index - 1] = line.split('');\n    }\n  });\n\n  // In the connected-domain aspect of view, all the blanks are connected, and all the non-blanks are connected.\n  var connectedDomains = ConnectedDomain(twoDimArray, function (value) {\n    if (EMPTY_EX.test(value)) {\n      return -1;\n    }\n    else {\n      return 1;\n    }\n  }, true);\n\n  // all the connected domains grouped if they are vertically overlapped.\n  var valuesDomainsVerticalGroups = [];\n\n  // sore the domain list make 'x' in ascending order, it will prevent the situation that:\n  // 1, two domains are not overlapped, so two groups are created for them at first\n  // 2, another domain is found overlapped with both of the domains at the first step.\n  // 3, In this situation the three groups have to be merged, which is complicated to implement.\n  //\n  // If the list is sorted in this order, this situation can't happen, because:\n  // - 1, If two non-overlapped domains A, B ( the \"x\" value of A less than B ) are found first.\n  // - 2, Since the list is in 'x' ascending order, the 'x' values of the following domains must larger or equal to the \"x\" of B, which means they will never overlapped with domain A.\n  // - 3, So this situation can't happen.\n  connectedDomains.domains.sort(function (a, b) {\n    return a.bounding.x - b.bounding.x;\n  });\n\n  // Group domains vertically overlapped.\n  connectedDomains.domains.forEach(function (domain) {\n    // only handle un-empty domain\n    if (domain.identifier === 1) {\n      var overlapped = false;\n\n      // If overlapped\n      valuesDomainsVerticalGroups.forEach(function (group) {\n        var bounding = domain.bounding;\n        var left = bounding.x;\n        var right = bounding.x + bounding.w;\n\n        if (overlap(left, right, group.begin, group.end)) {\n\n          overlapped = true;\n          group.domains.push(domain);\n          group.begin = group.begin > left ? left : group.begin;\n          group.end = group.end < right ? right : group.end;\n        }\n      });\n\n      // If not overlapped with any group, then create a new group\n      if (!overlapped) {\n        valuesDomainsVerticalGroups.push({\n          begin: domain.bounding.x,\n          end: domain.bounding.x + domain.bounding.w,\n          domains: [domain]\n        });\n      }\n    }\n  });\n\n  // connect all the groups to the title fields\n  valuesDomainsVerticalGroups.forEach(function (group) {\n    var title = null;\n    var info = null;\n    var overlapped = false;\n\n    var minimunLeftDistance = null;\n    var nearestLeftTitle = null;\n    var distance = null;\n\n    for (title in titleInfo) {\n      info = titleInfo[title];\n\n      /**\n       * The calculation below is to find the nearest left title field to the group, in case no overlapped title field found.\n       */\n      if (group.begin > info.titleBegin) {\n        distance = group.begin - info.titleBegin;\n\n        if (!nearestLeftTitle || ( distance < minimunLeftDistance )) {\n          nearestLeftTitle = title;\n          minimunLeftDistance = distance;\n        }\n      }\n\n      if (overlap(group.begin, group.end, info.titleBegin, info.titleEnd)) {\n\n        overlapped = true;\n        info.titleBegin = info.titleBegin > group.begin ? group.begin : info.titleBegin;\n        info.titleEnd = info.titleEnd < group.end ? group.end : info.titleEnd;\n      }\n    }\n\n    // Groups not match any title field belongs to the nearest left title field\n    if (!overlapped && nearestLeftTitle) {\n      var nearestTitleField = titleInfo[nearestLeftTitle];\n      nearestTitleField.titleBegin = nearestTitleField.titleBegin > group.begin ? group.begin : nearestTitleField.titleBegin;\n      nearestTitleField.titleEnd = nearestTitleField.titleEnd < group.end ? group.end : nearestTitleField.titleEnd;\n\n    }\n  });\n\n  // The final result\n  var result = [];\n\n  // Since we have got all the title bounding edges, we can split all the lines into values now\n  lines.forEach(function (line, index) {\n    // skip the first line\n    if (index > 0) {\n\n      var lineItem = {};\n      var title = null;\n      var info = null;\n      var value = null;\n      for (title in titleInfo) {\n        info = titleInfo[title];\n        value = line.substring(info.titleBegin, info.titleEnd + 1);\n        lineItem[title] = splitValue(value.trim());\n      }\n\n      result.push(lineItem);\n    }\n  });\n\n  return result;\n};\n\n/**\n * Test if two bounding overlapped vertically\n * @param begin1\n * @param end1\n * @param begin2\n * @param end2\n * @returns {boolean}\n */\nfunction overlap(begin1, end1, begin2, end2) {\n  return ( begin1 > begin2 && begin1 < end2 ) || // 2--1--2--1 or 2--1--1--2\n    ( end1 > begin2 && end1 < end2 ) ||     // 1--2--1--2 or 2--1--1--2\n    ( begin1 <= begin2 && end1 >= end2 );// 21--12 or 1--2--2--1\n}\n\n/**\n * transform a string value into array. It's not just split(), but also to consider some chunk that wrapped with `\"`, like below:\n *      \"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\" --type=renderer --lang=zh-CN, `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe` should be treated as a whole,\n *      also, be careful don't be mislead by format like `--name=\"neekey\"`, even more complicated: `--name=\"Neekey Ni\"`\n * so, `\"C:\\Program Files\\Internet Explorer\\iexplore.exe\" --name=\"Jack Neekey\"` should split into:\n *  - C:\\Program Files\\Internet Explorer\\iexplore.exe  // without `\"`\n *  - --name=\"Jack Neekey\"                             // with `\"`\n */\nfunction splitValue(value) {\n\n  var match = value.match(/\"/g);\n\n  // If only one \" found, then just ignore it\n  if (!match || match.length == 1) {\n    return value.split(/\\s+/);\n  }\n  else {\n    var result = [];\n    var chunk = null;\n    var ifInWrappedChunk = false;\n    var ifInPureWrappedChunk = false;\n    var quotaCount = 0;\n\n    // If the match length is a even, than nothing special, if a odd, ignore the last one.\n    var maxQuotaCount = match.length % 2 == 0 ? match.length : match.length - 1;\n\n    var previousItem = null;\n    var values = value.split('');\n\n    values.forEach(function (item, index) {\n\n      if (item !== ' ') {\n\n        if (item === '\"') {\n          // quota chunk begin\n          if (ifInWrappedChunk === false && quotaCount <= maxQuotaCount) {\n            ifInWrappedChunk = true;\n            quotaCount++;\n\n            // pure quota chunk begin\n            if (previousItem === ' ' || previousItem === null) {\n              ifInPureWrappedChunk = true;\n              chunk = '';\n            }\n            // normal continue\n            else {\n              chunk += item;\n            }\n          }\n          // quota chunk end\n          else if (ifInWrappedChunk === true) {\n            ifInWrappedChunk = false;\n            quotaCount++;\n\n            // pure quota chunk end\n            if (ifInPureWrappedChunk === true) {\n              ifInPureWrappedChunk = false;\n              result.push(chunk);\n              chunk = null;\n            }\n            // normal continue\n            else {\n              chunk += item;\n            }\n          }\n        }\n        // normal begin\n        else if (ifInWrappedChunk === false && ( previousItem === ' ' || previousItem === null )) {\n          chunk = item;\n        }\n        // normal or quota chunk continue.\n        else {\n          chunk += item;\n        }\n      }\n      // quota chunk continue, in quota chunk, blank is valid.\n      else if (ifInWrappedChunk) {\n        chunk += item;\n      }\n      // if not in quota chunk, them a blank means an end. But make sure chunk is exist, cause that could be blanks at the beginning.\n      else if (chunk !== null) {\n        result.push(chunk);\n        chunk = null;\n      }\n\n      previousItem = item;\n\n      // If this is the last one, but chunk is not end\n      if (index == ( values.length - 1 ) && chunk !== null) {\n        result.push(chunk);\n        chunk = null;\n      }\n    });\n\n    return result;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/table-parser/lib/index.js?");

/***/ }),

/***/ "./src/bin/dsm.js":
/*!************************!*\
  !*** ./src/bin/dsm.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Commander = __webpack_require__(/*! Commander */ \"./node_modules/Commander/index.js\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _commands = __webpack_require__(/*! ../commands/ */ \"./src/commands/index.js\");\n\nvar commands = _interopRequireWildcard(_commands);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Remove for production\nprocess.on('warning', e => console.warn(e.stack));\n\n// Add recursive options to Commander\n_Commander.Command.prototype.recursiveOptions = function (options) {\n  if (options.length > 0) {\n    options.map(opt => {\n      return this.option(opt.flag, opt.description);\n    });\n    // return this.option(cmd.option[0], cmd.option[1])\n  }\n  return this;\n};\n\nlet Commander = new _Commander.Command();\n/*******************************************/\n// process all commands\nconst Commands = Object.keys(commands);\nCommands.map((cmd, index) => {\n  cmd = commands[cmd];\n  if (cmd.command && cmd.description && typeof cmd.action == 'function') {\n    Commander.command(cmd.command).alias(cmd.alias ? cmd.alias : \"\").recursiveOptions(cmd.options || []).description(cmd.description).action(cmd.action);\n  } else {\n    console.error('%s', _colors2.default.red('Unable to process command: ' + Commands[index]));\n  }\n});\n\n// error on unknown commands\nCommander.on('command:*', function () {\n  console.error(_colors2.default.red('Invalid command: %s') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.', Commander.args.join(' '));\n  process.exit(1);\n});\n\n// error when no command is given\nif (typeof process.argv[2] === 'undefined') {\n  console.error(_colors2.default.red('no command given!') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.');\n  process.exit(1);\n}\n\nCommander.version('0.1.0').usage('[options] <cmd ...>').option('-f, --foo', 'enable some foo').parse(process.argv);\n\n//# sourceURL=webpack:///./src/bin/dsm.js?");

/***/ }),

/***/ "./src/commands/attach.js":
/*!********************************!*\
  !*** ./src/commands/attach.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _readline = __webpack_require__(/*! readline */ \"readline\");\n\nvar _readline2 = _interopRequireDefault(_readline);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"attach\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"attaches to server terminal (kinda)\";\n\n// Command Action *required\nconst action = exports.action = message => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  var sock = _net2.default.connect(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm.sock')));\n  sock.write(\"ATTACH\", 'utf8', () => {\n    console.log('ATTACHING...');\n  });\n  sock.on('data', function (data) {\n    console.log(`${data}`); // Write data from server to terminal\n  });\n\n  const rl = _readline2.default.createInterface({\n    input: process.stdin // hook into terminal\n  });\n\n  rl.on('line', line => {\n    sock.write(line, 'utf8'); // Write terminal input to the server\n  });\n  sock.on('end', function (data) {\n    console.log(`IPC layer has been shutdown (Server Shutdown)`);\n    sock.destroy();\n    rl.close();\n    process.stdin.destroy();\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/attach.js?");

/***/ }),

/***/ "./src/commands/config.js":
/*!********************************!*\
  !*** ./src/commands/config.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.options = exports.alias = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"config\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Options\nconst options = exports.options = [{ flag: '-s, --set <value>', description: 'Sets the config option' }, { flag: '-c, --config <name>', description: 'gets the specified configs value' }];\n\n// Command Description *required\nconst description = exports.description = \"displays or sets config values\";\n\n// Command Action *required\nconst action = exports.action = options => {\n  if (options.set && !options.config) {\n    console.log('usage: dsm config -c MOTD -s \"My new motd text\"');\n    return;\n  }\n  console.log(_colors2.default.blue('------ Config ------'));\n  const ConfigNames = Object.keys(_MainConfig2.default);\n  if (options.config) {\n    if (ConfigNames.indexOf(options.config) > -1) {\n      if (options.set) {\n        _MainConfig2.default[options.config].value = options.set;\n        console.log('Set config option ' + _colors2.default.green(options.config) + ' to:');\n        console.log('   ' + options.set);\n      } else {\n        DisplayConfig(options.config);\n      }\n    } else {\n      console.log(_colors2.default.red('No Config option: ') + options.config);\n    }\n    return;\n  }\n  ConfigNames.map(opt => {\n    DisplayConfig(opt);\n  });\n};\n\nconst DisplayConfig = opt => {\n  console.log(_colors2.default.green(opt + ' - '));\n  console.log('    ' + _MainConfig2.default[opt].description);\n  console.log('    Type: ' + _MainConfig2.default[opt].type);\n  console.log('    Default: ' + _MainConfig2.default[opt].default);\n  console.log('    Current: ' + _MainConfig2.default[opt].value);\n};\n\n//# sourceURL=webpack:///./src/commands/config.js?");

/***/ }),

/***/ "./src/commands/helpers/avorion.js":
/*!*****************************************!*\
  !*** ./src/commands/helpers/avorion.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.update = exports.install = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _readline = __webpack_require__(/*! readline */ \"readline\");\n\nvar _readline2 = _interopRequireDefault(_readline);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _createSingleLineLogger = __webpack_require__(/*! ./createSingleLineLogger */ \"./src/commands/helpers/createSingleLineLogger.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n\nconst windows = {\n  exec: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR.value + '/steamcmd.exe'),\n  args: []\n};\n\nconst linux = {\n  exec: _path2.default.resolve(globals.InstallationDir() + '/' + _MainConfig2.default.STEAM_DIR.value + '/steamcmd.sh'),\n  args: []\n};\n\nlet multiLog;\n\nconst steamCmd = onFinish => {\n  var isWin = process.platform === \"win32\";\n\n  const avorionPath = _path2.default.resolve(globals.InstallationDir() + '/avorion');\n  const Beta = _MainConfig2.default.BETA.value ? ' -beta beta' : '';\n  let steamArgs = ['+login anonymous', `+force_install_dir ${avorionPath}`, `+app_update 565060${Beta}`, 'validate', '+quit'];\n  // Continue using config option for steam directory?\n  const steamCmd = _child_process2.default.spawn(isWin ? windows.exec : linux.exec, steamArgs);\n  const rl = _readline2.default.createInterface({\n    input: steamCmd.stdout\n  });\n\n  rl.on('line', line => {\n    multiLog.log(line);\n  });\n  // steamCmd.stderr.on('data', (data) => {\n  //   console.log(data);\n  // });\n\n  steamCmd.on('close', code => {\n    console.groupEnd();\n    rl.close();\n    onFinish();\n  });\n};\n\nconst update = () => {\n  multiLog = (0, _createSingleLineLogger.createMultiline)(5);\n  console.group(\"Updating Avorion ...\");\n  steamCmd(() => console.log('Finished Updating Avorion.'));\n};\nconst install = () => {\n  multiLog = (0, _createSingleLineLogger.createMultiline)(5);\n  multiLog.writeTitle(_colors2.default.green('---------- Installing Avorion ----------'));\n  let index = 0;\n  let inter = setInterval(() => {\n    multiLog.writeTitle(_colors2.default.green('---------- ' + cliSpinners.dots.frames[index] + ' Installing Avorion ----------'));\n    if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n  }, 80);\n  steamCmd(() => {\n    clearInterval(inter);\n    multiLog.writeTitle(_colors2.default.green('---------- Avorion Installed -----------'));\n    multiLog.clear();\n    multiLog.stop();\n  });\n};\nexports.install = install;\nexports.update = update;\n\n//# sourceURL=webpack:///./src/commands/helpers/avorion.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _wgetImproved = __webpack_require__(/*! wget-improved */ \"wget-improved\");\n\nvar _wgetImproved2 = _interopRequireDefault(_wgetImproved);\n\nvar _tar = __webpack_require__(/*! tar */ \"tar\");\n\nvar _tar2 = _interopRequireDefault(_tar);\n\nvar _MainConfig = __webpack_require__(/*! ../../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _extractZip = __webpack_require__(/*! extract-zip */ \"extract-zip\");\n\nvar _extractZip2 = _interopRequireDefault(_extractZip);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst SteamDir = _MainConfig2.default.STEAM_DIR.value;\n\nconst windows = {\n  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip',\n  output: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/steamcmd.zip'),\n  unpack: callback => {\n    (0, _extractZip2.default)(_path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/steamcmd.zip'), { dir: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/') }, function (err) {\n      callback();\n    });\n  }\n};\n\nconst linux = {\n  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz',\n  output: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/steamcmd_linux.tar'),\n  unpack: callback => {\n    _tar2.default.x({\n      cwd: _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir + '/'),\n      file: SteamDir + '/steamcmd_linux.tar'\n    }).then(callback);\n  }\n};\n\nconst installSteam = () => {\n  return new Promise((resolve, reject) => {\n    // Create Steam directory\n    _fs2.default.mkdir(_path2.default.resolve(globals.InstallationDir() + '/' + SteamDir), () => {\n      console.log(\"Steam directory created at: \" + _path2.default.resolve(globals.InstallationDir() + '/' + SteamDir));\n      const options = {\n        gunzip: true\n      };\n      var isWin = process.platform === \"win32\";\n      // Download Steam command\n      let download = _wgetImproved2.default.download(isWin ? windows.source : linux.source, isWin ? windows.output : linux.output, options);\n      download.on('error', function (err) {\n        reject(err);\n      });\n      download.on('end', function (output) {\n        // extract tarball\n        _singleLineLog.stdout.clear();\n        const completed = () => {\n          resolve('Finished Extracting/Unpacking SteamCmd');\n        };\n        if (isWin) windows.unpack(completed);else linux.unpack(completed);\n      });\n      download.on('progress', function (progress) {\n        typeof progress === 'number';\n        (0, _singleLineLog.stdout)('Downloading Steam: [' + progress * 100 + '%]');\n      });\n    });\n  });\n};\n\nexports.default = installSteam;\n\n//# sourceURL=webpack:///./src/commands/helpers/steam.js?");

/***/ }),

/***/ "./src/commands/index.js":
/*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.config = exports.pid = exports.update = exports.intergrate = exports.startWeb = exports.stopWeb = exports.stop = exports.status = exports.attach = exports.send = exports.kill = exports.install = exports.start = undefined;\n\nvar _start = __webpack_require__(/*! ./start.js */ \"./src/commands/start.js\");\n\nvar start = _interopRequireWildcard(_start);\n\nvar _install = __webpack_require__(/*! ./install.js */ \"./src/commands/install.js\");\n\nvar install = _interopRequireWildcard(_install);\n\nvar _kill = __webpack_require__(/*! ./kill.js */ \"./src/commands/kill.js\");\n\nvar kill = _interopRequireWildcard(_kill);\n\nvar _send = __webpack_require__(/*! ./send.js */ \"./src/commands/send.js\");\n\nvar send = _interopRequireWildcard(_send);\n\nvar _status = __webpack_require__(/*! ./status.js */ \"./src/commands/status.js\");\n\nvar status = _interopRequireWildcard(_status);\n\nvar _attach = __webpack_require__(/*! ./attach.js */ \"./src/commands/attach.js\");\n\nvar attach = _interopRequireWildcard(_attach);\n\nvar _stop = __webpack_require__(/*! ./stop.js */ \"./src/commands/stop.js\");\n\nvar stop = _interopRequireWildcard(_stop);\n\nvar _startWeb = __webpack_require__(/*! ./start-web.js */ \"./src/commands/start-web.js\");\n\nvar startWeb = _interopRequireWildcard(_startWeb);\n\nvar _stopWeb = __webpack_require__(/*! ./stop-web.js */ \"./src/commands/stop-web.js\");\n\nvar stopWeb = _interopRequireWildcard(_stopWeb);\n\nvar _intergrate = __webpack_require__(/*! ./intergrate.js */ \"./src/commands/intergrate.js\");\n\nvar intergrate = _interopRequireWildcard(_intergrate);\n\nvar _update = __webpack_require__(/*! ./update.js */ \"./src/commands/update.js\");\n\nvar update = _interopRequireWildcard(_update);\n\nvar _pid = __webpack_require__(/*! ./pid.js */ \"./src/commands/pid.js\");\n\nvar pid = _interopRequireWildcard(_pid);\n\nvar _config = __webpack_require__(/*! ./config.js */ \"./src/commands/config.js\");\n\nvar config = _interopRequireWildcard(_config);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nexports.start = start;\nexports.install = install;\nexports.kill = kill;\nexports.send = send;\nexports.attach = attach;\nexports.status = status;\nexports.stop = stop;\nexports.stopWeb = stopWeb;\nexports.startWeb = startWeb;\nexports.intergrate = intergrate;\nexports.update = update;\nexports.pid = pid;\nexports.config = config;\n\n//# sourceURL=webpack:///./src/commands/index.js?");

/***/ }),

/***/ "./src/commands/install.js":
/*!*********************************!*\
  !*** ./src/commands/install.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/install.js?");

/***/ }),

/***/ "./src/commands/intergrate.js":
/*!************************************!*\
  !*** ./src/commands/intergrate.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RemoveDSM = exports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name\nconst command = exports.command = \"intergrate <onOff>\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"enables/disables intergration\";\n\n// Command Action\nconst action = exports.action = onOff => {\n  const ServerFile = _path2.default.resolve(globals.InstallationDir() + '/avorion/data/scripts/server/server.lua');\n  const DSMFile = _path2.default.resolve(globals.InstallationDir() + '/avorion/dsm.lua');\n\n  RemoveDSM(ServerFile, () => {\n    const dsm = `\\nlocal s, b = pcall(require, 'dsm') if s then if b.onStartUp then local a = onStartUp; onStartUp = function(c) a(c); b.onStartUp(c); end end else print(b); end --Added by DSM\\n`;\n\n    _fs2.default.writeFile(ServerFile, dsm, { flag: 'a' }, err => {\n      if (err) {\n        throw err;\n      }\n      console.log('Attached DSM Server mod to server.lua');\n    });\n\n    _fs2.default.readFile(_path2.default.resolve(globals.InstallationDir() + '/dsm/dsm.lua'), 'utf8', function (err, data) {\n      if (err) {\n        throw err;\n      }\n      const newData = data.replace(\"__MOTD__\", _MainConfig2.default.MOTD.value);\n      _fs2.default.writeFile(DSMFile, newData, err => {\n        if (err) {\n          throw err;\n        }\n      });\n    });\n  });\n};\n\nconst RemoveDSM = exports.RemoveDSM = (avorionFile, callback) => {\n  _fs2.default.readFile(avorionFile, 'utf8', function (err, data) {\n    if (err) {\n      console.log(err);\n    }\n    // Remove all DSM injected lines\n    let removedDSM = data.split(\"\\n\").filter(line => !line.includes('--Added by DSM'));\n    _fs2.default.writeFile(avorionFile, removedDSM.join('\\n'), err => {\n      if (err) {\n        throw err;\n      }\n      console.log('Removed DSM intergration.');\n      if (typeof callback === 'function') {\n        callback();\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/intergrate.js?");

/***/ }),

/***/ "./src/commands/kill.js":
/*!******************************!*\
  !*** ./src/commands/kill.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"kill <pid>\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"kills the server\";\n\n// Command Action *required\nconst action = exports.action = pid => {\n  process.kill(pid, 'SIGINT');\n};\n\n//# sourceURL=webpack:///./src/commands/kill.js?");

/***/ }),

/***/ "./src/commands/pid.js":
/*!*****************************!*\
  !*** ./src/commands/pid.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.options = exports.alias = exports.command = undefined;\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _psNode = __webpack_require__(/*! ps-node */ \"./node_modules/ps-node/index.js\");\n\nvar _psNode2 = _interopRequireDefault(_psNode);\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n\n// Command Name *required\nconst command = exports.command = \"pid\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Options\nconst options = exports.options = [{ flag: '-s, --search', description: 'Searchs process list for runaway DSM Wrappers' }];\n\n// Command Description *required\nconst description = exports.description = \"gets pid information\";\n\n// Command Action *required\nconst action = exports.action = options => {\n  const WrapperPid = _localStorage2.default.getItem('WrapperPid') || _colors2.default.red('Offline');\n  const GameServerPid = _localStorage2.default.getItem('GameServerPid') || _colors2.default.red('Offline');\n  const WebServerPid = _localStorage2.default.getItem('WebServerPid') || _colors2.default.red('Offline');\n\n  console.log(_colors2.default.blue('------ PID Info ------'));\n  console.log('DSM Wrapper:', WrapperPid && _colors2.default.green(WrapperPid));\n  console.log('Game Server:', GameServerPid && _colors2.default.green(GameServerPid));\n  console.log('Web Server:', WebServerPid && _colors2.default.green(WebServerPid));\n\n  if (options.search) {\n    let index = 0;\n    const interval = setInterval(() => {\n      (0, _singleLineLog.stdout)(_colors2.default.blue(cliSpinners.dots.frames[index] + ' Searching for runaway DSM processes...'));\n      if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n    }, 80);\n    // A simple pid lookup\n    _psNode2.default.lookup({\n      command: 'node',\n      arguments: 'serverWrapper.js'\n    }, function (err, resultList) {\n      if (err) {\n        throw new Error(err);\n      }\n      clearInterval(interval);\n      (0, _singleLineLog.stdout)(_colors2.default.red('Found:'), resultList.length);\n      _singleLineLog.stdout.clear();\n      console.log('');\n      resultList.forEach(function (process) {\n        if (process) {\n          console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);\n        }\n      });\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/commands/pid.js?");

/***/ }),

/***/ "./src/commands/send.js":
/*!******************************!*\
  !*** ./src/commands/send.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.send = exports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _net = __webpack_require__(/*! net */ \"net\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"send <message>\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"sends command to server\";\n\n// Command Action *required\nconst action = exports.action = message => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  // var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))\n  // sock.write(`${message}`,'utf8',()=>{\n  //   console.log(`Message: ${message}`);\n  // })\n  // sock.on('data', function (data) {\n  //   console.log(`Response: ${data}`);\n  //   sock.destroy()\n  // });\n\n  send('SENDING' + message, sock => {\n    console.log(`Message: ${message}`);\n  }, (data, sock) => {\n    console.log(`Response: ${data}`);\n    sock.destroy();\n  });\n};\n\nconst send = exports.send = (message, write, response, error) => {\n  var sock = _net2.default.connect(globals.cleanPipeName(_path2.default.resolve(_os2.default.tmpdir() + '/dsm.sock')), () => {\n    sock.write(`${message}`, 'utf8', () => {\n      write(sock);\n    });\n    sock.on('data', function (data) {\n      response(data, sock);\n    });\n  });\n  sock.on('error', function (err) {\n    if (typeof error == 'function') {\n      if (err.errno === 'ENOENT') {\n        error('Could not connect to the server.');\n      } else {\n        error(err);\n      }\n    } else {\n      console.log(err);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/send.js?");

/***/ }),

/***/ "./src/commands/start-web.js":
/*!***********************************!*\
  !*** ./src/commands/start-web.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"start-web\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"starts the web server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if ((0, _serverOnline.WebServerOnline)()) {\n    console.log('Server is already online');\n    return;\n  }\n\n  console.group('Starting Web Server');\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/webServer.js');\n  _logger.Web.init();\n  _logger.Web.clear();\n  _localStorage2.default.removeItem('WebServerPid');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', _logger.Web.stream, _logger.Web.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath], options);\n  steamCmd.unref();\n};\n\n//# sourceURL=webpack:///./src/commands/start-web.js?");

/***/ }),

/***/ "./src/commands/start.js":
/*!*******************************!*\
  !*** ./src/commands/start.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _intergrate = __webpack_require__(/*! ./intergrate */ \"./src/commands/intergrate.js\");\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n\n// Command Name *required\nconst command = exports.command = \"start\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"starts the server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is already online');\n    return;\n  }\n  let index = 0;\n  const interval = setInterval(() => {\n    (0, _singleLineLog.stdout)(_colors2.default.blue('---------- ' + cliSpinners.dots.frames[index] + ' Starting Server ----------'));\n    if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n  }, 80);\n\n  _logger2.default.init();\n  _logger2.default.clear();\n  _localStorage2.default.removeItem('WrapperPid');\n  (0, _intergrate.action)('on'); // enable intergration on wrapper startup\n\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/serverWrapper.js');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', _logger2.default.stream, _logger2.default.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath], options);\n  // console.log(steamCmd.pid)\n  steamCmd.unref();\n\n  let errorIndex = 0;\n  const Finish = () => {\n    clearInterval(int);\n    clearInterval(interval);\n    _singleLineLog.stdout.clear();\n    return;\n  };\n  const int = setInterval(() => {\n    errorIndex += 1;\n    if (errorIndex >= 25) {\n      (0, _singleLineLog.stdout)(_colors2.default.red('---------- ERROR ----------'));\n      return Finish();\n    }\n    const LogOutput = _fs2.default.readFileSync(_logger2.default.logFile).toString();\n    // can this be abstracted into an event emitter that the GameServer and other commands can share\n    // by passing in lines of data and the emitter object we wish to send?\n    // other commands might not need to listen on the IPC layer and instead listen to the log files events.\n    const unrecognisedOption = LogOutput.match(/An exception occurred: unrecognised option.*/);\n    if (unrecognisedOption) {\n      (0, _singleLineLog.stdout)(_colors2.default.red('---------- ERROR ----------'));\n      console.log('\\n' + unrecognisedOption[0]);\n      return Finish();\n    }\n    const ServerStarted = LogOutput.includes('Server startup complete.');\n    if (ServerStarted) {\n      (0, _singleLineLog.stdout)(_colors2.default.blue('---------- ✔️ Server Started ----------'));\n      return Finish();\n    }\n  }, 500);\n\n  // setTimeout(()=>{\n  //   send('STARTUP',\n  //     (sock)=>{},\n  //     (data,sock)=>{\n  //       setTimeout(()=>{ //we want the user to enjoy our pretty spinner\n  //         clearInterval(interval)\n  //         log(colors.blue('---------- ✔️ Server Started ----------'))\n  //         log.clear()\n  //         sock.destroy()\n  //         console.log(data.toString())\n  //       },1000)\n  //     },\n  //     (err)=>{\n  //       clearInterval(interval)\n  //       log(colors.red('---------- ERROR ----------'))\n  //       log.clear()\n  //       console.log('\\n'+err)\n  //     }\n  //   )\n  // },500)\n};\n\n//# sourceURL=webpack:///./src/commands/start.js?");

/***/ }),

/***/ "./src/commands/status.js":
/*!********************************!*\
  !*** ./src/commands/status.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n// Command Name *required\nconst command = exports.command = \"status\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"gets status from server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  let interval,\n      index = 0;\n  (0, _send.send)('/status', sock => {\n    // log(colors.green('---Checking Status---'))\n    interval = setInterval(() => {\n      (0, _singleLineLog.stdout)(_colors2.default.blue('---------- ' + cliSpinners.dots.frames[index] + ' Checking Status ----------'));\n      if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n    }, 80);\n  }, (data, sock) => {\n    setTimeout(() => {\n      //we want the user to enjoy our pretty spinner\n      clearInterval(interval);\n      (0, _singleLineLog.stdout)(_colors2.default.blue('---------- ✔️ Received Status ----------'));\n      _singleLineLog.stdout.clear();\n      console.log('\\n' + data.toString());\n      sock.destroy();\n    }, 1000);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/status.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"stop\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"stops the server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is already Offline');\n    return;\n  }\n  (0, _send.send)('/stop', sock => {\n    console.log('Sent stop command, Waiting....');\n  }, (data, sock) => {\n    console.log('Received: ' + data);\n    sock.destroy();\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/stop.js?");

/***/ }),

/***/ "./src/commands/update.js":
/*!********************************!*\
  !*** ./src/commands/update.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/update.js?");

/***/ }),

/***/ "./src/lib/MainConfig.js":
/*!*******************************!*\
  !*** ./src/lib/MainConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.parsedConfig = exports.rawConfig = undefined;\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _ip = __webpack_require__(/*! ip */ \"ip\");\n\nvar _ip2 = _interopRequireDefault(_ip);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rawConfig = _fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8');\n\nconst parsedConfig = _ini2.default.parse(rawConfig);\n\nclass Option {\n  constructor(name, def, description, type) {\n    this.default = def;\n    this.description = description;\n    this.type = type;\n    this.name = name;\n    this.parse(def);\n    this.parse(parsedConfig[name]);\n  }\n  get value() {\n    return this._value;\n  }\n  set value(incValue) {\n    if (incValue) {\n      this.parse(incValue);\n    }\n  }\n  parse(unparsed) {\n    if (unparsed == null) return;\n    switch (this.type) {\n      case 'number':\n        this._value = parseInt(unparsed, 10);\n        break;\n      case 'boolean':\n        this._value = unparsed === 'true';\n        break;\n      case 'string':\n        this._value = String(unparsed);\n        break;\n      default:\n        this._value = unparsed;\n    }\n  }\n}\n\n// create object for each config option to support type checking, defaults, and required options.\n// then use a command to parse it all\nconst Config = {\n  MOTD: new Option(\"MOTD\", \"Welcome to the server, Enjoy!!\", 'Message to be displayed on user login', 'string'),\n  STEAM_DIR: new Option(\"STEAM_DIR\", \"steam\", 'directory relative to dsm installation for steam to be installed', 'string'),\n  STATUS_INTERVAL_MS: new Option(\"STATUS_INTERVAL_MS\", 1000 * 60 * 5, 'interval in MS to run the status check', 'number'),\n  BETA: new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean'),\n  GALAXY_NAME: new Option(\"GALAXY_NAME\", 'MyGalaxy', 'Name of the galaxy', 'string'),\n  GALAXY_SAVE_DIRECTORY: new Option(\"GALAXY_SAVE_DIRECTORY\", '', 'folder the galaxies will be stored in, will be prepended to galaxy name. defaults to user directory ~/.avorion/galaxies for linux and %appdata%/Avorion/galaxies for windows', 'string'),\n  STARTUP_PARAMS: new Option(\"STARTUP_PARAMS\", '--public true --listed true --same-start-sector false', 'Parameters to be applied to server when starting. see \"dsm info\" for more info', 'string'),\n  // SERVER_PORT: new Option(\n  //   \"SERVER_PORT\",\n  //   27000,\n  //   'Port assigned to the game server',\n  //   'number'),\n  AUTO_RESTART: new Option(\"AUTO_RESTART\", 'true', 'if true will automatically restart the server when a crash is detected', 'boolean'),\n  WEB_PORT: new Option(\"WEB_PORT\", 8080, 'Port assigned to the Wen Interface', 'number'),\n  // GAME_IP_ADDRESS: new Option(\n  //   \"GAME_IP_ADDRESS\",\n  //   '',\n  //   'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)',\n  //   'string'),\n  WEB_IP_ADDRESS: new Option(\"WEB_IP_ADDRESS\", _ip2.default.isPrivate(_ip2.default.address()) ? 'localhost' : _ip2.default.address(), 'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)', 'string'),\n  TIME_TO_STATUS_FAILURE: new Option(\"TIME_TO_STATUS_FAILURE\", 30000, 'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.', 'number')\n  // const Write\n};exports.default = Config;\nexports.rawConfig = rawConfig;\nexports.parsedConfig = parsedConfig;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

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

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

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