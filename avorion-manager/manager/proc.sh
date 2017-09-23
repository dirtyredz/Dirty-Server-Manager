#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="proc"
COMMAND_DESCRIPTION="copys the process output and stors it in server.log"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

# if server is offline
LoadFile "core_status"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  LoadFile "core_exit"
fi

ServerPid=$(pidof ${SERVER})

if [ "$ServerPid" ]; then
  cat /proc/${ServerPid}/fd/3 > ${SCRIPTPATH}/server.log
  sleep 30
  cat /proc/${ServerPid}/fd/3 > ${SCRIPTPATH}/server.log
fi
