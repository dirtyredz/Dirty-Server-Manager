import localStorage from './localStorage'
// require('is-running')(897245) // returns true if a process with pid 897245 is running
import isRunning from 'is-running'

const GameServerOnline = () => {
  const WrapperPID = localStorage.getItem('WrapperPid')
  if(WrapperPID === null){
    return false
  }

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