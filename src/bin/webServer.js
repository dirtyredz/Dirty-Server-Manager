import express from 'express';
import localStorage from '../lib/localStorage'
import path from 'path'
import * as globals from '../lib/globals'
import http from 'http'
import socketIO from 'socket.io'
import ip from 'ip'

var events = require('events').EventEmitter;
var WebServerEmitter = new events.EventEmitter();
import webUpdater from './helpers/webUpdater'
import { DSMConfig } from '../lib/MainConfig';

const config = new DSMConfig()
webUpdater.RegisterToWebEmitter(WebServerEmitter)

const app = express();
const httpServer = http.Server(app)
const io = socketIO(httpServer, {
  serveClient: false // do not serve the client file, in that case the brfs loader is not needed
});
console.log(ip.isPrivate(ip.address()),ip.address(),config.WEB_IP_ADDRESS.value)
localStorage.setItem('WebServerPid',process.pid)

// server.use(express.static(path.join(__dirname, 'build')));
app.use( '/public', express.static( path.resolve(globals.InstallationDir() + '/dsm/public') ) );
app.get('/*', function(req, res){
  res.sendFile(path.resolve(globals.InstallationDir() + '/dsm/public/index.html'));
});
console.log('two')
io.on('connection', function(socket){
  WebServerEmitter.emit('connection', socket);
});

httpServer.listen(
  config.WEB_PORT.value,
  config.WEB_IP_ADDRESS.value,
  () => console.log('Example app listening on port 3000!')
)

httpServer.on('close', function(socket){
  console.log('http close')
});
httpServer.on('error', function(err){
  console.log(err)
})

const exitHandler = () => {
  console.log('Closing WebServer')
  WebServerEmitter.emit('exit');
  io.close()
  localStorage.removeItem('WebServerPid')
  process.exit(0)
}

process.on('beforeExit',exitHandler)

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);



