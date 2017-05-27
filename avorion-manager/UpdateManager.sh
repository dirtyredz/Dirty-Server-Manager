#!/bin/bash
Latest=$(wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest)
VERSION=$(echo ${Latest}  | tr -d '[:blank:]' | sed -e 's/.*tag_name":"//g' -e 's/".*//g')
CurrentVersion=$(grep VERSION manager | head -n1 | sed -e 's/VERSION=//g')
if [ "${CurrentVersion}" != "${VERSION}" ]; then
  echo Dirty Server Manager is NOT Up To Date!
  echo downloading update for Dirty Server Manager
  wget -O UpdateDirtyServerManager.tar.gz https://github.com/dirtyredz/Dirty-Server-Manager/releases/download/${VERSION}/DirtyServerManager.tar.gz
  echo Installing $VERSION

  cp manager-config.ini manager-config.ini.old
  cp avorion-manager/PHPConfig.ini avorion-manager/PHPConfig.ini.old

  tar -xvf UpdateDirtyServerManager.tar.gz --exclude='Database.php' --exclude='avorion-manager/PlayerData.php' --exclude='avorion-manager/SectorData.php' --exclude='avorion-manager/logs'

  input="manager-config.ini.old"
  while IFS= read -r var
  do
    OldLineConfigName=$(echo $var | sed -e 's/=.*//g')
    sed -i "s/${OldLineConfigName}.*/${var}/" manager-config.ini
  done < "$input"
  rm manager-config.ini.old

  input="avorion-manager/PHPConfig.ini.old"
  while IFS= read -r var
  do
    OldLineConfigName=$(echo $var | sed -e 's/=.*//g')
    sed -i "s/${OldLineConfigName}.*/${var}/" avorion-manager/PHPConfig.ini
  done < "$input"
  rm avorion-manager/PHPConfig.ini.old

  rm UpdateDirtyServerManager.tar.gz
  echo Update complete.
else
  echo "Current Version: ${CurrentVersion}, Dirty Server Manager is Up To Date!"

fi
