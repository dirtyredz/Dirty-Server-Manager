import config from '../../lib/MainConfig'
import net from 'net'
import os from 'os'
import path from 'path'
import * as globals from '../../lib/globals'

let inter = false;

const RegisterToWebEmitter = (WebServerEmitter) => {
  WebServerEmitter.on('connection',(socket)=>{
    console.log('a user connected');

    inter = setInterval(()=>{
      // var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))
      // sock.on('error',(err)=>{
      //   if(err.code === "ENOENT")
      //     socket.emit('offline')
      // })
      // socket.emit('some event','test');
      // console.log('inter')
      // sock.destroy()
    },5000)

    socket.on('disconnect',()=>{
      console.log('user disconnected');
      if(inter !== false)
        clearTimeout(inter)
      inter = false
    })
  });
  WebServerEmitter.on('exit',()=>{
    console.log('force user disconnected');
    if(inter !== false)
      clearTimeout(inter)
    inter = false
  })
}

export default { RegisterToWebEmitter }