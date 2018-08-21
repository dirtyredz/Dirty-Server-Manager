import path from 'path'
import localStorage from '../lib/localStorage'
import * as globals from '../lib/globals'
var events = require('events').EventEmitter;
var GameServerEmitter = new events.EventEmitter();
import ipcLayer from './helpers/ipcLayer'
ipcLayer.RegisterToWrapperEmitter(GameServerEmitter)
import statusChecker from './helpers/statusChecker'
statusChecker.RegisterToWrapperEmitter(GameServerEmitter)
import startGameServer from './helpers/startGameServer'

// We then pipe the main process stdin (which is a readable stream)
// into the child process stdin (which is a writable stream).

console.log('-----Dirty Server Manager-----')
console.log('DSM: Server Wrapper Initilized on pid: ' + process.pid)

localStorage.setItem('WrapperPid',process.pid)


// var lockFile = require('lockfile')
// // opts is optional, and defaults to {}
// lockFile.lock(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), {}, function (er) {
//   // if the er happens, then it failed to acquire a lock.
// })

// Start the game
startGameServer(GameServerEmitter)

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

process.on('beforeExit',()=>{
  console.log('DSM: Closing wrapper GoodBye!')
  localStorage.clear()
  process.exit(0)
})

