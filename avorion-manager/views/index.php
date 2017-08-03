<!DOCTYPE html>
<html>
    <head>
      <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
      <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Source+Sans+Pro" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="/resources/css/Main.css">
      
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/eqcss/1.6.0/EQCSS.min.js"></script>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.28.8/js/jquery.tablesorter.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.28.8/js/jquery.tablesorter.widgets.min.js"></script>
    </head>
    <body>
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <symbol id="icon-untitled2" viewBox="0 0 37 32">
            <title>untitled2</title>
            <path d="M11.429 16v9.143h-4.571v-9.143h4.571zM18.286 6.857v18.286h-4.571v-18.286h4.571zM36.571 27.429v2.286h-36.571v-27.429h2.286v25.143h34.286zM25.143 11.429v13.714h-4.571v-13.714h4.571zM32 4.571v20.571h-4.571v-20.571h4.571z"></path>
            </symbol>
            <symbol id="icon-untitled3" viewBox="0 0 34 32">
            <title>untitled3</title>
            <path d="M31.429 2.286q1.179 0 2.018 0.839t0.839 2.018v21.714q0 1.179-0.839 2.018t-2.018 0.839h-28.571q-1.179 0-2.018-0.839t-0.839-2.018v-21.714q0-1.179 0.839-2.018t2.018-0.839h28.571zM2.857 4.571q-0.232 0-0.402 0.17t-0.17 0.402v4h29.714v-4q0-0.232-0.17-0.402t-0.402-0.17h-28.571zM31.429 27.429q0.232 0 0.402-0.17t0.17-0.402v-10.857h-29.714v10.857q0 0.232 0.17 0.402t0.402 0.17h28.571zM4.571 25.143v-2.286h4.571v2.286h-4.571zM11.429 25.143v-2.286h6.857v2.286h-6.857z"></path>
            </symbol>
            <symbol id="icon-untitled5" viewBox="0 0 32 32">
            <title>untitled5</title>
            <path d="M2.286 25.143h18.286v-2.286h-18.286v2.286zM2.286 16h18.286v-2.286h-18.286v2.286zM30.286 24q0-0.714-0.5-1.214t-1.214-0.5-1.214 0.5-0.5 1.214 0.5 1.214 1.214 0.5 1.214-0.5 0.5-1.214zM2.286 6.857h18.286v-2.286h-18.286v2.286zM30.286 14.857q0-0.714-0.5-1.214t-1.214-0.5-1.214 0.5-0.5 1.214 0.5 1.214 1.214 0.5 1.214-0.5 0.5-1.214zM30.286 5.714q0-0.714-0.5-1.214t-1.214-0.5-1.214 0.5-0.5 1.214 0.5 1.214 1.214 0.5 1.214-0.5 0.5-1.214zM32 20.571v6.857h-32v-6.857h32zM32 11.429v6.857h-32v-6.857h32zM32 2.286v6.857h-32v-6.857h32z"></path>
            </symbol>
            <symbol id="icon-exit" viewBox="0 0 32 32">
            <title>exit</title>
            <path d="M24 20v-4h-10v-4h10v-4l6 6zM22 18v8h-10v6l-12-6v-26h22v10h-2v-8h-16l8 4v18h8v-6z"></path>
            </symbol>
            <symbol id="icon-map" viewBox="0 0 32 32">
            <title>map</title>
            <path d="M0 6l10-4v24l-10 4z"></path>
            <path d="M12 1l10 6v23l-10-5z"></path>
            <path d="M24 7l8-6v24l-8 6z"></path>
            </symbol>
            <symbol id="icon-user" viewBox="0 0 32 32">
            <title>user</title>
            <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
            </symbol>
            <symbol id="icon-enter" viewBox="0 0 32 32">
            <title>enter</title>
            <path d="M12 16h-10v-4h10v-4l6 6-6 6zM32 0v26l-12 6v-6h-12v-8h2v6h10v-18l8-4h-18v8h-2v-10z"></path>
            </symbol>
            <symbol id="icon-users" viewBox="0 0 36 32">
            <title>users</title>
            <path d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
            <path d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z"></path>
            </symbol>
            <symbol id="icon-earth" viewBox="0 0 32 32">
            <title>earth</title>
            <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 30c-1.967 0-3.84-0.407-5.538-1.139l7.286-8.197c0.163-0.183 0.253-0.419 0.253-0.664v-3c0-0.552-0.448-1-1-1-3.531 0-7.256-3.671-7.293-3.707-0.188-0.188-0.442-0.293-0.707-0.293h-4c-0.552 0-1 0.448-1 1v6c0 0.379 0.214 0.725 0.553 0.894l3.447 1.724v5.871c-3.627-2.53-6-6.732-6-11.489 0-2.147 0.484-4.181 1.348-6h3.652c0.265 0 0.52-0.105 0.707-0.293l4-4c0.188-0.188 0.293-0.442 0.293-0.707v-2.419c1.268-0.377 2.61-0.581 4-0.581 2.2 0 4.281 0.508 6.134 1.412-0.13 0.109-0.256 0.224-0.376 0.345-1.133 1.133-1.757 2.64-1.757 4.243s0.624 3.109 1.757 4.243c1.139 1.139 2.663 1.758 4.239 1.758 0.099 0 0.198-0.002 0.297-0.007 0.432 1.619 1.211 5.833-0.263 11.635-0.014 0.055-0.022 0.109-0.026 0.163-2.541 2.596-6.084 4.208-10.004 4.208z"></path>
            </symbol>
            <symbol id="icon-players" viewBox="0 0 34 32">
            <title>players</title>
            <path d="M10.589 16q-2.893 0.089-4.732 2.286h-2.393q-1.464 0-2.464-0.723t-1-2.116q0-6.304 2.214-6.304 0.107 0 0.777 0.375t1.741 0.759 2.125 0.384q1.196 0 2.375-0.411-0.089 0.661-0.089 1.179 0 2.482 1.446 4.571zM29.714 27.375q0 2.143-1.304 3.384t-3.464 1.241h-15.607q-2.161 0-3.464-1.241t-1.304-3.384q0-0.946 0.063-1.848t0.25-1.946 0.473-1.938 0.768-1.741 1.107-1.446 1.527-0.955 1.991-0.357q0.179 0 0.768 0.384t1.304 0.857 1.911 0.857 2.411 0.384 2.411-0.384 1.911-0.857 1.304-0.857 0.768-0.384q1.089 0 1.991 0.357t1.527 0.955 1.107 1.446 0.768 1.741 0.473 1.938 0.25 1.946 0.063 1.848zM11.429 4.571q0 1.893-1.339 3.232t-3.232 1.339-3.232-1.339-1.339-3.232 1.339-3.232 3.232-1.339 3.232 1.339 1.339 3.232zM24 11.429q0 2.839-2.009 4.848t-4.848 2.009-4.848-2.009-2.009-4.848 2.009-4.848 4.848-2.009 4.848 2.009 2.009 4.848zM34.286 15.446q0 1.393-1 2.116t-2.464 0.723h-2.393q-1.839-2.196-4.732-2.286 1.446-2.089 1.446-4.571 0-0.518-0.089-1.179 1.179 0.411 2.375 0.411 1.054 0 2.125-0.384t1.741-0.759 0.777-0.375q2.214 0 2.214 6.304zM32 4.571q0 1.893-1.339 3.232t-3.232 1.339-3.232-1.339-1.339-3.232 1.339-3.232 3.232-1.339 3.232 1.339 1.339 3.232z"></path>
            </symbol>
            <symbol id="icon-about" viewBox="0 0 18 32">
            <title>about</title>
            <path d="M12.571 22.429v4.286q0 0.286-0.214 0.5t-0.5 0.214h-4.286q-0.286 0-0.5-0.214t-0.214-0.5v-4.286q0-0.286 0.214-0.5t0.5-0.214h4.286q0.286 0 0.5 0.214t0.214 0.5zM18.214 11.714q0 0.964-0.277 1.804t-0.625 1.366-0.982 1.063-1.027 0.777-1.089 0.634q-0.732 0.411-1.223 1.161t-0.491 1.196q0 0.304-0.214 0.58t-0.5 0.277h-4.286q-0.268 0-0.455-0.33t-0.188-0.67v-0.804q0-1.482 1.161-2.795t2.554-1.938q1.054-0.482 1.5-1t0.446-1.357q0-0.75-0.83-1.321t-1.92-0.571q-1.161 0-1.929 0.518-0.625 0.446-1.911 2.054-0.232 0.286-0.554 0.286-0.214 0-0.446-0.143l-2.929-2.232q-0.232-0.179-0.277-0.446t0.098-0.5q2.857-4.75 8.286-4.75 1.429 0 2.875 0.554t2.607 1.482 1.893 2.277 0.732 2.83z"></path>
            </symbol>
            <symbol id="icon-cogs" viewBox="0 0 32 32">
            <title>cogs</title>
            <path d="M11.366 22.564l1.291-1.807-1.414-1.414-1.807 1.291c-0.335-0.187-0.694-0.337-1.071-0.444l-0.365-2.19h-2l-0.365 2.19c-0.377 0.107-0.736 0.256-1.071 0.444l-1.807-1.291-1.414 1.414 1.291 1.807c-0.187 0.335-0.337 0.694-0.443 1.071l-2.19 0.365v2l2.19 0.365c0.107 0.377 0.256 0.736 0.444 1.071l-1.291 1.807 1.414 1.414 1.807-1.291c0.335 0.187 0.694 0.337 1.071 0.444l0.365 2.19h2l0.365-2.19c0.377-0.107 0.736-0.256 1.071-0.444l1.807 1.291 1.414-1.414-1.291-1.807c0.187-0.335 0.337-0.694 0.444-1.071l2.19-0.365v-2l-2.19-0.365c-0.107-0.377-0.256-0.736-0.444-1.071zM7 27c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM32 12v-2l-2.106-0.383c-0.039-0.251-0.088-0.499-0.148-0.743l1.799-1.159-0.765-1.848-2.092 0.452c-0.132-0.216-0.273-0.426-0.422-0.629l1.219-1.761-1.414-1.414-1.761 1.219c-0.203-0.149-0.413-0.29-0.629-0.422l0.452-2.092-1.848-0.765-1.159 1.799c-0.244-0.059-0.492-0.109-0.743-0.148l-0.383-2.106h-2l-0.383 2.106c-0.251 0.039-0.499 0.088-0.743 0.148l-1.159-1.799-1.848 0.765 0.452 2.092c-0.216 0.132-0.426 0.273-0.629 0.422l-1.761-1.219-1.414 1.414 1.219 1.761c-0.149 0.203-0.29 0.413-0.422 0.629l-2.092-0.452-0.765 1.848 1.799 1.159c-0.059 0.244-0.109 0.492-0.148 0.743l-2.106 0.383v2l2.106 0.383c0.039 0.251 0.088 0.499 0.148 0.743l-1.799 1.159 0.765 1.848 2.092-0.452c0.132 0.216 0.273 0.426 0.422 0.629l-1.219 1.761 1.414 1.414 1.761-1.219c0.203 0.149 0.413 0.29 0.629 0.422l-0.452 2.092 1.848 0.765 1.159-1.799c0.244 0.059 0.492 0.109 0.743 0.148l0.383 2.106h2l0.383-2.106c0.251-0.039 0.499-0.088 0.743-0.148l1.159 1.799 1.848-0.765-0.452-2.092c0.216-0.132 0.426-0.273 0.629-0.422l1.761 1.219 1.414-1.414-1.219-1.761c0.149-0.203 0.29-0.413 0.422-0.629l2.092 0.452 0.765-1.848-1.799-1.159c0.059-0.244 0.109-0.492 0.148-0.743l2.106-0.383zM21 15.35c-2.402 0-4.35-1.948-4.35-4.35s1.948-4.35 4.35-4.35 4.35 1.948 4.35 4.35c0 2.402-1.948 4.35-4.35 4.35z"></path>
            </symbol>
            <symbol id="icon-spaceinvaders" viewBox="0 0 33 32">
            <title>spaceinvaders</title>
            <path d="M29.963 24.982v-5.947h-2.91v5.969h-3.037v2.953h-7.048v-2.975h7.048v-2.972h-14.991v2.973l6.030 0.021v2.973h-6.051v-2.951h-3.036v-6.010h-2.911v5.947h-3.057v-9.004h2.995v-2.891h2.973v-3.057h3.057v-2.994h2.994v3.003l8.983 0.024v-3.027h2.994v3.036h3.057v2.974h2.953v2.973h3.014v8.982h-3.057zM12.019 13.005h-2.994v2.995h2.994v-2.995zM23.996 13.005h-2.994v2.995h2.994v-2.995zM5.968 4.023h3.057v2.994h-3.057v-2.994zM27.053 4.023v2.994h-3.057v-2.994h3.057z"></path>
            </symbol>
            <symbol id="icon-Flag" viewBox="0 0 32 32">
            <title>Flag</title>
            <path d="M29.714 18.661v-11q-3.018 1.625-5.464 1.625-1.464 0-2.589-0.571-1.786-0.875-3.286-1.366t-3.179-0.491q-3.089 0-7.196 2.268v10.696q4.375-2.018 7.732-2.018 0.982 0 1.848 0.134t1.75 0.464 1.375 0.554 1.473 0.705l0.5 0.25q0.786 0.393 1.804 0.393 2.143 0 5.232-1.643zM5.714 4.571q0 0.625-0.313 1.143t-0.83 0.821v22.607q0 0.25-0.161 0.411t-0.411 0.161h-1.143q-0.25 0-0.411-0.161t-0.161-0.411v-22.607q-0.518-0.304-0.83-0.821t-0.313-1.143q0-0.946 0.67-1.616t1.616-0.67 1.616 0.67 0.67 1.616zM32 5.714v13.625q0 0.696-0.625 1.018-0.179 0.089-0.304 0.161-3.893 2.071-6.589 2.071-1.571 0-2.821-0.625l-0.5-0.25q-1.143-0.589-1.768-0.857t-1.625-0.518-2.036-0.25q-1.821 0-4.205 0.786t-4.080 1.821q-0.268 0.161-0.589 0.161-0.286 0-0.571-0.143-0.571-0.339-0.571-1v-13.25q0-0.625 0.554-0.982 0.625-0.375 1.402-0.759t2.036-0.929 2.723-0.884 2.768-0.339q2 0 3.732 0.554t3.732 1.536q0.679 0.339 1.589 0.339 2.179 0 5.536-2 0.393-0.214 0.554-0.304 0.554-0.286 1.107 0.036 0.554 0.357 0.554 0.982z"></path>
            </symbol>
            <symbol id="icon-document-text" viewBox="0 0 32 32">
            <title>document-text</title>
            <path d="M19.5 3h0.5l6 7v18.009c0 1.093-0.894 1.991-1.997 1.991h-15.005c-1.107 0-1.997-0.899-1.997-2.007v-22.985c0-1.109 0.897-2.007 2.003-2.007h10.497zM19 4h-10.004c-0.55 0-0.996 0.455-0.996 0.995v23.009c0 0.55 0.455 0.995 1 0.995h15c0.552 0 1-0.445 1-0.993v-17.007h-4.002c-1.103 0-1.998-0.887-1.998-2.006v-4.994zM20 4.5v4.491c0 0.557 0.451 1.009 0.997 1.009h3.703l-4.7-5.5zM10 10v1h7v-1h-7zM10 7v1h7v-1h-7zM10 13v1h13v-1h-13zM10 16v1h13v-1h-13zM10 19v1h13v-1h-13zM10 22v1h13v-1h-13zM10 25v1h13v-1h-13z"></path>
            </symbol>
          </defs>
        </svg>
        <div id="Wrapper">
            <div id="SideBar">
              <div id="Loading">
                <span>Loading...</span>
                <div class="container small">
                  <div class="center">
                    <div class="circle One"></div>
                    <div class="circle Two"></div>
                    <div class="circle Three"></div>
                    <div class="circle Four"></div>
                    <div class="Expand"></div>
                    <div class="Expand Two"></div>
                    <div class="Expand Three"></div>
                  </div>
                </div>
              </div>
              <div id="MyUserName"><?php echo $Data['Username']; ?></div>
              <div id="OpenMenu"><svg class="icon icon-untitled5"><use xlink:href="#icon-untitled5"></use></svg></div>
              <ul>
                <li id="HomeBtn" class="<?php echo ($Data['DefaultPage'] == 'Home' ? 'Active' : 'NotActive'); ?>"><svg class="icon icon-untitled5"><use xlink:href="#icon-untitled5"></use></svg>HOME</li>
                <li id="ConsoleBtn" class="<?php echo ($Data['DefaultPage'] == 'Console' ? 'Active' : 'NotActive'); ?> <?php echo $Data['ConsoleAccess']; ?>"><svg class="icon"><use xlink:href="#icon-untitled3"></use></svg>CONSOLE</li>
                <li id="ServerConfigBtn" class="<?php echo ($Data['DefaultPage'] == 'Config' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessServerConfigPage']; ?>"><svg class="icon"><use xlink:href="#icon-cogs"></use></svg>CONFIG</li>
                <li id="FactionsBtn" class="<?php echo ($Data['DefaultPage'] == 'Factions' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessFactionsPage']; ?>"><svg class="icon"><use xlink:href="#icon-earth"></use></svg>FACTIONS</li>
                <li id="PlayersBtn" class="<?php echo ($Data['DefaultPage'] == 'Players' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessPlayerPage']; ?>"><svg class="icon"><use xlink:href="#icon-players"></use></svg>PLAYERS</li>
                <li id="AlliancesBtn" class="<?php echo ($Data['DefaultPage'] == 'Alliance' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessAlliancePage']; ?>"><svg class="icon icon-Flag"><use xlink:href="#icon-Flag"></use></svg>ALLIANCES</li>
                <li id="MapsBtn" class="Notactive"><svg class="icon"><use xlink:href="#icon-map"></use></svg>MAPS</li>
                <li id="DiscoveredSectorsBtn" class="<?php echo ($Data['DefaultPage'] == 'DiscoveredMap' ? 'Active' : 'NotActive AnimateLi'); ?> SubLi <?php echo $Data['AccessDiscoveredMapPage']; ?>">Discovered Sectors</li>
                <li id="FactionsMapBtn" class="<?php echo ($Data['DefaultPage'] == 'FactionsMap' ? 'Active' : 'NotActive AnimateLi'); ?> SubLi <?php echo $Data['AccessFactionsMapPage']; ?>">Factions Map</li>
                <li id="GraphsBtn" class="<?php echo ($Data['DefaultPage'] == 'Graphs' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessGraphsPage']; ?>"><svg class="icon"><use xlink:href="#icon-untitled2"></use></svg>GRAPHS</li>
                <li id="AccountBtn" class="Notactive <?php echo $Data['LoggedInClass']; ?>"><svg class="icon"><use xlink:href="#icon-user"></use></svg>ACCOUNT</li>
                <li id="UserManagmentBtn" class="Notactive <?php echo $Data['UserManagmentAccess']; ?>"><svg class="icon"><use xlink:href="#icon-users"></use></svg>USER MNGT</li>
                <li id="SpaceInvadersBtn" style="font-size:90%;" class="NotActive <?php echo $Data['AccessSpaceInvadersPage']; ?>"><svg class="icon icon-spaceinvaders"><use xlink:href="#icon-spaceinvaders"></use></svg>SPACE INVADERS</li>
                <li id="ProfileParserBtn" style="font-size:90%;" class="NotActive <?php echo $Data['AccessProfileParserPage']; ?>"><svg class="icon icon-document-text"><use xlink:href="#icon-document-text"></use></svg>PROFILE PARSER</li>
                <?php
                    if($Data['LoggedIn']) {
                        ?>
                        <li id="SignOutBtn" class="Notactive"><svg class="icon"><use xlink:href="#icon-exit"></use></svg>SIGN OUT</li>
                        <?php
                    }else{
                        ?>
                        <li id="SignInBtn" class="<?php echo ($Data['DefaultPage'] == 'SignIn' ? 'Active' : 'NotActive'); ?>"><svg class="icon"><use xlink:href="#icon-enter"></use></svg>SIGN IN</li>
                        <?php
                    }
                 ?>
                 <li id="AboutBtn" class="<?php echo ($Data['DefaultPage'] == 'About' ? 'Active' : 'NotActive'); ?>"><svg class="icon"><use xlink:href="#icon-about"></use></svg>ABOUT</li>
              </ul>
              <br/>
              <br/>
              <br/>
              <ul id="Notifications"></ul>
            </div>
            <div id="Main">
              <?php
                $DefaultPage = $Data['DefaultPage'];
                if(method_exists($this,$DefaultPage)){
                  $this->$DefaultPage();
                }else{
                  echo '<h1>'.$DefaultPage.' Page Does Not Exist</h1>';
                }
              ?>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        window.HomeRefresh;
        window.PageRefresh;
        window.HomeRefresh = setInterval(function(){
          Load("Home");
        },300000);

        AddNotification("Welcome to Dirty Server Manager!");

        setTimeout(function(){
          GetTime();
        },100);
        function GetTime(){
          $.get( "GetData", {function:"GetTime"},function(data) {
            $('.Time').html('Server Time: '+data['Date']);
          },'json');
        }
        var TimeRefresh = setInterval(function () {
          GetTime();
        }, 60000);

        function Load(File,Arg){
          $Main = $("#Main");
          $("#Loading").show();
          clearInterval(window.HomeRefresh);
          clearInterval(window.PageRefresh);
          if (typeof(game) !== 'undefined') {
            console.log('Stopping Game');
            game.stop();
          }

          $Main.animate({opacity: 0},250,function(){
            $Main.load('View',{view:File,arg:Arg},function(){
              $Main.animate({opacity: 1},250);
              $("#Loading").hide();
              GetTime();
            });
          });
        }

        <?php
            if($Data['LoggedIn']) {
                ?>
                //Signed In
                $("li#AccountBtn").click(function() {
                    $('li.Active').toggleClass('Active').toggleClass('NotActive');
                    $(this).toggleClass('Active').toggleClass('NotActive');
                    Load("Account");
                    console.log("Account Link Clicked!");
                });
                $("li#SignOutBtn").click(function() {
                  $.get("Account", {'function':'LogOut'}, function(data) {
                    window.location.reload();
                  });
                });
                <?php
            }else{
                ?>
                //Not Signed In
                $("li#SignInBtn").click(function() {
                    $('li.Active').toggleClass('Active').toggleClass('NotActive');
                    $(this).toggleClass('Active').toggleClass('NotActive');
                    Load("SignIn");
                    console.log("SignIn Link Clicked!");
                });
                <?php
            }
         ?>
         $("li#UserManagmentBtn").click(function() {
             $('li.Active').toggleClass('Active').toggleClass('NotActive');
             $(this).toggleClass('Active').toggleClass('NotActive');
             Load("UserManagment");
             console.log("User Managment Link Clicked!");
         });
         $("li#SpaceInvadersBtn").click(function() {
             $('li.Active').toggleClass('Active').toggleClass('NotActive');
             $(this).toggleClass('Active').toggleClass('NotActive');
             Load("SpaceInvaders");
             console.log("Space Invaders Link Clicked!");
         });
         $("li#ProfileParserBtn").click(function() {
             $('li.Active').toggleClass('Active').toggleClass('NotActive');
             $(this).toggleClass('Active').toggleClass('NotActive');
             Load("ProfileParser");
             console.log("ProfilePage Link Clicked!");
         });
         $("li#ConsoleBtn").click(function() {
             $('li.Active').toggleClass('Active').toggleClass('NotActive');
             $(this).toggleClass('Active').toggleClass('NotActive');
             Load("Console");
             console.log("Console Link Clicked!");
         });
         $("li#ServerConfigBtn").click(function() {
             $('li.Active').toggleClass('Active').toggleClass('NotActive');
             $(this).toggleClass('Active').toggleClass('NotActive');
             Load("ServerConfig");
             console.log("Server Config Link Clicked!");
         });
        $("li#HomeBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("Home");
            console.log("Home Link Clicked!");
        });
        $("li#FactionsBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("Factions");
            console.log("Factions Link Clicked!");
        });
        $("li#PlayersBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("Players");
            console.log("Players Link Clicked!");
        });
        $("li#AlliancesBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("Alliances");
            console.log("Alliances Link Clicked!");
        });
        var MapOpen = false;
        $("li#MapsBtn").click(function() {
            console.log("Maps Link Clicked!");
            if(!MapOpen){
              MapOpen = true;
              setTimeout(function(){
                $("#DiscoveredSectorsBtn").removeClass('AnimateLi');
                setTimeout(function(){
                  $("#FactionsMapBtn").removeClass('AnimateLi');
                },100)
              },1)
            }else{
              MapOpen = false;
              $("#DiscoveredSectorsBtn").addClass('AnimateLi');
              $("#FactionsMapBtn").addClass('AnimateLi');
            }
        });
        $("li#DiscoveredSectorsBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("DiscoveredMap");
            console.log("Discovered Sectors Link Clicked!");
        });
        $("li#FactionsMapBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("FactionsMap");
            console.log("Factions Map Link Clicked!");
        });
        $("li#GraphsBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("Graphs");
            console.log("Graphs Link Clicked!");
        });
        $("li#AboutBtn").click(function() {
            $('li.Active').toggleClass('Active').toggleClass('NotActive');
            $(this).toggleClass('Active').toggleClass('NotActive');
            Load("About");
            console.log("About Link Clicked!");
        });
        function AddNotification(data){
          var rand = Math.round(new Date().getTime() + (Math.random() * 100));
          $('<li style="display: none;" id="'+rand+'">'+data+'</li>').appendTo('#Notifications').slideDown("fast");
          setTimeout(function(){
            $('#'+rand).hide('slide',{direction:'right'},250);
          },20000)
        }
        $('#OpenMenu').click(function(){
          $(this).toggleClass('OpenMenu');
          $('#SideBar').toggleClass('OpenMenu');
          $('#SideBar ul').toggleClass('OpenMenu');
          $('#MyUserName').toggleClass('OpenMenu');
        });
    </script>
</html>
