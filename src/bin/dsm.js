import {Command} from 'commander'
import colors from 'colors'
import * as commands from '../commands/'
import { getGalaxies, getGalaxy } from '../lib/galaxies'
// Remove for production
process.on('warning', e => console.warn(e.stack));

// Add recursive options to Commander
Command.prototype.recursiveOptions = function(options){
  if(options.length > 0){
    options.map(opt=>{
      return this.option(opt.flag, opt.description)
    })
    // return this.option(cmd.option[0], cmd.option[1])
  }
  return this
}

let Commander = new Command()
/*******************************************/
// process all commands
const Commands = Object.keys(commands)
Commands.map((cmd, index) => {
  cmd = commands[cmd];
  if(cmd.command && cmd.description && typeof cmd.action == 'function'){
    Commander
        .command(cmd.command)
        .alias(cmd.alias ? cmd.alias : "")
        .recursiveOptions(cmd.options || [])
        .description(cmd.description)
        .action((env,options)=>{
          // env and options switches depending on whats in the command, which is kinda silly
          let parent = {}
          let newOptions = null
          if(typeof env == "object" && env.parent){
            parent = env.parent
            newOptions = env
          }else if(typeof options == 'object' && options.parent){
            parent = options.parent
            newOptions = {...options,env}
          }
          getGalaxy(parent.galaxy,(err,galaxy)=>{
            if(err){
              if(err.code == 1){
                if(typeof parent.galaxy == 'undefined'){
                  if(cmd.galaxyRequired)
                    console.log('Unable to identify the galaxy for this command. please use "-g name"')
                }else{
                  console.log(colors.red('Galaxy:'),parent.galaxy,colors.red('does not exsist!'))
                }
              }else if(err.code == 2){
                console.log('Select one of these galaxies:')
                getGalaxies().map(galaxy=>console.log('   ',galaxy.name))
              }else if(err.code == 3){
                console.log('No galaxies are available,\nPlease use "'+colors.blue('dsm create <name>')+'" to create your first galaxy.')
              }else{
                console.log(err.message)
              }
              if(cmd.galaxyRequired){
                process.exit(1)
              }
            }
            if(typeof parent.galaxy !== 'undefined'){
              cmd.action(newOptions,null,parent)
            }else{
              cmd.action(newOptions,galaxy,parent)
            }
          })
        })
  }else{
    console.error('%s',colors.red('Unable to process command: ' + Commands[index]))
  }
});

// error on unknown commands
Commander.on('command:*', function () {
  console.error(colors.red('Invalid command: %s')+' \nSee '+colors.yellow('--help')+' for a list of available commands.', Commander.args.join(' '));
  process.exit(1);
});

// error when no command is given
if (typeof process.argv[2] === 'undefined') {
  console.error(colors.red('no command given!')+' \nSee '+colors.yellow('--help')+' for a list of available commands.');
  process.exit(1);
}

Commander
  .version('0.1.0')
  .usage('[options] <cmd ...>')
  .option('-g, --galaxy <galaxy name>', 'Run commands against a specific galaxy')
  .parse(process.argv);