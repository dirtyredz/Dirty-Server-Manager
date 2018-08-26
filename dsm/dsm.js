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

/***/ "./src/bin/dsm.js":
/*!************************!*\
  !*** ./src/bin/dsm.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Commander = __webpack_require__(/*! Commander */ \"./node_modules/Commander/index.js\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nvar _commands = __webpack_require__(/*! ../commands/ */ \"./src/commands/index.js\");\n\nvar commands = _interopRequireWildcard(_commands);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Remove for production\nprocess.on('warning', e => console.warn(e.stack));\n\n// Add recursive options to Commander\n_Commander.Command.prototype.recursiveOptions = function (options) {\n  if (options.length > 0) {\n    options.map(opt => {\n      return this.option(opt.flag, opt.description);\n    });\n    // return this.option(cmd.option[0], cmd.option[1])\n  }\n  return this;\n};\n\nlet Commander = new _Commander.Command();\n/*******************************************/\n// process all commands\nconst Commands = Object.keys(commands);\nCommands.map((cmd, index) => {\n  cmd = commands[cmd];\n  if (cmd.command && cmd.description && typeof cmd.action == 'function') {\n    Commander.command(cmd.command).version(cmd.version ? cmd.version : _colors2.default.red(\"No version available\"), '-v, --version').alias(cmd.alias ? cmd.alias : \"\").recursiveOptions(cmd.options || []).description(cmd.description).action(cmd.action);\n  } else {\n    console.error('%s', _colors2.default.red('Unable to process command: ' + Commands[index]));\n  }\n});\n\n// error on unknown commands\nCommander.on('command:*', function () {\n  console.error(_colors2.default.red('Invalid command: %s') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.', Commander.args.join(' '));\n  process.exit(1);\n});\n\n// error when no command is given\nif (typeof process.argv[2] === 'undefined') {\n  console.error(_colors2.default.red('no command given!') + ' \\nSee ' + _colors2.default.yellow('--help') + ' for a list of available commands.');\n  process.exit(1);\n}\n\nCommander.version('0.1.0').usage('[options] <cmd ...>').option('-f, --foo', 'enable some foo').parse(process.argv);\n\n//# sourceURL=webpack:///./src/bin/dsm.js?");

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

/***/ "./src/commands/config.js":
/*!********************************!*\
  !*** ./src/commands/config.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.options = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _intergrate = __webpack_require__(/*! ./intergrate */ \"./src/commands/intergrate.js\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"config\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Options\nconst options = exports.options = [{ flag: '-s, --set <value>', description: 'Sets the config option' }, { flag: '-c, --config <name>', description: 'gets the specified configs value' }];\n\n// Command Description *required\nconst description = exports.description = \"displays or sets config values\";\n\n// Command Action *required\nconst action = exports.action = options => {\n  if (options.set && !options.config) {\n    console.log('usage: dsm config -c MOTD -s \"My new motd text\"');\n    return;\n  }\n  console.log(_colors2.default.blue('------ Config ------'));\n  const ConfigNames = Object.keys(_MainConfig2.default);\n  if (options.config) {\n    if (ConfigNames.indexOf(options.config) > -1) {\n      if (options.set) {\n        _MainConfig2.default[options.config].value = options.set;\n        console.log('Set config option ' + _colors2.default.green(options.config) + ' to:');\n        console.log('   ' + options.set);\n      } else {\n        DisplayConfig(options.config);\n      }\n    } else {\n      console.log(_colors2.default.red('No Config option: ') + options.config);\n    }\n    return;\n  }\n  ConfigNames.map(opt => {\n    DisplayConfig(opt);\n  });\n};\n\nconst DisplayConfig = opt => {\n  console.log(_colors2.default.green(opt + ' - '));\n  console.log('    ' + _MainConfig2.default[opt].description);\n  console.log('    Type: ' + _MainConfig2.default[opt].type);\n  console.log('    Default: ' + _MainConfig2.default[opt].default);\n  console.log('    Current: ' + _MainConfig2.default[opt].value);\n};\n\n//# sourceURL=webpack:///./src/commands/config.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.version = exports.alias = exports.command = undefined;\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _steam = __webpack_require__(/*! ./helpers/steam */ \"./src/commands/helpers/steam.js\");\n\nvar _steam2 = _interopRequireDefault(_steam);\n\nvar _avorion = __webpack_require__(/*! ./helpers/avorion */ \"./src/commands/helpers/avorion.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isWin = process.platform === \"win32\";\n// Command Name\nconst command = exports.command = \"install\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Description\nconst description = exports.description = \"starts the server\";\n\n// Command Action\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('A server is currently running.');\n    return;\n  }\n  (0, _steam2.default)().then(res => {\n    console.log(res);\n    (0, _avorion.install)();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/install.js?");

