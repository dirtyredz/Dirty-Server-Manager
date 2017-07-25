#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="generate_banner"
COMMAND_DESCRIPTION="Generates the status banner"

if [ -z ${status} ]; then
  LoadFile "core_status.sh"
fi

if [ "${status}" != "0" ]; then
  #OnlineCount=$(netstat -tlunp 2>/dev/null | grep -iv ':27'|grep -i $(pidof ${SERVER})|wc -l)
  status='Online'
  OnlinePlayers="$PlayersCount/$MAX_PLAYERS"
else
  status='Offline'
  OnlinePlayers="0/$MAX_PLAYERS"
fi
php -f ${SCRIPTPATH}/avorion-manager/manager/BannerGenerator.php "${status}" "${IPAddress}" "${GALAXY}" "${OnlinePlayers}"
