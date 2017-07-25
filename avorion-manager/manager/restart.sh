#!/bin/bash
# Description: Starts the server.

LogToManagerLog "Ran Restart command.";
DynamicEcho "restarting ${PURPLE}${SERVER}${NOCOLOR}..."
OLDPID=$(pidof ${SERVER})

LoadFile "stop.sh"
sleep 120
LoadFile "start.sh"

NEWPID=$(pidof ${SERVER})
if pidof ${SERVER} > /dev/null
then
  if [ OLDPID != NEWPID ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has successfully restarted!"
  else
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has successfully restarted with same pid. Did the server restart?"
  fi

else
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} attempting restart of the server."
fi
