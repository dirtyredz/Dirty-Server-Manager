import path from 'path'
import fs from 'fs'
import * as globals from './globals'

const Logger = {
  logFile: path.resolve(globals.InstallationDir()+'/dsm/logs/avorion.txt'),
  init() {
    if(!this.stream){
      //Create FD
      this.fd = fs.openSync(this.logFile, 'a');
      this.stream = fs.createWriteStream(null,{fd: this.fd});
    }
  },
  log(msg) {
    this.stream.write(msg+'\n');
    // console.log(fs.fstatSync(this.fd).size)
  },
  clear() {
    fs.truncate(this.logFile)
  },
  rotate(output) {
    
  }
};
export default Logger

export const Web = {
  ...Logger,
  logFile: path.resolve(globals.InstallationDir()+'/dsm/logs/web.txt')
}

export const Chat = {
  ...Logger,
  logFile: path.resolve(globals.InstallationDir()+'/dsm/logs/chat.txt')
}