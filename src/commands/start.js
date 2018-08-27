import child_process, { exec } from 'child_process';
import path from 'path'
import Logger from '../lib/logger'
import * as globals from '../lib/globals'
import localStorage from '../lib/localStorage'
import {GameServerOnline} from '../lib/serverOnline'
import {action as intergrate} from './intergrate'
import {send} from './send'
import { stdout as log } from 'single-line-log'
import colors from 'colors'
import fs from 'fs'
const cliSpinners = require('cli-spinners');

// Command Name *required
export const command = "start"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "starts the server"

// Command Action *required
export const action = ()=>{
  if(GameServerOnline()){
    console.log('Server is already online')
    return;
  }
  let index = 0;
  const interval = setInterval(()=>{
    log(colors.blue('---------- '+cliSpinners.dots.frames[index]+' Starting Server ----------'))
    if(cliSpinners.dots.frames.length-1 > index)
    index += 1
    else
      index = 0
  },80)

  Logger.init()
  Logger.clear()
  localStorage.removeItem('WrapperPid')
  intergrate('on') // enable intergration on wrapper startup

  var childFilePath = path.resolve(globals.InstallationDir()+'/dsm/serverWrapper.js');

  var options = {
    detached: true,
    stdio: ['ignore', Logger.stream, Logger.stream],
    execPath: childFilePath
  };
  const steamCmd = child_process.spawn('node',[childFilePath],options)
  // console.log(steamCmd.pid)
  steamCmd.unref();

  let errorIndex = 0
  const Finish = () =>{
    clearInterval(int)
    clearInterval(interval)
    log.clear()
    return
  }
  const int = setInterval(()=>{
    errorIndex += 1
    if(errorIndex >= 25){
      log(colors.red('---------- ERROR ----------'))
      return Finish()
    }
    const LogOutput = fs.readFileSync(Logger.logFile).toString()
    // can this be abstracted into an event emitter that the GameServer and other commands can share
    // by passing in lines of data and the emitter object we wish to send?
    // other commands might not need to listen on the IPC layer and instead listen to the log files events.
    const unrecognisedOption = LogOutput.match(/An exception occurred: unrecognised option.*/)
    if(unrecognisedOption){
      log(colors.red('---------- ERROR ----------'))
      console.log('\n'+unrecognisedOption[0])
      return Finish()
    }
    const ServerStarted = LogOutput.includes('Server startup complete.')
    if(ServerStarted){
      log(colors.blue('---------- ✔️ Server Started ----------'))
      return Finish()
    }
    
  },500)

  // setTimeout(()=>{
  //   send('STARTUP',
  //     (sock)=>{},
  //     (data,sock)=>{
  //       setTimeout(()=>{ //we want the user to enjoy our pretty spinner
  //         clearInterval(interval)
  //         log(colors.blue('---------- ✔️ Server Started ----------'))
  //         log.clear()
  //         sock.destroy()
  //         console.log(data.toString())
  //       },1000)
  //     },
  //     (err)=>{
  //       clearInterval(interval)
  //       log(colors.red('---------- ERROR ----------'))
  //       log.clear()
  //       console.log('\n'+err)
  //     }
  //   )
  // },500)
  
}