LINUX-SERVER-MANAGER
A script for quick server deployment and managment of the server.
Future plans for the script will tie in with a web interface.

Tested and works on these linux OS:
Ubuntu 16.04


You don't need to own Avorion on Steam to use this.

INSTALLATION
Step 1: Verify or install these dependencies:

        lib32gcc1, tmux, php7.0, php7.0-gd

        sudo apt-get install lib32gcc1 tmux php7.0 php7.0-gd

        for more info - https://developer.valvesoftware.com/wiki/SteamCMD
Step 2: Create a new user for avorion to run on. (Do not use root)

        sudo adduser avorion
        sudo su - avorion

Step 3: Download the manager

        wget http://avorion.dirtyredz.com/avorion-server-manager.tar

Step 4: Unpack the tar file

        tar -xvf avorion-server-manager.tar

Step 5: Open the manager script via your favorite text editor, I like to use 'nano'

        nano manager-config.sh

        change these:
        MAX_PLAYERS=
        GALAXY=
        PARAMS=

Here you will need to make some adjustments to the options available to customize the server, ie admin, galaxy-name, and maxplayers
Unless you have more then 1 server running on the same machine everything should be left on its default options.
the only meaningful option you want to change is the 'PARAMS' this is the server parameter applied to the server on startup
Visit: http://wiki.avorion.net/index.php?title=Server  For a full list of server parameters

Step 6: Steamcmd and avvorion serve Installation

        ./manager install

Step 7: After a succesful server installation you can start the server

        ./manager start


Check help for more commands:

./manager help

FAQ:
Q: How do I see server's console and use commands?
A: Attach to it with ./manager attach.

Q: How do I safely detach from server's console?
A: Press Ctrl+B and then D.

Q: I have a "steamclient.so: wrong ELF class: ELFCLASS32" error!
A: Copy steamclient.so from linux64 to server's root. For default configuration:

cd serverfiles
cp linux64/steamclient.so .

Q: Installation/update is stuck in a loop!
A: Press Ctrl+C to stop it, then check for errors. If you can't solve them try posting them here.
