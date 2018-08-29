import {send} from './send'
import {isWrapperOnline} from '../lib/galaxies'
import Spinner from './helpers/spinner'
// Command Name *required
export const command = "status"

// Command Alias
export const alias = ""

// Command Galaxy Required
export const galaxyRequired = true

// Command Description *required
export const description = "gets status from server"

// Command Action *required
export const action = (options,galaxy)=>{
  if(!isWrapperOnline(galaxy.name)){
    console.log('Server is Offline')
    return;
  }
  const spinner = new Spinner('Checking Status')
  send(galaxy.name,'/status',
    (sock)=>{
      spinner.log('Status Command Sent')
    },
    (data,sock)=>{
      setTimeout(()=>{ //we want the user to enjoy our pretty spinner
        spinner.stop('✔️ Received Status')
        console.log(data.toString())
        sock.destroy()
      },1000)
    }
  )
}