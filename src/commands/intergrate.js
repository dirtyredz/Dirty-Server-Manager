import path from 'path'
import * as globals from '../lib/globals'
import fs from 'fs'
import Config from '../lib/MainConfig'

// Command Name
export const command = "intergrate <onOff>"

// Command Version
export const version = "0.0.1"

// Command Alias
export const alias = ""

// Command Description
export const description = "enables/disables intergration"

// Command Action
export const action = (onOff)=>{
  const ServerFile = path.resolve(globals.InstallationDir()+'/avorion/data/scripts/server/server.lua')
  const DSMFile = path.resolve(globals.InstallationDir()+'/avorion/dsm.lua')

  RemoveDSM(ServerFile,()=>{
    const dsm = `\nlocal s, b = pcall(require, 'dsm') if s then if b.onStartUp then local a = onStartUp; onStartUp = function(c) a(c); b.onStartUp(c); end end else print(b); end --Added by DSM\n`

    fs.writeFile(ServerFile, dsm,{flag: 'a'},(err)=>{
      if (err){
        throw err;
      }
      console.log('Attached DSM Server mod to server.lua')
    })

    fs.readFile(path.resolve(globals.InstallationDir()+'/dsm/dsm.lua'), 'utf8', function(err, data){
      if (err){
          throw err;
      }
      const newData = data.replace("__MOTD__",Config.MOTD)
      fs.writeFile(DSMFile, newData,(err)=>{
        if (err){
          throw err;
        }
      })
    })
  })

}

export const RemoveDSM = (avorionFile,callback) => {
  fs.readFile(avorionFile, 'utf8', function(err, data){
    if (err){
        throw err;
    }
    // Remove all DSM injected lines
    let removedDSM = data.split("\n").filter(line=>!line.includes('--Added by DSM'))
    fs.writeFile(avorionFile, removedDSM.join('\n'),(err)=>{
      if (err){
        throw err;
      }
      console.log('Removed DSM intergration.')
      if(typeof callback === 'function'){
        callback()
      }
    })
  })
}