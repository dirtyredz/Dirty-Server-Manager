#!/bin/bash
cd "${0%/*}"
cd ".."
while read -r line ; do
    Exsists=$(awk "/$line/,/\/group/" .avorion/galaxies/RustyOP/admin.xml | grep -e "$1")
    if [ "$Exsists" ]; then
      echo -n $line | sed -e 's/<group name="//g' -e 's/">//g'
      exit 1
    fi
done < <(grep "group name=" .avorion/galaxies/RustyOP/admin.xml)
ADMIN=$(grep "<admin name=\"$1\"" .avorion/galaxies/RustyOP/admin.xml)
if [ "$ADMIN" ]; then
  echo -n 'Admin'
fi
