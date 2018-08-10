import child_process, { exec } from 'child_process';
import path from 'path'
import fs from 'fs'
import localStorage from '../lib/localStorage'
import {GameServerOnline} from '../lib/serverOnline'

// Command Name *required
export const command = "kill"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "kills the server"

// Command Action *required
export const action = ()=>{
  if(!GameServerOnline()){
    console.log('Server is already Offline')
    return;
  }
  const ServerWrapperPid = localStorage.getItem('WrapperPid');
  process.kill(ServerWrapperPid, 'SIGINT');
}