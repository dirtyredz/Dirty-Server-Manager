#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="enable_login_callback"
COMMAND_DESCRIPTION="Dynamically adds Player Login callback to server.lua."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LoadFile 'disable_login_callback.sh'

if [ "$verbose" = true ]; then
  DynamicEcho "Enabling login callback in server.lua"
fi

ServerINIFile=serverfiles/$(grep "startUpScript" ${GalaxyDirectoryPath}${GALAXY}/server.ini | sed -e 's/startUpScript=//g')
sed -i '/function onPlayerLogIn(playerIndex)/a --Added by DSM - Begin\nRunMOTD(playerIndex)--Added by DSM\n--Added by DSM - End' $ServerINIFile
echo '--Added by DSM - Begin--Added by DSM' >> $ServerINIFile
echo 'function RunMOTD(playerIndex)--Added by DSM' >> $ServerINIFile
echo 'local player = Player(playerIndex)--Added by DSM' >> $ServerINIFile
echo "player:sendChatMessage('MOTD', 0, '${MOTDMessage}')--Added by DSM" >> $ServerINIFile
echo 'end--Added by DSM' >> $ServerINIFile
echo '--Added by DSM - End' >> $ServerINIFile
