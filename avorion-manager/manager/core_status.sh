#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

# Thanks https://github.com/GameServerManagers/LinuxGSM

COMMAND_DESCRIPTION="Returns 0 offline and 1 for online, used -v"

status=$(tmux list-sessions 2>&1 | awk '{print $1}' | grep -Ec "^${TMUX_SESSION}:")

if [ "$verbose" == true ] && [ "$RequiredCommand" == "core_status" ]; then
  DynamicEcho "$status"
fi
