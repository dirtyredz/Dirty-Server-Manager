DIRTY-SERVER-MANAGER
A script for quick server deployment and management of the server.

Tested and works on these linux OS:
Ubuntu 16.04
Debian 8

Partial Support for:
Centos 7

You don't need to own Avorion on Steam to use this.

INSTALLATION
Step 1: Verify or install these dependencies:
         lib32gcc1, tmux (V2.0+), php7.0, php7.0-gd

        sudo apt-get -y update
        sudo apt-get -y install lib32gcc1 tmux php7.0 php7.0-gd

Step 2: Create a new user for avorion to run on. (Do not use root)

        sudo adduser avorion
        sudo su - avorion

Step 3: Download the manager

        wget -O DirtyServerManager.tar.gz avorion.dirtyredz.com

Step 4: Unpack the tar file

        tar -xvf DirtyServerManager.tar.gz

Step 5: Steamcmd and avorion server Installation

        ./manager install

Step 6: After a successful server installation you can start the server

        ./manager start

Step 7: [Optional] To start the web interface run this commands

        ./manager start-web

        This command will start the PHP-web-server, this server is unable to handle ssl requests.
        Ultimately the php server is not as robust as an apache server, that is why I include an apache setup below.

Alternatively: [Optional] Apache settup for those who wish to take advantage of SSL(https)

    su root           'or another user with sudo access'
    sudo apt-get -y update
    sudo apt-get -y install apache2 libapache2-mod-php7.0 libapache2-mpm-itk
    cd /home/avorion
    sudo ./ApacheInstall.sh


    Regardless of which server you choose, the site will be accessed via:
    http://YOUR-IP-ADDRESS:The_Web_Port
    example: http://104.236.73.30:8080


Step 8: After all is done and working properly be sure to secure your firewall with the appropriate commands. Remember to open ports for the game as well as the web interface
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


Check help for more commands:

    ./manager help

To update your manager and web interface use command from the directory the manager is located:

    ./manager Update_Manager



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

Q: How do I first login into the Web Interface?
A: username: admin  password: admin   (make sure you change it.)


Credit:
I want to give some credit to Aki
for his original work here: http://www.avorion.net/forum/index.php?topic=642.0
Aki provided me with a base script to start with and allowed me to focus on adding features.
