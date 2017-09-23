#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="get_groups"
COMMAND_DESCRIPTION="parses through admin.xml and displays all groups"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

DynamicEcho $(grep "group name=" ${GalaxyDirectoryPath}${GALAXY}/admin.xml | sed -e 's/<group name="//g' -e 's/">//g' -e 's/\r//g' | tr -d '[:blank:]' | awk '{print $0}' ORS=',' | awk '{print $1"Admin"}')
