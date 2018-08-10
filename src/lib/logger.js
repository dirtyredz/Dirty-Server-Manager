import path from 'path'
import fs from 'fs'
import * as globals from './globals'

var Logger = {};
const MainLog = path.resolve(globals.InstallationDir()+'/dsm/logs/info.txt')
//Create FD for out Info
var fd = fs.openSync(MainLog, 'a');
export var infoStream = fs.createWriteStream(null,{fd: fd});

const WebLog = path.resolve(globals.InstallationDir()+'/dsm/logs/webLog.txt')
//Create FD for out Info
var fd2 = fs.openSync(WebLog, 'a');
export var webStream = fs.createWriteStream(null,{fd: fd2});

Logger.web = function(msg) {
  // var message = new Date().toISOString() + " : " + msg + "\n";
  webStream.write(msg);
};

Logger.info = function(msg) {
  // var message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(msg);
};

Logger.clear = () => {
  fs.truncate(MainLog)
}

export default Logger