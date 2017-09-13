#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="stop-web"
COMMAND_DESCRIPTION="Stops PHP's Web Server"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LogToManagerLog "Ran Stop-web command.";

if tmux has-session -t ${GALAXY}_php 2>/dev/null; then
  tmux kill-session -t ${GALAXY}_php
else
  if [[ $EUID -eq 0 ]]; then
     sudo pkill -f ${GALAXY}_php
  fi
fi
DynamicEcho "${GALAXY}_php Server Stoped"
