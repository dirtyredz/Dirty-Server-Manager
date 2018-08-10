import localStorage from '../../lib/localStorage'
// require('is-running')(897245) // returns true if a process with pid 897245 is running
import isRunning from 'is-running'
const serverOnline = () => {
  const WrapperPID = localStorage.getItem('WrapperPid')
  if(WrapperPID === null){
    return false
  }

  return isRunning(WrapperPID)
}
export default serverOnline