#!/bin/bash
cd "${0%/*}"
cd ".."
#Log to manager.log
echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
echo -e '[Manager]: Starting GetAllianceData()' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
#Settup TMP file
AllianceDataTmp=${PWD}/avorion-manager/AllianceData.tmp
DIR="$1"
#COUNT=0
GALAXYNAME=$(grep GALAXY ${PWD}/manager-config.ini | sed -e 's/.*=//g' -e 's/\r//g')
echo "<?php" > $AllianceDataTmp;
echo "\$AllianceData = array(" >> $AllianceDataTmp;
for i in {1..5000}
do
  find ${DIR}/${GALAXYNAME}/alliances/ -name \*.tmp -delete
  file=${DIR}/${GALAXYNAME}/alliances/alliance_$i.dat.0
  [ -e "$file" ] || continue
  file=$(ls -t ${DIR}/${GALAXYNAME}/alliances/alliance_$i.dat.* | head -1)
  [ -e "$file" ] || continue
  #dd if=$file bs=1 skip=44 of=${file}.tmp > /dev/null 2>&1
  php -f ${PWD}/avorion-manager/zlib_Uncompress.php "${file}" "AllianceUncompressed.tmp"
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
done
echo ");" >> $AllianceDataTmp;
[ -e ${PWD}/avorion-manager/AllianceData.php ] && rm ${PWD}/avorion-manager/AllianceData.php
cp $AllianceDataTmp ${PWD}/avorion-manager/AllianceData.php
rm $AllianceDataTmp
rm $file
echo -e -n $(date +"%F %H-%M-00| ") >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
echo -e '[Manager]: Completed GetAllianceData()' >> ${PWD}/avorion-manager/logs/$(/bin/date +\%d-\%m-\%Y)_manager.log
