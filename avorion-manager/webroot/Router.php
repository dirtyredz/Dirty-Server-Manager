<?php
// www/routing.php
//$uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
$uri_parts = parse_url($_SERVER['REQUEST_URI']);
if (preg_match('/\.(?:png|jpg|jpeg|gif|css)$/', $uri_parts['path'])) {
    return false;
} else {
    if($uri_parts['path'] == '/RefreshController.php'){
      include __DIR__ .'/../RefreshController.php';
      return true;
    }

    if($uri_parts['path'] == '/ViewController.php'){
      include __DIR__ .'/../ViewController.php';
      if(isset($_POST['view'])){
        $View = htmlspecialchars($_POST['view']);
        $ViewController = new ViewController;
        $ViewController->$View();
      }else{
        $ViewController = new ViewController;
        $ViewController->Home();
      }
      return true;
    }
    if($uri_parts['path'] == '/AccountController.php'){
      include __DIR__ .'/../AccountController.php';
      return true;
    }
    if($uri_parts['path'] == '/rss'){
      include __DIR__ .'/../ViewController.php';
      $ViewController = new ViewController;
      $ViewController->RSS();
    }
    if($uri_parts['path'] == '/'){
      include __DIR__ .'/../ViewController.php';
      $ViewController = new ViewController;
      $ViewController->Index();
      return true;
    }
    include __DIR__.'/404.php';
    return true;
}