/***/ }),

/***/ "./src/commands/intergrate.js":
/*!************************************!*\
  !*** ./src/commands/intergrate.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.RemoveDSM = exports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _MainConfig = __webpack_require__(/*! ../lib/MainConfig */ \"./src/lib/MainConfig.js\");\n\nvar _MainConfig2 = _interopRequireDefault(_MainConfig);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name\nconst command = exports.command = \"intergrate <onOff>\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description\nconst description = exports.description = \"enables/disables intergration\";\n\n// Command Action\nconst action = exports.action = onOff => {\n  const ServerFile = _path2.default.resolve(globals.InstallationDir() + '/avorion/data/scripts/server/server.lua');\n  const DSMFile = _path2.default.resolve(globals.InstallationDir() + '/avorion/dsm.lua');\n\n  RemoveDSM(ServerFile, () => {\n    const dsm = `\\nlocal s, b = pcall(require, 'dsm') if s then if b.onStartUp then local a = onStartUp; onStartUp = function(c) a(c); b.onStartUp(c); end end else print(b); end --Added by DSM\\n`;\n\n    _fs2.default.writeFile(ServerFile, dsm, { flag: 'a' }, err => {\n      if (err) {\n        throw err;\n      }\n      console.log('Attached DSM Server mod to server.lua');\n    });\n\n    _fs2.default.readFile(_path2.default.resolve(globals.InstallationDir() + '/dsm/dsm.lua'), 'utf8', function (err, data) {\n      if (err) {\n        throw err;\n      }\n      const newData = data.replace(\"__MOTD__\", _MainConfig2.default.MOTD.value);\n      _fs2.default.writeFile(DSMFile, newData, err => {\n        if (err) {\n          throw err;\n        }\n      });\n    });\n  });\n};\n\nconst RemoveDSM = exports.RemoveDSM = (avorionFile, callback) => {\n  _fs2.default.readFile(avorionFile, 'utf8', function (err, data) {\n    if (err) {\n      throw err;\n    }\n    // Remove all DSM injected lines\n    let removedDSM = data.split(\"\\n\").filter(line => !line.includes('--Added by DSM'));\n    _fs2.default.writeFile(avorionFile, removedDSM.join('\\n'), err => {\n      if (err) {\n        throw err;\n      }\n      console.log('Removed DSM intergration.');\n      if (typeof callback === 'function') {\n        callback();\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/intergrate.js?");

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

/***/ "./src/commands/pid.js":
/*!*****************************!*\
  !*** ./src/commands/pid.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _intergrate = __webpack_require__(/*! ./intergrate */ \"./src/commands/intergrate.js\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"pid\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"gets pid information\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  const WrapperPid = _localStorage2.default.getItem('WrapperPid') || _colors2.default.red('Offline');\n  const GameServerPid = _localStorage2.default.getItem('GameServerPid') || _colors2.default.red('Offline');\n  const WebServerPid = _localStorage2.default.getItem('WebServerPid') || _colors2.default.red('Offline');\n\n  console.log(_colors2.default.blue('------ PID Info ------'));\n  console.log('Wrapper:', WrapperPid && _colors2.default.green(WrapperPid));\n  console.log('Server:', GameServerPid && _colors2.default.green(GameServerPid));\n  console.log('Web Server:', WebServerPid && _colors2.default.green(WebServerPid));\n};\n\n//# sourceURL=webpack:///./src/commands/pid.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _child_process2 = _interopRequireDefault(_child_process);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _logger = __webpack_require__(/*! ../lib/logger */ \"./src/lib/logger.js\");\n\nvar _logger2 = _interopRequireDefault(_logger);\n\nvar _globals = __webpack_require__(/*! ../lib/globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nvar _localStorage = __webpack_require__(/*! ../lib/localStorage */ \"./src/lib/localStorage.js\");\n\nvar _localStorage2 = _interopRequireDefault(_localStorage);\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _intergrate = __webpack_require__(/*! ./intergrate */ \"./src/commands/intergrate.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Command Name *required\nconst command = exports.command = \"start\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"starts the server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if ((0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is already online');\n    return;\n  }\n\n  console.group('Starting Server');\n  _logger2.default.init();\n  _logger2.default.clear();\n  _localStorage2.default.removeItem('WrapperPid');\n  (0, _intergrate.action)('on'); // enable intergration on wrapper startup\n\n  var childFilePath = _path2.default.resolve(globals.InstallationDir() + '/dsm/serverWrapper.js');\n\n  var options = {\n    detached: true,\n    stdio: ['ignore', _logger2.default.stream, _logger2.default.stream],\n    execPath: childFilePath\n  };\n  const steamCmd = _child_process2.default.spawn('node', [childFilePath], options);\n  steamCmd.unref();\n};\n\n//# sourceURL=webpack:///./src/commands/start.js?");

/***/ }),

