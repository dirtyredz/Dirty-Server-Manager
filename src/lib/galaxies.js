import { InstallationDir } from './globals'
import { lstatSync, readdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'
import db from './db'
import isRunning from 'is-running'
import netstat from 'node-netstat'

export const getGalaxies = (dontParseDB = false) => {
  const GalaxiesDir = resolve(InstallationDir()+'/dsm/galaxies')
  return readdirSync(GalaxiesDir)
  .map(name => {
    return {path: join(GalaxiesDir, name), name}
  })
  .filter(fileDir=>lstatSync(fileDir.path).isDirectory())
  .map(galaxy=>{
    // if(!dontParseDB){
    //   const DB = new db(galaxy.name)
    //   if(!isRunning(DB.WrapperPid)){
    //     DB.WrapperPid = 0
    //     DB.GameServerPid = 0
    //     DB.ip = 0
    //   }
    //   DB.close()
    // }
    return galaxy
  })
}

export const galaxyExsist = (galaxyName) => {
  if(typeof galaxyName !== 'string')
    return false
  const GalaxiesDir = resolve(InstallationDir()+'/dsm/galaxies')
  const GalaxyDir = join(GalaxiesDir, galaxyName)
  if(existsSync(GalaxyDir))
    return lstatSync(GalaxyDir).isDirectory()
  return false
}

export const count = () => {
  return getGalaxies(true).length
}
export const getSingleGalaxy = () => {
  return getGalaxies()[0]
}

export const getGalaxySync = (name) => {
  if(!galaxyExsist(name)){
    if(count() == 1 && typeof name == 'undefined'){
      return getSingleGalaxy()
    }
    return false
  }
  if(count() > 1 && !name){
    return false
  }
  if(count() == 0){
    return false
  }
  const GalaxiesDir = resolve(InstallationDir()+'/dsm/galaxies')
  return {path: join(GalaxiesDir, name), name}
}

export const getGalaxy = (name,callback) => {
  if(typeof callback !== 'function')
    throw new Error('Callback is required')
  if(!galaxyExsist(name)){
    if(count() == 1 && typeof name == 'undefined'){
      callback(null,getSingleGalaxy())
      return true
    }
    callback({code: 1, message: 'Galaxy does not exsist'})
    return false
  }
  if(count() > 1 && !name){
    callback({code: 1, message: 'More then one galaxy available, please select a galaxy.'})
    return false
  }
  if(count() == 0){
    callback({code: 3, message: 'No Galaxies Available.'})
    return false
  }
  const GalaxiesDir = resolve(InstallationDir()+'/dsm/galaxies')
  callback(null, {path: join(GalaxiesDir, name), name})
  return true
}

export const isWrapperOnline = (GalaxyName) => {
  if(typeof GalaxyName !== 'string')
    throw new Error('Required string Galaxy Name')
  const DB = new db(GalaxyName)
  const PID = DB.WrapperPid
  const Running = PID !== 0 && isRunning(PID)
  DB.close()
  return Running
}

export const isGameServerOnline = (GalaxyName) => {
  if(typeof GalaxyName !== 'string')
    throw new Error('Required string Galaxy Name')

  const DB = new db(GalaxyName)
  const PID = DB.GameServerPid
  const Running = PID !== 0 && isRunning(PID)
  DB.close()
  return Running
}

export const getOpenPort = () => {
  const ports = [27020,27120,27220,27320,27420,27520,27620,27720,27820,27920]
  netstat({
    sync: true,
    done: (err)=>{
      if(err) console.log(err)
    }
  }, function (data) {
    let index = ports.indexOf(data.local.port)
    if(index > -1)
      ports.splice(index,1)
  });
  const portNum = (ports[0] - 27020) / 100
  return {
    avorion: 27000 + (100 * portNum),
    steamQuery: 27020 + (100 * portNum),
    steamMaster: 27021 + (100 * portNum),
  }
}

export const isAddressInUse = (ip) => {
  return typeof getGalaxies().find(galaxy=>{
    const DB = new db(galaxy.name)
    const IP = DB.ip
    DB.close()
    return IP == ip
    return false
  }) != 'undefined'
}