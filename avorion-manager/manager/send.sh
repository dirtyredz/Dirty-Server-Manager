#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="send"
COMMAND_DESCRIPTION="sends string directly into the servers console"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

if [ -z "$SecondCommand" ]; then
  DynamicEcho "Second paremeter required, expeted command string."
  LoadFile "core_exit"
fi

# if server is offline
LoadFile "core_status"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  LoadFile "core_exit"
fi

if [ ${SecondCommand:0:1} != '/' ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Command is does not start with a / command."
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Did you means to say '/say ${SecondCommand}' ?"
  LoadFile "core_exit"
fi

DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Sending command: ${SecondCommand}"
$Tmux_SendKeys "${SecondCommand}" C-m
