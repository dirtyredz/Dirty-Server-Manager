<!DOCTYPE html>
<html>
    <head>
      <style type="text/css">
          body {
              background-color: rgba(14,14,14,1);
              color: #e0e0e0;
              margin: 0;
              overflow-x: hidden;
          }
          h1{
            margin: 0;
          }
          html, body{
            height: 100%;
          }
          #Wrapper{
            display: flex;
            height: 100%;
            width: 100%;

          }
          .icon {
            display: inline-block;
            width: 1em;
            height: 1em;
            padding-right: 22px;
            stroke-width: 0;
            stroke: #e0e0e0;
            fill: #e0e0e0;
          }
          #SideBar {
            background-color: rgba(14,14,14,1);
            left: 0;
            top: 0;
            width: 220px;
            font-size: 140%;
          }
          #SideBar ul{
            list-style: none;
            padding-left: 0;
            margin: 0;
          }
          #SideBar li{
            padding-left: 5px;
            padding-right: 5px;
            padding-top: 10px;
            height: auto;
            opacity: 1;
            padding-bottom: 5px;
            cursor: pointer;
            max-height: 100px;
            display: flex;
            transition: opacity 1s, max-height 1s, padding-top 1s, padding-bottom 1s;
          }

          #SideBar li.Move{
          opacity: 0;
          }
          #SideBar li:hover{
            background-color: rgba(49,86,131,0.7);
          }
          #SideBar li.Active{
            background-color: rgba(49,86,131,1);
          }
          #SideBar li.Disabled{
            color: rgb(80, 80, 80);
            cursor: default;
            pointer-events: none;
          }
          #SideBar li.Disabled svg.icon{
            fill: rgb(80, 80, 80);
          }
          #SideBar li.AnimateLi{
            max-height: 0;
            opacity: 0;
            padding-top: 0;
            padding-bottom: 0;
            overflow: hidden;
          }
          #SideBar li.SubLi{
            padding-left: 30px;
          }
          #Main {
            overflow-x: auto;
            padding-left: 50px;
            padding-right: 50px;
            flex: 1;
            /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+1,0e0e0e+68&0+0,1+69 */
          background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.17) 1%,rgba(14, 14, 14, 0.99) 68%,rgba(14, 14, 14, 1) 69%); /* FF3.6-15 */
          background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.17) 1%,rgba(14, 14, 14, 0.99) 68%,rgba(14, 14, 14, 1) 69%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.17) 1%,rgba(14, 14, 14, 0.99) 68%,rgba(14, 14, 14, 1) 69%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#0e0e0e',GradientType=0 ); /* IE6-9 */
          }
          #Main #Top{
            background-color: #315683;
            font-size: 110%;
            padding: 10px;
            width: calc(100% + 15px);
            padding-left: 75px;
            align-items: center;
            margin-left: -50px;
            position: relative;
            display: flex;
            justify-content: space-between
          }
          #Main #Top span.Title{
            font-size: 150%;
            font-weight: bold;
            text-align: left;
            padding-right: 50px;
            display: inline-flex;
          }
          #Main #Top span.Time{
            text-align: right;
            padding-right: 50px;
            display: inline-flex;
          }
          #MyUserName{
            font-size: 75%;
            padding-bottom: 50px;
            padding-top:  5px;
            padding-left:  5px;
          }
          #MyUserName span{
            font-weight: bold;
            color: rgb(191, 0, 0);
          }
          #Notifications{
            font-size: 15px;
          }
          #Loading{
            margin-left: 220px;
            width: 200px;
            display: none;
            position: absolute;
          }
          .container.small{
            width: 50px;
            margin-bottom: -19px;
            display: inline-block;
          }
          .container{
            width: 30%;
            margin: 0 auto;
            position: relative;
          }
          @element '.container'{
            $this{
             height: 100ew;
            }
          }
          .center{
            position: absolute;
            left: 50%;
            top: 50%;
            height: 8%;
            width: 8%;
            background-color: #ccc;
            border-radius: 50%;
          }
          @element '.container'{
            $this .circle.One{
              border-left: 1.67ew solid #c6ddde;
              border-top: 1.67ew solid #c6ddde;
              border-right: 1.67ew solid #c6ddde;
              border-bottom: 1.67ew solid transparent;
            }
            $this .circle.Two{
              border-left: 5.01ew solid rgba(93, 197, 247,0.3);
              border-bottom: 5.01ew solid  rgba(93, 197, 247,0.3);
              border-right: 5.01ew solid  rgba(93, 197, 247,00.3);
              border-top: 5.01ew solid transparent;
            }
            $this .circle.Three{
              border-left: 1.67ew solid rgba(93, 197, 247,0.8);
              border-bottom: 1.67ew solid rgba(93, 197, 247,0.8);
              border-right: 1.67ew solid rgba(93, 197, 247,0.8);
              border-top: 1.67ew solid transparent;
            }
            $this .circle.Four{
              border-left: 1.67ew solid rgba(93, 197, 247,0.8);
              border-bottom: 1.67ew solid rgba(93, 197, 247,0.8);
              border-right: 1.67ew solid rgba(93, 197, 247,0.8);
              border-top: 1.67ew solid transparent;
            }
            $this .Expand{
              border: 0.36ew solid rgba(93, 197, 247,0.5);
            }
          }
          .circle{
            position: absolute;
            border-radius: 50%;
          }
          .circle.One{
            height: 500%;
            width: 500%;
            left: -220%;
            top: -220%;
            animation: Rotate 2s infinite linear
          }

          .circle.Two{
            height: 460%;
            width: 460%;
            left: -239%;
            top: -239%;
            animation: Rotate2 2s infinite linear
          }
          .circle.Three{
              height: 460%;
              width: 460%;
              left: -200%;
              top: -200%;
              animation: Rotate2 2s infinite linear;
          }
          .circle.Four{
              height: 540%;
              width: 540%;
              left: -240%;
              top: -240%;
              animation: Rotate2 2s infinite linear;
          }
          .Expand{
            position: absolute;
            border-radius: 50%;
            animation: Expand 1s infinite linear;
            left: -200%;
            top: -200%;
            height: 500%;
            width: 500%;
          }
          .Expand.Two{
            animation: Expand 1s 100ms infinite linear;
          }
          .Expand.Three{
            animation: Expand 1s 200ms infinite linear;
          }
          @keyframes Rotate{
            from{
              transform: rotate(0);
            }
            to{
              transform: rotate(360deg)
            }
          }
          @keyframes Rotate2{
            from{
              transform: rotate(360deg);
            }
            to{
              transform: rotate(0)
            }
          }
          @keyframes Expand{
            0%{
              transform: scale(1);
              opacity: 1;
            }
            25%{
              opacity: 1;
            }
            50%, 100%{
              transform: scale(2);
              opacity: 0;
            }
          }
      </style>
      <link rel="stylesheet" type="text/css" href="/resources/flags.min.css">
      <link rel="stylesheet" type="text/css" href="/resources/select2.min.css">
      <link rel="stylesheet" type="text/css" href="/resources/SpriteStyle.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/eqcss/1.6.0/EQCSS.min.js"></script>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      <script src="https://cdn.jsdelivr.net/clipboard.js/1.6.0/clipboard.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.28.8/js/jquery.tablesorter.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.28.8/js/jquery.tablesorter.widgets.min.js"></script>
      <script src="/resources/select2.min.js"></script>
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
              <ul>
                <li id="HomeBtn" class="<?php echo ($Data['DefaultPage'] == 'Home' ? 'Active' : 'NotActive'); ?>"><svg class="icon icon-untitled5"><use xlink:href="#icon-untitled5"></use></svg>HOME</li>
                <li id="ConsoleBtn" class="<?php echo ($Data['DefaultPage'] == 'Console' ? 'Active' : 'NotActive'); ?> <?php echo $Data['ConsoleAccess']; ?>"><svg class="icon"><use xlink:href="#icon-untitled3"></use></svg>CONSOLE</li>
                <li id="ServerConfigBtn" class="<?php echo ($Data['DefaultPage'] == 'Config' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessServerConfigPage']; ?>"><svg class="icon"><use xlink:href="#icon-cogs"></use></svg>CONFIG</li>
                <li id="FactionsBtn" class="<?php echo ($Data['DefaultPage'] == 'Factions' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessFactionsPage']; ?>"><svg class="icon"><use xlink:href="#icon-earth"></use></svg>FACTIONS</li>
                <li id="PlayersBtn" class="<?php echo ($Data['DefaultPage'] == 'Players' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessPlayerPage']; ?>"><svg class="icon"><use xlink:href="#icon-players"></use></svg>PLAYERS</li>
                <li id="MapsBtn" class="Notactive"><svg class="icon"><use xlink:href="#icon-map"></use></svg>MAPS</li>
                <li id="DiscoveredSectorsBtn" class="<?php echo ($Data['DefaultPage'] == 'DiscoveredMap' ? 'Active' : 'NotActive AnimateLi'); ?> SubLi <?php echo $Data['AccessDiscoveredMapPage']; ?>">Discovered Sectors</li>
                <li id="FactionsMapBtn" class="<?php echo ($Data['DefaultPage'] == 'FactionsMap' ? 'Active' : 'NotActive AnimateLi'); ?> SubLi <?php echo $Data['AccessFactionsMapPage']; ?>">Factions Map</li>
                <li id="GraphsBtn" class="<?php echo ($Data['DefaultPage'] == 'Graphs' ? 'Active' : 'NotActive'); ?> <?php echo $Data['AccessGraphsPage']; ?>"><svg class="icon"><use xlink:href="#icon-untitled2"></use></svg>GRAPHS</li>
                <li id="AccountBtn" class="Notactive <?php echo $Data['LoggedInClass']; ?>"><svg class="icon"><use xlink:href="#icon-user"></use></svg>ACCOUNT</li>
                <li id="UserManagmentBtn" class="Notactive <?php echo $Data['UserManagmentAccess']; ?>"><svg class="icon"><use xlink:href="#icon-users"></use></svg>USER MNGT</li>
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

        function Load(File){
          $Main = $("#Main");
          $("#Loading").show();
          clearInterval(window.HomeRefresh);
          clearInterval(window.PageRefresh);
          $Main.animate({opacity: 0},250,function(){
            $Main.load('View',{view:File},function(){
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
                  var ipaddress = "http://<?php echo $Data['IPAddress']; ?>:8080"
                  $.get("Account", {'function':'LogOut'}, function(data) {
                    window.location.href=ipaddress;
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

    </script>
</html>
