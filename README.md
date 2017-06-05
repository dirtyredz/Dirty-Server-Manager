DIRTY-SERVER-MANAGER
A script for quick server deployment and managment of the server.

Tested and works on these linux OS:
Ubuntu 16.04


You don't need to own Avorion on Steam to use this.

INSTALLATION
Step 1: Verify or install these dependencies:
         lib32gcc1, tmux (V2.0+), php7.0, php7.0-gd

        FOLLOW YOUR SYSTEMS INSTRUCTIONS FOR THIS STEP!!!

        Ubuntu is the recomended OS:
          UBUNTU 16.04x64:
            sudo apt-get update
            sudo apt-get install lib32gcc1 tmux php7.0 php7.0-gd

        Debian were forced to take additional step to ensure we have  the versions of tmux and php necassary to run the manager
          DEBIAN 8.8x64:
            sudo apt-get update
            echo 'deb http://packages.dotdeb.org jessie all' >> /etc/apt/sources.list
            echo 'deb-src http://packages.dotdeb.org jessie all' >> /etc/apt/sources.list
            sudo apt-get install curl
            curl https://www.dotdeb.org/dotdeb.gpg | sudo apt-key add -
            sudo apt-get update
            sudo apt-get install -y exuberant-ctags cmake libevent-dev libncurses5-dev lib32gcc1 php7.0 php7.0-gd
            wget https://github.com/tmux/tmux/releases/download/2.0/tmux-2.0.tar.gz
            tar xvf tmux-2.0.tar.gz
            cd tmux-2.0
            ./configure && make
            sudo make install

Step 2: Create a new user for avorion to run on. (Do not use root)

        sudo adduser avorion
        sudo su - avorion

Step 3: Download the manager

        wget -O DirtyServerManager.tar.gz avorion.dirtyredz.com

Step 4: Unpack the tar file

        tar -xvf DirtyServerManager.tar.gz

Step 6: Steamcmd and avorion server Installation

        ./manager install

Step 7: After a succesful server installation you can start the server

        ./manager start

Step 8: [Optional] To start the web interface run this commands

        ./manager start-web

        This command will start the PHP-web-server, this server is unable to handle ssl requests.
        Ultimatly the php server is not as robust as an apache server, that is why I include an apache settup below.

Alternativly: [Optional] Apache settup for those who wish to take advantage of SSL(https)

    Switch to a user with sudo/root access

    sudo apt-get update
    sudo apt-get install apache2 libapache2-mod-php7.0
    sudo cd /home/avorion
    sudo ./ApacheInstall.sh


    Regardless of which server you choose, the site will be accessed via:
    http://YOUR-IP-ADDRESS:The_Web_Port
    http://104.236.73.30:8080


Step 9: After all is done and working properly be sure to secure your firewall with the appropriate commands. Remember to open ports for the game as well as the web interface
        These are the default ports you will need to open:

        tcp/27000
        udp/27000
        udp/27003
        udp/27020  -Steam
        tcp/27020  -Steam
        udp/27021  -Steam
        tcp/27021  -Steam
        tcp/8080   -web interface default




Check help for more commands:

    ./manager help

To update your manager and web interface use command from the directory the manager is located:

    avorion-manager/UpdateManager.sh



FAQ:
Q: How do I see server's console and use commands?
A: Attach to it with ./manager attach.

Q: How do I safely detach from server's console?
A: Press Ctrl+B and then D.

Q: I have a "steamclient.so: wrong ELF class: ELFCLASS32" error!
A: Copy steamclient.so from serverfiles/linux64 to server's root(serverfiles/). For default configuration:

cd serverfiles
cp linux64/steamclient.so .

Q: Installation/update is stuck in a loop!
A: Press Ctrl+C to stop it, then check for errors. If you can't solve them try posting them here.


Credit:
I want to give some credit to Aki
for his original work here: http://www.avorion.net/forum/index.php?topic=642.0
Aki provided me with a base script to start with and allowed me to focus on adding features.
