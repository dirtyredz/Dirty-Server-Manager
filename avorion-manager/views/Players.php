 <style type="text/css">
  tbody{
    background-color: #315683;
    font-size: 25px;
  }
  th{
    font-size: 30px;
    padding: 10px;
    text-align: left;
    cursor: pointer;
    background-color: #0e0e0e;
  }
  th:hover{
    background-color: grey!important;
  }
  th[aria-sort="none"]{
    background-color: inherit;
  }
  tr.even{
    background-color: #0e0e0e;
  }
  td{
    padding-left: 5px;
  }
  #SearchFaction{
    border-radius: 7px;
    width: 500px;
    background-color: #315683;
    border: black solid 1px;
    height: 25px;
    appearance: none;
    box-shadow: none;
    outline: none;
    font-size: 18px;
    padding: 5px;
    -webkit-appearance: none;
    color: #e0e0e0;
  }
  label{
    padding: 5px;
    font-size: 25px;
  }
  .error{
    color: red;
  }
</style>
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-players"></use></svg>PLAYERS</span><span class="Time"></span></div>
<br/>
<label for="Search">Search Factions</label>
<br/>
<input id="SearchFaction" type="text">
<br/>
<br/>
<?php
if($Data['AccessGranted']) {?>
<select id="FileNames">
  <?php
  foreach ($Data['DataList'] as $key => $value) {
    if($value['Selected']){
      echo '<option value="'.$value['FileName'].'" selected>'.$value['FileName'].'</option>';
    }else{
      echo '<option value="'.$value['FileName'].'">'.$value['FileName'].'</option>';
    }
  }
   ?>
</select>
<?php
}?>
<br/>
<br/>
<span class="error">* Warning due to a bug introduced into 12.4 of avorion, the Last-Seen might not update properly.</span>
<br/>
<br/>
Click Column Head to sort.
<br/>
<table id="PlayersTable">
  <thead>
  <tr>
    <th>Name</th>
    <th>PlayTime</th>
    <th>LastSeen</th>
    <th>Group</th>
    <th>Alliance</th>
    <th>Net Worth</th>
    <th>Mail Count</th>
    <?php
        if($Data['AccessGranted']) {
            ?>
            <th>ID</th>
            <th>Money</th>
            <th>Iron</th>
            <th>Titanium</th>
            <th>Naonite</th>
            <th>Trinium</th>
            <th>Xanion</th>
            <th>Ogonite</th>
            <th>Avorion</th>
            <th>MailMoney</th>
            <th>MailIron</th>
            <th>MailTitanium</th>
            <th>MailNaonite</th>
            <th>MailTrinium</th>
            <th>MailXanion</th>
            <th>MailOgonite</th>
            <th>MailAvorion</th>
            <th>SteamID</th>
            <?php
        }
     ?>
  </tr>
  </thead>
  <tbody>
  <?php
    $Even = false;
    foreach ($Data['PlayerData'] as $key => $value) {
      echo '<tr>';

      echo '<td>'.$value['Name'].'</td>';
      $Seconds = base_convert(implode('',array_reverse(str_split($value['PlayTime'],2))),16,10);
      $hours = floor($Seconds / 3600);
      $mins = floor($Seconds / 60 % 60);
      $secs = floor($Seconds % 60);
      echo '<td>'.$hours.':'.$mins.':'.$secs.'</td>';
      echo '<td>'.$value['LastSeen'].'</td>';
      echo '<td>'.$value['Group'].'</td>';
      $AllianceID = base_convert(implode('',array_reverse(str_split($value['Alliance'],2))),16,10);
      $HasAllianceName = false;
      if($AllianceID != 0){
        foreach ($Data['AllianceData'] as $AllianceKey => $AllianceArray) {
          if($AllianceArray['ID'] == $AllianceID){
            echo '<td>'.$AllianceArray['Name'].'</td>';
            $HasAllianceName = true;
            break;
          }
        }
        if(!$HasAllianceName){
          echo '<td style="color: rgba(255,255,255,0.3);">-'.$AllianceID.'-</td>';
        }
      }else{
        echo '<td></td>';
      }


      $Money = base_convert(implode('',array_reverse(str_split($value['Money'],2))),16,10);
      $Iron = base_convert(implode('',array_reverse(str_split($value['Iron'],2))),16,10);
      $Titanium = base_convert(implode('',array_reverse(str_split($value['Titanium'],2))),16,10);
      $Naonite = base_convert(implode('',array_reverse(str_split($value['Naonite'],2))),16,10);
      $Trinium = base_convert(implode('',array_reverse(str_split($value['Trinium'],2))),16,10);
      $Xanion = base_convert(implode('',array_reverse(str_split($value['Xanion'],2))),16,10);
      $Ogonite = base_convert(implode('',array_reverse(str_split($value['Ogonite'],2))),16,10);
      $Avorion = base_convert(implode('',array_reverse(str_split($value['Avorion'],2))),16,10);
      $NetWorth = $Money + ($Iron * 0.740741) + ($Titanium * 1) + ($Naonite * 1.35) + ($Trinium * 1.8225) + ($Xanion * 2.46038) + ($Ogonite * 3.32151) + ($Avorion * 4.48903);
      $MailMoney=0;
      foreach ($value['MailMoney'] as $key2 => $value2) {
        $MailMoney+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailIron=0;
      foreach ($value['MailIron'] as $key2 => $value2) {
        $MailIron+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailTitanium=0;
      foreach ($value['MailTitanium'] as $key2 => $value2) {
        $MailTitanium+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailNaonite=0;
      foreach ($value['MailNaonite'] as $key2 => $value2) {
        $MailNaonite+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailTrinium=0;
      foreach ($value['MailTrinium'] as $key2 => $value2) {
        $MailTrinium+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailXanion=0;
      foreach ($value['MailXanion'] as $key2 => $value2) {
        $MailXanion+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailOgonite=0;
      foreach ($value['MailOgonite'] as $key2 => $value2) {
        $MailOgonite+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailAvorion=0;
      foreach ($value['MailAvorion'] as $key2 => $value2) {
        $MailAvorion+=base_convert(implode('',array_reverse(str_split($value2,2))),16,10);
      }
      $MailNetWorth = $MailMoney + ($MailIron * 0.740741) + ($MailTitanium * 1) + ($MailNaonite * 1.35) + ($MailTrinium * 1.8225) + ($MailXanion * 2.46038) + ($MailOgonite * 3.32151) + ($MailAvorion * 4.48903);
      echo '<td>'.(floor($NetWorth)+floor($MailNetWorth)).'</td>';
      echo '<td>'.$value['MailCount'].'</td>';
      if($Data['AccessGranted']) {
        echo '<td>'.$value['ID'].'</td>';
        echo '<td>'.$Money.'</td>';
        echo '<td>'.$Iron.'</td>';
        echo '<td>'.$Titanium.'</td>';
        echo '<td>'.$Naonite.'</td>';
        echo '<td>'.$Trinium.'</td>';
        echo '<td>'.$Xanion.'</td>';
        echo '<td>'.$Ogonite.'</td>';
        echo '<td>'.$Avorion.'</td>';
        echo '<td>'.$MailMoney.'</td>';
        echo '<td>'.$MailIron.'</td>';
        echo '<td>'.$MailTitanium.'</td>';
        echo '<td>'.$MailNaonite.'</td>';
        echo '<td>'.$MailTrinium.'</td>';
        echo '<td>'.$MailXanion.'</td>';
        echo '<td>'.$MailOgonite.'</td>';
        echo '<td>'.$MailAvorion.'</td>';
        $SteamID = base_convert(implode('',array_reverse(str_split($value['SteamID'],2))),16,10);
        echo '<td>'.'<a target="_blank" href="http://steamcommunity.com/profiles/'.$SteamID.'/">'.$SteamID.'</a></td>';
      }
      echo '</tr>';
    }
  ?>
  </tbody>
</table>
<script type="text/javascript">
  $('#FileNames').change(function () {
      Load("Players",$('#FileNames :selected').text());
  });
  $('#SearchFaction').on('input',function(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("SearchFaction");
    filter = input.value.toUpperCase();
    table = document.getElementById("PlayersTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
      $("#PlayersTable").trigger("update")
  });
  $("#PlayersTable").tablesorter({
    widgets: ['zebra']
  });
</script>
