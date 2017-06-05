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
IPAddress=$(hostname -I | awk '{print $1}')

echo "Stopping PHP Web Server incase its running..."
./manager stop-web

echo "Mdoifying Apache's ports.conf to reflect chosen port number..."
echo "Listen ${WEBPORT}" > /etc/apache2/ports.conf
echo "<IfModule ssl_module>" >> /etc/apache2/ports.conf
echo "    Listen 443" >> /etc/apache2/ports.conf
echo "</IfModule>" >> /etc/apache2/ports.conf
echo "<IfModule mod_gnutls.c>" >> /etc/apache2/ports.conf
echo "    Listen 443" >> /etc/apache2/ports.conf
echo "</IfModule>" >> /etc/apache2/ports.conf
echo "" >> /etc/apache2/ports.conf
echo "# vim: syntax=apache ts=4 sw=4 sts=4 sr noet" >> /etc/apache2/ports.conf

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

echo "<VirtualHost *:${WEBPORT}>" > /etc/apache2/sites-available/avorion.conf
echo "    ServerName ${IPAddress}:${WEBPORT}" >> /etc/apache2/sites-available/avorion.conf
echo "    ServerAdmin webmaster@localhost" >> /etc/apache2/sites-available/avorion.conf
echo "    DocumentRoot ${PWD}/avorion-manager/webroot" >> /etc/apache2/sites-available/avorion.conf
echo "    ErrorLog ${PWD}/avorion-manager/webroot/error.log" >> /etc/apache2/sites-available/avorion.conf
echo "    CustomLog ${PWD}/avorion-manager/webroot/access.log combined" >> /etc/apache2/sites-available/avorion.conf
if [ "$SSLEnable" == "true" ]; then
  echo "    Redirect permanent \"/\" \"https://${IPAddress}/\"" >> /etc/apache2/sites-available/avorion.conf
fi
echo "    <Directory ${PWD}/avorion-manager/webroot>" >> /etc/apache2/sites-available/avorion.conf
echo "        AllowOverride All" >> /etc/apache2/sites-available/avorion.conf
echo "        Options Indexes FollowSymLinks MultiViews" >> /etc/apache2/sites-available/avorion.conf
echo "        Order allow,deny" >> /etc/apache2/sites-available/avorion.conf
echo "        Allow from all" >> /etc/apache2/sites-available/avorion.conf
echo "        Require all granted" >> /etc/apache2/sites-available/avorion.conf
echo "    </Directory>" >> /etc/apache2/sites-available/avorion.conf
echo "</VirtualHost>" >> /etc/apache2/sites-available/avorion.conf
echo "" >> /etc/apache2/sites-available/avorion.conf
echo "# vim: syntax=apache ts=4 sw=4 sts=4 sr noet" >> /etc/apache2/sites-available/avorion.conf

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
  echo "Follow all command promts, be sure to set the following line to your IPAddress (${IPAddress}):"
  echo "Common Name (e.g. server FQDN or YOUR name) []:server_IP_addres"
  echo ""
  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/avorion-selfsigned.key -out /etc/ssl/certs/avorion-selfsigned.crt
  sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

  echo "Setting up Apache's SSL Parameters..."
  echo "# from https://cipherli.st/" > /etc/apache2/conf-available/ssl-params.conf
  echo "# and https://raymii.org/s/tutorials/Strong_SSL_Security_On_Apache2.html" >> /etc/apache2/conf-available/ssl-params.conf
  echo "" >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH" >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLProtocol All -SSLv2 -SSLv3" >> /etc/apache2/conf-available/ssl-params.conf
  echo "# Disable preloading HSTS for now.  You can use the commented out header line that includes" >> /etc/apache2/conf-available/ssl-params.conf
  echo "# the \"preload\" directive if you understand the implications." >> /etc/apache2/conf-available/ssl-params.conf
  echo "#Header always set Strict-Transport-Security \"max-age=63072000; includeSubdomains; preload\"" >> /etc/apache2/conf-available/ssl-params.conf
  echo "Header always set Strict-Transport-Security \"max-age=63072000; includeSubdomains\"" >> /etc/apache2/conf-available/ssl-params.conf
  echo "Header always set X-Frame-Options DENY" >> /etc/apache2/conf-available/ssl-params.conf
  echo "Header always set X-Content-Type-Options nosniff" >> /etc/apache2/conf-available/ssl-params.conf
  echo "# Requires Apache >= 2.4" >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLCompression off " >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLSessionTickets Off" >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLUseStapling on" >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLStaplingCache \"shmcb:logs/stapling-cache(150000)\"" >> /etc/apache2/conf-available/ssl-params.conf
  echo "" >> /etc/apache2/conf-available/ssl-params.conf
  echo "SSLOpenSSLConfCmd DHParameters \"/etc/ssl/certs/dhparam.pem\"" >> /etc/apache2/conf-available/ssl-params.conf

  echo "Creating the SSL VirtualHost..."
  echo "<IfModule mod_ssl.c>" > /etc/apache2/sites-available/avorionssl.conf
  echo "        <VirtualHost _default_:443>" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                ServerAdmin your_email@example.com" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                ServerName server_domain_or_IP" >> /etc/apache2/sites-available/avorionssl.conf
  echo "" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                DocumentRoot /var/www/html" >> /etc/apache2/sites-available/avorionssl.conf
  echo "" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                ErrorLog ${APACHE_LOG_DIR}/error.log" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                CustomLog ${APACHE_LOG_DIR}/access.log combined" >> /etc/apache2/sites-available/avorionssl.conf
  echo "" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                SSLEngine on" >> /etc/apache2/sites-available/avorionssl.conf
  echo "" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                SSLCertificateFile      /etc/ssl/certs/apache-selfsigned.crt" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key" >> /etc/apache2/sites-available/avorionssl.conf
  echo "" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                <FilesMatch \"\.(cgi|shtml|phtml|php)$\">" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                                SSLOptions +StdEnvVars" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                </FilesMatch>" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                <Directory /usr/lib/cgi-bin>" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                                SSLOptions +StdEnvVars" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                </Directory>" >> /etc/apache2/sites-available/avorionssl.conf
  echo "" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                BrowserMatch \"MSIE [2-6]\" \\" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                               nokeepalive ssl-unclean-shutdown \\" >> /etc/apache2/sites-available/avorionssl.conf
  echo "                               downgrade-1.0 force-response-1.0" >> /etc/apache2/sites-available/avorionssl.conf
  echo "        </VirtualHost>" >> /etc/apache2/sites-available/avorionssl.conf
  echo "</IfModule>" >> /etc/apache2/sites-available/avorionssl.conf

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
