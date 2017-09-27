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

</style>
<div id="Top"><span class="Title"><svg class="icon icon-Flag"><use xlink:href="#icon-Flag"></use></svg>ALLIANCES</span><span class="Time"></span></div>
<br/>
<label for="Search">Search Alliances</label>
<br/>
<input id="SearchFaction" type="text">
<br/>
<br/>
Click Column Head to sort.
<br/>
<table id="AlliancesTable">
  <thead>
  <tr>
    <th>Name</th>
    <th>Leader</th>
    <th># Players</th>
    <th>Net Worth</th>
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
            <?php
        }
     ?>
  </tr>
  </thead>
  <tbody>
  <?php
    $Even = false;
    foreach ($Data['AllianceData'] as $key => $value) {
      echo '<tr>';

      echo '<td>'.$value['Name'].'</td>';
      $LeaderName = $value['LeaderName'];
      if($LeaderName == ''){
        echo '<td style="color: rgba(255,255,255,0.3);">-'.$value['Leader'].'-</td>';
      }else{
        echo '<td>'.$LeaderName.'</td>';
      }

      echo '<td>'.$value['NumPlayers'].'</td>';

      $Money = $value['Money'];
      $Iron = $value['Iron'];
      $Titanium = $value['Titanium'];
      $Naonite = $value['Naonite'];
      $Trinium = $value['Trinium'];
      $Xanion = $value['Xanion'];
      $Ogonite = $value['Ogonite'];
      $Avorion = $value['Avorion'];
      $NetWorth = $Money + ($Iron * 0.740741) + ($Titanium * 1) + ($Naonite * 1.35) + ($Trinium * 1.8225) + ($Xanion * 2.46038) + ($Ogonite * 3.32151) + ($Avorion * 4.48903);
      echo '<td>'.floor($NetWorth).'</td>';
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
      }
      echo '</tr>';
    }
  ?>
  </tbody>
</table>
<script type="text/javascript">
  $('#SearchFaction').on('input',function(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("SearchFaction");
    filter = input.value.toUpperCase();
    table = document.getElementById("AlliancesTable");
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
      $("#AlliancesTable").trigger("update")
  });
  $("#AlliancesTable").tablesorter({
    widgets: ['zebra']
  });
</script>
