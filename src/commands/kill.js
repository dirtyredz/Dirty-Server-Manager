import child_process, { exec } from 'child_process';
import path from 'path'
import fs from 'fs'
import localStorage from '../lib/localStorage'
import {GameServerOnline} from '../lib/serverOnline'

// Command Name *required
export const command = "kill <pid>"

// Command Alias
export const alias = ""

// Command Description *required
export const description = "kills the server"

// Command Action *required
export const action = (pid)=>{
  process.kill(pid, 'SIGINT');
}