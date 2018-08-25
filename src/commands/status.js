import net from 'net'
import {send} from './send'
import {GameServerOnline} from '../lib/serverOnline'

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
  var sock = net.connect(27020)
  sock.on('data', function (data) {
    console.log('27003',data)
  });
  send('/status',
    (sock)=>{
      console.log('Sent status command, Waiting....')
    },
    (data,sock)=>{
      console.log('Received: '+data)
      sock.destroy()
    }
  )
}