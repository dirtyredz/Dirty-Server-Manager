#Pull values from config INI
source <(grep = manager-config.ini)
PHPPORT=`echo ${PHPPORT} | sed -e 's/\r//g'`
IPAddress=$(hostname -I | awk '{print $1}')

./manager stop-web

echo "Listen ${PHPPORT}" > /etc/apache2/ports.conf
echo "<IfModule ssl_module>" >> /etc/apache2/ports.conf
echo "    Listen 443" >> /etc/apache2/ports.conf
echo "</IfModule>" >> /etc/apache2/ports.conf
echo "<IfModule mod_gnutls.c>" >> /etc/apache2/ports.conf
echo "    Listen 443" >> /etc/apache2/ports.conf
echo "</IfModule>" >> /etc/apache2/ports.conf
echo "" >> /etc/apache2/ports.conf
echo "# vim: syntax=apache ts=4 sw=4 sts=4 sr noet" >> /etc/apache2/ports.conf

echo "<VirtualHost *:${PHPPORT}>" > /etc/apache2/sites-available/avorion.conf
echo "    ServerName ${IPAddress}:${PHPPORT}" >> /etc/apache2/sites-available/avorion.conf
echo "    ServerAdmin webmaster@localhost" >> /etc/apache2/sites-available/avorion.conf
echo "    DocumentRoot ${PWD}/avorion-manager/webroot" >> /etc/apache2/sites-available/avorion.conf
echo "    ErrorLog ${PWD}/avorion-manager/webroot/error.log" >> /etc/apache2/sites-available/avorion.conf
echo "    CustomLog ${PWD}/avorion-manager/webroot/access.log combined" >> /etc/apache2/sites-available/avorion.conf
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

sudo a2ensite avorion.conf
sudo a2dissite 000-default.conf
sudo service apache2 reload
sudo a2enmod rewrite
sudo service apache2 restart
