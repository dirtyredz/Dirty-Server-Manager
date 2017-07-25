#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="start-web"
COMMAND_DESCRIPTION="Starts PHP's Web Server"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LogToManagerLog "Ran Start-web command.";

status=$(tmux list-sessions 2>&1 | awk '{print $1}' | grep -Ec "^${GALAXY}_php:")

if [ "${status}" != "0" ]; then
  DynamicEcho "${PURPLE}PHP Web Server${NOCOLOR} is already online."
  LoadFile "core_exit.sh"
fi

DynamicEcho "starting PHP Server"

tmux new-session -d -s ${GALAXY}_php "php -S ${IPAddress}:${WEBPORT} -t ${SCRIPTPATH}/avorion-manager/webroot ${SCRIPTPATH}/avorion-manager/webroot/index.php" 2> ${SCRIPTPATH}/tmux-error.log

sleep 1

status=$(tmux list-sessions 2>&1 | awk '{print $1}' | grep -Ec "^${GALAXY}_php:")

if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}PHP Web Server${NOCOLOR} Failed to start"
  LoadFile "core_exit.sh"
fi

DynamicEcho "PHP Server started on server: http://${IPAddress}"':'"${WEBPORT}"
