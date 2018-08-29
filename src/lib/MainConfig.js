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
  _parsed = []
  constructor(){
    this._raw = fs.readFileSync(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8')
    this._parsed = ini.parse(this._raw);
    this.STEAM_DIR = new Option(
      "STEAM_DIR",
      "steam",
      'directory relative to dsm installation for steam to be installed',
      'string',
      this._parsed['STEAM_DIR'])
    this.WEB_PORT = new Option(
      "WEB_PORT",
      8080,
      'Port assigned to the Wen Interface',
      'number',
      this._parsed['WEB_PORT'])
    this.WEB_IP_ADDRESS = new Option(
      "WEB_IP_ADDRESS",
      ip.isPrivate(ip.address()) ? 'localhost' : ip.address(),
      'IP address to assign to the web server. defaults to localhost(home pcs) or default outward facing ip (servers)',
      'string',
      this._parsed['WEB_IP_ADDRESS'])
  }
  get options(){
    const PublicProperties = Object.getOwnPropertyNames(this).filter(property=>property.match(/^(?!_.*).*/))
    return PublicProperties
  }
  save(){
    let objectToSave = {}
    this.options.map(opt=>{
      if(this[opt].value.toString() !== this[opt].default.toString()){
        objectToSave[opt] = this[opt].value.toString()
      }
    })
    fs.writeFileSync(this._path,ini.encode(objectToSave))
  }
}

class ServerConfig {
  _parsed = []
  constructor(galaxyName){
    this._galaxyName = galaxyName
    this._path = path.resolve(globals.InstallationDir() + '/dsm/galaxies/'+galaxyName+'/config.ini')
    this._raw = fs.readFileSync(this._path, 'utf-8')
    this._parsed = ini.parse(this._raw);
    this.MOTD = new Option(
      "MOTD",
      "Welcome to the server, Enjoy!!",
      'Message to be displayed on user login',
      'string',
      this._parsed['MOTD'])
      this.STATUS_INTERVAL_MS = new Option(
        "STATUS_INTERVAL_MS",
        (1000 * 60 * 5),
        'interval in MS to run the status check',
        'number',
        this._parsed['STATUS_INTERVAL_MS'])
        this.BETA = new Option(
          "BETA",
          'false',
          'enable or disable BETA features',
      'boolean',
      this._parsed['BETA'])
    this.STARTUP_PARAMS = new Option(
      "STARTUP_PARAMS",
      '--public true --listed true --same-start-sector false',
      'Parameters to be applied to server when starting. see "dsm info" for more info',
      'string',
      this._parsed['STARTUP_PARAMS'])
    this.AUTO_RESTART = new Option(
      "AUTO_RESTART",
      'true',
      'if true will automatically restart the server when a crash is detected',
      'boolean',
      this._parsed['AUTO_RESTART'])
      this.IP_ADDRESS = new Option(
        "IP_ADDRESS",
      ip.isPrivate(ip.address()) ? 'localhost' : ip.address(),
      'IP address to assign to the game server. defaults to localhost(home pcs) or default outward facing ip (servers)',
      'string')
      this.TIME_TO_STATUS_FAILURE = new Option(
        "TIME_TO_STATUS_FAILURE",
        30000,
        'Time in MS to allow the server to go without responding to a status command. After this time period DSM will assume the server is unresponsive and force a restart.',
        'number',
      this._parsed['TIME_TO_STATUS_FAILURE'])
  }
  get options(){
    const PublicProperties = Object.getOwnPropertyNames(this).filter(property=>property.match(/^(?!_.*).*/))
    return PublicProperties
  }
  save(){
    let objectToSave = {}
    this.options.map(opt=>{
      if(this[opt].value.toString() !== this[opt].default.toString()){
        objectToSave[opt] = this[opt].value.toString()
      }
    })
    fs.writeFileSync(this._path,ini.encode(objectToSave))
  }
  // SERVER_PORT: new Option(
    //   "SERVER_PORT",
  //   27000,
  //   'Port assigned to the game server',
  //   'number'),
}
// const Write
export { DSMConfig, ServerConfig }