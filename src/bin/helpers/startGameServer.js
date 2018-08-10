import * as globals from '../../lib/globals'
import path from 'path'
// npm install --global --production windows-build-tools
var pty = require('node-pty');// dont use import, webpack is set to not touch node-pty as it will mess with it.

const startGameServer = (GameServerEmitter) => {
  const GameServer = pty.spawn(path.resolve(globals.InstallationDir()+'/avorion/bin/AvorionServer.exe')
  ,['--galaxy-name','avorion_galaxy','--admin','avorion_admin']
  ,{cwd: process.cwd()+'\\avorion'})

  GameServerEmitter.emit('spawned', GameServer);

  GameServer.write('DSM IPC Initializing...\n');

  GameServer.on('error',(err)=>{
    console.log(err)
  })
  // Main STDOUT
  GameServer.on('data', function(data) {
    // Remove unwanted char and log
    console.log(data.replace(/(\u001b|\[0K|\[\?25l|\[\?25h|\[\?)/gm,""))//\u001b[0K\u001b[?25l

    GameServerEmitter.emit('data', data);

    if(data.includes('Memory used by scripts')){
      GameServerEmitter.emit('status', data);
    }

    if(data.includes('Server startup complete')){
      GameServerEmitter.emit('startup', GameServer);
    }

    if(data.includes('Server shutdown')){
      GameServerEmitter.emit('shutdown', GameServer);
    }
  });


  GameServer.on('error',(error)=>{
    console.log('Server Error:',error)
  })

  // emitted when process exits or when /stop is used
  GameServer.on('exit',(code)=>{
    console.log('exit',code)
    // code == 0, server was shutdown
    // GameServerEmitter.emit('');
    if(code === 0){
      GameServerEmitter.emit('exit');
    }else if(code === 1){// code == 1, server process crashed
      GameServerEmitter.emit('exit');
      GameServerEmitter.emit('crash',GameServer);
    }
  })
}
export default startGameServer