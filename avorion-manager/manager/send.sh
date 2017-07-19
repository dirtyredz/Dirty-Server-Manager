#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

# if server is offline
LoadFile "core_status.sh"
if [ "${status}" == "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  LoadFile "core_exit.sh"
fi

if [ ${SecondCommand:0:1} != '/' ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Command is does not start with a / command."
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Did you means to say '/say ${SecondCommand}' ?"
  LoadFile "core_exit.sh"
fi

DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Sending command: ${SecondCommand}"
$T "${SecondCommand}" C-m
