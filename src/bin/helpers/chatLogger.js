import {Chat} from '../../lib/logger'

export const name = 'Chat Logger'

export const RegisterToWrapperEmitter = (GameServerEmitter) => {

  GameServerEmitter.on('chat',(name,message)=>{
    const date = new Date()
    Chat.log(`${date.toUTCString()} | <${name}> ${message}`)
  })

  GameServerEmitter.on('spawned',()=>{
    Chat.init()
    Chat.clear()
  })
}