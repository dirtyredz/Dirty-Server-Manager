import Logger, { Chat } from '../../lib/logger'

export const name = 'Chat Logger'

export const RegisterToWrapperEmitter = (GameServerEmitter,Config,DB,GalaxyName) => {

  let ChatLog;
  GameServerEmitter.on('chat',(name,message)=>{
    const date = new Date()
    ChatLog.log(`${date.toUTCString()} | <${name}> ${message}`)
  })

  GameServerEmitter.on('spawned',()=>{
    ChatLog = new Logger(GalaxyName,'chat')
  })
}