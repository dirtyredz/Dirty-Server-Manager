<?php
 function getUserIP() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

function LogMessage($str){
  if(is_file(dirname(__FILE__).'/logs/'.date('d-m-Y').'_manager.log')){
    file_put_contents(dirname(__FILE__).'/logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.getUserIP().': '.$str."\r\n", FILE_APPEND);
  }else{
    file_put_contents(dirname(__FILE__).'/logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.getUserIP().': '.$str."\r\n");
  }
}
