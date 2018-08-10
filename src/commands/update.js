import MainConfig from '../lib/MainConfig'
import child_process, { exec } from 'child_process';
import path from 'path'
import * as globals from '../lib/globals'
import isRunning from './helpers/serverOnline'
import installSteam from './helpers/steam'
import {install} from './helpers/avorion'
 
var isWin = process.platform === "win32";
// Command Name
export const command = "install"

// Command Alias
export const alias = ""

// Command Description
export const description = "starts the server"

// Command Action
export const action = ()=>{
  if(isRunning()){
    console.log('A server is currently running.')
    return;
  }
  installSteam().then(res=>{
    console.log(res)
    install()
  }).catch(err=>{
    console.log(err)
  })
}