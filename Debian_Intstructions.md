DIRTY-SERVER-MANAGER
A script for quick server deployment and managment of the server.

Debian specific instructions are neccassary due to its package manager is slightly behind on a few packages.

INSTALLATION
Step 1: Verify or install these dependencies:
         lib32gcc1, tmux (V2.0+), php7.0, php7.0-gd

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

        su root           'or another user with sudo access'
        sudo apt-get update
        sudo apt-get install apache2 libapache2-mod-php7.0
        cd /home/avorion
        sudo ./ApacheInstall.sh


    Regardless of which server you choose, the site will be accessed via:
    http://YOUR-IP-ADDRESS:The_Web_Port
    example: http://104.236.73.30:8080


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
        tcp/443    -If using apche/ssl
