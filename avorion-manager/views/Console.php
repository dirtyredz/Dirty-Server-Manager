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
    #SendMail{
      width: 800px;
      background: #131313;
      padding: 20px;
    }
    #SendMail div{
      display: flex;
    }
    #SendMail label{
      width: 50px;
      padding-right: 10px;
    }
    #SendMail .MailInput{
      margin: 0 5px;
      background: #202020;
      border: none;
      color: white;
    }
    #SendMail .Title{
      flex-grow: 1;
    }
    #SendMail select{
      flex: 1;
      flex-grow: 1;
    }
    #SendMail .Subject{
      flex-grow: 1;
    }
    #SendMail textarea{
      flex: 1;
      flex-grow: 1;
      height: 200px;
      resize: none;
    }
    #SendMail .Resource{
      flex: 1;
    }
    #SendMail .ResourceGroup{
      width: 300px;
    }
    #SendMail .ResourceGroup label{
      width: auto;
      padding-right: 0;
    }
    #SendMail .Credits{
      width: 13px;
      height: 16px;
      background-position: 0px 0px;
    }
    #SendMail .Iron{
      width: 13px;
      height: 16px;
      background-position: -16px 0px;
    }
    #SendMail .Titanium{
      width: 13px;
      height: 16px;
      background-position: -48px 0px;
    }
    #SendMail .Naonite{
      width: 13px;
      height: 16px;
      background-position: -32px 0px;
    }
    #SendMail .Trinium{
      width: 13px;
      height: 16px;
      background-position: -62px 0px;
    }
    #SendMail .Xanion{
      width: 13px;
      height: 16px;
      background-position: -80px 0px;
    }
    #SendMail .Ogonite{
      width: 13px;
      height: 16px;
      background-position: -95px 0px;
    }
    #SendMail .Avorion{
      width: 13px;
      height: 16px;
      background-position: -112px 0px;
    }
    #SendMail .ResourceSection{
      display: block;
      flex: 1;
      flex-grow: 1;
    }
    #SendMail .ButtonSection{
      flex: 1;
      flex-grow: 1;
    }
    #SendMail .ButtonSection input{
      width: 100%;
      background-color: #315683;
      margin: 10px;
      border-radius: 4px;
      cursor: pointer;
      -webkit-appearance: none;
      border: none;
      font-size: 150%;
      font-weight: bold;
      font-family: inherit;
      color: inherit;
      transition: background-color 500ms;
    }
    #SendMail .ButtonSection input:hover{
      transform: rotate(1deg);
    }
</style>
<script type="text/javascript">
$(document).ready(function() {
  $(".js-example-basic-single").select2();
});
</script>
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
</br>
</br>
</br>
<form id="SendMail">
  <div>
  <label class="Standard" for="Title">To:</label>
  <input class="MailInput Title" type="text" name="Title"></input>
  <select class="js-example-basic-single" name="Name">
    <?php
    foreach ($Data['PlayerData'] as $key => $value) {
      echo '<option value="'.$value['Name'].'">'.$value['Name'].'</option>';
    }
     ?>
  </select>
</div>
</br>
<div>
  <label class="Standard" for="Subject">Subject:</label>
  <input class="MailInput Subject" type="text" name="Subject"></input>
  </div>
</br>
<div>
  <textarea class="MailInput" type="text" name="Message"></textarea>
  </div>
</br>
<div>
  <div class="ResourceSection">
    <div class="ResourceGroup">
      <div class="ResourceGroup">
        <label class="Standard" for="Credits"><i class="sprite Credits" data-toggle="tooltip" title="" data-original-title=".sprite.Credits"></i></label>
        <input class="MailInput Resource" type="text" name="Credits"></input>
      </div>
      <div class="ResourceGroup">
        <label class="Standard" for="Iron"><i class="sprite Iron" data-toggle="tooltip" title="" data-original-title=".sprite.Iron"></i></label>
        <input class="MailInput Resource" type="text" name="Iron"></input>
      </div>
    </div>
    </br>
    <div class="ResourceGroup">
      <div class="ResourceGroup">
        <label class="Standard" for="Titanium"><i class="sprite Titanium" data-toggle="tooltip" title="" data-original-title=".sprite.Titanium"></i></label>
        <input class="MailInput Resource" type="text" name="Titanium"></input>
      </div>
      <div class="ResourceGroup">
        <label class="Standard" for="Naonite"><i class="sprite Naonite" data-toggle="tooltip" title="" data-original-title=".sprite.Naonite"></i></label>
        <input class="MailInput Resource" type="text" name="Naonite"></input>
      </div>
    </div>
    </br>
    <div class="ResourceGroup">
      <div class="ResourceGroup">
        <label class="Standard" for="Trinium"><i class="sprite Trinium" data-toggle="tooltip" title="" data-original-title=".sprite.Trinium"></i></label>
        <input class="MailInput Resource" type="text" name="Trinium"></input>
      </div>
      <div class="ResourceGroup">
        <label class="Standard" for="Xanion"><i class="sprite Xanion" data-toggle="tooltip" title="" data-original-title=".sprite.Xanion"></i></label>
        <input class="MailInput Resource" type="text" name="Xanion"></input>
      </div>
    </div>
    </br>
    <div class="ResourceGroup">
      <div class="ResourceGroup">
        <label class="Standard" for="Ogonite"><i class="sprite Ogonite" data-toggle="tooltip" title="" data-original-title=".sprite.Ogonite"></i></label>
        <input class="MailInput Resource" type="text" name="Ogonite"></input>
      </div>
      <div class="ResourceGroup">
        <label class="Standard" for="Avorion"><i class="sprite Avorion" data-toggle="tooltip" title="" data-original-title=".sprite.Avorion"></i></label>
        <input class="MailInput Resource" type="text" name="Avorion"></input>
      </div>
    </div>
  </div>
  <div class="ButtonSection">
    <input type="submit" name="submit" value="Submit" />
  </div>
</div>
</form>
</br>
</br>
</br>
</br>

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

  <?php
      if($Data['SendMail']) {
          ?>
          if($('select[name="Name"]').val() != ""){
            $("#SendMail").submit(function(event){
              event.preventDefault();
              $.ajax({
                'url': 'GetData',
                'type': 'POST',
                'dataType': 'json',
                'data': {
                  'function':'SendMail',
                  'Title': $('input[name="Title"]').val(),
                  'Name': $('select[name="Name"]').val(),
                  'Subject': $('input[name="Subject"]').val(),
                  'Message': $('textarea[name="Message"]').val(),
                  'Credits': $('input[name="Credits"]').val(),
                  'Iron': $('input[name="Iron"]').val(),
                  'Titanium': $('input[name="Titanium"]').val(),
                  'Naonite': $('input[name="Naonite"]').val(),
                  'Trinium': $('input[name="Trinium"]').val(),
                  'Xanion': $('input[name="Xanion"]').val(),
                  'Ogonite': $('input[name="Ogonite"]').val(),
                  'Avorion': $('input[name="Avorion"]').val(),
                },
                'success': function(data) {
                  console.log(data);
                  if(data['success']) {
                    console.log('Success');
                    AddNotification(data['message']);
                  } else {
                    AddNotification(data['message']);
                  }
                }
              });
            });
          }else{
            console.log('Missing Name');
          }
          <?php
      }
   ?>

</script>
