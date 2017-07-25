#!/bin/bash
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

COMMAND_NAME="install"
COMMAND_DESCRIPTION="Installs Steamcmd, Avorion files, and Manager-config.ini"

if [ "${DisplayDescription}" == "true" ]; then
  DynamicEcho "$COMMAND_NAME"
  DynamicEcho "$COMMAND_DESCRIPTION"
  LoadFile "core_exit.sh"
fi

LogToManagerLog "Ran Install command.";
echo ---------------------------------------------------------------------
echo Welcome to Dirty Server Manager
echo Version: $VERSION
echo ---------------------------------------------------------------------
echo Begining installation process...
echo ''
echo The folowing prompts can be changed in the future in ./manager-config.ini
echo ''

while true; do
  read -p "please enter the Galaxy Name for the server: [GalaxyName]"  GalaxyNameInput
  GalaxyNameInput=${GalaxyNameInput:-GalaxyName}
  case ${GalaxyNameInput} in
    *\ * ) echo "Galaxy name cannot have a space in it." ;;
       * ) break;;
  esac
done
echo Galaxy Name: $GalaxyNameInput
echo ''
read -p "please enter the Maximum Players for the server: [10]"  MaxPlayersInput
MaxPlayersInput=${MaxPlayersInput:-10}
echo Max Players: $MaxPlayersInput
echo ''
read -p "Would you like to run the server on the BETA version: [y/N]"  BetaInput
BetaInput=${BetaInput:-n}
if [[ $BetaInput =~ ^[Yy]$ ]]; then
  BetaInput=true
else
  BetaInput=false
fi
echo Beta: $BetaInput
echo ''
read -p "Would you like the server to be public?: [Y/n]"  PublicServerInput
PublicServerInput=${PublicServerInput:-y}
if [[ $PublicServerInput =~ ^[Yy]$ ]]; then
  PublicServerInput=true
else
  PublicServerInput=false
fi
echo Public: $PublicServerInput
echo ''
read -p "Would you like the server to be listed?: [Y/n]"  ListedServerInput
ListedServerInput=${ListedServerInput:-y}
if [[ $ListedServerInput =~ ^[Yy]$ ]]; then
  ListedServerInput=true
else
  ListedServerInput=false
fi
echo Listed: $ListedServerInput
echo ''
read -p "Would you like everyone to start in the same start sector?: [Y/n]"  SameStartInput
SameStartInput=${SameStartInput:-y}
if [[ $SameStartInput =~ ^[Yy]$ ]]; then
  SameStartInput=true
else
  SameStartInput=false
fi
echo Same Start Sector: $SameStartInput
echo ''
read -p "Port number for the server: [2700]"  PortInput
PortInput=${PortInput:-2700}
echo Max Players: $PortInput
echo ''
read -p "Would you like the server to automatically restart if the server crashes?: [Y/n]"  AutoCrashRestartInput
AutoCrashRestartInput=${AutoCrashRestartInput:-y}
if [[ $AutoCrashRestartInput =~ ^[Yy]$ ]]; then
  AutoCrashRestartInput=true
else
  AutoCrashRestartInput=false
fi
echo Auto Crash Restart: $AutoCrashRestartInput
echo ''
read -p "Would you like the server to automatically restart twice a day? (Noon and Midnight server time): [Y/n]"  DailyRestartInput
DailyRestartInput=${DailyRestartInput:-y}
if [[ $DailyRestartInput =~ ^[Yy]$ ]]; then
  DailyRestartInput=true
else
  DailyRestartInput=false
fi
echo Auto Daily Restart: $DailyRestartInput
echo ''
read -p "Admin steam id:"  AdminInput
AdminInput=${AdminInput}
if [ -z "$AdminInput" ]; then
  AdminInput=""
else
  AdminInput=" --admin ${AdminInput}"
fi
if [ -z "$AdminInput" ]; then
  echo No admin id given, server will start without an admin.  Edit server.ini to add an admin.
else
  echo Admin Steam ID: $AdminInput
fi
echo ''
read -p "The IPAddress you want the web interface to run on: []"  IPAddressInput
IPAddressInput=${IPAddressInput:-y}
if [[ $IPAddressInput =~ ^[Yy]$ ]]; then
  IPAddressInput=$(hostname -I | awk '{print $1}')
