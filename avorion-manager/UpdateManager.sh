#!/bin/bash
Latest=$(wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest)
VERSION=$(echo ${Latest}  | tr -d '[:blank:]' | sed -e 's/.*tag_name":"//g' -e 's/".*//g')
CurrentVersion=$(grep VERSION manager | sed -e 's/VERSION=//g')
if [ "${CurrentVersion}" != "${VERSION}" ]; then
  echo Dirty Server Manager is NOT Up To Date!
  echo downloading update for Dirty Server Manager
  wget -O UpdateDirtyServerManager.tar.gz https://github.com/dirtyredz/Dirty-Server-Manager/releases/download/${VERSION}/DirtyServerManager.tar.gz
  echo Installing $VERSION
  tar -xvf UpdateDirtyServerManager.tar.gz --exclude='manager-config.ini' --exclude='avorion-manager/PHPConfig.ini' --exclude='avorion-manager/PlayerData.php' --exclude='avorion-manager/SectorData.php' --exclude='avorion-manager/logs'
  rm UpdateDirtyServerManager.tar.gz
  echo Update complete.
else
  echo "Current Version: ${CurrentVersion}, Dirty Server Manager is Up To Date!"
fi

