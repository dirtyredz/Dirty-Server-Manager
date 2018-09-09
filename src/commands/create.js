import colors from 'colors'
import startGameServer from '../bin/helpers/startGameServer'
var events = require('events').EventEmitter;
var GameServerEmitter = new events.EventEmitter();
import path from 'path'
import * as globals from '../lib/globals'
import {galaxyExsist} from '../lib/galaxies'
import {readFileSync,writeFileSync } from 'fs'
import ini from 'ini'

// Command Name *required
export const command = "create <galaxy_name>"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "Creates a new galaxy"

// Command Action *required
export const action = (options)=>{
  console.log(colors.blue('----------  Creating Galaxy ----------'))

  if(galaxyExsist(options.env)){
    console.log('This galaxy already exsists')
    return
  }

  startGameServer(
    GameServerEmitter,
    `--datapath ${path.resolve(globals.InstallationDir()+'/dsm/galaxies')} --galaxy-name ${options.env}`,
    '/dsm/avorion',
    'AvorionServer',
    true
  )
  GameServerEmitter.on('startup',(GameServer)=>{
    console.log('Startup succesfull, Shutting down...')
    GameServer.write('/stop\n')
  })
  GameServerEmitter.on('exit',()=>{
    console.log('Shutdown succesfull, Modifing server.ini')
    
    const rawConfig = readFileSync(path.resolve(globals.InstallationDir() + '/dsm/galaxies/'+options.env+'/server.ini'), 'utf-8')

    const parsedConfig = ini.parse(rawConfig);
    parsedConfig.Administration.name = options.env
    parsedConfig.Administration.description = options.env
    writeFileSync(path.resolve(globals.InstallationDir() + '/dsm/galaxies/'+options.env+'/server.ini'), ini.stringify(parsedConfig))
    console.log('Modifications Complete, setting up DSM intergration...')
    
    writeFileSync(path.resolve(globals.InstallationDir() + '/dsm/galaxies/'+options.env+'/config.ini'),'; Visit DirtyServerManager for configuration options.' )
    console.log('DSM Intergration complete.')

    console.log('Galaxy',colors.green(options.env),'Created!!')
    process.exit(0)
  })

}