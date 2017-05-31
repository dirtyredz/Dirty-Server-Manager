#!/bin/bash
echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
echo -e '[Manager]: Starting GetPlayerData()' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
PlayerDataTmp=${PWD}/avorion-manager/PlayerData.tmp
DIR="$1"
#COUNT=0
GALAXYNAME=$(grep GALAXY ${PWD}/manager-config.sh | sed -e 's/.*=//g' -e 's/\r//g')
echo "<?php" > $PlayerDataTmp;
echo "\$PlayerData = array(" >> $PlayerDataTmp;
for file in ${DIR}/${GALAXYNAME}/players/*.dat; do
  [ -e "$file" ] || continue
  StartingPositionName=$(grep -b -a -o -P 'name' "${file}" | sed 's/:.*//' | head -n1 | awk '{SUM = $1 + 13 } END {print SUM}')
  if [ "${StartingPositionName}" ]; then
    ID=$(echo $file | sed -e 's/.*_//g' -e 's/.dat//g')
    Name=$(xxd -ps -l 50 -seek ${StartingPositionName} "${file}" | xxd -r -p | head -n1 )
    LastSeenConsole=$(grep -m 1 -e "${Name} joined" console.log)
    LastSeen='Unkown'
    if [ -z "$LastSeenConsole" ]; then
      if [ -e ${PWD}/avorion-manager/PlayerData.php ]; then
        PastPlayerData=$(grep -e "LastSeen" ${PWD}/avorion-manager/PlayerData.php)
        if [ "${PastPlayerData}" ]; then
          LastSeenPast=$(grep -e "Name\" => \"${Name}\"" ${PWD}/avorion-manager/PlayerData.php | sed -e 's/.*LastSeen\" => \"//g' -e 's/\".*//g')
          if [ "$LastSeenPast" == "Unkown" ] || [ -z "$LastSeenPast" ]; then
            LastSeen=$(grep -h -m 1 -e "${Name}" $(find ${PWD}/avorion-manager/logs/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n1 | sed -e 's/ .*//g')
          fi
        fi
      else
        LastSeen=$(grep -h -m 1 -e "${Name}" $(find ${PWD}/avorion-manager/logs/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n1 | sed -e 's/ .*//g')
      fi
    else
      LastSeen=$(/bin/date +\%Y-\%m-\%d)
    fi
    StartingPosition=$(grep -b -a -o -P 'play_time' "${file}" | sed 's/:.*//' | tail -n1)
    SteamID=$(xxd -ps -l 8 -seek "$((${StartingPosition} - 33 ))" "${file}" )
    Money=$(xxd -ps -l 4 -seek "$((${StartingPosition} - 8 ))" "${file}" )
    Iron=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 43 ))" "${file}" )
    Titanium=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 69 ))" "${file}" )
    Naonite=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 95 ))" "${file}" )
    Trinium=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 121 ))" "${file}" )
    Xanion=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 147 ))" "${file}" )
    Ogonite=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 173 ))" "${file}" )
    Avorion=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 199 ))" "${file}" )
    PlayTime=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 17 ))" "${file}" )
    echo  "array(\"ID\" => \"$ID\",\"Name\" => \"$Name\",\"LastSeen\" => \"$LastSeen\",\"SteamID\" => \"$SteamID\",\"PlayTime\" => \"$PlayTime\",\"Money\" => \"$Money\",\"Iron\" => \"$Iron\",\"Titanium\" => \"$Titanium\",\"Naonite\" => \"$Naonite\",\"Trinium\" => \"$Trinium\",\"Xanion\" => \"$Xanion\",\"Ogonite\" => \"$Ogonite\",\"Avorion\" => \"$Avorion\")," >> $PlayerDataTmp;
  fi
done
echo ");" >> $PlayerDataTmp;
[ -e ${PWD}/avorion-manager/PlayerData.php ] && rm ${PWD}/avorion-manager/PlayerData.php
cp $PlayerDataTmp ${PWD}/avorion-manager/PlayerData.php
rm $PlayerDataTmp


echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
echo -e '[Manager]: Completed GetPlayerData()' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
