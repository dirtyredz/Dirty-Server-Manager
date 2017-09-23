#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="status"
COMMAND_DESCRIPTION="runs /status onto the server and displays its results."

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit"
fi

# if server is offline
LoadFile "core_status"
if [ "${status}" == "0" ]; then
  #GenerateBrowser 'Offline';
  LoadFile "generate_banner"
  # if status was run by cron
  if [ "$output" = "CRON" ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has detected a crash."
    # if auto restart is enabled
    if [ "$AutoRestart" = true ]; then
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} will restart."
      LoadFile "start"
    else
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} AutoRestart is disabled, edit manager-config.ini to change this."
    fi
  else
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  fi
  LoadFile "core_exit"
fi

ServerPid=$(pidof ${SERVER})

if [ -z $ServerPid ]; then
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running."
  LoadFile "core_exit"
fi
# Generate date for a unique grep search
D='Server Time is: '"$(date +"%F %H-%M-%S")"
#Send commands to the console
$Tmux_SendKeys '/echo '"${D}" C-m
$Tmux_SendKeys /players C-m
$Tmux_SendKeys /status C-m
time=0
success=false

#First Try
while [ $time -lt 20 ]; do
  PlayerMemory=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'players in memory')
  if [ "${PlayerMemory}" ]; then
    success=true
    break;
  fi
  let time++
  sleep 1
  DynamicEcho "\rTrying... ${time}" "DONTLOG"
done

#Second Try
if [ "${success}" = false ]; then
  DynamicEcho "\r" "DONTLOG"
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Unable to retrieve a status update from the server. Trying again..."
  D='Server Time is: '"$(date +"%F %H-%M-%S")"
  #Send commands to the console
  $Tmux_SendKeys '/echo '"${D}" C-m
  $Tmux_SendKeys /players C-m
  $Tmux_SendKeys /status C-m
  time=0
  while [ $time -lt 20 ]; do
    SaveStatus=$(cat /proc/${ServerPid}/fd/3 | awk "/${D}/,/Triggered saving of all server data/" | grep 'Triggered saving of all server data')
    if [ "${SaveStatus}" ]; then
      success=true
      break;
    fi
    let time++
    sleep 1
    DynamicEcho "\rTrying... ${time}" "DONTLOG"
  done
fi

#Failure = Saving
if [ "${success}" = false ]; then
  DynamicEcho "\r" "DONTLOG"
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Unable to retrieve a status update from the server. Saving..."
  D='Server Time is: '"$(date +"%F %H-%M-%S")"
  #Send commands to the console
  $Tmux_SendKeys '/echo '"${D}" C-m
  $Tmux_SendKeys /save C-m
  time=0
  while [ $time -lt 45 ]; do
    SaveStatus=$(cat /proc/${ServerPid}/fd/3 | awk "/${D}/,/Triggered saving of all server data/" | grep 'Triggered saving of all server data')
    if [ "${SaveStatus}" ]; then
      DynamicEcho "\r" "DONTLOG"
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Saved, Recieved server response."
      LoadFile "core_exit"
      break;
    fi
    let time++
    sleep 1
    DynamicEcho "\rSaving... ${time}" "DONTLOG"
  done
fi

#Complete Failure Restart
if [ "${success}" = false ]; then
  DynamicEcho "\r" "DONTLOG"
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Unable to retrieve a status or save response from the server."
  if [ "$AutoRestart" = true ]; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} will restart the server."
    LoadFile "restart"
    LoadFile "core_exit"
  fi

else
  DynamicEcho "\r" "DONTLOG"
fi

#Get and display players online info
PlayerMemory=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'players in memory' | sed -e 's/.*| //g')
FactionsMemory=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'factions in memory' | sed -e 's/.*| //g')
SectorsMemory=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'sectors in memory' | sed -e 's/.*| //g')
ScriptsMemory=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'Memory used by scripts' | sed -e 's/.*| //g')
ServerLoad=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'server load' | sed -e 's/ 0%/ 0.01%/g' -e 's/.*| //g')
AvgUpdate=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'avg. update' | sed -e 's/.*| //g')
MaxUpdate=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'max. update' | sed -e 's/.*| //g')
MinUpdate=$(awk "/${D}/,/min. update/" /proc/${ServerPid}/fd/3 | grep 'min. update' | sed -e 's/.*| //g')
PlayersCount=$(awk "/${D}/,/online players/" /proc/${ServerPid}/fd/3 | grep 'online players (' | sed -e 's/online players (//' -e 's/).*//' -e 's/.*| //g' | tr -d '[:blank:]')
PlayersNames=$(awk "/${D}/,/online players/" /proc/${ServerPid}/fd/3 | grep 'online players ('| sed -e 's/.*://' | tr -d '[:blank:]')

DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is running with pid ${YELLOW}$(pidof ${SERVER})${NOCOLOR}."
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is hosting galaxy: ${GALAXY}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${D}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${PlayerMemory}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${FactionsMemory}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${SectorsMemory}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${ScriptsMemory}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${ServerLoad}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${AvgUpdate}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${MaxUpdate}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} ${MinUpdate}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Players Online: ${PlayersCount}/${MAX_PLAYERS}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Players: ${PlayersNames}"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} `free -m | awk '/Mem:/ { print "Memory(mb)-Total:"$2",Used:"$3",Free:"$4",Cache:"$6 }'`"
DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} CPU Usage: `top -bn 2 -d 1 | grep '^%Cpu' | tail -n 1 | awk '{print $2+$4+$6}'`"

#Status.log rotation
find ${SCRIPTPATH}/avorion-manager/logs/*_manager.log -mtime +${LOG_ROTATION} -type f -delete 2> /dev/null
find ${SCRIPTPATH}/avorion-manager/logs/*_status.log -mtime +${LOG_ROTATION} -type f -delete 2> /dev/null
find ${SCRIPTPATH}/avorion-manager/logs/*_playerchat.log -mtime +${LOG_ROTATION} -type f -delete 2> /dev/null

#Generate data for the browser
LoadFile "generate_banner"

cat /proc/${ServerPid}/fd/3 > ${SCRIPTPATH}/server.log
