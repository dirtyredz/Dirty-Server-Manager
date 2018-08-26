import config from '../../lib/MainConfig'
import prettyMs from 'pretty-ms'
let RespondedToStatus = true;
let FailureTimer = false;
let IntervalTimer = false;

export const name = 'Status Checker'

export const RegisterToWrapperEmitter = (GameServerEmitter) => {
  GameServerEmitter.on('startup', function(GameServer){
    console.log('DSM: Initilized Status Checker, checking every ' + prettyMs(config.STATUS_INTERVAL_MS.value)+'\n')

    IntervalTimer = setInterval(()=>{
      console.log('DSM: Performing status check')
      RespondedToStatus = false;
      GameServer.write('/status\n');
      FailureTimer = setTimeout(()=>{
        console.log('DSM: FAILED TO GET STATUS')
        GameServerEmitter.emit('crash',GameServer)
        // Emit crash event, which will kill GameServer
      },(1000 * 30)) // 30 seconds
      // is 30 seconds to short?
      // attach config option
    },config.STATUS_INTERVAL_MS.value)
  });

  GameServerEmitter.on('status', function(data){
    RespondedToStatus = true;
    if(FailureTimer !== false)
      clearTimeout(FailureTimer)
    FailureTimer = false
  });

  // Clean up dont want to leave ant intervals or timers left around
  GameServerEmitter.on('exit', ()=>{
    RespondedToStatus = true;
    if(FailureTimer !== false)
      clearTimeout(FailureTimer)
      FailureTimer = false

    if(IntervalTimer !== false)
      clearTimeout(IntervalTimer)
    IntervalTimer = false
  })
}