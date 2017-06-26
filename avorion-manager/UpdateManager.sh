#!/bin/bash
cd "${0%/*}"
cd ".."
Latest=$(wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest)
VERSION=$(echo ${Latest}  | tr -d '[:blank:]' | sed -e 's/.*tag_name":"//g' -e 's/".*//g')
CurrentVersion=$(./manager version)
if [ "${CurrentVersion}" != "${VERSION}" ]; then
  echo Dirty Server Manager is NOT Up To Date!
  echo downloading update for Dirty Server Manager
  wget -O UpdateDirtyServerManager.tar.gz https://github.com/dirtyredz/Dirty-Server-Manager/releases/download/${VERSION}/DirtyServerManager.tar.gz
  echo Installing $VERSION

  if [ -f manager-config.ini ]; then
    cp manager-config.ini manager-config.ini.old
    cp manager-config.ini manager-config.ini.backup
  fi
  if [ -f avorion-manager/PHPConfig.ini ]; then
    cp avorion-manager/PHPConfig.ini avorion-manager/PHPConfig.ini.old
    cp avorion-manager/PHPConfig.ini avorion-manager/PHPConfig.ini.backup
  fi

  tar -xvf UpdateDirtyServerManager.tar.gz --exclude='Database.php' --exclude='avorion-manager/HighScore.php' --exclude='avorion-manager/PlayerData.php' --exclude='avorion-manager/SectorData.php' --exclude='avorion-manager/logs'

  if [ -f manager-config.ini.old ]; then
    sed -i 's/^;.*//g' manager-config.ini.old
    input="manager-config.ini.old"
    while IFS= read -r var
    do
      if [ ! -z "$var" ]; then
        OldLineConfigName=$(echo $var | sed -e '0,/=.*/s///')
        replaceEscaped=$(sed 's/[&/\]/\\&/g' <<<"$var")
        sed -i "s~${OldLineConfigName}.*~${replaceEscaped}~" manager-config.ini
      fi
    done < "$input"
    rm manager-config.ini.old
  fi

  if [ -f avorion-manager/PHPConfig.ini.old ]; then
    sed -i 's/^;.*//g' avorion-manager/PHPConfig.ini.old
    input="avorion-manager/PHPConfig.ini.old"
    while IFS= read -r var
    do
      if [ ! -z "$var" ]; then
        OldLineConfigName=$(echo $var | sed -e '0,/=.*/s///')
        replaceEscaped=$(sed 's/[&/\]/\\&/g' <<<"$var")
        sed -i "s~${OldLineConfigName}=.*~${replaceEscaped}~" avorion-manager/PHPConfig.ini
      fi
    done < "$input"
    rm avorion-manager/PHPConfig.ini.old
  fi

  rm UpdateDirtyServerManager.tar.gz
  echo Update complete.
else
  echo "Current Version: ${CurrentVersion}, Dirty Server Manager is Up To Date!"
fi
