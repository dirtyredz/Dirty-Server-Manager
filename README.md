# INSTALLATION INSTRUCTIONS

## Step 1.
  ### Install node:
    https://nodesource.com/blog/installing-node-js-tutorial-ubuntu/
    sudo /usr/bin/curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -

## Step 2.
  ### Install build tools:
    Windows:
    npm install --global --production windows-build-tools (windows only)

    Linux (Ubuntu Only):
    sudo apt-get install g++

## Step 3.
  ### Install Steam required packages
    (https://developer.valvesoftware.com/wiki/SteamCMD#Linux)
    sudo apt-get install lib32gcc1

## Step 4.
  ### Install DSM
    git clone https://github.com/dirtyredz/Dirty-Server-Manager.git --single-branch -branch node-dsm

    Dev Notes:
    setup package for installation
    https://docs.npmjs.com/misc/scripts
    "install": "npm install node-pty && npm install better-sqlite3" ???

## Step 5
  ### Install DSM Dependancies
    npm install && npm install node-pty

    Dev Notes:
    node-pty needs to build on the server, npm install dsm doesnt do it ?!?!?!

## Step 6
  ### Global DSM
    sudo npm install -g ./

    Dev Notes:
    none sudo :https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md