<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'get_player_data');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_NAME', 'Parses through all player files.');

echo COMMAND_NAME
?>
if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

#Log to manager.log
LogToManagerLog "Starting GetPlayerData()"
DynamicEcho "Starting GetPlayerData()"



#Settup TMP file
PlayerDataTmp=${SCRIPTPATH}/avorion-manager/PlayerData.tmp
#COUNT=0

if [ "$verbose" = true ]; then
  DynamicEcho "Searching for player files in: ${GalaxyDirectoryPath}${GALAXY}/players/"
fi

echo "<?php" > $PlayerDataTmp;
echo "\$PlayerData = array(" >> $PlayerDataTmp;
numFiles=$(ls -1q "${GalaxyDirectoryPath}${GALAXY}/players/" | wc -l | sed -e 's/\r//g')
if [ "$verbose" = true ]; then
  DynamicEcho "Found ${numFiles}, player files. (There are multiple copies of each player file, only parsing 1 for each player.)"
fi

ProcessedCount=0
SeenPlayer=()

for file in ${GalaxyDirectoryPath}${GALAXY}/players/player_*; do
  find ${GalaxyDirectoryPath}${GALAXY}/players/ -name \*.tmp -delete

  PlayerIndex=$(echo ${file} | sed -e 's/.*_//g' -e 's/\.dat.*//g')
  file=$(find ${GalaxyDirectoryPath}${GALAXY}/players/player_${PlayerIndex}.dat.* -printf '%T+ %p\n' | sort -r | head -n 1 | sed 's/.* //g')
  [ -e "$file" ] || continue

  if [ "$verbose" = true ]; then
    DynamicEcho "\rParsing file: ${file}" "DONTLOG"
  fi
  PlayerSeen=false
  for i in ${SeenPlayer[@]} ; do
      if [ $i == $PlayerIndex ] ; then
          echo 'player already parsed'
          PlayerSeen=true
      fi
  done
  if [ "$PlayerSeen" == true ]; then
    continue
  fi
  SeenPlayer+=("$PlayerIndex")

  php -f ${SCRIPTPATH}/avorion-manager/manager/zlib_Uncompress.php "${file}" "PlayerUncompressed.tmp"

  OriginalFile=$file
  file=PlayerUncompressed.tmp
  StartingPositionName=$(grep -b -a -o -P 'name' "${file}" | sed 's/:.*//' | head -n1 | awk '{SUM = $1 + 13 } END {print SUM}')
  if [ "${StartingPositionName}" ]; then
    ID=$(echo $OriginalFile | sed -e 's/.*_//g' -e 's/.dat.*//g')
    Name=$(xxd -ps -l 50 -seek ${StartingPositionName} "${file}" | xxd -r -p | head -n1 | sed -e 's/\$/\\$/g' -e 's/\"/\\"/g' )
    LoadFile "admin_parser.sh" "${Name}"
    Group="$GroupName"
    LastSeenConsole=$(grep -m 1 -e "${Name} joined" console.log)
    LastSeen='Unkown'
    #If they arnt seen in the consle
    if [ -z "$LastSeenConsole" ]; then
      #If PlayerData.php exsists
      if [ -e ${SCRIPTPATH}/avorion-manager/PlayerData.php ]; then
        #If the old file has LastSeen init
        PastPlayerData=$(grep -e "LastSeen" ${SCRIPTPATH}/avorion-manager/PlayerData.php)
        if [ "${PastPlayerData}" ]; then
          #Grab users LastSeen from the previous file
          LastSeenPast=$(grep -e "Name\" => \"${Name}\"" ${SCRIPTPATH}/avorion-manager/PlayerData.php | sed -e 's/.*LastSeen\" => \"//g' -e 's/\".*//g')
          #If its Unknown or empty then search logs
          if [ "$LastSeenPast" == "Unkown" ] || [ -z "$LastSeenPast" ]; then
            LastSeen=$(grep -h -m 1 -e "${Name}" $(find ${SCRIPTPATH}/avorion-manager/logs/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n1 | sed -e 's/ .*//g')
          else
            LastSeen=$LastSeenPast
          fi
        fi
      else
        #If it doesnt exsist then try and find there info in the logs
        LastSeen=$(grep -h -m 1 -e "${Name}" $(find ${SCRIPTPATH}/avorion-manager/logs/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n1 | sed -e 's/ .*//g')
      fi
    else
      #Were seen in console add today
      LastSeen=$(/bin/date +\%Y-\%m-\%d)
    fi

    #Mail Money
    MailCheck=$(grep -b -a -o -P 'mail_items' "${file}" | sed 's/:.*//' | head -n1)
    MailHeader=$(xxd -ps -l 6 -seek "$((${MailCheck} + 33 ))" "${file}" | xxd -r -p | head -n1)
    MailCount=0
    MailMoney='array()'
    MailIron='array()'
    MailTitanium='array()'
    MailNaonite='array()'
    MailTrinium='array()'
    MailXanion='array()'
    MailOgonite='array()'
    MailAvorion='array()'
    if [[ "$MailHeader" == "header" ]]; then
      MailStart=$(grep -b -a -o -P 'money64' "${file}" | sed 's/:.*//' | head -n1)
      MailCount=$(xxd -ps -l 1 -seek "$((${MailStart} + 11 ))" "${file}")
      MailCount=$((0x$MailCount))
      Count=15
      Index=1
      MailMoney='array('
      until [ $Index -gt $MailCount ]
      do
        MailMoney=$MailMoney'"'$(xxd -ps -l 8 -seek "$((${MailStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailMoney=$MailMoney')'

      #MailResources
      MailResourcesStart=$(grep -b -a -o -P 'resources640' "${file}" | sed 's/:.*//' | head -n1)
      Count=20
      Index=1
      MailIron='array('
      until [ $Index -gt $MailCount ]
      do
        MailIron=$MailIron'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailIron=$MailIron')'
      Count=$(($Count+24))
      Index=1
      MailTitanium='array('
      until [ $Index -gt $MailCount ]
      do
        MailTitanium=$MailTitanium'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailTitanium=$MailTitanium')'
      Count=$(($Count+24))
      Index=1
      MailNaonite='array('
      until [ $Index -gt $MailCount ]
      do
        MailNaonite=$MailNaonite'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailNaonite=$MailNaonite')'
      Count=$(($Count+24))
      Index=1
      MailTrinium='array('
      until [ $Index -gt $MailCount ]
      do
        MailTrinium=$MailTrinium'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailTrinium=$MailTrinium')'
      Count=$(($Count+24))
      Index=1
      MailXanion='array('
      until [ $Index -gt $MailCount ]
      do
        MailXanion=$MailXanion'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailXanion=$MailXanion')'
      Count=$(($Count+24))
      Index=1
      MailOgonite='array('
      until [ $Index -gt $MailCount ]
      do
        MailOgonite=$MailOgonite'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailOgonite=$MailOgonite')'
      Count=$(($Count+24))
      Index=1
      MailAvorion='array('
      until [ $Index -gt $MailCount ]
      do
        MailAvorion=$MailAvorion'"'$(xxd -ps -l 8 -seek "$((${MailResourcesStart} + $Count ))" "${file}")'",'
        Count=$(($Count+8))
        Index=$(($Index+1))
      done
      MailAvorion=$MailAvorion')'
    fi
    #Other Stuff
    AllianceStart=$(grep -b -a -o -P 'alliance' "${file}" | sed 's/:.*//' | head -n1)
    Alliance=$(xxd -ps -l 4 -seek "$((${AllianceStart} + 16 ))" "${file}")
    StartingPosition=$(grep -b -a -o -P 'play_time' "${file}" | sed 's/:.*//' | tail -n1)
    SteamID=$(xxd -ps -l 8 -seek "$((${StartingPosition} - 39 ))" "${file}" )
    Money=$(xxd -ps -l 8 -seek "$((${StartingPosition} - 12 ))" "${file}" )
    Iron=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 45 ))" "${file}" )
    Titanium=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 77 ))" "${file}" )
    Naonite=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 109 ))" "${file}" )
    Trinium=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 141 ))" "${file}" )
    Xanion=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 173 ))" "${file}" )
    Ogonite=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 205 ))" "${file}" )
    Avorion=$(xxd -ps -l 8 -seek "$((${StartingPosition} + 237 ))" "${file}" )
    PlayTime=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 17 ))" "${file}" )
    echo  "array(\"ID\" => \"$ID\",\"Name\" => \"$Name\",\"Alliance\" => \"$Alliance\",\"LastSeen\" => \"$LastSeen\",\"Group\" => \"$Group\",\"SteamID\" => \"$SteamID\",\"PlayTime\" => \"$PlayTime\",\"Money\" => \"$Money\",\"Iron\" => \"$Iron\",\"Titanium\" => \"$Titanium\",\"Naonite\" => \"$Naonite\",\"Trinium\" => \"$Trinium\",\"Xanion\" => \"$Xanion\",\"Ogonite\" => \"$Ogonite\",\"Avorion\" => \"$Avorion\",\"MailCount\" => \"$MailCount\",\"MailMoney\" => $MailMoney,\"MailIron\" => $MailIron,\"MailTitanium\" => $MailTitanium,\"MailNaonite\" => $MailNaonite,\"MailTrinium\" => $MailTrinium,\"MailXanion\" => $MailXanion,\"MailOgonite\" => $MailOgonite,\"MailAvorion\" => $MailAvorion)," >> $PlayerDataTmp;
  fi
  [ -e "$file" ] && rm $file
