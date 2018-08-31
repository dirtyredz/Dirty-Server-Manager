import child_process, { exec } from 'child_process';
import path from 'path'
import * as globals from '../lib/globals'
import {GameServerOnline} from '../lib/serverOnline'
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
  if(GameServerOnline()){
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
// [S_API FAIL] SteamAPI_Init() failed; SteamAPI_IsSteamRunning() failed.

// dlopen failed trying to load:
// steamclient.so
// with error:
// steamclient.so: wrong ELF class: ELFCLASS32
// [S_API FAIL] SteamAPI_Init() failed; unable to locate a running instance of Steam, or a local steamclient.so.
// SteamGameServer_Init call failed

// Error starting steam-based networking. Falling back to standard TCP/UDP protocols.

// The server will not be authenticated via Steam and won't show up in public server lists.

// WARNING: The fallback TCP/UDP protocols are deprecated and potentially UNSAFE!
//          If you're running a dedicated server, this is HIGHLY discouraged!
//          Use steam networking instead; Enable with --use-steam-networking 1
// Warning: No RCON password set. RCON disabled.