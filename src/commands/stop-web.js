import localStorage from '../lib/localStorage'
import {WebServerOnline} from '../lib/serverOnline'

// Command Name *required
export const command = "stop-web"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "stops the web server"

// Command Action *required
export const action = ()=>{
  if(!WebServerOnline()){
    console.log('Server is already offline')
    return;
  }
  const WebServerPID = localStorage.getItem('WebServerPid');
  process.kill(WebServerPID, 'SIGINT');
}