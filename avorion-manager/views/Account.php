<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.css" rel="stylesheet">
<style type="text/css">
    #PasswordManagment{
      text-align: center;
      width: 300px;
      background-color: #3b3b3b;
      padding: 10px;
      margin: 0 20px;
    }
    #PasswordManagment form{
      width: 100%;
    }
    label.Standard{
      font-size: 150%;
      font-weight: bold;
      color: #e0e0e0;
    }
    input[type="password"]{
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
    }
    input.Error {
      border: solid 1px #9a0000;
    }
    input[type="password"]:focus {
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
    div#PasswordManagment{
      display: flex;
    }
</style>
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-user"></use></svg>ACCOUNT</span><span class="Time"></span></div>
<br/>
<div id="PasswordManagment">
    <form id="ChangePassword" name="ChangePassword" action="" method="post">
      <div>Change Password</div>
      <br/>
      <label class="Standard" for="OldPass">Old Password:</label>
      <input class="Glow" type="password" name="OldPass"></input>
      <br/>
      <label class="Standard" for="NewPass">New Password:</label>
      <input class="Glow" type="password" name="NewPass"></input>
      <br/>
      <label class="Error" for="submit"></label>
      <input type="submit" name="submit" value="Submit" />
    </form>
</div>
<br/>
<div id="PasswordManagment">
    <div>Sign out of all devices.</div>
    <br/>
    <input id="SignOutAll" type="submit" name="submit" value="Sign Out All" />
</div>
<script type="text/javascript">

$("#SignOutAll").click(function() {
  $.get("Account", {'function':'LogOut','AllLocations': true}, function(data) {
    window.location.reload();
  });
});

$("#ChangePassword").submit(function(event){
  event.preventDefault();

  swal({
    title: 'Are you sure?',
    text: "Do you wish to continue with changing your password?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then(function () {
    $.ajax({
      'url': 'Account',
      'type': 'POST',
      'dataType': 'json',
      'data': {
        'OldPass': $('input[name="OldPass"]').val(),
        'NewPass': $('input[name="NewPass"]').val()
      },
      'success': function(data) {
        console.log(data);
        if(data['success']) { // Successful login
          swal(
            'Success!',
            'Your password has been changed.',
            'success'
          );
          console.log('Success');
          $('.Glow').removeClass("Error");
          $('label[for="submit"]').removeClass("Error").html(data['message']);
          AddNotification(data['message']);
        } else { // Login failed, call error()
          $('.Glow').addClass("Error");
          $('label[for="submit"]').addClass('Error').html(data['message']);
          AddNotification(data['message']);
        }
        $('input[name="OldPass"]').val('');
        $('input[name="NewPass"]').val('');
        $('input[name="OldPass"]').focus();
      }
    });
  }).catch(swal.noop);
});

</script>
