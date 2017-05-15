<?php
$Config = array();
//HOME
    //Custom messages accept only string, and html
    //You can get as much content as you would like in here by using minified html .
    //otherwise there are 4 lines available for you to use.
    $Config['HomeCustomMessageOne'] = '<iframe src="https://discordapp.com/widget?id=268923609387368448&theme=dark" width="350" height="250" allowtransparency="true" frameborder="0"></iframe>';
    $Config['HomeCustomMessageTwo'] = '<h2>Official Avorion Forum</h2><h3><a target="_blank" href="http://www.avorion.net/forum/index.php/topic,798.0.html1">http://www.avorion.net/forum/index.php/topic,798.0.html1</a></h3>';
    $Config['HomeCustomMessageThree'] = '<h2>Website</h2><h3><a target="_blank" href="http://www.rusty-universe.com/">http://www.rusty-universe.com/</a></h3>';
    $Config['HomeCustomMessageFour'] = '';

    //true or false
    $Config['ShowOnlinePlayers'] = true;//Shows online players list on home screen
    $Config['ShowOnlinePlayerCount'] = true;//shows online players count ie(0/10) on home screen
    $Config['ShowDiskUsage'] = true;//shows disk space usage on home screen
    $Config['ShowChatLog'] = true;//shows chat log on home screen

//ROLE SETTINGS
    //Page Access
    //Setting to 0 will make the page public
    $Config['AccessConsolePage'] = 30;//User must have a role of 30 or higher to access the page
    $Config['AccessFactionsPage'] = 0;//User must have a role of 0 or higher to view the Factions page
    $Config['AccessGraphsPage'] = 0;//User must have a role of 0 or higher to view the Graphs page
    $Config['AccessDiscoveredMapPage'] = 0;//User must have a role of 0 or higher to view the DiscoveredMap page
    $Config['AccessFactionsMapPage'] = 0;//User must have a role of 0 or higher to view the FactionsMap page
    $Config['AccessPlayerPage'] = 0;//User must have a role of 0 or higher to view the players page
    $Config['AccessUserManagmentPage'] = 30;//User must have a role of 30 or higher to access the page

    //Page Extra details/functions
    $Config['ExtraGraphs'] = 10;//User must have a role of 10 or higher to vew additional graphs
    $Config['ConsoleCommandsAccess'] = 40;//User must have a role of 40 or higher to run commands in the console
    $Config['ConsoleStopCommand'] = 50;//User must have a role of 40 or higher to use the /stop command in the console
    $Config['AccessDetailedPlayerData'] = 20;//User must have a role of 20 or higher to view the extra data on players

//OTHER
    //disable/enable rss page
    $Config['EnableRSS'] = true ;


//Critical many features of the web inteface depend on these variables.
$Config['ConsoleLog'] = dirname(__FILE__).'/../console.log';
$Config['Manager'] = dirname(__FILE__).'/../manager';
$Config['ManagerConfig'] = dirname(__FILE__).'/../manager-config.sh';
$Config['LogsDir'] = dirname(__FILE__).'/logs';
$Config['StatusBannerDir'] = dirname(__FILE__).'/webroot/banner';
 ?>
