import child_process, { exec } from 'child_process';
import path from 'path'
import Logger from '../lib/logger'
import * as globals from '../lib/globals'
import localStorage from '../lib/localStorage'
import {GameServerOnline, WebServerOnline} from '../lib/serverOnline'
import {action as intergrate} from './intergrate'
import colors from 'colors'

// Command Name *required
export const command = "pid"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "gets pid information"

// Command Action *required
export const action = ()=>{
  const WrapperPid = localStorage.getItem('WrapperPid') || colors.red('Offline')
  const GameServerPid = localStorage.getItem('GameServerPid') ||  colors.red('Offline')
  const WebServerPid = localStorage.getItem('WebServerPid') ||  colors.red('Offline')


  console.log(colors.blue('------ PID Info ------'))
  console.log('Wrapper:',WrapperPid && colors.green(WrapperPid))
  console.log('Server:',GameServerPid && colors.green(GameServerPid))
  console.log('Web Server:',WebServerPid && colors.green(WebServerPid))
}