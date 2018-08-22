import child_process from 'child_process';
import path from 'path'
import Logger, {webStream} from '../lib/logger'
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
  Logger.clearWeb()
  var childFilePath = path.resolve(globals.InstallationDir()+'/dsm/webServer.js');

  var options = {
    detached: true,
    stdio: ['ignore', webStream, webStream],
    execPath: childFilePath
  };
  const steamCmd = child_process.spawn('node',[childFilePath],options)
  steamCmd.unref();
}