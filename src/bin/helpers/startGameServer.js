import * as globals from '../../lib/globals'
import path from 'path'

// npm install --global --production windows-build-tools
var pty = require('node-pty');// dont use import, webpack is set to not touch node-pty as it will mess with it.
// https://github.com/Microsoft/node-pty/issues/78




const startGameServer = (GameServerEmitter, startupParams, dataPath, AvorionFileToUse, supressLogs = false) => {

  const windows = {
    exec: path.resolve(globals.InstallationDir()+dataPath+'/bin/'+AvorionFileToUse+'.exe')
  }
  
  const linux = {
    exec: path.resolve(globals.InstallationDir()+dataPath+'/bin/'+AvorionFileToUse)
  }
  // ????
  // execvp(3) failed.: Permission denied
  // execvp(3) failed.: No such file or directory

  // NEED TO SWITCH .EXE for windows and nothing for linux
  const GameServer = pty.spawn(process.platform === "win32" ? windows.exec : linux.exec
    ,startupParams.split(" ")
    ,{cwd: path.resolve(globals.InstallationDir()+dataPath)})
  if(!supressLogs)
    console.log('Started server with these params:',startupParams)
  // if stdout-to-log option is used, dsm cant detect data using GameServer
  // need fall back for tracking logfile output
  GameServerEmitter.emit('spawned', GameServer);

  // Main STDOUT
  GameServer.on('data', function(data) {
    // events to listen to:
    // An exception occurred: unrecognised option

    // Remove unwanted char and log
    const cleanedData = data.replace(/(\u001b|\[0K|\[\?25l|\[\?25h|\[\?)/gm,"")
    if(!supressLogs)
      console.log(cleanedData)//\u001b[0K\u001b[?25l

    GameServerEmitter.emit('data', data);

    if(cleanedData.match(/^An exception occurred:/)){
      GameServerEmitter.emit('exception', cleanedData);
      return
    }

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

    if(cleanedData.match(/^<.*>/)){
      const name = cleanedData.match(/(?<=<).*(?=>)/)
      const message = cleanedData.match(/(?<=> ).*/)
      //add error handling
      GameServerEmitter.emit('chat', name[0],message[0]);
      return
    }

    if(data.includes('DSM: Player Log Off')){ // DSM: Player Log Off, name:  Dirtyredz  index:  1
      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/)
      const index = cleanedData.match(/(?<=index:  ).*/)
      if(name && index){
        GameServerEmitter.emit('logoff', name[0], index[0])
        return
      }
    }

    if(data.includes('DSM: Player Log On')){
      const name = cleanedData.match(/(?<=name:  ).*(?=  index)/)
      const index = cleanedData.match(/(?<=index:  ).*/)
      if(name && index){
        GameServerEmitter.emit('logon', name[0], index[0])
        return
      }
    }

    if(data.includes('Server shutdown')){
      GameServerEmitter.emit('shutdown', GameServer);
      return
    }

    if(data.includes('Creating minidump') || data.includes('Entered exception handler') || data.includes('Server startup FAILED')){
      GameServerEmitter.emit('crash', GameServer);
      return
    }

    // Server startup FAILED
  });

  GameServer.on('error',(error)=>{
    if(!supressLogs)
      console.log('Server Error:',error)
  })

  // emitted when process exits or when /stop is used
  GameServer.on('exit',(code)=>{
    if(!supressLogs)
      console.log('exit',code)
    // code == 0, server was shutdown, or failed to start
    if(code === 0){
      GameServerEmitter.emit('exit');
    }else if(code === 1){// code == 1, server process crashed
      GameServerEmitter.emit('exit');
      GameServerEmitter.emit('crash',GameServer);
    }
  })
}
export default startGameServer