#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="restart"
COMMAND_DESCRIPTION="Stops then Starts the server (Restart)"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

LogToManagerLog "Ran Restart command.";
DynamicEcho "restarting ${PURPLE}${SERVER}${NOCOLOR}..."
OLDPID=$(pidof ${SERVER})

DisableCoreExit=true

LoadFile "stop"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Waiting 30 seconds, before attempting start. (sometimes its takes a little bit for the os, to close the process)"
sleep 30
Tries=0
while true; do
  LoadFile "start"
  sleep 1
  LoadFile "core_status"
  NEWPID=$(pidof ${SERVER})

  if [ "${status}" != "0" ]; then
    if [ OLDPID != NEWPID ]; then
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has successfully restarted!"
    else
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has successfully restarted with same pid. Did the server restart?"
    fi
    DisableCoreExit=''
    LoadFile "core_exit"
  fi

  if [ "${status}" == "0" ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has FAILED to restart!"
    sleep 30
    if [ $Tries -gt 9 ]; then
      DisableCoreExit=''
      LoadFile "core_exit"
    fi
    let Tries++
  fi

done
