<?php
$uri_parts = parse_url($_SERVER['REQUEST_URI']);
if (preg_match('/\.(?:png|jpg|jpeg|gif|css|js)$/', $uri_parts['path'])) {
    return false;
} else {
    include __DIR__ .'/../core/CommonController.php';
    if($uri_parts['path'] == '/GetData'){
      include __DIR__ .'/../core/RefreshController.php';
      $RefreshController = new RefreshController;

      if(array_key_exists('query',$uri_parts)){
        $Query = explode('&',$uri_parts['query']);
        $Query = substr(strrchr($Query[0], 'function='), 9 );
        if(method_exists($RefreshController,$Query)){
          $RefreshController->$Query();
          return true;
        }
      }

      if(isset($_POST['function']) ){
        $Method = $_POST['function'];

        if(method_exists($RefreshController,$Method)){
          $RefreshController->$Method();
          return true;
        }
      }
    }

    if($uri_parts['path'] == '/SpaceInvaders'){
      include __DIR__ .'/../core/SpaceInvadersController.php';
      $SpaceInvadersController = new SpaceInvadersController;

      if(array_key_exists('query',$uri_parts)){
        $QueryArray = explode('&',$uri_parts['query']);
        $Query = substr(strrchr($QueryArray[0], 'function='), 9 );
        if(method_exists($SpaceInvadersController,$Query)){
          $SpaceInvadersController->$Query($QueryArray);
          return true;
        }
      }
    }

    if($uri_parts['path'] == '/Config'){
      include __DIR__ .'/../core/ServerConfigController.php';
      $ServerConfigController = new ServerConfigController;
      if(isset($_POST['function']) ){
        $Method = $_POST['function'];
        if(method_exists($ServerConfigController,$Method)){
          $ServerConfigController->$Method();
          return true;
        }
      }
    }

    if($uri_parts['path'] == '/View'){
      include __DIR__ .'/../core/ViewController.php';
      if(isset($_POST['view'])){
        $View = htmlspecialchars($_POST['view']);
        $ViewController = new ViewController;
        if(method_exists($ViewController,$View)){
          $ViewController->$View();
          return true;
        }
      }else{
        $ViewController = new ViewController;
        $ViewController->Home();
        return true;
      }

    }
    if($uri_parts['path'] == '/Account'){
      include __DIR__ .'/../core/AccountController.php';
      $AccountController = new AccountController;

      if(array_key_exists('query',$uri_parts)){
        $Query = explode('&',$uri_parts['query']);
        $Query = substr(strrchr($Query[0], 'function='), 9 );
        if(method_exists($AccountController,$Query)){
          if($Query == 'ListUsers' || $Query == 'LogOut'){
            echo $AccountController->$Query();
            return true;
          }
        }
      }elseif(isset($_POST['username']) && isset($_POST['password']) ){
        echo $AccountController->CheckCredentials();
        return true;
      }elseif(isset($_POST['NewUser'])){
        echo $AccountController->AddUser();
        return true;
      }elseif(isset($_POST['DeleteUser'])){
        echo $AccountController->DeleteUser();
        return true;
      }elseif(isset($_POST['ChangeRole'])){
        echo $AccountController->ChangeRole();
        return true;
      }elseif(isset($_POST['ResetPass'])){
        echo $AccountController->ResetPassword();
        return true;
      }elseif(isset($_POST['OldPass']) && isset($_POST['NewPass'])){
        echo $AccountController->ChangePassword();
        return true;
      }

    }

    if($uri_parts['path'] == '/rss'){
      include __DIR__ .'/../core/ViewController.php';
      $ViewController = new ViewController;
      $ViewController->RSS();
      return true;
    }

    if($uri_parts['path'] == '/'){
      include __DIR__ .'/../core/ViewController.php';
      $ViewController = new ViewController;
      $ViewController->Index();
      return true;
    }

    include __DIR__.'/404.php';
    return true;
}
