<?php
header('Content-Type: application/xml; charset=utf-8');
echo "<?xml version='1.0' encoding='UTF-8'?>".PHP_EOL;
echo '<rss version="2.0">'.PHP_EOL;
echo "<channel>".PHP_EOL;
echo "<title>".$Data['GalaxyName']."</title>".PHP_EOL;
echo "<link>http://".$Data['IPAddress'].":8080</link>".PHP_EOL;
echo "<description>Server status rss</description>".PHP_EOL;
echo "<status>".$Data['OnlineStatus']."</status>".PHP_EOL;
if($Data['ShowOnlinePlayerCount']){
  echo "<playercount>".PHP_EOL;
  echo "<online>".$Data['OnlinePlayerCount']."</online>".PHP_EOL;
  echo "<max>".$Data['MaxPlayers']."</max>".PHP_EOL;
  echo "</playercount>".PHP_EOL;
}
echo "<load>".$Data['ServerLoad']."</load>".PHP_EOL;
echo "<item>".PHP_EOL;
echo "<title>".$Data['GalaxyName'].": ".$Data['OnlineStatus']."</title>".PHP_EOL;
echo "<link>http://".$Data['IPAddress'].":8080</link>".PHP_EOL;

if($Data['ShowOnlinePlayerCount']){
  echo "<description>OnlinePlayers: ".$Data['OnlinePlayerCount']."/".$Data['MaxPlayers'].", Load: ".$Data['ServerLoad']."</description>".PHP_EOL;
}else{
  echo "<description>Load: ".$Data['ServerLoad']."</description>".PHP_EOL;
}


echo "</item>".PHP_EOL;
echo "</channel>".PHP_EOL;
echo "</rss>".PHP_EOL;
?>
