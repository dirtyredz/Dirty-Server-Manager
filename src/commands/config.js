import child_process, { exec } from 'child_process';
import path from 'path'
import Config from '../lib/MainConfig'
import * as globals from '../lib/globals'
import localStorage from '../lib/localStorage'
import {GameServerOnline, WebServerOnline} from '../lib/serverOnline'
import {action as intergrate} from './intergrate'
import colors from 'colors'

// Command Name *required
export const command = "config"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Options
export const options = [
  {flag:'-s, --set <value>', description:'Sets the config option'},
  {flag:'-c, --config <name>', description:'gets the specified configs value'},
]

// Command Description *required
export const description = "displays or sets config values"

// Command Action *required
export const action = (options)=>{
  if(options.set && !options.config){
    console.log('usage: dsm config -c MOTD -s "My new motd text"')
    return
  }
  console.log(colors.blue('------ Config ------'))
  const ConfigNames = Object.keys(Config)
  if(options.config){
    if(ConfigNames.indexOf(options.config) > -1){
      if(options.set){
        Config[options.config].value = options.set
        console.log('Set config option '+colors.green(options.config)+' to:')
        console.log('   '+ options.set)
      }else{
        DisplayConfig(options.config)
      }
    }else{
      console.log(colors.red('No Config option: ')+options.config)
    }
    return
  }
  ConfigNames.map(opt=>{
    DisplayConfig(opt)
  })
}

const DisplayConfig = (opt) => {
  console.log(colors.green(opt+' - '))
  console.log('    '+Config[opt].description)
  console.log('    Type: '+Config[opt].type)
  console.log('    Default: '+Config[opt].default)
  console.log('    Current: '+Config[opt].value)
}