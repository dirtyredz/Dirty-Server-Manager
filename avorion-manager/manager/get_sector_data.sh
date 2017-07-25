#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="get_sector_data"
COMMAND_DESCRIPTION="Parses through all sector files."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LogToManagerLog "Starting GetSectorData()"
DynamicEcho "Starting GetSectorData()"

SectorDataTmp=${SCRIPTPATH}/avorion-manager/SectorData.tmp
DIR="${SCRIPTPATH}/.avorion/galaxies"
COUNT=0
GALAXYNAME=$(grep GALAXY ${SCRIPTPATH}/manager-config.ini | sed -e 's/.*=//g' -e 's/\r//g')
echo "<?php" > $SectorDataTmp;
echo "\$SectorData = array(" >> $SectorDataTmp;
if [ "$verbose" = true ]; then
  numFiles=$(ls -1q "${DIR}/${GALAXYNAME}/sectors/" | wc -l | sed -e 's/\r//g')
  TotalSectors=$(($numFiles / 2))
  DynamicEcho "Found ${numFiles}, sector files, totaling: ${TotalSectors} Sectors."
fi
for file in ${DIR}/${GALAXYNAME}/sectors/*v; do
  [ -e "$file" ] || continue
  if [ "$verbose" = true ]; then
    DynamicEcho "\rParsing file: ${file}" "DONTLOG"
  fi
  SECTORSTUFF=$(grep '<view' "$file" | sed -e 's/"//g' -e 's/<view //g' -e 's/>//g')
  Coordinates=$(grep '<coordinates' "$file" | head -n1 | sed -e 's/"//g' -e 's/[\r\n]//g' -e 's/^[ \t]*//' -e 's/<coordinates //g' -e 's/\/>//g')
  X=$(sed -e 's/.*x=//g' -e 's/ .*//g' <<< $Coordinates )
  Y=$(sed -e 's/.*y=//g' <<< $Coordinates )
  FACTIONINDEX=$(grep 'factionIndex' <<< $SECTORSTUFF | sed -e 's/.*factionIndex=//g' -e 's/ .*//g')
  CRAFTS=$(sed -e 's/.*numCrafts=//g' -e 's/ .*//g' <<< $SECTORSTUFF )
  WRECKS=$(sed -e 's/.*numWrecks=//g' -e 's/ .*//g' <<< $SECTORSTUFF )
  ASTEROIDS=$(sed -e 's/.*numAsteroids=//g' -e 's/ .*//g' <<< $SECTORSTUFF )
  STATIONS=$(sed -e 's/.*numStations=//g' -e 's/ .*//g' <<< $SECTORSTUFF )
  INFLUENCE=$(sed -e 's/.*influence=//g' -e 's/ .*//g' <<< $SECTORSTUFF )

  echo -n "array(\"X\" => \"$X\",\"Y\" => \"$Y\",\"Crafts\" => \"$CRAFTS\",\"Wrecks\" => \"$WRECKS\",\"Asteroids\" => \"$ASTEROIDS\",\"Stations\" => \"$STATIONS\",\"Influence\" => \"$INFLUENCE\",\"FactionIndex\" => \"$FACTIONINDEX\"" >> $SectorDataTmp;
  if [[ $FACTIONINDEX == 200* ]];
  then
    FactionFile=${DIR}/${GALAXYNAME}/factions/faction_${FACTIONINDEX}.dat
    #dd if=$FactionFile bs=1 skip=44 of=${FactionFile}.tmp > /dev/null 2>&1
    php -f ${SCRIPTPATH}/avorion-manager/manager/zlib_Uncompress.php "${FactionFile}" "SectorUncompressed.tmp"
    #rm ${FactionFile}.tmp
    FactionFile=SectorUncompressed.tmp

    StartingPositionStateForm=$(grep -b -a -o -P 'state_form' ${FactionFile} | sed 's/:.1*//' | head -n1 | awk '{SUM = $1 + 16 } END {print SUM}')
    StartingPositionName=$(grep -b -a -o -P 'name' ${FactionFile} | sed 's/:.1*//' | head -n1 | awk '{SUM = $1 + 16 } END {print SUM}')
    Name=$(xxd -ps -l 50 -seek "${StartingPositionName}" ${FactionFile} | xxd -r -p | head -n1)
    FactionName=$(xxd -ps -l 50 -seek "$((${StartingPositionStateForm} + 5 ))" ${FactionFile} | xxd -r -p | head -n1 | sed -e 's/static.*//g' -e 's/\/\*This.*//g' -e "s/%s/"${Name}"/g" -e 's/[\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\r\n]//g')
    echo -n ",\"FactionName\" => \"$FactionName\"" >> $SectorDataTmp;
    COUNT=$(( COUNT +1 ))
  fi

  echo ")," >> $SectorDataTmp;

done

echo ");" >> $SectorDataTmp;
[ -e ${SCRIPTPATH}/avorion-manager/SectorData.php ] && rm ${SCRIPTPATH}/avorion-manager/SectorData.php
cp $SectorDataTmp ${SCRIPTPATH}/avorion-manager/SectorData.php
rm $SectorDataTmp
rm $FactionFile

LogToManagerLog "Completed GetSectorData()"
DynamicEcho "\r" "DONTLOG"
DynamicEcho "Completed GetSectorData()"
