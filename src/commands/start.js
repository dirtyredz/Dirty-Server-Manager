import child_process, { exec } from 'child_process';
import path from 'path'
import Logger from '../lib/logger'
import * as globals from '../lib/globals'
import { isWrapperOnline } from '../lib/galaxies'
import { stdout as log } from 'single-line-log'
import colors from 'colors'
import fs from 'fs'
import Spinner from './helpers/spinner'

// Command Name *required
export const command = "start"

// Command Alias
export const alias = ""

// Command Galaxy Required
export const galaxyRequired = true

// Command Description *required
export const description = "starts the server"

// Command Action *required
export const action = (options,galaxy)=>{
  if(isWrapperOnline(galaxy.name)){
    console.log('Server is already online')
    return;
  }
  const spinner = new Spinner('Starting Server')

  const Log = new Logger(galaxy.name,'avorion')
  // intergrate('on') // enable intergration on wrapper startup

  var childFilePath = path.resolve(globals.InstallationDir()+'/dsm/serverWrapper.js');

  var options = {
    detached: true,
    stdio: ['ignore', Log.stream, Log.stream],
    execPath: childFilePath
  };
  const steamCmd = child_process.spawn('node',[childFilePath,galaxy.name],options)
  // console.log(steamCmd.pid)
  steamCmd.unref();

  let errorIndex = 0
  const Finish = () =>{
    clearInterval(int)
    return
  }
  const int = setInterval(()=>{
    errorIndex += 1
    if(errorIndex >= 25){
      spinner.stop('ERROR')
      clearInterval(int)
    }
    const LogOutput = fs.readFileSync(Log.logFile).toString()
    // can this be abstracted into an event emitter that the GameServer and other commands can share
    // by passing in lines of data and the emitter object we wish to send?
    // other commands might not need to listen on the IPC layer and instead listen to the log files events.
    const unrecognisedOption = LogOutput.match(/An exception occurred: unrecognised option.*/)
    if(unrecognisedOption){
      spinner.stop('ERROR')
      console.log(unrecognisedOption[0])
      clearInterval(int)
      return
    }
    const DSMError = LogOutput.match(/DSM ERROR.*/)
    if(DSMError){
      spinner.stop('ERROR')
      console.log(DSMError[0])
      clearInterval(int)
      return
    }
    const ServerStarted = LogOutput.includes('Server startup complete.')
    if(ServerStarted){
      spinner.stop('✔️  Server Started')
      clearInterval(int)
      return
    }
  },500)
}