import child_process, { exec } from 'child_process';
import path from 'path'
import fs from 'fs'
import localStorage from '../lib/localStorage'
import {GameServerOnline} from '../lib/serverOnline'
import {send} from './send'

// Command Name *required
export const command = "stop"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "stops the server"

// Command Action *required
export const action = ()=>{
  if(!GameServerOnline()){
    console.log('Server is already Offline')
    return;
  }
  send('/stop',
    (sock)=>{
      console.log('Sent stop command, Waiting....')
    },
    (data,sock)=>{
      console.log('Received: '+data)
      sock.destroy()
    }
  )
}