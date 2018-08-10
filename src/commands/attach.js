import net from 'net'
import readline from 'readline'
import * as globals from '../lib/globals'
import os from 'os'
import path from 'path'
import {GameServerOnline} from '../lib/serverOnline'

// Command Name *required
export const command = "attach"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "attaches to server terminal (kinda)"

// Command Action *required
export const action = (message)=>{
  if(!GameServerOnline()){
    console.log('Server is Offline')
    return;
  }
  var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))
  sock.write("ATTACH",'utf8',()=>{
    console.log('ATTACHING...')
  })
  sock.on('data', function (data) {
    console.log(`${data}`); // Write data from server to terminal
  });

  const rl = readline.createInterface({
    input: process.stdin // hook into terminal
  });

  rl.on('line', (line) => {
    sock.write(line,'utf8') // Write terminal input to the server
  });
  sock.on('end', function (data) {
    console.log(`IPC layer has been shutdown (Server Shutdown)`);
    sock.destroy()
    rl.close()
    process.stdin.destroy()
  });
}