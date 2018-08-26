import fs from 'fs'
import ini from 'ini'
import path from 'path'
import * as globals from './globals'

const rawConfig = fs.readFileSync(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8')

const parsedConfig = ini.parse(rawConfig);

class Option {
  constructor(name,def,description,type){
    this._default = def
    this._description = description
    this._type = type
    this._name = name
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
    switch(this._type){
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
}
// const Write
export default Config
export { rawConfig, parsedConfig }

