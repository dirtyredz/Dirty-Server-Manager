import net from 'net'
import * as globals from '../../lib/globals'
import path from 'path'
import os from 'os'
import { Server } from 'https';

export const name = 'IPC Layer'

export const RegisterToWrapperEmitter = (GameServerEmitter,Config,DB,GalaxyName) => {
  let server;

  GameServerEmitter.on('spawned', function(GameServer){
    console.log('DSM: IPC Initializing...\n');
    // Socket layer to listen for incoming mesages.
    server = net.createServer((ClientSock) => {
      // Callback for the attach command to recieve data
      const SendServerData = (ServerData) => {
        ClientSock.write(ServerData) // Write data to Client
      }

      const WaitToClose = () => {
        ClientSock.write("SUCCESS")
        ClientSock.end() // tell client were closing
      }
      // listen to server exit event
      const ServerExitCallback = ()=>{
        console.log('Shutting down connected client')
        ClientSock.end() // tell client were closing
      }
      console.log('Client connected to IPC Layer')
      GameServerEmitter.on('exit',ServerExitCallback)
      
      // console.log('DSM Client ');
      ClientSock.on('end', () => {
        // console.log('DSM Socket Closed');
        GameServerEmitter.removeListener('data',SendServerData) // Remove the listener since the client is not listening
        GameServerEmitter.removeListener('exit',ServerExitCallback) // Remove the listener since the client is not listening
        GameServerEmitter.removeListener('status',SendServerData)
        GameServerEmitter.removeListener('shutdown',WaitToClose)
        GameServerEmitter.removeListener('startup',WaitToClose)
        console.log('Closing client from IPC Layer')
      });
      ClientSock.on('data', function (data) {
        if(data.toString() === 'ATTACH'){ // attach command has been run, start sending data to the client
          console.log('Client is listening to server output.')
          GameServerEmitter.on('data',SendServerData)
        }else if(data.toString() === '/status'){
          // if when attached and you use /status this will fire attaching both data and status listeners to the attached client
          console.log('STATUS COMMAND')
          GameServer.write(data+'\n');
          GameServerEmitter.on('status',SendServerData)
        }else if(data.toString() === '/stop'){
          console.log('SHUTDOWN COMMAND')
          GameServer.write(data+'\n');
          GameServerEmitter.on('shutdown',WaitToClose)
        }else if(data.toString() === 'STARTUP'){
          GameServerEmitter.on('startup',WaitToClose)
        }else if(data.toString().match(/^SENDING/)){
          GameServer.write(data.toString().replace(/^SENDING/,"")+'\n');
          GameServerEmitter.on('data',SendServerData)
        }else{
          // dont create event as the client is likely to close immediatly after writing
          GameServer.write(data+'\n');
        }
      });

    });
    server.on('error', (e) => {
      console.log(e)
      // NEED TO CHECK IF THE SOCK FILE IS IN USE.
      // IF IT IS WE HAVE A RUNNAWAY SERVER THAT NEEDS TO BE KILLED
      // PERHAPS WE SHOULDENT ERASE/RESET PID UNTIL WE KNOW FOR SURE
      // { Error: listen EADDRINUSE /tmp/dsm_testing.sock
      //   at Object._errnoException (util.js:992:11)
      //   at _exceptionWithHostPort (util.js:1014:20)
      //   at Server.setupListenHandle [as _listen2] (net.js:1338:19)
      //   at listenInCluster (net.js:1396:12)
      //   at Server.listen (net.js:1491:5)
      //   at EventEmitter.eval (webpack:///./src/bin/helpers/ipcLayer.js?:99:12)
      //   at emitOne (events.js:121:20)
      //   at EventEmitter.emit (events.js:211:7)
      //   at startGameServer (webpack:///./src/bin/helpers/startGameServer.js?:101:21)
      //   at Timeout.setTimeout [as _onTimeout] (webpack:///./src/bin/serverWrapper.js?:97:37)
      // code: 'EADDRINUSE',
      // errno: 'EADDRINUSE',
      // syscall: 'listen',
      // address: '/tmp/dsm_testing.sock',
      // port: -1 }
    });
    

    // server.on('connection', (socket) => {
    //   socket.end()
    // });

    server.listen(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm_'+GalaxyName+'.sock')), () => {
      console.log('DSM: IPC Initialized.\n');
    });
  });

  GameServerEmitter.on('exit',()=>{
    console.log('DSM: CLOSING IPC SERVER')
    server.close() // will not close exsiting connections
  })
}

