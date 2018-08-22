import config from '../../lib/MainConfig'
import prettyMs from 'pretty-ms'
let RespondedToStatus = true;
let FailureTimer = false;
let IntervalTimer = false;

const RegisterToWrapperEmitter = (GameServerEmitter) => {
  GameServerEmitter.on('startup', function(GameServer){
    GameServer.write('/echo DSM: Initilized Status Checker, checking every ' + prettyMs(config.STATUS_INTERVAL_MS)+'\n')
    IntervalTimer = setInterval(()=>{
      console.log('INTERVAL')
      RespondedToStatus = false;
      GameServer.write('/status\n');
      FailureTimer = setTimeout(()=>{
        console.log('/FAILED TO GET STATUS')
        GameServerEmitter.emit('crash',GameServer)
        // Emit crash event, which will kill GameServer
      },(1000 * 30)) // 30 seconds
    },config.STATUS_INTERVAL_MS)
  });

  GameServerEmitter.on('status', function(data){
    RespondedToStatus = true;
    if(FailureTimer !== false)
      clearTimeout(FailureTimer)
    FailureTimer = false
  });

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

export default { RegisterToWrapperEmitter }