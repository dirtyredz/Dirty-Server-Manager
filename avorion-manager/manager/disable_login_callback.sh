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

if [ "$verbose" = true ]; then
  DynamicEcho "Disabling login callback in server.lua"
fi

ServerINIFile=serverfiles/$(grep "startUpScript" .avorion/galaxies/${GALAXY}/server.ini | sed -e 's/startUpScript=//g')
sed -i '/--Added by DSM/d' $ServerINIFile
