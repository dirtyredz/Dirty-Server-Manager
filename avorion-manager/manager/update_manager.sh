#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="update_manager"
COMMAND_DESCRIPTION="Updates manager files"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

# if server is online
LoadFile "core_status.sh"
if [ "${status}" != "0" ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} should not be running while updating."
  LoadFile "core_exit.sh"
fi

Latest=$(wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest)
LatestVERSION=$(echo ${Latest}  | tr -d '[:blank:]' | sed -e 's/.*tag_name":"//g' -e 's/".*//g')

if [ "${VERSION}" != "${LatestVERSION}" ] || [ "${force}" == "true" ]; then
  DynamicEcho "Dirty Server Manager is NOT Up To Date!"
  DynamicEcho "downloading update for Dirty Server Manager"
  wget -O UpdateDirtyServerManager.tar.gz https://github.com/dirtyredz/Dirty-Server-Manager/releases/download/${LatestVERSION}/DirtyServerManager.tar.gz
  DynamicEcho "Installing $LatestVERSION"

  if [ -f ${SCRIPTPATH}/manager-config.ini ]; then
    cp ${SCRIPTPATH}/manager-config.ini ${SCRIPTPATH}/manager-config.ini.backup
  fi
  if [ -f ${SCRIPTPATH}/avorion-manager/PHPConfig.ini ]; then
    cp ${SCRIPTPATH}/avorion-manager/PHPConfig.ini ${SCRIPTPATH}/avorion-manager/PHPConfig.ini.backup
  fi

  tar -xvf UpdateDirtyServerManager.tar.gz --exclude='Database.php' --exclude='avorion-manager/HighScore.php' --exclude='avorion-manager/AllianceData.php' --exclude='avorion-manager/PlayerData.php' --exclude='avorion-manager/SectorData.php' --exclude='avorion-manager/logs'

  OldFilePath=${SCRIPTPATH}/manager-config.ini.backup
  NewFilePath=${SCRIPTPATH}/manager-config.ini
  php -f ${SCRIPTPATH}/avorion-manager/manager/UpdateConfig.php "${OldFilePath}" "${NewFilePath}" "Manager"

  OldFilePath=${SCRIPTPATH}/avorion-manager/PHPConfig.ini.backup
  NewFilePath=${SCRIPTPATH}/avorion-manager/PHPConfig.ini
  php -f ${SCRIPTPATH}/avorion-manager/manager/UpdateConfig.php "${OldFilePath}" "${NewFilePath}" "PHP"

  rm UpdateDirtyServerManager.tar.gz
  DynamicEcho "Update complete."
else
  DynamicEcho "Current Version: ${VERSION}, Dirty Server Manager is Up To Date!"
fi
