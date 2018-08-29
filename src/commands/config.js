import { ServerConfig, DSMConfig } from '../lib/MainConfig'
import colors from 'colors'

// Command Name *required
export const command = "config"

// Command Alias
export const alias = ""

// Command Options
export const options = [
  {flag:'-s, --set <value>', description:'Sets the config option'},
  {flag:'-c, --config <name>', description:'gets the specified configs value'}
]

// Command Description *required
export const description = "displays or sets config values"

// Command Action *required
export const action = (options, galaxy)=>{
  if(options.set && !options.config){
    console.log('usage: dsm config -c MOTD -s "My new motd text"')
    return
  }
  let ConfigToShow;
  if(galaxy){
    ConfigToShow = new ServerConfig(galaxy.name)
    console.log(colors.blue('------ '+galaxy.name+' Config ------'))
  }else{
    ConfigToShow = new DSMConfig()
    console.log(colors.blue('------ DSM Config ------'))
  }
  if(options.config){
    if(ConfigToShow.options.indexOf(options.config) > -1){
      if(options.set){
        ConfigToShow[options.config].value = options.set
        console.log('Set config option '+colors.green(options.config)+' to:')
        console.log('   '+ ConfigToShow[options.config].value)
        ConfigToShow.save()
      }else{
        DisplayConfig(ConfigToShow[options.config])
      }
    }else{
      console.log(colors.red('No Config option: ')+options.config)
    }
    return
  }
  ConfigToShow.options.map(opt=>{
    DisplayConfig(ConfigToShow[opt])
  })
}

const DisplayConfig = (Config) => {
  console.log(colors.green(Config.name+' - '))
  console.log('    '+Config.description)
  console.log('    Type: '+Config.type)
  console.log('    Default: '+Config.default)
  console.log('    Current: '+Config.value)
}