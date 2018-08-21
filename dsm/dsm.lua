-- dsm intergration

local dsm = {}

function dsm.onStartUp()
    print('DSM: Lua intergration!')
    Server():registerCallback("onPlayerLogIn", "onPlayerLogIn")
    print('DSM: onPlayerLogin, registered')
    Server():registerCallback("onPlayerLogOff", "onPlayerLogOff")
    print('DSM: onPlayerLogOff, registered')
end

function onPlayerLogIn(playerIndex)
  local player = Player(playerIndex)
  if player then
    player:sendChatMessage('MOTD', 0, '__MOTD__')
    print('DSM: Player Log On, name:', player.name, 'index:', playerIndex)
  end
end

function onPlayerLogOff(playerIndex)
  local player = Player(playerIndex)
  if player then
    print('DSM: Player Log Off, name:', player.name, 'index:', playerIndex)
  end
end

return dsm