#!/bin/bash
#Pull values from config INI
echo ""
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "++++++++++++++++++++++++++++++++++  Apache 2.4 Installation  ++++++++++++++++++++++++++++++++++"
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo ""
echo "Grabbing Web Port settings and IP address...."
source <(grep = manager-config.ini)
WEBPORT=`echo ${WEBPORT} | sed -e 's/\r//g'`
GALAXY=`echo ${GALAXY} | sed -e 's/\r//g'`
IPAddress=$(hostname -I | awk '{print $1}')

ApachePortsConf=/etc/apache2/ports.conf
AvorionConf=/etc/apache2/sites-available/${GALAXY}_avorion.conf
AvorionSSLConf=/etc/apache2/sites-available/${GALAXY}_avorionssl.conf
SSLParams=/etc/apache2/conf-available/ssl-params.conf

echo "Stopping PHP Web Server incase its running..."
./manager stop-web

echo "Mdoifying Apache's ports.conf to reflect chosen port number..."
echo "Listen 80" >> $ApachePortsConf
echo "Listen ${WEBPORT}" > $ApachePortsConf
echo "<IfModule ssl_module>" >> $ApachePortsConf
echo "    Listen 443" >> $ApachePortsConf
echo "</IfModule>" >> $ApachePortsConf
echo "<IfModule mod_gnutls.c>" >> $ApachePortsConf
echo "    Listen 443" >> $ApachePortsConf
echo "</IfModule>" >> $ApachePortsConf
echo "" >> $ApachePortsConf
echo "# vim: syntax=apache ts=4 sw=4 sts=4 sr noet" >> $ApachePortsConf

echo ""
read -p "Would you like to enable SSL: [y/N]"  SSLEnable
SSLEnable=${SSLEnable:-n}
if [[ $SSLEnable =~ ^[Yy]$ ]]; then
  SSLEnable=true
else
  SSLEnable=false
fi
echo SSL Enabled: $SSLEnable
echo ""

echo "Creating virtual host..."

echo "<VirtualHost *:${WEBPORT}>" > $AvorionConf
echo "    ServerName ${IPAddress}:${WEBPORT}" >> $AvorionConf
echo "    ServerAdmin webmaster@localhost" >> $AvorionConf
echo "    DocumentRoot ${PWD}/avorion-manager/webroot" >> $AvorionConf
echo "    ErrorLog ${PWD}/avorion-manager/webroot/error.log" >> $AvorionConf
echo "    CustomLog ${PWD}/avorion-manager/webroot/access.log combined" >> $AvorionConf
if [ "$SSLEnable" == "true" ]; then
  echo "    Redirect permanent \"/\" \"https://${IPAddress}/\"" >> $AvorionConf
fi
echo "    <Directory ${PWD}/avorion-manager/webroot>" >> $AvorionConf
echo "        AllowOverride All" >> $AvorionConf
echo "        Options Indexes FollowSymLinks MultiViews" >> $AvorionConf
echo "        Order allow,deny" >> $AvorionConf
echo "        Allow from all" >> $AvorionConf
echo "        Require all granted" >> $AvorionConf
echo "    </Directory>" >> $AvorionConf
echo "</VirtualHost>" >> $AvorionConf
echo "" >> $AvorionConf
echo "# vim: syntax=apache ts=4 sw=4 sts=4 sr noet" >> $AvorionConf

echo "Disabling apache's Default site, and Enabling our sites virtual host."
sudo a2ensite -q avorion.conf
sudo a2dissite -q 000-default.conf
sudo service apache2 reload
sudo a2enmod -q rewrite
echo "Restarting Apache please wait..."
sudo service apache2 restart

