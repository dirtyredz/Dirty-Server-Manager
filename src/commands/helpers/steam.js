import fs from 'fs'
import wget from 'wget-improved'
import tar from 'tar'
import { DSMConfig } from '../../lib/MainConfig'
import { stdout as log } from 'single-line-log'
import extract from 'extract-zip'
import path from 'path'
import * as globals from '../../lib/globals'

const SteamDir = new DSMConfig().STEAM_DIR.value
const windows = {
  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip',
  output: path.resolve(globals.InstallationDir()+'/'+ SteamDir+'/steamcmd.zip'),
  unpack: (callback) => {
            extract(path.resolve(globals.InstallationDir()+'/'+ SteamDir+'/steamcmd.zip'),
                  {dir: path.resolve(globals.InstallationDir()+'/'+ SteamDir+'/'),}, function (err) {
              callback();
            })
          }
}

const linux = {
  source: 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz',
  output: path.resolve(globals.InstallationDir()+'/'+ SteamDir+'/steamcmd_linux.tar'),
  unpack: (callback) => {
            tar.x({
              cwd: path.resolve(globals.InstallationDir()+'/'+ SteamDir+'/'),
              file: SteamDir+'/steamcmd_linux.tar'
            }).then(callback)
          }
}


const installSteam = () => {
  return new Promise((resolve,reject)=>{
    // Create Steam directory
    fs.mkdir(path.resolve(globals.InstallationDir()+'/'+ SteamDir),()=>{
      console.log("Steam directory created at: " + path.resolve(globals.InstallationDir()+'/'+ SteamDir))
      const options = {
        gunzip: true
      };
      var isWin = process.platform === "win32";
      // Download Steam command
      let download = wget.download(isWin ? windows.source : linux.source, isWin ? windows.output : linux.output, options);
      download.on('error', function(err) {
          reject(err)
      });
      download.on('end', function(output) {
        // extract tarball
        log.clear()
        const completed = () => {
          resolve('Finished Extracting/Unpacking SteamCmd')
        }
        if(isWin)
          windows.unpack(completed)
          else
            linux.unpack(completed)
      });
      download.on('progress', function(progress) {
        typeof progress === 'number'
        log('Downloading Steam: [' + (progress * 100) + '%]');
      });
    })
  })
}

export default installSteam;