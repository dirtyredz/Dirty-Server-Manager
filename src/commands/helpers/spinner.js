import { stdout as log } from 'single-line-log'
import colors from 'colors'
const cliSpinners = require('cli-spinners');

export default class Spinner {
  constructor(message,color = 'blue'){
    this._message = message
    this.start(color)
  }
  start(color = 'blue'){
    let index = 0
    this.spinner = setInterval(()=>{
      log(colors[color]('---------- '+cliSpinners.dots.frames[index]+' '+this._message+' ----------'))
      if(cliSpinners.dots.frames.length-1 > index)
      index += 1
      else
        index = 0
    },80)
  }
  log(message,color = 'blue'){
    this._message = message
  }
  stop(message,color = 'blue'){
    clearInterval(this.spinner)
    log(colors[color]('---------- '+message+' ----------'))
    log.clear()
    console.log('\n')
  }
}