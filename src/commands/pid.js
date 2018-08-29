// import localStorage from '../lib/localStorage'
import colors from 'colors'
import ps from 'ps-node'
import { stdout as log } from 'single-line-log'
import { isWrapperOnline, isGameServerOnline } from '../lib/galaxies';
const cliSpinners = require('cli-spinners');
// Command Name *required
export const command = "pid"

// Command Alias
export const alias = ""

// Command Galaxy Required
export const galaxyRequired = true

// Command Options
export const options = [
  {flag:'-s, --search', description:'Searchs process list for runaway DSM Wrappers'},
]

// Command Description *required
export const description = "gets pid information"

// Command Action *required
export const action = (options,Galaxy)=>{
  // const WrapperPid = localStorage.getItem('WrapperPid') || colors.red('Offline')
  // const GameServerPid = localStorage.getItem('GameServerPid') ||  colors.red('Offline')
  // const WebServerPid = localStorage.getItem('WebServerPid') ||  colors.red('Offline')

  // console.log(colors.blue('------ PID Info ------'))
  // console.log('DSM Wrapper:',WrapperPid && colors.green(WrapperPid))
  // console.log('Game Server:',GameServerPid && colors.green(GameServerPid))
  // console.log('Web Server:',WebServerPid && colors.green(WebServerPid))
  var netstat = require('node-netstat');
 console.log('test')

  netstat({
    filter: {
      local: {
        address: null,
      },
    },
    sync: true
  }, function (data) {
    if(data.local.port.toString().match(/^27/))
    console.log(data)
  });
  console.log('test2')

  if(options && options.search){
    let index = 0;
    const interval = setInterval(()=>{
      log(colors.blue(cliSpinners.dots.frames[index]+' Searching for runaway DSM processes...'))
      if(cliSpinners.dots.frames.length-1 > index)
      index += 1
      else
        index = 0
    },80)
    // A simple pid lookup
    ps.lookup({
      command: 'node',
      arguments: 'serverWrapper.js',
      }, function(err, resultList ) {
      if (err) {
        throw new Error( err );
      }
      clearInterval(interval)
      log(colors.red('Found:'),resultList.length)
      log.clear()
      console.log('')
      resultList.forEach(function( process ){
        if( process ){
          console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
      });
    })
  }
}