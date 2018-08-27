import Database from 'better-sqlite3'
import path from 'path'
import * as globals from '../lib/globals'

// ColumnExists(table,column){
//   const columns =  this.db.prepare("PRAGMA table_info(?)")
//     .all(table);
//   return columns.filter(col=>col.name == column).length > 0
// },

const common = {
  open(){
    this.db = new Database(path.resolve(globals.InstallationDir()+'/dsm/.storage/dsm.sqlite'));
    server.init(this.db)
    players.init(this.db)
  },
  close(){
    this.db.close()
  }
}
export default common

export const pid = {
  open(){
    this.db = new Database(path.resolve(globals.InstallationDir()+'/dsm/.storage/pid.sqlite'));
    this.db.prepare(
      `CREATE TABLE IF NOT EXISTS 'pid' (
        'Name'	INTEGER NOT NULL,
        'PID'	INTEGER NOT NULL UNIQUE,
        'id'	INTEGER AUTOINCREMENT UNIQUE,
        PRIMARY KEY('id')
      );`
    ).run();
  },
  add(name,pid){
    this.open();
    this.db.prepare("INSERT INTO pid (name, pid) VALUES (?,?)").run(name,pid);
    this.close();
  },
  remove(pid){
    this.open();
    this.db.prepare("DELETE FROM pid WHERE pid=?").run(pid);
    this.close();
  },
  close(){
    this.db.close()
  }
}

export const server = {
  init(db){
    this.db = db
    this.db.prepare(
      `CREATE TABLE IF NOT EXISTS 'server' (
        'numPlayers'	INTEGER NOT NULL DEFAULT 0,
        'lastAccess'	INTEGER NOT NULL DEFAULT 0,
        'id'	INTEGER CHECK(id = 0) UNIQUE,
        PRIMARY KEY('id')
      );`
    ).run();
    this.db.prepare(`INSERT or REPLACE INTO 
    server (numPlayers, lastAccess, id) 
    VALUES ((SELECT numPlayers 
      FROM server 
      WHERE id=0)
      ,?,0)`).run(Date.now());
  },
  incrementPlayers(){
    this.db.prepare("UPDATE server SET numPlayers = numPlayers + 1 WHERE id=0").run();
  },
  decrementPlayers(){
    this.db.prepare("UPDATE server SET numPlayers = numPlayers - 1 WHERE id=0").run();
  },
  getNumberPlayers(){
    return this.db.prepare("SELECT numPlayers FROM server WHERE id=0").get().numPlayers
  }
}

export const players = {
  init(db){
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
  },
  CreatePlayer(playerID,name){
    this.db.prepare("INSERT INTO players (playerID, name) VALUES (?,?)")
      .run(playerID,name);
    console.log('Created Player:', name,'in DB.')
  },
  PlayerExists(playerID){
    return this.db.prepare("SELECT 1 FROM players WHERE playerID=?")
      .get(playerID)
  },
  UpdatePlayerLogStatus(status,playerID){
    this.db.prepare("UPDATE players SET loggedIn = ? WHERE playerID = ?")
      .run(status,playerID)
  }
}