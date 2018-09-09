// We then pipe the main process stdin (which is a readable stream)
// into the child process stdin (which is a writable stream).
import {resolve} from 'path'
import * as globals from '../lib/globals'
var events = require('events').EventEmitter;
var GameServerEmitter = new events.EventEmitter();
import startGameServer from './helpers/startGameServer'
import * as eventHandler from './helpers/eventHandlers'
import { ServerConfig } from '../lib/MainConfig';
import { getOpenPort, isAddressInUse } from '../lib/galaxies';
import db from '../lib/db'

const exitHandler = (message) => {
  if(message)
    console.log(message)
  console.log('DSM: Closing wrapper GoodBye!')
  DB.close()
  process.exit(0)
}

const Config = new ServerConfig(process.argv[2])
const DB = new db(process.argv[2])

console.log('-----Dirty Server Manager-----')
console.log('DSM: Server Wrapper Initilized on pid: ' + process.pid)

let startupParams = Config.STARTUP_PARAMS.value
startupParams += ' --galaxy-name '+process.argv[2]
startupParams += ' --datapath ' + resolve(globals.InstallationDir()+'/dsm/galaxies')

console.log('Getting Ports to use...')
const Ports = getOpenPort()
// if(Ports.avorion !== 27000)
startupParams += ` --port ${Ports.avorion} --steam-query-port ${Ports.steamQuery} --steam-master-port ${Ports.steamMaster}`

console.log('Checking IP address..')
const IP = Config.IP_ADDRESS.value
if(isAddressInUse(IP))
  exitHandler(`DSM ERROR: IP "${IP}" is already in use!`)
if(IP !== 'localhost')
  startupParams += ` --ip ${IP}`

GameServerEmitter.on('spawned',(GameServer)=>{
  console.log('Game Server process initiated.')
  DB.GameServerPid = GameServer.pid
})

DB.WrapperPid = process.pid
DB.ip = IP

console.log('Registering Event handlers..')
// Register events handlers
const handlers = Object.keys(eventHandler)
handlers.map((handle, index) => {
  handle = eventHandler[handle];
  handle.RegisterToWrapperEmitter(GameServerEmitter,Config,DB,process.argv[2])

  console.log('DSM: Event Handler:',handle.name, ', has been registered.')
});

console.log('Starting Galaxy:',process.argv[2])

startGameServer(GameServerEmitter,startupParams, Config.AVORION_DATAPATH.value)

// *************** WRAPPER EMITTER **************** \\

GameServerEmitter.on('error',(err)=>{
  console.log(err)
})

GameServerEmitter.on('crash',(GameServer)=>{
  console.log('Detected server crash, waiting 7 seconds')
  GameServer.write('/save\n'); // send save command just incase
  setTimeout(()=>{
    GameServer.destroy() // will trigger a GameServer Exit event
    console.log('processing events...')
    setTimeout(()=>{
      startGameServer(GameServerEmitter, startupParams, Config.AVORION_DATAPATH.value)
      console.log('Restarted')
    },7000) // 7 seconds
  },7000)
})

GameServerEmitter.on('shutdown',(GameServer)=>{
  GameServer.destroy();// server shutdown, send exit event to wrapper
})


// *************** WRAPPER PROCESS **************** \\


process.on('erro',exitHandler)
process.on('beforeExit',exitHandler)

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', (err)=>{
  console.log(err)
  exitHandler()
});