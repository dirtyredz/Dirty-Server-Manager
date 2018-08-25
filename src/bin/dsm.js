import program from 'commander'
import colors from 'colors'
import * as commands from '../commands/'

// Remove for production
process.on('warning', e => console.warn(e.stack));

/*******************************************/
// process all commands
const Commands = Object.keys(commands)
Commands.map((cmd, index) => {
  cmd = commands[cmd];
  if(cmd.command && cmd.description && typeof cmd.action == 'function'){
    program
      .command(cmd.command)
      .version(cmd.version ? cmd.version : colors.red("No version available"), '-v, --version')
      .alias(cmd.alias ? cmd.alias : "")
      .description(cmd.description)
      .action(cmd.action)
  }else{
    console.error('%s',colors.red('Unable to process command: ' + Commands[index]))
  }
});

// error on unknown commands
program.on('command:*', function () {
  console.error(colors.red('Invalid command: %s')+' \nSee '+colors.yellow('--help')+' for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

// error when no command is given
if (typeof process.argv[2] === 'undefined') {
  console.error(colors.red('no command given!')+' \nSee '+colors.yellow('--help')+' for a list of available commands.');
  process.exit(1);
}

program
  .version('0.1.0')
  .usage('[options] <cmd ...>')
  .option('-f, --foo', 'enable some foo')
  .parse(process.argv);

