import child_process from 'child_process';
import path from 'path'
import {Web} from '../lib/logger'
import localStorage from '../lib/localStorage'
import {WebServerOnline} from '../lib/serverOnline'
import * as globals from '../lib/globals'
// Command Name *required
export const command = "start-web"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "starts the web server"

// Command Action *required
export const action = ()=>{
  if(WebServerOnline()){
    console.log('Server is already online')
    return;
  }
  console.group('Starting Web Server')
  var childFilePath = path.resolve(globals.InstallationDir()+'/dsm/webServer.js');
  Web.init()
  Web.clear()
  localStorage.removeItem('WebServerPid')

  var options = {
    detached: true,
    stdio: ['ignore', Web.stream, Web.stream],
    execPath: childFilePath
  };
  const steamCmd = child_process.spawn('node',[childFilePath],options)
  steamCmd.unref();
}