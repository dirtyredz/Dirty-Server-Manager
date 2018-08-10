import path from 'path'
import fs from 'fs'
import * as globals from './globals'

var Logger = {};
const MainLog = path.resolve(globals.InstallationDir()+'/dsm/logs/info.txt')
//Create FD for out Info
var fd = fs.openSync(MainLog, 'a');
export var infoStream = fs.createWriteStream(null,{fd: fd});

Logger.info = function(msg) {
  // var message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(msg);
};

Logger.clear = () => {
  fs.truncate(MainLog)
}

export default Logger