done
echo ");" >> $PlayerDataTmp;


[ -e ${SCRIPTPATH}/avorion-manager/PlayerData.php ] && rm ${SCRIPTPATH}/avorion-manager/PlayerData.php
cp $PlayerDataTmp ${SCRIPTPATH}/avorion-manager/PlayerData.php
rm $PlayerDataTmp

if [ "${KeepDataFiles}" = true ]; then
  [ ! -e "${SCRIPTPATH}/avorion-manager/databackups" ] && mkdir "${SCRIPTPATH}/avorion-manager/databackups"
  if [ "${KeepDataFilesPlayers}" = true ]; then
    [ ! -e "${SCRIPTPATH}/avorion-manager/databackups/players" ] && mkdir "${SCRIPTPATH}/avorion-manager/databackups/players"
    LogToManagerLog "Storing PlayerData"
    DynamicEcho "Storing PlayerData"
    cp ${SCRIPTPATH}/avorion-manager/PlayerData.php ${SCRIPTPATH}/avorion-manager/databackups/players/PlayerData_$(/bin/date +\%d-\%m-\%Y_\%H-\%M-00).php
    find ${SCRIPTPATH}/avorion-manager/databackups/players/PlayerData_* -mtime +${KeepDataFilesDays} -type f -delete 2> /dev/null
  fi
fi

LogToManagerLog "Completed GetPlayerData()"
DynamicEcho "\r" "DONTLOG"
DynamicEcho "Completed GetPlayerData()"
