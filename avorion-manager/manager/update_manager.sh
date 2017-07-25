#!/bin/bash
Latest=$(wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest)
LatestVERSION=$(echo ${Latest}  | tr -d '[:blank:]' | sed -e 's/.*tag_name":"//g' -e 's/".*//g')

if [ "${VERSION}" != "${LatestVERSION}" ] || [ "${force}" == "true" ]; then
  DynamicEcho "Dirty Server Manager is NOT Up To Date!"
  DynamicEcho "downloading update for Dirty Server Manager"
  wget -O UpdateDirtyServerManager.tar.gz https://github.com/dirtyredz/Dirty-Server-Manager/releases/download/${LatestVERSION}/DirtyServerManager.tar.gz
  DynamicEcho "Installing $LatestVERSION"

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
    diff --unchanged-line-format='%L' --old-line-format='%L' --new-line-format='+%L' avorion-manager/PHPConfig.ini.backup avorion-manager/PHPConfig.ini > avorion-manager/PHPConfig.ini.diff
    grep ^+ avorion-manager/PHPConfig.ini.diff | while read -r line ; do
        Addition=$(echo $line | sed -e 's/^+//' -e 's/=.*//g')
        if grep -q "^$Addition" avorion-manager/PHPConfig.ini.diff; then
            sed -i "/+$Addition.*/d" avorion-manager/PHPConfig.ini.diff
       else
            Remove=$(echo $line | sed 's/^.//g')
            sed -i "s/^$line/$Remove/g" avorion-manager/PHPConfig.ini.diff
       fi
    done
    rm avorion-manager/PHPConfig.ini
    mv avorion-manager/PHPConfig.ini.diff avorion-manager/PHPConfig.ini
  fi

  rm UpdateDirtyServerManager.tar.gz
  DynamicEcho "Update complete."
else
  DynamicEcho "Current Version: ${VERSION}, Dirty Server Manager is Up To Date!"
fi
