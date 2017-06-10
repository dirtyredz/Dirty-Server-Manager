#!/bin/bash
cd "${0%/*}"
cd ".."
GALAXYNAME=$(grep GALAXY ${PWD}/manager-config.ini | sed -e 's/.*=//g' -e 's/\r//g')
while read -r line ; do
    Exsists=$(awk "/$line/,/\/group/" ${HOME}/.avorion/galaxies/${GALAXYNAME}/admin.xml | grep -F "user name=\"$1")
    if [ "$Exsists" ]; then
      echo -n $line | sed -e 's/<group name="//g' -e 's/">//g'
      exit 1
    fi
done < <(grep "group name=" ${HOME}/.avorion/galaxies/${GALAXYNAME}/admin.xml)
ADMIN=$(grep "<admin name=\"$1\"" ${HOME}/.avorion/galaxies/${GALAXYNAME}/admin.xml)
if [ "$ADMIN" ]; then
  echo -n 'Admin'
fi
