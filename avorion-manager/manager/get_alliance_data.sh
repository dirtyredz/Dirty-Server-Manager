#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="get_alliance_data"
COMMAND_DESCRIPTION="Parses through all alliance files."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

#Log to manager.log
LogToManagerLog "Starting GetAllianceData()"
DynamicEcho "Starting GetAllianceData()"
#Settup TMP file
AllianceDataTmp=${SCRIPTPATH}/avorion-manager/AllianceData.tmp
DIR="${SCRIPTPATH}/.avorion/galaxies"
#COUNT=0
source <(grep = ${SCRIPTPATH}/manager-config.ini)
GALAXYNAME=`echo ${GALAXY} | sed -e 's/\r//g'`
KeepDataFiles=`echo ${KeepDataFiles} | sed -e 's/\r//g'`
KeepDataFilesDays=`echo ${KeepDataFilesDays} | sed -e 's/\r//g'`
KeepDataFilesAlliances=`echo ${KeepDataFilesAlliances} | sed -e 's/\r//g'`
numFiles=$(ls -1q "${DIR}/${GALAXYNAME}/alliances/" | wc -l | sed -e 's/\r//g')
if [ "$verbose" = true ]; then
  DynamicEcho "Found ${numFiles}, alliance files. (There are multiple copies of each alliance file, only parsing 1 for each alliance.)"
fi
echo "<?php" > $AllianceDataTmp;
echo "\$AllianceData = array(" >> $AllianceDataTmp;
for i in $(seq 1 $numFiles); do
  find ${DIR}/${GALAXYNAME}/alliances/ -name \*.tmp -delete
  file=${DIR}/${GALAXYNAME}/alliances/alliance_$i.dat.0
  [ -e "$file" ] || continue
  file=$(ls -t ${DIR}/${GALAXYNAME}/alliances/alliance_$i.dat.* | head -1)
  [ -e "$file" ] || continue
  if [ "$verbose" = true ]; then
    DynamicEcho "\rParsing file: ${file}" "DONTLOG"
  fi
  #dd if=$file bs=1 skip=44 of=${file}.tmp > /dev/null 2>&1
  php -f ${SCRIPTPATH}/avorion-manager/manager/zlib_Uncompress.php "${file}" "AllianceUncompressed.tmp"
  #rm ${file}.tmp
  OriginalFile=$file
  file=AllianceUncompressed.tmp
  NameStart=$(grep -b -a -o -P 'name' "${file}" | sed 's/:.*//' | head -n1)
  if [ "${NameStart}" ]; then
    ID=$(echo $OriginalFile | sed -e 's/.*_//g' -e 's/.dat.*//g')
    Name=$(xxd -ps -l 50 -seek "$((${NameStart} + 16 ))" "${file}" | xxd -r -p | head -n1)
    LeaderStart=$(grep -b -a -o -P 'leader' "${file}" | sed 's/:.*//' | head -n1)
    Leader=$(xxd -ps -l 4 -seek "$((${LeaderStart} + 14 ))" "${file}")

    MoneyStart=$(grep -b -a -o -P 'money64' "${file}" | sed 's/:.*//' | head -n1)
    Money=$(xxd -ps -l 4 -seek "$((${MoneyStart} + 15 ))" "${file}" )

    StartingPosition=$(grep -b -a -o -P 'resources640' "${file}" | sed 's/:.*//' | tail -n1)

    Iron=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 20 ))" "${file}" )
    Titanium=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 52 ))" "${file}" )
    Naonite=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 84 ))" "${file}" )
    Trinium=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 116 ))" "${file}" )
    Xanion=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 148 ))" "${file}" )
    Ogonite=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 180 ))" "${file}" )
    Avorion=$(xxd -ps -l 4 -seek "$((${StartingPosition} + 211 ))" "${file}" )
    echo  "array(\"ID\" => \"$ID\",\"Name\" => \"$Name\",\"Leader\" => \"$Leader\",\"Money\" => \"$Money\",\"Iron\" => \"$Iron\",\"Titanium\" => \"$Titanium\",\"Naonite\" => \"$Naonite\",\"Trinium\" => \"$Trinium\",\"Xanion\" => \"$Xanion\",\"Ogonite\" => \"$Ogonite\",\"Avorion\" => \"$Avorion\")," >> $AllianceDataTmp;
  fi
  [ -e "$file" ] && rm $file
done
echo ");" >> $AllianceDataTmp;
[ -e ${SCRIPTPATH}/avorion-manager/AllianceData.php ] && rm ${SCRIPTPATH}/avorion-manager/AllianceData.php
cp $AllianceDataTmp ${SCRIPTPATH}/avorion-manager/AllianceData.php
rm $AllianceDataTmp

if [ "${KeepDataFiles}" = true ]; then
  [ ! -e "${SCRIPTPATH}/avorion-manager/databackups" ] && mkdir "${SCRIPTPATH}/avorion-manager/databackups"
  if [ "${KeepDataFilesAlliances}" = true ]; then
    [ ! -e "${SCRIPTPATH}/avorion-manager/databackups/alliances" ] && mkdir "${SCRIPTPATH}/avorion-manager/databackups/alliances"
    LogToManagerLog "Storing AllianceData"
    DynamicEcho "Storing AllianceData"
    cp ${SCRIPTPATH}/avorion-manager/AllianceData.php ${SCRIPTPATH}/avorion-manager/databackups/alliances/AllianceData_$(/bin/date +\%d-\%m-\%Y_\%H-\%M-00).php
    find ${SCRIPTPATH}/avorion-manager/databackups/alliances/AllianceData_* -mtime +${KeepDataFilesDays} -type f -delete 2> /dev/null
  fi
fi

LogToManagerLog "Completed GetAllianceData()"
DynamicEcho "\r" "DONTLOG"
DynamicEcho "Completed GetAllianceData()"
