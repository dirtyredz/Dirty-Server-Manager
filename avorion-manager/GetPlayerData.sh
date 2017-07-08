#!/bin/bash
cd "${0%/*}"
cd ".."
#Log to manager.log
echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
echo -e '[Manager]: Starting GetPlayerData()' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
#Settup TMP file
PlayerDataTmp=${PWD}/avorion-manager/PlayerData.tmp
DIR="$1"
#COUNT=0
source <(grep = ${PWD}/manager-config.ini)
GALAXYNAME=`echo ${GALAXY} | sed -e 's/\r//g'`
KeepDataFiles=`echo ${KeepDataFiles} | sed -e 's/\r//g'`
KeepDataFilesDays=`echo ${KeepDataFilesDays} | sed -e 's/\r//g'`
KeepDataFilesPlayers=`echo ${KeepDataFilesPlayers} | sed -e 's/\r//g'`

echo "<?php" > $PlayerDataTmp;
echo "\$PlayerData = array(" >> $PlayerDataTmp;
for i in {1..10000}
do
  find ${DIR}/${GALAXYNAME}/players/ -name \*.tmp -delete
  file=${DIR}/${GALAXYNAME}/players/player_$i.dat.0
  [ -e "$file" ] || continue
  file=$(ls -t ${DIR}/${GALAXYNAME}/players/player_$i.dat.* | head -1)
  [ -e "$file" ] || continue
  #dd if=$file bs=1 skip=44 of=${file}.tmp > /dev/null 2>&1
  php -f ${PWD}/avorion-manager/zlib_Uncompress.php "${file}" "PlayerUncompressed.tmp"
  #rm ${file}.tmp
  OriginalFile=$file
  file=PlayerUncompressed.tmp
  StartingPositionName=$(grep -b -a -o -P 'name' "${file}" | sed 's/:.*//' | head -n1 | awk '{SUM = $1 + 13 } END {print SUM}')
  if [ "${StartingPositionName}" ]; then
    ID=$(echo $OriginalFile | sed -e 's/.*_//g' -e 's/.dat.*//g')
    Name=$(xxd -ps -l 50 -seek ${StartingPositionName} "${file}" | xxd -r -p | head -n1 | sed -e 's/\$/\\$/g' )
    Group=$(avorion-manager/XMLParser.sh "${Name}")
    LastSeenConsole=$(grep -m 1 -e "${Name} joined" console.log)
    LastSeen='Unkown'
    #If they arnt seen in the consle
    if [ -z "$LastSeenConsole" ]; then
      #If PlayerData.php exsists
      if [ -e ${PWD}/avorion-manager/PlayerData.php ]; then
        #If the old file has LastSeen init
        PastPlayerData=$(grep -e "LastSeen" ${PWD}/avorion-manager/PlayerData.php)
        if [ "${PastPlayerData}" ]; then
          #Grab users LastSeen from the previous file
          LastSeenPast=$(grep -e "Name\" => \"${Name}\"" ${PWD}/avorion-manager/PlayerData.php | sed -e 's/.*LastSeen\" => \"//g' -e 's/\".*//g')
          #If its Unknown or empty then search logs
          if [ "$LastSeenPast" == "Unkown" ] || [ -z "$LastSeenPast" ]; then
            LastSeen=$(grep -h -m 1 -e "${Name}" $(find ${PWD}/avorion-manager/logs/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n1 | sed -e 's/ .*//g')
          else
            LastSeen=$LastSeenPast
          fi
        fi
      else
        #If it doesnt exsist then try and find there info in the logs
        LastSeen=$(grep -h -m 1 -e "${Name}" $(find ${PWD}/avorion-manager/logs/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n1 | sed -e 's/ .*//g')
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

[ -e ${PWD}/avorion-manager/PlayerData.php ] && rm ${PWD}/avorion-manager/PlayerData.php
cp $PlayerDataTmp ${PWD}/avorion-manager/PlayerData.php
rm $PlayerDataTmp

if [ "${KeepDataFiles}" = true ]; then
  [ ! -e "${PWD}/avorion-manager/databackups" ] && mkdir "${PWD}/avorion-manager/databackups"
  if [ "${KeepDataFilesPlayers}" = true ]; then
    [ ! -e "${PWD}/avorion-manager/databackups/players" ] && mkdir "${PWD}/avorion-manager/databackups/players"
    echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
    echo -e '[Manager]: Storing PlayerData' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
    cp ${PWD}/avorion-manager/PlayerData.php ${PWD}/avorion-manager/databackups/players/PlayerData_$(/bin/date +\%d-\%m-\%Y_\%H-\%M-00).php
    find ${PWD}/avorion-manager/databackups/players/PlayerData_* -mtime +${KeepDataFilesDays} -type f -delete 2> /dev/null
  fi
fi

echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
echo -e '[Manager]: Completed GetPlayerData()' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
