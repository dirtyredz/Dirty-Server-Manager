import {Command} from 'Commander'
import colors from 'colors'
import * as commands from '../commands/'

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
        .version(cmd.version ? cmd.version : colors.red("No version available"), '-v, --version')
        .alias(cmd.alias ? cmd.alias : "")
        .recursiveOptions(cmd.options || [])
        .description(cmd.description)
        .action(cmd.action)
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
  .option('-f, --foo', 'enable some foo')
  .parse(process.argv);
