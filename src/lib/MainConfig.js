import fs from 'fs'
import ini from 'ini'
import path from 'path'
import * as globals from './globals'

const config = ini.parse(fs.readFileSync(path.resolve(globals.InstallationDir() + '/dsm/config.ini'), 'utf-8'));

if(!config.STEAM_DIR)
  config.STEAM_DIR = "steam" // default steam

if(!config.STATUS_INTERVAL_MS)
  config.STATUS_INTERVAL_MS = (1000 * 60 * 5) // default 5 minutes
config.STATUS_INTERVAL_MS = parseInt(config.STATUS_INTERVAL_MS,10)

if(!config.MOTD)
  config.MOTD = "Welcome to the server, Enjoy!!"

export default config