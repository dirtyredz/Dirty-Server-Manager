import fs from 'fs'
import ini from 'ini'
import path from 'path'
import * as globals from './globals'
import ip from 'ip'

const rawConfig = fs.readFileSync(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8')

const parsedConfig = ini.parse(rawConfig);

class Option {
  constructor(name,def,description,type){
    this.default = def
    this.description = description
    this.type = type
    this.name = name
    this.parse(def)
    this.parse(parsedConfig[name])
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
const Config = {
  MOTD: new Option(
    "MOTD",
    "Welcome to the server, Enjoy!!",
    'Message to be displayed on user login',
    'string'),
  STEAM_DIR: new Option(
    "STEAM_DIR",
    "steam",
    'directory relative to dsm installation for steam to be installed',
    'string'),
  STATUS_INTERVAL_MS: new Option(
    "STATUS_INTERVAL_MS",
    (1000 * 60 * 5),
    'interval in MS to run the status check',
    'number'),
  BETA: new Option(
    "BETA",
    'false',
    'enable or disable BETA features',
    'boolean'),
  GALAXY_NAME: new Option(
    "GALAXY_NAME",
    'MyGalaxy',
    'Name of the galaxy',
    'string'),
  GALAXY_SAVE_DIRECTORY: new Option(
    "GALAXY_SAVE_DIRECTORY",
    '',
    'folder the galaxies will be stored in, will be prepended to galaxy name. defaults to user directory ~/.avorion/galaxies for linux and %appdata%/Avorion/galaxies for windows',
    'string'),
  STARTUP_PARAMS: new Option(
    "STARTUP_PARAMS",
    '--public true --listed true --same-start-sector false',
    'Parameters to be applied to server when starting. see "dsm info" for more info',
    'string'),
  // SERVER_PORT: new Option(
  //   "SERVER_PORT",
  //   27000,
  //   'Port assigned to the game server',
  //   'number'),
  AUTO_RESTART: new Option(
    "AUTO_RESTART",
    'true',
    'if true will automatically restart the server when a crash is detected',
    'boolean'),
  WEB_PORT: new Option(
    "WEB_PORT",
    8080,
    'Port assigned to the Wen Interface',
    'number'),
  // GAME_IP_ADDRESS: new Option(
  //   "GAME_IP_ADDRESS",
  //   '',
  //   'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)',
  //   'string'),
  WEB_IP_ADDRESS: new Option(
    "WEB_IP_ADDRESS",
    ip.isPrivate(ip.address()) ? 'localhost' : ip.address(),
    'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)',
    'string'),
  TIME_TO_STATUS_FAILURE: new Option(
    "TIME_TO_STATUS_FAILURE",
    30000,
    'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.',
    'number'),
}
// const Write
export default Config
export { rawConfig, parsedConfig }