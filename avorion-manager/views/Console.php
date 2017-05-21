<style type="text/css">
    div#ConsoleWrapper {
      padding: 20px;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
    }
    div#Console{
      border: 4px solid #3d3c3c;
      overflow-x: hidden;
      overflow-y: scroll;
      height: 400px;
      flex: 3 0 70%;
      padding-left: 5px;
      min-width: 600px;
      order: 1;
    }
    div#Console::-webkit-scrollbar {
        width: 1em;
    }
    div#Console::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    div#Console::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
    div#PlayerList{
      order: 1;
      border: 4px solid #3d3c3c;
      flex: 1 0 25%;
      padding: 5px;
    }
    form#Post{
      display: flex;
      flex: 1 0 100%;
      order: 2;
    }
    input#Input{
      min-height: 20px;
      flex: 1 0 0;
      min-width: 600px;
      padding: 5px 10px;
      border: 4px solid #3d3c3c;
      background-color: transparent;
      color:inherit;
      outline: none;
    }
    div.OptionsWrapper{
      display: flex;
      padding-left: 20px;
    }
    div.OptionsWrapper span{
      padding: 5px;
    }
    input#ScrollLock{
      outline: none;
      -webkit-appearance: none;
      background-color: #eeeeee;
      border: 1px solid #cacece;
      padding: 10px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
      border-radius: 3px;
      display: inline-block;
      position: relative;
    }
    input#ScrollLock:active, input#ScrollLock:checked:active {
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
    }

    input#ScrollLock:checked {
      background-color: #e9ecee;
      border: 1px solid #adb8c0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
      color: #99a1a7;
    }

    input#ScrollLock:checked:after {
      content: '\2714';
      font-size: 20px;
      position: absolute;
      top: -4px;
      left: 2px;
      color: black;
    }
</style>
<div id="Top"><span class="Title"><svg class="icon icon-untitled3"><use xlink:href="#icon-untitled3"></use></svg>CONSOLE</span><span class="Time"></span></div>
<div id="ConsoleWrapper">
  <div id="Console"></div>
  <div id="PlayerList"><?php echo $PlayerList; ?></div>
  <?php
      if($Data['AccessGranted']) {
          ?>
          <form id="Post" method="post">
            <input id="Input"></input>
          </form>
          <?php
      }
   ?>

</div>
<br/>
<div class="OptionsWrapper">
<input id="ScrollLock" type="checkbox" checked="checked"><span>Auto Scrolling!</span>
</div>
<br/>
<div class="OptionsWrapper">
<input type="range" name="delay" min="3" max="10" value="3"><span>Update delay: </span><span id="SecondsDelay"></span><span>sec.</span>
</div>


<script type="text/javascript">
  $("#SecondsDelay").html($('.OptionsWrapper > input[name="delay"]').val());
  window.PageRefresh = setInterval(function () {LoadnScroll();}, $('.OptionsWrapper > input[name="delay"]').val() * 1000);

  $('.OptionsWrapper > input[name="delay"]').on('input', function () {
      $("#SecondsDelay").html($('.OptionsWrapper > input[name="delay"]').val());
      clearInterval(window.PageRefresh);
      window.PageRefresh = setInterval(function () {
          LoadnScroll();
      }, $('.OptionsWrapper > input[name="delay"]').val() * 1000);
  });

  LoadnScroll();


  <?php
      if($Data['AccessGranted']) {
          ?>
          $("#Post").submit(function(event){
            event.preventDefault();
            $.post("GetData", {function:'SendKeys',Message:$("#Input").val()}, function(data) {
                $("#Input").val("");
            });
          });
          <?php
      }
   ?>

  function LoadnScroll(){
    $.get( "GetData", {function:"GetConsoleData"},function(data) {
      $("#Main #Console").html(data);
    });
    if($("#ScrollLock").prop('checked')){
      var element = document.getElementById("Console");
      if(element){
        element.scrollTop = element.scrollHeight;
      };
    }
  };
</script>
