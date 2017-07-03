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
    cp manager-config.ini manager-config.ini.backup
  fi
  if [ -f avorion-manager/PHPConfig.ini ]; then
    cp avorion-manager/PHPConfig.ini avorion-manager/PHPConfig.ini.backup
  fi

  tar -xvf UpdateDirtyServerManager.tar.gz --exclude='Database.php' --exclude='avorion-manager/HighScore.php' --exclude='avorion-manager/PlayerData.php' --exclude='avorion-manager/SectorData.php' --exclude='avorion-manager/logs'

  if [ -f manager-config.ini.backup ]; then
    diff --unchanged-line-format='%L' --old-line-format='%L' --new-line-format='+%L' manager-config.ini.backup manager-config.ini > manager-config.ini.diff
    grep ^+ manager-config.ini.diff | while read -r line ; do
        Addition=$(echo $line | sed -e 's/^+//' -e 's/=.*//g')
        echo $Addition
        if grep -q "^$Addition" manager-config.ini.diff; then
            sed -i "/+$Addition.*/d" manager-config.ini.diff
       else
            Remove=$(echo $line | sed 's/^.//g')
            sed -i "s/^$line/$Remove/g" manager-config.ini.diff
       fi
    done
    rm manager-config.ini
    mv manager-config.ini.diff manager-config.ini
  fi

  if [ -f avorion-manager/PHPConfig.ini.backup ]; then
    diff --unchanged-line-format='%L' --old-line-format='%L' --new-line-format='+%L' PHPConfig.ini.backup PHPConfig.ini > PHPConfig.ini.diff
    grep ^+ PHPConfig.ini.diff | while read -r line ; do
        Addition=$(echo $line | sed -e 's/^+//' -e 's/=.*//g')
        echo $Addition
        if grep -q "^$Addition" PHPConfig.ini.diff; then
            sed -i "/+$Addition.*/d" PHPConfig.ini.diff
       else
            Remove=$(echo $line | sed 's/^.//g')
            sed -i "s/^$line/$Remove/g" PHPConfig.ini.diff
       fi
    done
    rm PHPConfig.ini
    mv PHPConfig.ini.diff PHPConfig.ini
  fi

  rm UpdateDirtyServerManager.tar.gz
  echo Update complete.
else
  echo "Current Version: ${CurrentVersion}, Dirty Server Manager is Up To Date!"
fi
