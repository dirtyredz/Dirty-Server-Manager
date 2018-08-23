import net from 'net'
import * as globals from '../../lib/globals'
import path from 'path'
import os from 'os'

export const name = 'IPC Layer'

export const RegisterToWrapperEmitter = (GameServerEmitter) => {
  let server;

  GameServerEmitter.once('spawned', function(GameServer){
    console.log('SPAWNED')
    // Socket layer to listen for incoming mesages.
    server = net.createServer((ClientSock) => {
      // Callback for the attach command to recieve data
      const SendServerData = (ServerData) => {
        ClientSock.write(ServerData) // Write data to Client
      }

      const WaitToClose = () => {
        ClientSock.write("Shutdow succesfull")
        ClientSock.end() // tell client were closing
      }
      // listen to server exit event
      const ServerExitCallback = ()=>{
        console.log('Shutting down connected client')
        ClientSock.end() // tell client were closing
      }
      console.log('Creating Exit listener')
      GameServerEmitter.on('exit',ServerExitCallback)
      // console.log('DSM Client ');
      ClientSock.on('end', () => {
        // console.log('DSM Socket Closed');
        GameServerEmitter.removeListener('data',SendServerData) // Remove the listener since the client is not listening
        GameServerEmitter.removeListener('exit',ServerExitCallback) // Remove the listener since the client is not listening
        GameServerEmitter.removeListener('status',SendServerData)
        GameServerEmitter.removeListener('shutdown',WaitToClose)
        console.log('Closing client')
      });
      ClientSock.on('data', function (data) {
        if(data.toString() === 'ATTACH'){ // attach command has been run, start sending data to the client
          GameServerEmitter.on('data',SendServerData)
        }else if(data.toString() === '/status'){
          console.log('STATUS COMMAND')
          GameServer.write(data+'\n');
          GameServerEmitter.on('status',SendServerData)
        }else if(data.toString() === '/stop'){
          console.log('SHUTDOWN COMMAND')
          GameServer.write(data+'\n');
          GameServerEmitter.on('shutdown',WaitToClose)
        }else{
          console.log('NORMAL')
          GameServer.write(data+'\n');
          GameServerEmitter.on('data',SendServerData)
        }
      });

    });
    server.on('error', (e) => {
      console.log(e)
    });

    // server.on('connection', (socket) => {
    //   socket.end()
    // });

    server.listen(globals.cleanPipeName(path.resolve(os.tmpdir()+'/dsm.sock')), () => {
      GameServer.write('DSM IPC Initialized.\n');
    });
  });

  GameServerEmitter.on('exit',()=>{
    console.log('CLOSING IPC SERVER')
    server.close() // will not close exsiting connections
  })
}

