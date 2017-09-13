#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="proc"
COMMAND_DESCRIPTION="Broadcast's rotating messages to the server."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

# if server is offline
LoadFile "core_status.sh"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  LoadFile "core_exit.sh"
fi

LastBroadcast=1

touch ${SCRIPTPATH}/LastBroadcast.txt
if [ -s "${SCRIPTPATH}/LastBroadcast.txt" ]; then
  read LastBroadcast < ${SCRIPTPATH}/LastBroadcast.txt
  if [ "$verbose" = true ]; then
    DynamicEcho "Reading LastBroadcast.txt, aquired value: ${LastBroadcast}"
  fi
fi

case "$LastBroadcast" in
    1) Message=$MessageOne;;
    2) Message=$MessageTwo;;
    3) Message=$MessageThree;;
    4) Message=$MessageFour;;
    5) Message=$MessageFive;;
    *) Message=$MessageOne; LastBroadcast=1;;
esac

if [ "$verbose" = true ]; then
  DynamicEcho "Sending command: /say ${Message}"
fi
$Tmux_SendKeys "/say ${Message}" C-m

NextBroadcast=$LastBroadcast
NextMessage=''

while [ -z "$NextMessage" ]; do
  NextBroadcast=$(($NextBroadcast+1))
  if [ $NextBroadcast -ge 6 ]; then
    NextBroadcast=1
  fi

  case "$NextBroadcast" in
      1) NextMessage=$MessageOne;;
      2) NextMessage=$MessageTwo;;
      3) NextMessage=$MessageThree;;
      4) NextMessage=$MessageFour;;
      5) NextMessage=$MessageFive;;
      *) NextMessage=$MessageOne; NextBroadcast=1;;
  esac
done

if [ "$verbose" = true ]; then
  DynamicEcho "Assigning value: ${NextBroadcast}, to LastBroadcast.txt"
fi
echo $NextBroadcast > ${SCRIPTPATH}/LastBroadcast.txt
