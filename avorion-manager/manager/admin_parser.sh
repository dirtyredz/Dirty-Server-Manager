#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="admin_parser"
COMMAND_DESCRIPTION="parses through admin.xml and displays group name of provided user"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

if [ -z "$SecondCommand" ]; then
  DynamicEcho "Second paremeter required, expeted username."
  LoadFile "core_exit"
fi

GroupName=''
while read -r line ; do
    Exsists=$(awk "/$line/,/\/group/" ${GalaxyDirectoryPath}${GALAXY}/admin.xml | grep -F "user name=\"${SecondCommand}")
    if [ "$Exsists" ]; then
      GroupName=$(echo -n $line | sed -e 's/<group name="//g' -e 's/">//g')
    fi
done < <(grep "group name=" ${GalaxyDirectoryPath}${GALAXY}/admin.xml)

ADMIN=$(grep "<admin name=\"${SecondCommand}\"" ${GalaxyDirectoryPath}${GALAXY}/admin.xml)
if [ "$ADMIN" ]; then
  GroupName='Admin'
fi

if [ "$verbose" == true ] && [ "$GroupName" ]; then
  DynamicEcho "\r" "DONTLOG"
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Found ${SecondCommand}, in group: ${GroupName}"
fi
