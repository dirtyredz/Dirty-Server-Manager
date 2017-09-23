#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="start"
COMMAND_DESCRIPTION="Starts the server."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

# if server already running
LoadFile "core_status.sh"
if [ "${status}" != "0" ]; then
  DynamicEcho "Server is already running, with pid ${YELLOW}$(pidof ${SERVER})${NOCOLOR}"
  LoadFile "core_exit.sh"
fi

# remove the cron job just incase
DeleteCronJobs;

#MOTD
if [ "${MOTD}" = true ]; then
  LoadFile "enable_login_callback.sh"
fi


cp ${SCRIPTPATH}/serverfiles/linux64/steamclient.so ${SCRIPTPATH}/serverfiles/steamclient.so
if [ ! -f bin/${SERVER} ]; then
  cp ${SCRIPTPATH}/serverfiles/bin/AvorionServer ${SCRIPTPATH}/serverfiles/bin/${SERVER}
fi

if [ ! -z $GalaxyDirectory ]; then
  GalaxyDirectory="--datapath ${GalaxyDirectory}"
fi
if [ ! -z $GameIPAddress ]; then
  GameIPAddress="--ip ${GameIPAddress}"
fi

if [ ! -z $SteamQueryPort ]; then
  SteamQueryPort="--steam-query-port ${SteamQueryPort}"
fi
if [ ! -z $SteamMasterPort ]; then
  SteamMasterPort="--steam-master-port ${SteamMasterPort}"
fi

LogToManagerLog "tmux new-session -d -s ${TMUX_SESSION} bin/${SERVER} --port ${PORT} ${GameIPAddress} ${SteamQueryPort} ${SteamMasterPort} --listed ${Listed} --rcon-ip ${RconIPAddress} --rcon-port ${RconPort} --rcon-password ${RconPassword} --galaxy-name ${GALAXY} ${GalaxyDirectory} --max-players ${MAX_PLAYERS}  ${PARAMS}";
cd "${INSTALL_DIR}"

touch ${SCRIPTPATH}'/console.log'
cat ${SCRIPTPATH}'/console.log' | grep '^<.*>' | grep -v '^<Rusty>' >> ${SCRIPTPATH}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_playerchat.log
> ${SCRIPTPATH}'/console.log'
> ${SCRIPTPATH}'/server.log'

tmux new-session -d -s ${TMUX_SESSION} bin/${SERVER} --port ${PORT} ${GameIPAddress} ${SteamQueryPort} ${SteamMasterPort} --listed ${Listed} --rcon-ip ${RconIPAddress} --rcon-port ${RconPort} --rcon-password ${RconPassword} --galaxy-name ${GALAXY} ${GalaxyDirectory} --max-players ${MAX_PLAYERS}  ${PARAMS} 2> ${SCRIPTPATH}/tmux-error.log

# Thanks https://github.com/GameServerManagers/LinuxGSM
# tmux pipe-pane not supported in tmux versions < 1.6
if [ "$(tmux -V|sed "s/tmux //"|sed -n '1 p'|tr -cd '[:digit:]')" -lt "16" ] 2>/dev/null; then # Tmux compiled from source will not return a number, therefore bypass this check and trash the error
  echo "Console logging disabled: Tmux => 1.6 required
  https://gameservermanagers.com/tmux-upgrade
  Currently installed: $(tmux -V)" > "${SCRIPTPATH}/console.log"

# Console logging disabled: Bug in tmux 1.8 breaks logging
elif [ "$(tmux -V|sed "s/tmux //"|sed -n '1 p'|tr -cd '[:digit:]')" -eq "18" ] 2>/dev/null; then
  echo "Console logging disabled: Bug in tmux 1.8 breaks logging
  https://gameservermanagers.com/tmux-upgrade
  Currently installed: $(tmux -V)" > "${SCRIPTPATH}/console.log"

# Console logging enable or not set
else
  #Start loging console into console.log.
  tmux pipe-pane -o -t ${TMUX_SESSION} "cat > ${SCRIPTPATH}/console.log" 2> ${SCRIPTPATH}/tmux-error.log
fi

DynamicEcho "starting ${PURPLE}${SERVER}${NOCOLOR} on ${YELLOW}${PORT}${NOCOLOR}"

# Server failed to start
sleep 1
LoadFile "core_status.sh"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} could not be started!"
  if [ "$verbose" = true ]; then
    DynamicEcho "tmux new-session -d -s ${TMUX_SESSION} bin/${SERVER} --port ${PORT} ${GameIPAddress} ${SteamQueryPort} ${SteamMasterPort} --listed ${Listed} --rcon-ip ${RconIPAddress} --rcon-port ${RconPort} --rcon-password ${RconPassword} --galaxy-name ${GALAXY} ${GalaxyDirectory} --max-players ${MAX_PLAYERS}  ${PARAMS}"
    DynamicEcho "==============================================================="
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Console.log:"
    DynamicEcho "==============================================================="
    tail -n 50 "${SCRIPTPATH}/console.log"
    if [ -s "${SCRIPTPATH}/tmux-error.log" ]; then
      DynamicEcho "==============================================================="
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} tmux-error.log:"
      DynamicEcho "==============================================================="
      cat "${SCRIPTPATH}/tmux-error.log"
    fi
  fi
  LoadFile "core_exit.sh"
fi

if [ "${status}" != "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has started with pid ${YELLOW}$(pidof ${SERVER})${NOCOLOR}"

  if [ "$verbose" = true ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has started with params: --port ${PORT} ${GameIPAddress} ${SteamQueryPort} ${SteamMasterPort} --listed ${Listed} --rcon-ip ${RconIPAddress} --rcon-port ${RconPort} --rcon-password ${RconPassword} --galaxy-name ${GALAXY} ${GalaxyDirectory} --max-players ${MAX_PLAYERS}  ${PARAMS}"
  fi

  VER=`wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest | grep tag_name | sed -e 's/.*://g' -e 's/"//g' -e 's/,//g' | tr -d '[:blank:]'`
  if [ "${VER}" != "${VERSION}" ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Dirty Server Manager is NOT Up To Date!"
  else
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Dirty Server Manager is Up To Date!"
  fi
fi

#Generate jpg
PlayersCount='0'
LoadFile "generate_banner.sh"
CreateCronJobs;
