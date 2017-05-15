<?php $IPAddress = exec("hostname -I | awk '{print $1}'"); ?>
<style type="text/css">
    form#AddUser{
      width: 300px;
      background-color: #3b3b3b;
      padding: 10px;
    }
    form#AddUser div{
      width: 100%;
      font-size: 200%;
      font-weight: bold;
      text-align: center;
    }
    form#Login{
      width: 300px;
    }
    label.Standard{
      font-size: 150%;
      font-weight: bold;
      color: #e0e0e0;
    }
    input[type="password"],
    input[type="text"] {
      display: block;
      background-color: #7c7c7c;
      margin: 0;
      width: calc(100% - 20px);
      font-family: sans-serif;
      font-size: 18px;
      appearance: none;
      box-shadow: none;
      border-radius: none;
      padding: 10px;
      border: solid 1px #7c7c7c;
      transition: box-shadow 0.3s, border 0.3s;
    }
    label.Error{
      color: #bf2323;
      visibility: hidden;
    }
    input.Error {
      border: solid 1px #9a0000;
    }
    input[type="password"]:focus,
    input[type="text"]:focus {
      outline: none;
      border: solid 1px #315683;
      box-shadow: 0 0 5px 4px #315683;
    }
    input[type="submit"]{
      background-color: #315683;
      width: calc(100% - 20px);
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
    input[type="submit"]:hover{
      transform: rotate(1deg);
    }
    input[type="checkbox"]{
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
    input[type="checkbox"]:active, input[type="checkbox"]:checked:active {
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
    }

    input[type="checkbox"]:checked {
      background-color: #e9ecee;
      border: 1px solid #adb8c0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
      color: #99a1a7;
    }

    input[type="checkbox"]:checked:after {
      content: '\2714';
      font-size: 20px;
      position: absolute;
      top: -4px;
      left: 2px;
      color: black;
    }
    div.OptionsWrapper{
      display: flex;
      padding-left: 20px;
    }
    div.OptionsWrapper span{
      padding: 5px;
    }
</style>

<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-enter"></use></svg>SIGN IN</span><span class="Time"></span></div>
<br/>
<br/>
<div id="ConsoleWrapper">
  <form id="Login" name="login" action="" method="post">
    <label class="Standard" for="username">Username:</label>
    <input class="Glow" type="text" name="username"></input>
    <br/>
    <label class="Standard" for="username">Password:</label>
    <input class="Glow" type="password" name="password"></input>
    <br/>
    <div class="OptionsWrapper">
    <input name="forever" type="checkbox"><span>Keep me signed in forever!</span>
    </div>
    <br/>
    <label class="Error" for="submit">Invalid Login!</label>
    <input type="submit" name="submit" value="Submit" />
  </form>
</div>
<script type="text/javascript">
  var ipaddress = "http://<?php echo $Data['IPAddress']; ?>:8080"

  $('input[name="username"]').focus();

  $("#Login").submit(function(event){
    event.preventDefault();
    var Data;
    if($('input[name="forever"]').is(":checked")){
      Data = {
        'username': $('input[name="username"]').val(),
        'password': $('input[name="password"]').val(),
        'forever': 'true'
      }
    }else{
      Data = {
        'username': $('input[name="username"]').val(),
        'password': $('input[name="password"]').val()
      }
    }

    $.ajax({
      'url': 'AccountController.php',
      'type': 'POST',
      'dataType': 'json',
      'data': Data,
      'success': function(data) {
        console.log(data);
        if(data['success']) { // Successful login
          window.location.href=ipaddress;
        } else { // Login failed, call error()
          $('.Glow').addClass("Error");
          $('label.Error').css('visibility', 'visible');
        }
      }
    });
  });
</script>
