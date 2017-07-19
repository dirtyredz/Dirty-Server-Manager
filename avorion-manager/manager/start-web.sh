#!/bin/bash
# Description: Starts the server.

LogToManagerLog "Ran Start-web command.";
if tmux new-session -d -s ${GALAXY}_php "php -S ${IPAddress}:${WEBPORT} -t ${SCRIPTPATH}/avorion-manager/webroot ${SCRIPTPATH}/avorion-manager/webroot/index.php" 2> ${SCRIPTPATH}/tmux-error.log
then
  DynamicEcho "starting PHP Server"
  if pidof php > /dev/null;
  then
    DynamicEcho "PHP Server started on server: http://${IPAddress}"':'"${WEBPORT}"
  else
    DynamicEcho "PHP Server Failed"
  fi
else
  DynamicEcho "PHP Server Already started"
fi
