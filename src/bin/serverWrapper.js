import path from 'path'
import localStorage from '../lib/localStorage'
import * as globals from '../lib/globals'
var events = require('events').EventEmitter;
var GameServerEmitter = new events.EventEmitter();
import startGameServer from './helpers/startGameServer'
import * as eventHandler from './helpers/eventHandlers'

console.log('-----Dirty Server Manager-----')
console.log('DSM: Server Wrapper Initilized on pid: ' + process.pid)

// Register events handlers
const handlers = Object.keys(eventHandler)
handlers.map((handle, index) => {
  handle = eventHandler[handle];
  handle.RegisterToWrapperEmitter(GameServerEmitter)

  console.log('DSM: Event Handler:',handle.name, ', has been registered.')
});

// We then pipe the main process stdin (which is a readable stream)
// into the child process stdin (which is a writable stream).

localStorage.setItem('WrapperPid',process.pid)

// var lockFile = require('lockfile')
// // opts is optional, and defaults to {}
// lockFile.lock(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), {}, function (er) {
//   // if the er happens, then it failed to acquire a lock.
// })

// Start the game
startGameServer(GameServerEmitter)

GameServerEmitter.on('error',(err)=>{
  console.log(err)
})

GameServerEmitter.on('crash',(GameServer)=>{
  console.log('Detected server crash, waiting 7 seconds')
  GameServer.write('/save\n'); // send save command just incase
  setTimeout(()=>{
    GameServer.destroy() // will trigger a GameServer Exit event
    setTimeout(()=>{
      console.log('processing events...')
      startGameServer(GameServerEmitter)
      console.log('Restarted')
    },7000) // 7 seconds
  },7000)
})

GameServerEmitter.on('shutdown',(GameServer)=>{
  GameServer.destroy();// server shutdown, send exit event to wrapper
})

const exitHandler = () => {
  console.log('DSM: Closing wrapper GoodBye!')
  localStorage.removeItem('WrapperPid')
  localStorage.removeItem('GameServerPid')
  process.exit(0)
}

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