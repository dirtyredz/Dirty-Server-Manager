import MainConfig from '../../lib/MainConfig'
import path from 'path'
import * as globals from '../../lib/globals'
import readline from 'readline'
import child_process, { exec } from 'child_process';
const cliSpinners = require('cli-spinners');
import colors from 'colors'

import { createMultiline } from './createSingleLineLogger';
const windows = {
  exec: path.resolve(globals.InstallationDir()+'/'+MainConfig.STEAM_DIR+'/steamcmd.exe'),
  args: []
}

const linux = {
  exec: path.resolve(globals.InstallationDir()+'/'+MainConfig.STEAM_DIR+'/steamcmd.sh'),
  args: []
}

const multiLog = createMultiline(5)
const steamCmd = (onFinish) => {
  var isWin = process.platform === "win32";

  const avorionPath = path.resolve(globals.InstallationDir()+'/avorion')
  const Beta = MainConfig.BETA ? ' -beta beta' : ''
  let steamArgs = ['+login anonymous', `+force_install_dir ${avorionPath}`, `+app_update 565060${Beta}` , 'validate', '+quit']
  // Continue using config option for steam directory?
  const steamCmd = child_process.spawn(isWin ? windows.exec : linux.exec,steamArgs)
  const rl = readline.createInterface({
    input: steamCmd.stdout
  });

  rl.on('line', (line) => {
    // console.log(line);
    multiLog.log(line)
    // spinner.text = line
  });
  // steamCmd.stderr.on('data', (data) => {
  //   console.log(data);
  // });

  steamCmd.on('close', (code) => {
    console.groupEnd();
    rl.close()
    onFinish()
  });
}

const update = () => {
  console.group("Updating Avorion ...")
  steamCmd(()=>console.log('Finished Updating Avorion.'))

}
const install = () => {
  multiLog.writeTitle(colors.green('---------- Installing Avorion ----------'))
  let index = 0
  let inter = setInterval(()=>{
    multiLog.writeTitle(colors.green('---------- '+cliSpinners.dots.frames[index]+' Installing Avorion ----------'))
    if(cliSpinners.dots.frames.length-1 > index)
    index += 1
    else
      index = 0
  },80)
  steamCmd(()=>{
    clearInterval(inter)
    multiLog.writeTitle(colors.green('---------- Avorion Installed -----------'))
    multiLog.clear()
    multiLog.stop()
  })
}
export {install, update};