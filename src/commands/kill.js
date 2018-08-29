import { isWrapperOnline } from "../lib/galaxies";
import db from "../lib/db";

// Command Name *required
export const command = "kill"

// Command Alias
export const alias = ""

// Command Galaxy Required
export const galaxyRequired = true

// Command Description *required
export const description = "kills the server"

// Command Action *required
export const action = (options,galaxy)=>{
  if(!isWrapperOnline(galaxy.name)){
    console.log('Server is already offline')
    return;
  }
  const DB = new db(galaxy.name)
  const Pid = DB.WrapperPid
  console.log('Killing pid:',Pid)
  process.kill(Pid, 'SIGINT');
  DB.close
}