import * as globals from '../../lib/globals'
import path from 'path'

// npm install --global --production windows-build-tools
var pty = require('node-pty');// dont use import, webpack is set to not touch node-pty as it will mess with it.

// https://github.com/Microsoft/node-pty/issues/78

// Allowed options:
//   --help                         show help message
//   --version                      print out version and exit
//   --port arg                     listening port of the server
//   --query-port arg               internal game query port of the server,
//                                  default: 27003
//   --steam-query-port arg         steam query port of the server, default: 27020
//   --steam-master-port arg        steam master server port of the server,
//                                  default: 27021
//   --ip arg                       binds the server to a specific IP (steam
//                                  networking only)
//   --max-players arg              maximum number of online players
//   --save-interval arg            timestep between savings
//   --server-name arg              server name, will be displayed when queried
//   --pausable arg                 whether or not the server can be paused by
//                                  admins when there's only a single player
//                                  online
//   --galaxy-name arg              galaxy name, appended to datapath, final path
//                                  will be [datapath]/[galaxyname]
//   --datapath arg                 folder the galaxies will be stored in, will be
//                                  prepended to galaxy name
//   --admin arg                    steam id(s) of the administrator(s) to add to
//                                  the server
//   --seed arg                     seed of the server
//   --difficulty arg               difficulty of the server, allowed values are:
//                                  -3, -2, -1, 0, 1, 2, 3
//   --infinite-resources arg       enable infinite resources for all players
//   --collision-damage arg         amount of damage done to an object on
//                                  collision, from 0 to 1. 0: no damage, 1: full
//                                  damage. default: 1
//   --same-start-sector arg        indicate if all players should start in the
//                                  same sector
//   --alive-sectors-per-player arg the amount of sectors with player property
//                                  that are simulated in addition to that
//                                  player's current sector
//   --safe-player-input arg        enable to guarantee more cheat-safety, but
//                                  players may experience more lag
//   --threads arg                  specifies the number of threads used to update
//                                  the sectors
//   --generator-threads arg        specifies the number of threads used to
//                                  generate sectors
//   -t [ --trace ] arg             tracing options. Can be more than one. Allowed
//                                  values are: network scripting threading io
//                                  database input error warning exception user
//                                  game system debug sound gl all
//   --exit-on-last-admin-logout    shut down when last administrator logs out
//   --stderr-to-log                redirect std error output from console to log
//                                  file
//   --stdout-to-log                redirect std console output from console to
//                                  log file
//   --public arg                   indicate if the server should allow other
//                                  players to join
//   --listed arg                   indicate if the server should show up on
//                                  public server lists
//   --authentication arg           enables authentication of players
//   --use-steam-networking arg     use steam networking and authentication (if
//                                  enabled) for users
//   --immediate-writeout arg       immediately write player data to disk when it
//                                  changes. decreases performance during sector
//                                  changes, but makes server data more consistent
//                                  on crash.
//   --max-logs arg                 maximum number of logs to keep around, 0 for
//                                  infinite, default: 15
//   --rcon-ip arg                  binds the rcon server to a specific IP
//   --rcon-port arg                rcon port, default: 27015
//   --rcon-password arg            sets the password for the rcon interface.
//                                  without password, rcon is disabled.
//   --send-crash-reports arg       when enabled, the server will send anonymous
//                                  system specs and a crash report when it
//                                  crashes.
const startGameServer = (GameServerEmitter, startupParams, supressLogs = false) => {
  // Console(stdout[, stderr][, ignoreErrors])

  const GameServer = pty.spawn(path.resolve(globals.InstallationDir()+'/dsm/avorion/bin/AvorionServer.exe')
    ,startupParams.split(" ")
    ,{cwd: path.resolve(globals.InstallationDir()+'/dsm/avorion')})
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