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

