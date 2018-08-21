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
    const cleanedData = data.replace(/(\u001b|\[0K|\[\?25l|\[\?25h|\[\?)/gm,"")
    console.log(cleanedData)//\u001b[0K\u001b[?25l

    GameServerEmitter.emit('data', data);

    if(data.includes('Memory used by scripts')){
      const dataArr = data.split('\n')
      const newData = dataArr.slice(0,dataArr.findIndex(line=>line.includes('profiling')))
      GameServerEmitter.emit('status', newData.join('\n'));
      return
    }

    if(data.includes('Server startup complete')){
      GameServerEmitter.emit('startup', GameServer);
      return
    }

    if(data.includes('DSM: Player Log Off')){ // DSM: Player Log Off, name:  Dirtyredz  index:  1
      const name = cleanedData.substring(cleanedData.indexOf("  ") + 1,cleanedData.indexOf("  index:"))
      const index = cleanedData.substring(cleanedData.lastIndexOf("  ") + 1,cleanedData.length)
      GameServerEmitter.emit('logOff', name, index)
      return
    }

    if(data.includes('DSM: Player Log On')){
      const name = cleanedData.substring(cleanedData.indexOf("  ") + 1,cleanedData.indexOf("  index:"))
      const index = cleanedData.substring(cleanedData.lastIndexOf("  ") + 1,cleanedData.length)
      GameServerEmitter.emit('logOn', name, index)
      return
    }

    if(data.includes('Server shutdown')){
      GameServerEmitter.emit('shutdown', GameServer);
      return
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