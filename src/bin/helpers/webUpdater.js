import config from '../../lib/MainConfig'
import net from 'net'
import os from 'os'
import path from 'path'
import * as globals from '../../lib/globals'


const RegisterToWebEmitter = (WebServerEmitter) => {
  WebServerEmitter.on('connection',(socket)=>{
    console.log('a user connected');

    const inter = setInterval(()=>{
      var sock = net.connect(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')))
      sock.on('error',(err)=>{
        if(err.code === "ENOENT")
          socket.emit('offline')
      })
      socket.emit('some event','test');
    },5000)

    socket.on('disconnect',()=>{
      console.log('user disconnected');
      clearInterval(inter)
    })
  });
}

export default { RegisterToWebEmitter }