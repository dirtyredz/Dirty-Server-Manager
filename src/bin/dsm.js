import program from 'commander'
import colors from 'colors'
import * as commands from '../commands/'

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
// allow commander to parse `process.argv`
program.parse(process.argv);