/***/ "./src/commands/status.js":
/*!********************************!*\
  !*** ./src/commands/status.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.action = exports.description = exports.alias = exports.version = exports.command = undefined;\n\nvar _send = __webpack_require__(/*! ./send */ \"./src/commands/send.js\");\n\nvar _serverOnline = __webpack_require__(/*! ../lib/serverOnline */ \"./src/lib/serverOnline.js\");\n\nvar _singleLineLog = __webpack_require__(/*! single-line-log */ \"single-line-log\");\n\nvar _colors = __webpack_require__(/*! colors */ \"colors\");\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst cliSpinners = __webpack_require__(/*! cli-spinners */ \"cli-spinners\");\n// Command Name *required\nconst command = exports.command = \"status\";\n\n// Command Version\nconst version = exports.version = \"0.0.1\";\n\n// Command Alias\nconst alias = exports.alias = \"\";\n\n// Command Description *required\nconst description = exports.description = \"gets status from server\";\n\n// Command Action *required\nconst action = exports.action = () => {\n  if (!(0, _serverOnline.GameServerOnline)()) {\n    console.log('Server is Offline');\n    return;\n  }\n  let interval,\n      index = 0;\n  (0, _send.send)('/status', sock => {\n    // log(colors.green('---Checking Status---'))\n    interval = setInterval(() => {\n      (0, _singleLineLog.stdout)(_colors2.default.blue('---------- ' + cliSpinners.dots.frames[index] + ' Checking Status ----------'));\n      if (cliSpinners.dots.frames.length - 1 > index) index += 1;else index = 0;\n    }, 80);\n  }, (data, sock) => {\n    setTimeout(() => {\n      //we want the user to enjoy our pretty spinner\n      clearInterval(interval);\n      (0, _singleLineLog.stdout)(_colors2.default.blue('---------- ✔️ Received Status ----------'));\n      _singleLineLog.stdout.clear();\n      console.log('\\n' + data.toString());\n      sock.destroy();\n    }, 1000);\n  });\n};\n\n//# sourceURL=webpack:///./src/commands/status.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.parsedConfig = exports.rawConfig = undefined;\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _ini = __webpack_require__(/*! ini */ \"ini\");\n\nvar _ini2 = _interopRequireDefault(_ini);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _globals = __webpack_require__(/*! ./globals */ \"./src/lib/globals.js\");\n\nvar globals = _interopRequireWildcard(_globals);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst rawConfig = _fs2.default.readFileSync(_path2.default.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8');\n\nconst parsedConfig = _ini2.default.parse(rawConfig);\n\nclass Option {\n  constructor(name, def, description, type) {\n    this._default = def;\n    this._description = description;\n    this._type = type;\n    this._name = name;\n    this.parse(def);\n    this.parse(parsedConfig[name]);\n  }\n  get value() {\n    return this._value;\n  }\n  set value(incValue) {\n    if (incValue) {\n      this.parse(incValue);\n    }\n  }\n  parse(unparsed) {\n    if (unparsed == null) return;\n    switch (this._type) {\n      case 'number':\n        this._value = parseInt(unparsed, 10);\n        break;\n      case 'boolean':\n        this._value = unparsed === 'true';\n        break;\n      case 'string':\n        this._value = String(unparsed);\n        break;\n      default:\n        this._value = unparsed;\n    }\n  }\n}\n\n// create object for each config option to support type checking, defaults, and required options.\n// then use a command to parse it all\nconst Config = {\n  MOTD: new Option(\"MOTD\", \"Welcome to the server, Enjoy!!\", 'Message to be displayed on user login', 'string'),\n  STEAM_DIR: new Option(\"STEAM_DIR\", \"steam\", 'directory relative to dsm installation for steam to be installed', 'string'),\n  STATUS_INTERVAL_MS: new Option(\"STATUS_INTERVAL_MS\", 1000 * 60 * 5, 'interval in MS to run the status check', 'number'),\n  BETA: new Option(\"BETA\", 'false', 'enable or disable BETA features', 'boolean')\n  // const Write\n};exports.default = Config;\nexports.rawConfig = rawConfig;\nexports.parsedConfig = parsedConfig;\n\n//# sourceURL=webpack:///./src/lib/MainConfig.js?");

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