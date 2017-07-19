#!/bin/bash
# Description: Starts the server.

LogToManagerLog "Ran Stop-web command.";
tmux kill-session -t ${GALAXY}_php
DynamicEcho "PHP Server Stoped"
if pidof ${GALAXY}_php > /dev/null;
then
  kill $(pidof ${GALAXY}_php)
fi
