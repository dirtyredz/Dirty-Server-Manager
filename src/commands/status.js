import {send} from './send'
import {GameServerOnline} from '../lib/serverOnline'
import { stdout as log } from 'single-line-log'
import colors from 'colors'
const cliSpinners = require('cli-spinners');
// Command Name *required
export const command = "status"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "gets status from server"

// Command Action *required
export const action = ()=>{
  if(!GameServerOnline()){
    console.log('Server is Offline')
    return;
  }
  let interval, index = 0;
  send('/status',
    (sock)=>{
      // log(colors.green('---Checking Status---'))
      interval = setInterval(()=>{
        log(colors.blue('---------- '+cliSpinners.dots.frames[index]+' Checking Status ----------'))
        if(cliSpinners.dots.frames.length-1 > index)
        index += 1
        else
          index = 0
      },80)
    },
    (data,sock)=>{
      setTimeout(()=>{ //we want the user to enjoy our pretty spinner
        clearInterval(interval)
        log(colors.blue('---------- ✔️ Received Status ----------'))
        log.clear()
        console.log('\n'+data.toString())
        sock.destroy()
      },1000)
    }
  )
}