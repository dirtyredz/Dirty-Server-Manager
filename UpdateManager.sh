#!/bin/bash
Latest=$(wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest)
VERSION=$(echo ${Latest} | sed -e 's/.*tag_name"://g' -e 's/".*//g' | tr -d '[:blank:]')
CurrentVersion=$(grep VERSION manager | sed -e 's/VERSION=//g')
if [ "${CurrentVersion}" != "${VERSION}" ]; then
  echo Dirty Server Manager is NOT Up To Date!
  echo downloading update for Dirty Server Manager
  URL=$(echo ${Latest} | grep DirtyServerManager | sed -e 's/.*(//g' -e 's/).*//g')
  echo $URL
  wget -N $URL -O UpdateDirtyServerManager.tar.gz
  tar -xvf UpdateDirtyServerManager.tar.gz --exclude='manager-config.sh' --exclude='avorion-manager/Config.php' --exclude='avorion-manager/PlayerData.php' --exclude='avorion-manager/SectorData.php' --exclude='avorion-manager/logs'
  rm UpdateDirtyServerManager.tar.gz
  echo Installing $VERSION
  echo Update complete.
else
  echo "Current Version: ${CurrentVersion}, Dirty Server Manager is Up To Date!"
fi
