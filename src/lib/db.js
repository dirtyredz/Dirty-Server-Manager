import Database from 'better-sqlite3'
import path from 'path'
import * as globals from '../lib/globals'

// ColumnExists(table,column){
//   const columns =  this.db.prepare("PRAGMA table_info(?)")
//     .all(table);
//   return columns.filter(col=>col.name == column).length > 0
// },

class Common {
  constructor(GalaxyName){
    this.db = new Database(path.resolve(globals.InstallationDir()+'/dsm/galaxies/'+GalaxyName+'/dsm.sqlite'));
    this.db.prepare(
      `CREATE TABLE IF NOT EXISTS 'server' (
        'numPlayers'	INTEGER NOT NULL DEFAULT 0,
        'lastAccess'	INTEGER NOT NULL DEFAULT 0,
        'WrapperPid'	INTEGER NOT NULL DEFAULT 0,
        'GameServerPid'	INTEGER NOT NULL DEFAULT 0,
        'ip'	TEXT NOT NULL DEFAULT 0,
        'id'	INTEGER CHECK(id = 0) UNIQUE,
        PRIMARY KEY('id')
      );`
    ).run();
    this.db.prepare(`INSERT or REPLACE INTO 
    server (numPlayers, lastAccess, id, WrapperPid, GameServerPid, ip) 
    VALUES (
      (SELECT numPlayers FROM server WHERE id=0)
      ,?,0,
      (SELECT WrapperPid FROM server WHERE id=0),
      (SELECT GameServerPid FROM server WHERE id=0),
      (SELECT ip FROM server WHERE id=0)
    )`).run(Date.now());
    this.db.prepare(
      `CREATE TABLE IF NOT EXISTS 'players' (
        'id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        'playerID'	INTEGER NOT NULL UNIQUE,
        'name'	TEXT NOT NULL,
        'loggedIn'	INTEGER,
        'lastSeen'	INTEGER
      );`
    ).run();
  }
  // SERVER
  incrementPlayers(){
    this.db.prepare("UPDATE server SET numPlayers = numPlayers + 1 WHERE id=0").run();
  }
  decrementPlayers(){
    this.db.prepare("UPDATE server SET numPlayers = numPlayers - 1 WHERE id=0").run();
  }
  set WrapperPid(Pid){
    this.db.prepare("UPDATE server SET WrapperPid = ? WHERE id=0").run(Pid);
  }
  get WrapperPid(){
    return this.db.prepare("SELECT WrapperPid FROM server WHERE id=0").get().WrapperPid
  }
  set GameServerPid(Pid){
    this.db.prepare("UPDATE server SET GameServerPid = ? WHERE id=0").run(Pid)
  }
  get GameServerPid(){
    return this.db.prepare("SELECT GameServerPid FROM server WHERE id=0").get().GameServerPid
  }
  get NumberPlayers(){
    return this.db.prepare("SELECT numPlayers FROM server WHERE id=0").get().numPlayers
  }
  get ip(){
    return this.db.prepare("SELECT ip FROM server WHERE id=0").get().ip
  }
  set ip(ip){
    return this.db.prepare("UPDATE server SET ip = ? WHERE id=0").run(ip)
  }
  // PLAYERS
  CreatePlayer(playerID,name){
    this.db.prepare("INSERT INTO players (playerID, name) VALUES (?,?)")
      .run(playerID,name);
    console.log('Created Player:', name,'in DB.')
  }
  PlayerExists(playerID){
    return this.db.prepare("SELECT 1 FROM players WHERE playerID=?")
      .get(playerID)
  }
  UpdatePlayerLogStatus(status,playerID){
    this.db.prepare("UPDATE players SET loggedIn = ? WHERE playerID = ?")
      .run(status,playerID)
  }
  close(){
    this.db.close()
  }
}
export default Common

class Server {
  constructor(db){
    this.db = db
    this.db.prepare(
      `CREATE TABLE IF NOT EXISTS 'server' (
        'numPlayers'	INTEGER NOT NULL DEFAULT 0,
        'lastAccess'	INTEGER NOT NULL DEFAULT 0,
        'WrapperPid'	INTEGER NOT NULL DEFAULT 0,
        'GameServerPid'	INTEGER NOT NULL DEFAULT 0,
        'id'	INTEGER CHECK(id = 0) UNIQUE,
        PRIMARY KEY('id')
      );`
    ).run();
    this.db.prepare(`INSERT or REPLACE INTO 
    server (numPlayers, lastAccess, id, WrapperPid, GameServerPid) 
    VALUES (
      (SELECT numPlayers FROM server WHERE id=0)
      ,?,0,
      (SELECT WrapperPid FROM server WHERE id=0),
      (SELECT GameServerPid FROM server WHERE id=0)
    )`).run(Date.now());
  }
  incrementPlayers(){
    this.db.prepare("UPDATE server SET numPlayers = numPlayers + 1 WHERE id=0").run();
  }
  decrementPlayers(){
    this.db.prepare("UPDATE server SET numPlayers = numPlayers - 1 WHERE id=0").run();
  }
  set WrapperPid(Pid){
    this.db.prepare("UPDATE server SET WrapperPid = ? WHERE id=0").run(Pid);
  }
  get WrapperPid(){
    return this.db.prepare("SELECT WrapperPid FROM server WHERE id=0").get();
  }
  set GameServerPid(Pid){
    this.db.prepare("UPDATE server SET GameServerPid = ? WHERE id=0").run(Pid);
  }
  get GameServerPid(){
    return this.db.prepare("SELECT GameServerPid FROM server WHERE id=0").get();
  }
  get NumberPlayers(){
    return this.db.prepare("SELECT numPlayers FROM server WHERE id=0").get().numPlayers
  }
}

class Players {
  constructor(db){
    this.db = db
    this.db.prepare(
      `CREATE TABLE IF NOT EXISTS 'players' (
        'id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        'playerID'	INTEGER NOT NULL UNIQUE,
        'name'	TEXT NOT NULL,
        'loggedIn'	INTEGER,
        'lastSeen'	INTEGER
      );`
    ).run();
  }
  CreatePlayer(playerID,name){
    this.db.prepare("INSERT INTO players (playerID, name) VALUES (?,?)")
      .run(playerID,name);
    console.log('Created Player:', name,'in DB.')
  }
  PlayerExists(playerID){
    return this.db.prepare("SELECT 1 FROM players WHERE playerID=?")
      .get(playerID)
  }
  UpdatePlayerLogStatus(status,playerID){
    this.db.prepare("UPDATE players SET loggedIn = ? WHERE playerID = ?")
      .run(status,playerID)
  }
}