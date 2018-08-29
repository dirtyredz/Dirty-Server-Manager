import path from 'path'
import fs from 'fs'
import * as globals from './globals'

class Logger {
  constructor(GalaxyName,fileName) {
    const dir = path.resolve(globals.InstallationDir()+'/dsm/logs/'+GalaxyName)
    this._logFile = path.resolve(dir+'/'+fileName+'.txt')
    if(!fs.existsSync(dir))
      fs.mkdirSync(dir)
    this.fd = fs.openSync(this._logFile, 'a');
    this._stream = fs.createWriteStream(null,{fd: this.fd});
    this.clear()
  }
  get logFile(){
    return this._logFile
  }
  get stream(){
    return this._stream
  }
  log(msg) {
    this.stream.write(msg+'\n');
    // console.log(fs.fstatSync(this.fd).size)
  }
  clear() {
    fs.truncateSync(this.logFile)
  }
  rotate(output) {
  }
};
export default Logger