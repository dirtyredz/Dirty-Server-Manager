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

LoadFile "core_status.sh"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running currently!"
  LoadFile "core_exit.sh"
fi

if [ "${force}" == "true" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Forcing Shutdown."
  tmux kill-session -t ${TMUX_SESSION}
  #Generate Offline jpg
  LoadFile "generate_banner.sh"
  LoadFile "core_exit.sh"
fi

ServerPid=$(pidof ${SERVER})

DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Attempting to Save...(Can take up to 30 seconds)"

D='Server Time is: '"$(date +"%F %H-%M-%S")"
#Send commands to the console
$Tmux_SendKeys '/echo '"${D}" C-m
$Tmux_SendKeys /save C-m
time=0

while [ $time -lt $SaveWait ]; do
  Save_Status=$(cat /proc/${ServerPid}/fd/3 | awk "/${D}/,/Triggered saving of all server data/" | grep 'Triggered saving of all server data')
  if [ "${Save_Status}" ]; then
    DynamicEcho "\r" "DONTLOG"
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Has been saved."
    break;
  fi
  let time++
  sleep 1
  DynamicEcho "\rSaving... ${time}" "DONTLOG"
done

DynamicEcho "\r" "DONTLOG"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Waiting ${StopDelay} seconds...(Incase theres a lag in the server)"
sleep $StopDelay
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Attempting to Stop...(Can take up to 30 seconds)"
$Tmux_SendKeys /stop C-m
time=0
while [ $time -lt $StopWait ]; do
  Shutdown_Status=$(cat /proc/${ServerPid}/fd/3 | awk "/${D}/,/Server shutdown successful/" | grep 'Server shutdown successful')
  if [ "${Shutdown_Status}" ] || [ "$( ps ax | grep ${SERVER} | grep -v grep | grep tmux | wc -l)" ]; then
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

status=0
#Generate Offline jpg
LoadFile "generate_banner.sh"
