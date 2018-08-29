import {isWrapperOnline, isGameServerOnline} from '../lib/galaxies'
import {send} from './send'
import Spinner from './helpers/spinner';

// Command Name *required
export const command = "stop"

// Command Alias
export const alias = ""

// Command Galaxy Required
export const galaxyRequired = true

// Command Description *required
export const description = "stops the server"

// Command Action *required
export const action = (options,galaxy)=>{
  if(!isWrapperOnline(galaxy.name)){
    console.log('Server is already Offline')
    return;
  }
  if(!isGameServerOnline(galaxy.name)){
    console.log('Wrapper is online, but GameServer is not, Server might be in a state of transition (restart/crash).')
    console.log('Use the KILL command to force shutdown the wrapper, or wait until the server is out of its transition phase.')
    return;
  }
  const spinner = new Spinner('Stopping Server')
  setTimeout(()=>{ // pretty spinner
    send(galaxy.name,'/stop',
      (sock)=>{
        spinner.log('Stop Command Sent')
      },
      (data,sock)=>{
        spinner.stop('Stop Succesful')
        sock.destroy()
      }
    )
  },1000)
}