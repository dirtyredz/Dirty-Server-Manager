#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="stop"
COMMAND_DESCRIPTION="Attempts to save then stops the server"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LogToManagerLog "Ran Stop command.";
# remove the cron job just incase
DeleteCronJobs;
#Generate Offline jpg
LoadFile "generate_banner.sh"

LoadFile "core_status.sh"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running currently!"
  LoadFile "core_exit.sh"
fi

if [ "${force}" == "true" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Forcing Shutdown."
  tmux kill-session -t ${TMUX_SESSION}
  LoadFile "core_exit.sh"
fi

ServerPid=$(pidof ${SERVER})

DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Saving..."

D='Server Time is: '"$(date +"%F %H-%M-%S")"
#Send commands to the console
$Tmux_SendKeys '/echo '"${D}" C-m
$Tmux_SendKeys /save C-m
time=0

while [ $time -lt 45 ]; do
  SaveStatus=$(cat /proc/${ServerPid}/fd/3 | awk "/${D}/,/Triggered saving of all server data/" | grep 'Triggered saving of all server data')
  if [ "${SaveStatus}" ]; then
    break;
  fi
  let time++
  sleep 1
  DynamicEcho "\rSaving... ${time}" "DONTLOG"
done

DynamicEcho "\r" "DONTLOG"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Has been saved."
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Stopping...."
sleep 30
$Tmux_SendKeys /stop C-m
time=0
while [ $time -lt 90 ]; do
  SHUTDOWN=$(awk "/${D}/,/Server shutdown successful/" /proc/${ServerPid}/fd/3 | grep 'Server shutdown successful')
  if [ "${SHUTDOWN}" ] || [ "$( ps ax | grep ${SERVER} | grep -v grep | grep tmux | wc -l)" ]; then
    DynamicEcho "\r" "DONTLOG"
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has been stopped."
    break;
  fi
  let time++
  sleep 1
  DynamicEcho "\rStopping... ${time}" "DONTLOG"
done
DynamicEcho "\r" "DONTLOG"

if ! kill $(pidof ${SERVER}) > /dev/null 2>&1; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Could not send SIGTERM to Server Process."
  sleep 1
  tmux kill-session -t ${TMUX_SESSION}
fi
