import net from 'net'
import os from 'os'
import * as globals from '../lib/globals'
import path from 'path'
import { isWrapperOnline, isGameServerOnline } from '../lib/galaxies';

// Command Name *required
export const command = "send <message>"

// Command Alias
export const alias = ""

// Command Galaxy Required
export const galaxyRequired = true

// Command Description *required
export const description = "sends command to server"

// Command Action *required
export const action = (options,galaxy)=>{
  if(!isWrapperOnline(galaxy.name)){
    console.log('Server is Offline')
    return;
  }
  if(!isGameServerOnline(galaxy.name)){
    console.log('Wrapper is online, but GameServer is not, Server might be in a state of transition (restart/crash).')
    return;
  }
  // var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))
  // sock.write(`${message}`,'utf8',()=>{
  //   console.log(`Message: ${message}`);
  // })
  // sock.on('data', function (data) {
  //   console.log(`Response: ${data}`);
  //   sock.destroy()
  // });
  console.log(options)
  // send('SENDING'+message,
  //   (sock)=>{
  //     console.log(`Message: ${message}`);
  //   },
  //   (data, sock)=>{
  //     console.log(`Response: ${data}`);
  //     sock.destroy()
  //   }
  // )
}

export const send = (GalaxyName,message,write,response,error) => {
  var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm_'+GalaxyName+'.sock')),()=>{
    sock.write(`${message}`,'utf8',()=>{
      write(sock)
    })
    sock.on('data', function (data) {
      response(data,sock)
    });
  })
  sock.on('error', function (err){
    if(typeof error =='function'){
      if(err.errno === 'ENOENT'){
          error('Could not connect to the server.')
      }else{
        error(err)
      }
    }else{
      console.log(err)
    }
  })
}