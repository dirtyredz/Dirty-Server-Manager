#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="update"
COMMAND_DESCRIPTION="Updates Serverfiles"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LogToManagerLog "Ran Update command.";

# if server is online
LoadFile "core_status.sh"
if [ "${status}" != "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} should not be running while updating."
  LoadFile "core_exit.sh"
fi


DynamicEcho "steamcmd will now perform an update."
rm ${INSTALL_DIR}/bin/*
case $BETA in
  (true)    DynamicEcho "Updating with Beta version...";;
  (false)   DynamicEcho "Updating with Normal version...";;
esac
case $BETA in
  (true)    $STEAM_DIR/steamcmd.sh +login anonymous +force_install_dir ${INSTALL_DIR} +app_update ${APPID} -beta beta validate +quit;;
  (false)   $STEAM_DIR/steamcmd.sh +login anonymous +force_install_dir ${INSTALL_DIR} +app_update ${APPID} validate +quit;;
esac
