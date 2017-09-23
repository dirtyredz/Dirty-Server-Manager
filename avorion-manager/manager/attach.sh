#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="attach"
COMMAND_DESCRIPTION="attaches your terminal to the servers console"

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

DynamicEcho "press ${RED}Ctrl+B${NOCOLOR} then ${RED}D${NOCOLOR} to detach. Confirm to continue..."
read -n 1 -s
tmux a -t ${TMUX_SESSION}
