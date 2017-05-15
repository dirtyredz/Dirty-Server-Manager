
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
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-earth"></use></svg>FACTIONS</span><span class="Time"></span></div>
<br/>
<label for="Search">Search Factions</label>
<br/>
<input id="SearchFaction" type="text">
<br/>
<br/>
<table id="FactionsTable">
  <thead>
  <tr>
    <th>Faction</th>
    <th>Stations</th>
    <th>Asteroids</th>
    <th>Wrecks</th>
    <th>Craft</th>
    <th>Influence</th>
  </tr>
  </thead>
  <tbody>
  <?php
    $Faction = array();
    foreach ($Data['SectorData'] as $key => $value) {
      if(isset($value['FactionName'])){
        $Crafts = $Wrecks = $Asteroids = $Stations = $Influence = 0;
        if(array_key_exists($value['FactionIndex'],$Faction)){
          $Crafts = $Faction[$value['FactionIndex']]['Crafts'];
          $Wrecks = $Faction[$value['FactionIndex']]['Wrecks'];
          $Asteroids = $Faction[$value['FactionIndex']]['Asteroids'];
          $Stations = $Faction[$value['FactionIndex']]['Stations'];
          $Influence = $Faction[$value['FactionIndex']]['Influence'];
        }

        $Faction[$value['FactionIndex']] = array('Crafts'=>'','Wrecks'=>'','Asteroids'=>'','Stations'=>'','Influence'=>'','FactionName'=>'');
        $Faction[$value['FactionIndex']]['Crafts'] = ($Crafts + intval($value['Crafts']));
        $Faction[$value['FactionIndex']]['Wrecks'] += ($Wrecks + intval($value['Wrecks']));
        $Faction[$value['FactionIndex']]['Asteroids'] += ($Asteroids + intval($value['Asteroids']));
        $Faction[$value['FactionIndex']]['Stations'] += ($Stations + intval($value['Stations']));
        $Faction[$value['FactionIndex']]['Influence'] += ($Influence + intval($value['Influence']));
        $Faction[$value['FactionIndex']]['FactionName'] = $value['FactionName'];
      }
    }
    $Even = false;
    foreach ($Faction as $key => $value) {
      if($Even){
        echo '<tr class="Even">';
        $Even = false;
      }else{
        echo '<tr>';
        $Even = true;
      }
      echo '<td>'.$value['FactionName'].'</td>';
      echo '<td>'.$value['Stations'].'</td>';
      echo '<td>'.$value['Asteroids'].'</td>';
      echo '<td>'.$value['Wrecks'].'</td>';
      echo '<td>'.$value['Crafts'].'</td>';
      echo '<td>'.$value['Influence'].'</td>';
      echo '</tr>';
    }
  ?>
</tbody>
</table>
<script type="text/javascript">
console.clear();
  $('#SearchFaction').on('input',function(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("SearchFaction");
    filter = input.value.toUpperCase();
    table = document.getElementById("FactionsTable");
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
    $("#FactionsTable").trigger("update")
});
$("#FactionsTable").tablesorter({
  widgets: ['zebra']
});

</script>
