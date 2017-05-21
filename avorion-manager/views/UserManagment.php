<style type="text/css">

    form{
      width: 300px;
      background-color: #3b3b3b;
      padding: 10px;
      margin: 10px 20px;
    }

    div#ListUser div,
    form div{
      width: 100%;
      font-size: 200%;
      font-weight: bold;
      text-align: center;
    }
    div#ListUser{
      text-align: center;
      width: 700px;
      background-color: #3b3b3b;
      padding: 10px;
      margin: 10px 20px;
    }
    div#ListUser ul{
      text-align: left;
      list-style: none;
      margin: 0px;
    }
    div#ListUser li{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    div#ListUser li span{
      padding-right: 20px;
    }
    form#Login{
      width: 300px;
      min-width: 300px;
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
    button[name="ChangeRole"],
    button[name="ResetPass"],
    button[name="DeleteUser"],
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
    .InlineRole{
      width: 45px;
      font-size: 20px;
      margin-left: auto;
    }
    button[name="ChangeRole"]{
      width: 145px;
    }
    button[name="ResetPass"]{
      width: 175px;
    }
    button[name="DeleteUser"]{
      width: 75px;
    }
    button[name="ResetPass"]:hover,
    button[name="DeleteUser"]:hover,
    input[type="submit"]:hover{
      transform: rotate(1deg);
    }
    div#Mangament{
      display: flex;
      flex-wrap: wrap;
    }
    input[type="range"]{
      width: 100%;
    }
    #NewUserRoleDisplay{
      font-size: 22px;
      padding-left: 5px;
    }
</style>
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-users"></use></svg>ACCOUNT</span><span class="Time"></span></div>
<br/>
<br/>
<br/>
<div id="Mangament">
    <form id="AddUser" name="login" action="" method="post">
      <div>Add New User</div>
      <br/>
      <label class="Standard" for="NewUser">Username:</label>
      <input class="Glow" type="text" name="NewUser"></input>
      <br/>
      <label class="Standard" for="NewUserRole">Role Level:</label>
      <span id="NewUserRoleDisplay">10</span>
      <br/>
      <input class="Glow" type="range" min="1" max="99" step="1" name="NewUserRole" value="10"></input>
      <br/>
      <label class="Error" for="submit"></label>
      <input type="submit" name="submit" value="Submit" />
      <br/>
      <br/>
      User password will be defaulted to:<br/><br/>
      123456789<br/><br/>
      Notify user to change password immediately.
    </form>
    <div id="ListUser">
      <div>Users</div>
      *Admin user is not listed.<br/>
      *Current user is not listed.
      <ul>
      </ul>

    </div>
</div>
<script type="text/javascript">
  $('input[name="NewUserRole"]').on('input', function(){
    $('#NewUserRoleDisplay').html($('input[name="NewUserRole"]').val())
  });
  $('input[name="NewUser"]').focus();

  //Get Users
  $.get( "Account", {function:"ListUsers"},function(data) {
    Obj = $.parseJSON(data);
    console.log(Obj);
    //Put Users List into UL
    $.each(Obj, function(username, role) {
      console.log(username);
      $('#ListUser ul').append('<li><span>'+username+'</span>  <input class="InlineRole" type="number" min="1" max="99" step="1" name="'+username+'Role" value="'+role+'"></input> <button name="ChangeRole" value="'+username+'">Change Role</button>   <button name="DeleteUser" value="'+username+'">Delete</button>   <button name="ResetPass" value="'+username+'">Reset Password</button></li>');
    });
  });

  //Register click event with the users list buttons.
  $('#ListUser').on('click','button[name="DeleteUser"]',function(){
    $.post("Account", {DeleteUser:$(this).val()}, function(data) {
        console.log(data);
        $('button[value='+data['username']+']').parent().remove();
        AddNotification(data['message']);
    },'json');
  });

  //Register click event with the users list buttons.
  $('#ListUser').on('click','button[name="ChangeRole"]',function(){
    $.post("Account", {ChangeRole:$(this).val(),Role:$('input[name="'+$(this).val()+'Role"]').val()}, function(data) {
        AddNotification(data['message']);
    },'json');
  });

  //Register click event with the users list buttons.
  $('#ListUser').on('click','button[name="ResetPass"]',function(){
    $.post("Account", {ResetPass:$(this).val()}, function(data) {
        AddNotification(data['message']);
    },'json');
  });


  $("#AddUser").submit(function(event){
    event.preventDefault();
    $.ajax({
      'url': 'Account',
      'type': 'POST',
      'dataType': 'json',
      'data': {
        'NewUser': $('input[name="NewUser"]').val(),
        'NewUserRole': $('input[name="NewUserRole"]').val()
      },
      'success': function(data) {
        console.log('Added User');
        console.log(data);
        if(data['success']) {
          $('#ListUser ul').append('<li><span>'+data['username']+'</span>  <input class="InlineRole" type="number" min="1" max="99" step="1" name="'+data['username']+'Role" value="'+data['role']+'"></input> <button name="ChangeRole" value="'+data['username']+'">Change Role</button>   <button name="DeleteUser" value="'+data['username']+'">Delete</button>   <button name="ResetPass" value="'+data['username']+'">Reset Password</button></li>');
          $('input[name="NewUser"]').val('');
          AddNotification(data['message']);
        } else {
          $('.Glow').addClass("Error");
          $('label.Error').css('visibility', 'visible');
          $('label.Error[for="submit"]').html(data['message']);
        }
      }
    });
  });
</script>
