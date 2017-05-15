#!/bin/bash
# Config
MAX_PLAYERS=10
GALAXY=GalaxyName
PARAMS='--public true --listed true --trace threading io error warning debug --use-steam-networking false --same-start-sector false' # http://wiki.avorion.net/index.php?title=Server
# Standard Config
PORT=27000
# Auto Restart
LOG_ROTATION=10 #Days to keep status.logs
AutoRestart=true #If the status check that runs every 5 minutes fails to get a response from the server it will automatically issue a restart command
DailyRestart=true #Will restart the server at the MIDNIGHT and NOON SERVER time.
# Installation
BETA=true #Set this BEFORE installation
# PHP
PHPPORT=8080
