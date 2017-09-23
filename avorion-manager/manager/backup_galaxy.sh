#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="backup_galaxy"
COMMAND_DESCRIPTION="Backs up the entire galaxy directory"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

MaxBackupsDays=10

DynamicEcho "Started Backup this will take awhile."

if [ "$verbose" == true ]; then
  tar -zcvf ${GalaxyDirectoryPath}$(/bin/date +\%d-\%m-\%Y_\%H-\%M-\%S)_${GALAXY}.tar.gz -C ${GalaxyDirectoryPath} ${GALAXY}
else
  DynamicEcho "Use -v to have complete output from the backup command."
  tar -zcf ${GalaxyDirectoryPath}$(/bin/date +\%d-\%m-\%Y_\%H-\%M-\%S)_${GALAXY}.tar.gz -C ${GalaxyDirectoryPath} ${GALAXY}
fi

DynamicEcho "Looking for any backup older then: ${MaxBackupsDays} Days."

find ${GalaxyDirectoryPath}*_${GALAXY}.tar.gz -mtime +${MaxBackupsDays} -type f -delete 2> /dev/null

DynamicEcho "Finished Backup."
