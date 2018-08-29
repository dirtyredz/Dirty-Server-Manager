import fs from 'fs'
import ini from 'ini'
import path from 'path'
import * as globals from './globals'
import ip from 'ip'

class Option {
  constructor(name,def,description,type,init){
    this.default = def
    this.description = description
    this.type = type
    this.name = name
    this.parse(def)
    this.parse(init)
  }
  get value(){
    return this._value
  }
  set value(incValue){
    if(incValue){
      this.parse(incValue)
    }
  }
  parse(unparsed){
    if(unparsed == null)
      return
    switch(this.type){
      case 'number':
        this._value = parseInt(unparsed,10)
        break;
      case 'boolean':
        this._value = unparsed === 'true'
        break;
      case 'string':
        this._value = String(unparsed)
        break;
      default:
        this._value = unparsed
    }
  }
}

// create object for each config option to support type checking, defaults, and required options.
// then use a command to parse it all
class DSMConfig {
  constructor(){
    this.raw = fs.readFileSync(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8')
    this.parsed = ini.parse(this.raw);
  }
  get STEAM_DIR(){
    return new Option(
    "STEAM_DIR",
    "steam",
    'directory relative to dsm installation for steam to be installed',
    'string',
    this.parsed['STEAM_DIR'])
  }
  get WEB_PORT(){
    return new Option(
    "WEB_PORT",
    8080,
    'Port assigned to the Wen Interface',
    'number',
    this.parsed['WEB_PORT'])
  }
  get WEB_IP_ADDRESS(){
    return new Option(
    "WEB_IP_ADDRESS",
    ip.isPrivate(ip.address()) ? 'localhost' : ip.address(),
    'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)',
    'string',
    this.parsed['WEB_IP_ADDRESS'])
  }
}

class ServerConfig {
  parsed = []
  constructor(galaxyName){
    this.galaxyName = galaxyName
    this.raw = fs.readFileSync(path.resolve(globals.InstallationDir() + '/dsm/galaxies/'+galaxyName+'/config.ini'), 'utf-8')
    this.parsed = ini.parse(this.raw);
  }
  get MOTD(){
    return new Option(
    "MOTD",
    "Welcome to the server, Enjoy!!",
    'Message to be displayed on user login',
    'string',
    this.parsed['MOTD'])
  }
  get STATUS_INTERVAL_MS(){
    return new Option(
    "STATUS_INTERVAL_MS",
    (1000 * 60 * 5),
    'interval in MS to run the status check',
    'number',
    this.parsed['STATUS_INTERVAL_MS'])
  }
  get BETA(){
    return new Option(
    "BETA",
    'false',
    'enable or disable BETA features',
    'boolean',
    this.parsed['BETA'])
  }
  get STARTUP_PARAMS(){
    return new Option(
    "STARTUP_PARAMS",
    '--public true --listed true --same-start-sector false',
    'Parameters to be applied to server when starting. see "dsm info" for more info',
    'string',
    this.parsed['STARTUP_PARAMS'])
  }
  // SERVER_PORT: new Option(
  //   "SERVER_PORT",
  //   27000,
  //   'Port assigned to the game server',
  //   'number'),
  get AUTO_RESTART(){
    return new Option(
    "AUTO_RESTART",
    'true',
    'if true will automatically restart the server when a crash is detected',
    'boolean',
    this.parsed['AUTO_RESTART'])
  }
  get IP_ADDRESS(){
    return new Option(
    "IP_ADDRESS",
    ip.isPrivate(ip.address()) ? 'localhost' : ip.address(),
    'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)',
    'string')
  }
  get TIME_TO_STATUS_FAILURE(){
    return new Option(
    "TIME_TO_STATUS_FAILURE",
    30000,
    'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.',
    'number',
    this.parsed['TIME_TO_STATUS_FAILURE'])
  }
}
// const Write
export { DSMConfig, ServerConfig }