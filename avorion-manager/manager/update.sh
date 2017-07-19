#!/bin/bash
# Description: Starts the server.

LogToManagerLog "Ran Update command.";
if pidof ${SERVER} > /dev/null
then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} should not be running while updating."
else
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
fi
