import db, {server, players} from '../../lib/db'

export const name = 'Player Tracker'

export const RegisterToWrapperEmitter = (GameServerEmitter) => {
  GameServerEmitter.on('logon',(name, index)=>{
    db.open()
    // check if player exists
    if(players.PlayerExists(index) === undefined){
      console.log('Player does not exist')
      players.CreatePlayer(index,name)
    }
    players.UpdatePlayerLogStatus(1,index)
    server.incrementPlayers()
    // create player if doesnt exist
    // log player in
    db.close()
  })

  GameServerEmitter.on('logoff',(name, index)=>{
    db.open()
    // check if player exists
    if(players.PlayerExists(index) === undefined){
      console.log('Player does not exist')
      players.CreatePlayer(index,name)
    }
    players.UpdatePlayerLogStatus(0,index)
    server.decrementPlayers()
    // create player if doesnt exist
    // log player in
    db.close()
  })
}