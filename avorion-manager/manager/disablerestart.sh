#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="disablerestart"
COMMAND_DESCRIPTION="Removes future/current restart sequence."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

if [ "$SecondCommand" ]; then
  TimeDelay=$SecondCommand
fi

# if server is offline
LoadFile "core_status"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  LoadFile "core_exit"
fi

DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Daily Restart cronjob has been removed (restart server to re-apply)"
crontab -l | grep -v "${SCRIPTPATH}/manager restart -o CRON"  | crontab -
pkill -f "${SCRIPTPATH}/manager restart"
if [ $? -eq 0 ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Stopped currently running Restart command."
  LoadFile "send" "/say RESTART STOPPED."

  if [ "$TimeDelay" ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Second paremeter used, restarting in ${TimeDelay} minutes from now."
    tmux new-session -d -s ${SERVER}"_restart" ${SCRIPTPATH}/manager restart -d $TimeDelay -b "Restarting Server"
  fi
fi
