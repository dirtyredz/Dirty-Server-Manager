#!/bin/bash
# Description: Starts the server.

LogToManagerLog "Ran Install command.";
echo ---------------------------------------------------------------------
echo Welcome to Dirty Server Manager
echo Version: $VERSION
echo ---------------------------------------------------------------------
echo Begining installation process...
echo ''
echo The folowing prompts can be changed in the future in ./manager-config.ini
echo ''
read -p "please enter the Galaxy Name for the server: [GalaxyName]"  GalaxyNameInput
GalaxyNameInput=${GalaxyNameInput:-GalaxyName}
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
echo "MAX_PLAYERS=${MaxPlayersInput}" > manager-config.ini
echo "GALAXY=${GalaxyNameInput}" >> manager-config.ini
echo ";http://wiki.avorion.net/index.php?title=Server"
echo "PARAMS='--public ${PublicServerInput} --listed ${ListedServerInput} --same-start-sector ${SameStartInput}${AdminInput}'" >> manager-config.ini
echo "PORT=${PortInput}" >> manager-config.ini
echo ";Days to keep status.logs" >> manager-config.ini
echo "LOG_ROTATION=10" >> manager-config.ini
echo ";If the status check that runs every 5 minutes fails to get a response from the server it will automatically issue a restart command" >> manager-config.ini
echo "AutoRestart=${AutoCrashRestartInput}" >> manager-config.ini
echo ";Will restart the server at the MIDNIGHT and NOON SERVER time." >> manager-config.ini
echo "DailyRestart=${DailyRestartInput}" >> manager-config.ini
echo "BETA=${BetaInput}" >> manager-config.ini
echo "WEBPORT=8080" >> manager-config.ini
echo "IPAddress=${IPAddressInput}" >> manager-config.ini
echo 'GetSectorDataInterval="0,12"' >> manager-config.ini
echo 'GetPlayerDataInterval="0,30"' >> manager-config.ini
echo 'GetAllianceDataInterval="5,35"' >> manager-config.ini

mkdir -p $STEAM_DIR
wget https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
tar -zxvf steamcmd_linux.tar.gz -C $STEAM_DIR
$0 update
