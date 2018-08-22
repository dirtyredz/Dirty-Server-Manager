import express from 'express';
import localStorage from '../lib/localStorage'
import path from 'path'
import * as globals from '../lib/globals'
import http from 'http'
import socketIO from 'socket.io'
import ip from 'ip'


let WebIp = ip.address()
if(ip.isPrivate(WebIp))
  WebIp = 'localhost'

var events = require('events').EventEmitter;
var WebServerEmitter = new events.EventEmitter();
import webUpdater from './helpers/webUpdater'
webUpdater.RegisterToWebEmitter(WebServerEmitter)

const app = express();
const httpServer = http.Server(app)
const io = socketIO(httpServer, {
  serveClient: false // do not serve the client file, in that case the brfs loader is not needed
});

localStorage.setItem('WebServerPid',process.pid)

// server.use(express.static(path.join(__dirname, 'build')));
app.use( '/public', express.static( path.resolve(globals.InstallationDir() + '/dsm/public') ) );
app.get('/*', function(req, res){
  res.sendFile(path.resolve(globals.InstallationDir() + '/dsm/public/index.html'));
});

io.on('connection', function(socket){
  WebServerEmitter.emit('connection', socket);
});

httpServer.listen(3000, WebIp, () => console.log('Example app listening on port 3000!'))

process.on('beforeExit',()=>{
  localStorage.clear()
  process.exit(0)
})





