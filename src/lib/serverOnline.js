import localStorage from './localStorage'
// require('is-running')(897245) // returns true if a process with pid 897245 is running
import isRunning from 'is-running'

const GameServerOnline = () => {
  const WrapperPID = localStorage.getItem('WrapperPid')
  if(WrapperPID === null){
    return false
  }
  // this only checks if the wrapper is online, a game server could be inbetween restarts or hanging and will still report its online

  return isRunning(WrapperPID)
}

const WebServerOnline = () => {
  const WebServerPid = localStorage.getItem('WebServerPid')
  if(WebServerPid === null){
    return false
  }

  return isRunning(WebServerPid)
}

export { GameServerOnline, WebServerOnline }