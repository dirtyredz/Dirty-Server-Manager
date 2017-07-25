#!/bin/bash
# Description: Starts the server.

LogToManagerLog "Ran Stop command.";
# remove the cron job just incase
DeleteCronJobs;
#Generate Offline jpg
#GenerateBrowser 'Offline';
LoadFile "generate_banner.sh"

if pidof ${SERVER} > /dev/null
then

  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Saving..."

  D='Server Time is: '"$(date +"%F %H-%M-%S")"
  #Send commands to the console
  $Tmux_SendKeys '/echo '"${D}" C-m
  $Tmux_SendKeys /save C-m
  time=0

  while [ $time -lt 60 ]; do
    PlayerMemory=$(awk "/${D}/,/All sectors saved successfully/" /proc/`pidof ${SERVER}`/fd/3 | grep 'All sectors saved successfully')
    if [ "${PlayerMemory}" ]; then
      break;
    fi
    let time++
    sleep 1
    DynamicEcho "\rSaving... ${time}" "DONTLOG"
  done

  DynamicEcho "\r" "DONTLOG"
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Has been saved."
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Stopping...."
  sleep 30
  $Tmux_SendKeys /stop C-m
  time=0
  while [ $time -lt 120 ]; do
    SHUTDOWN=$(awk "/${D}/,/Server shutdown successful/" /proc/`pidof ${SERVER}`/fd/3 | grep 'Server shutdown successful')
    if [ "${SHUTDOWN}" ] || [ "$( ps ax | grep ${SERVER} | grep -v grep | grep tmux | wc -l)" ]; then
      DynamicEcho "\r" "DONTLOG"
      DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} has been stopped."
      break;
    fi
    let time++
    sleep 1
    DynamicEcho "\rStopping... ${time}" "DONTLOG"
  done
  DynamicEcho "\r" "DONTLOG"

  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is being forcibly closed! Just incase."
  if ! kill $(pidof ${SERVER}) > /dev/null 2>&1; then
    DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} Could not send SIGTERM to Server Process."
    sleep 1
    tmux kill-session -t ${TMUX_SESSION}
  fi

else
  DynamicEcho "${PURPLE}${SERVER}${NOCOLOR} is not running currently!"
fi