fi
echo IPAddress to use: $IPAddressInput

echo ''
echo "Completed manager configuration, to make changes to these settings in the future edit file manager-config.ini"
read -p "Press enter to continue with steam/avorion installation"

echo ''
echo ";Maximum players on server."
echo "MAX_PLAYERS=${MaxPlayersInput}" > manager-config.ini
echo ";Name of the galaxy, no spaces allowed" >> manager-config.ini
echo "GALAXY=${GalaxyNameInput}" >> manager-config.ini
echo ";server start up parameters" >> manager-config.ini
echo "PARAMS='--public ${PublicServerInput} --listed ${ListedServerInput} --same-start-sector ${SameStartInput}${AdminInput}'" >> manager-config.ini
echo ";server port. Default: 27000" >> manager-config.ini
echo "PORT=${PortInput}" >> manager-config.ini
echo ";How many days to keep logs. Default: 10" >> manager-config.ini
echo "LOG_ROTATION=10" >> manager-config.ini
echo ";Will automatically restart server if it detects a crash. Default: 27000" >> manager-config.ini
echo "AutoRestart=${AutoCrashRestartInput}" >> manager-config.ini
echo ";Will automatically restart the server at 2346, and 1146 server time. Default: true" >> manager-config.ini
echo "DailyRestart=${DailyRestartInput}" >> manager-config.ini
echo ";To use BETA avorion or not, set before installing/updating. Default: false" >> manager-config.ini
echo "BETA=${BetaInput}" >> manager-config.ini
echo ";Webport to access web interface. Default: 8080" >> manager-config.ini
echo "WEBPORT=8080" >> manager-config.ini
echo ";IP to access web interface, and additional server startup requirments. Default: 0.0.0.0" >> manager-config.ini
echo "IPAddress=${IPAddressInput}" >> manager-config.ini
echo ";Cron Hour setting to run Sector Parsing.(0,6,12,18 will run every 6 hours) Default: 0,6,12,18" >> manager-config.ini
echo 'GetSectorDataInterval="0,12"' >> manager-config.ini
echo ";Cron Minute setting to run Player parsing.(0,30 will run every hour at the 0 and 30 minute mark) Default: 0,30" >> manager-config.ini
echo 'GetPlayerDataInterval="0,30"' >> manager-config.ini
echo ";Cron Minute setting to run alliance parsing.(5,35 will run every hour at the 5 and 35 minute mark) Default: 5,35" >> manager-config.ini
echo 'GetAllianceDataInterval="5,35"' >> manager-config.ini
echo ";Cron job to be applied at start, and removed at stop." >> manager-config.ini
echo "CustomCronjob_1=''" >> manager-config.ini
echo ";Cron job to be applied at start, and removed at stop." >> manager-config.ini
echo "CustomCronjob_2=''" >> manager-config.ini
echo ";Cron job to be applied at start, and removed at stop." >> manager-config.ini
echo "CustomCronjob_3=''" >> manager-config.ini
echo ";Cron job to be applied at start, and removed at stop." >> manager-config.ini
echo "CustomCronjob_4=''" >> manager-config.ini
echo ";Cron job to be applied at start, and removed at stop." >> manager-config.ini
echo "CustomCronjob_5=''" >> manager-config.ini
echo ";Will store past data parsings to be compared with current. Default: false" >> manager-config.ini
echo "KeepDataFiles=false" >> manager-config.ini
echo ";Number of days worth of parsings to keep. Default: 2" >> manager-config.ini
echo "KeepDataFilesDays='2'" >> manager-config.ini
echo ";will apply KeepDataFiles to players data.(KeepDataFiles must be true) Default: true" >> manager-config.ini
echo "KeepDataFilesPlayers=true" >> manager-config.ini
echo ";will apply KeepDataFiles to alliance data.(KeepDataFiles must be true) Default: true" >> manager-config.ini
echo "KeepDataFilesAlliances=true" >> manager-config.ini

mkdir -p $STEAM_DIR
wget https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
tar -zxvf steamcmd_linux.tar.gz -C $STEAM_DIR
LoadFile "update.sh"