#SSL
if [ "$SSLEnable" == "true" ]; then
  echo "You have chosen to add SSL we will generate a self signed certificate."
  echo ""
  sudo openssl req -x509 -nodes -days 365 -subj "/C=NA/ST=NA/L=NA/CN=${IPAddress}" -newkey rsa:2048 -keyout /etc/ssl/private/${GALAXY}-avorion-selfsigned.key -out /etc/ssl/certs/${GALAXY}-avorion-selfsigned.crt
  sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

  echo "Setting up Apache's SSL Parameters..."
  echo "# from https://cipherli.st/" > $SSLParams
  echo "# and https://raymii.org/s/tutorials/Strong_SSL_Security_On_Apache2.html" >> $SSLParams
  echo "" >> $SSLParams
  echo "SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH" >> $SSLParams
  echo "SSLProtocol All -SSLv2 -SSLv3" >> $SSLParams
  echo "# Disable preloading HSTS for now.  You can use the commented out header line that includes" >> $SSLParams
  echo "# the \"preload\" directive if you understand the implications." >> $SSLParams
  echo "#Header always set Strict-Transport-Security \"max-age=63072000; includeSubdomains; preload\"" >> $SSLParams
  echo "Header always set Strict-Transport-Security \"max-age=63072000; includeSubdomains\"" >> $SSLParams
  echo "Header always set X-Frame-Options DENY" >> $SSLParams
  echo "Header always set X-Content-Type-Options nosniff" >> $SSLParams
  echo "# Requires Apache >= 2.4" >> $SSLParams
  echo "SSLCompression off " >> $SSLParams
  echo "SSLSessionTickets Off" >> $SSLParams
  echo "SSLUseStapling on" >> $SSLParams
  echo "SSLStaplingCache \"shmcb:logs/stapling-cache(150000)\"" >> $SSLParams
  echo "" >> $SSLParams
  echo "SSLOpenSSLConfCmd DHParameters \"/etc/ssl/certs/dhparam.pem\"" >> $SSLParams

  echo "Creating the SSL VirtualHost..."
  echo "<IfModule mod_ssl.c>" > $AvorionSSLConf
  echo "        <VirtualHost _default_:443>" >> $AvorionSSLConf
  echo "                ServerAdmin your_email@example.com" >> $AvorionSSLConf
  echo "                ServerName ${IPAddress}:443" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                DocumentRoot ${PWD}/avorion-manager/webroot" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                ErrorLog ${PWD}/avorion-manager/webroot/error.log" >> $AvorionSSLConf
  echo "                CustomLog ${PWD}/avorion-manager/webroot/access.log combined" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                SSLEngine on" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                SSLCertificateFile      /etc/ssl/certs/${GALAXY}-avorion-selfsigned.crt" >> $AvorionSSLConf
  echo "                SSLCertificateKeyFile /etc/ssl/private/${GALAXY}-avorion-selfsigned.key" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                <FilesMatch \"\.(cgi|shtml|phtml|php)$\">" >> $AvorionSSLConf
  echo "                                SSLOptions +StdEnvVars" >> $AvorionSSLConf
  echo "                </FilesMatch>" >> $AvorionSSLConf
  echo "                <Directory /usr/lib/cgi-bin>" >> $AvorionSSLConf
  echo "                                SSLOptions +StdEnvVars" >> $AvorionSSLConf
  echo "                </Directory>" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                BrowserMatch \"MSIE [2-6]\" \\" >> $AvorionSSLConf
  echo "                               nokeepalive ssl-unclean-shutdown \\" >> $AvorionSSLConf
  echo "                               downgrade-1.0 force-response-1.0" >> $AvorionSSLConf
  echo "" >> $AvorionSSLConf
  echo "                <Directory ${PWD}/avorion-manager/webroot>" >> $AvorionSSLConf
  echo "                    AllowOverride All" >> $AvorionSSLConf
  echo "                    Options Indexes FollowSymLinks MultiViews" >> $AvorionSSLConf
  echo "                    Order allow,deny" >> $AvorionSSLConf
  echo "                    Allow from all" >> $AvorionSSLConf
  echo "                    Require all granted" >> $AvorionSSLConf
  echo "                </Directory>" >> $AvorionSSLConf
  echo "        </VirtualHost>" >> $AvorionSSLConf
  echo "</IfModule>" >> $AvorionSSLConf

  echo "Enabling SSL in Apache..."
  sudo a2enmod -q ssl
  sudo a2enmod -q headers
  echo "Enabling SSL VirtualHost..."
  sudo a2ensite -q avorionssl
  sudo a2enconf -q ssl-params
  sudo service apache2 reload
  echo "Restarting Apache..."
  sudo service apache2 restart
fi
echo ""
echo "Apache installation complete."
if [ "$SSLEnable" == "true" ]; then
  echo "Vistit: http://${IPAddress}:${WEBPORT}    You will automatically be redirected to https://${IPAddress}"
else
  echo "Vistit: http://${IPAddress}:${WEBPORT}"
fi
