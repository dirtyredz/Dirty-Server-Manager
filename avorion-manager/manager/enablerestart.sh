#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="enablerestart"
COMMAND_DESCRIPTION="Reapplies the restart and send cronjobs"

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

LoadFile "disablerestart.sh"

(crontab -l ; echo "${CRONDAILYRESTART_15}") | crontab -
(crontab -l ; echo "${CRONDAILYRESTART_10}") | crontab -
(crontab -l ; echo "${CRONDAILYRESTART_5}") | crontab -
(crontab -l ; echo "${CRONDAILYRESTART_1}") | crontab -
(crontab -l ; echo "${CRONDAILYRESTART_NOW}") | crontab -
