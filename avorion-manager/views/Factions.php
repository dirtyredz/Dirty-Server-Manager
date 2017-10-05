
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
    <th>ID</th>
    <th>Stations</th>
    <th>Asteroids</th>
    <th>Wrecks</th>
    <th>Craft</th>
    <th>Influence</th>
  </tr>
  </thead>
  <tbody>
  <?php
    //THIS WHOLE SECTION OF PHP SHOULD BE DONE IN THE CONTROLLER
    /** @var array $Faction The array of sector data to display */
    $Faction = array();
    //Parse through the Galaxies sectors data
    foreach ($Data['FactionData'] as $key => $value) {
      /** @var array $value A sub array contianing all the sector data */

      //If the sector has a faction name, then there is a faction present in the sector
      if(isset($value['Name'])){
        //Default to 0
        $Crafts = $Wrecks = $Asteroids = $Stations = $Influence = 0;
        //If weve a;ready visited this Faction in the parsing grab the values so we can math them
        if(array_key_exists($value['ID'],$Faction)){
          $Crafts = $Faction[$value['ID']]['Crafts'];
          $Wrecks = $Faction[$value['ID']]['Wrecks'];
          $Asteroids = $Faction[$value['ID']]['Asteroids'];
          $Stations = $Faction[$value['ID']]['Stations'];
          $Influence = $Faction[$value['ID']]['Influence'];
        }
        //Reset this factions array to empty values
        $Faction[$value['ID']] = array('Crafts'=>'','Wrecks'=>'','Asteroids'=>'','Stations'=>'','Influence'=>'','Name'=>'');
        //Perform math and reassign value to faction array
        $Faction[$value['ID']]['Crafts'] = ($Crafts + intval($value['Crafts']));
        $Faction[$value['ID']]['Wrecks'] += ($Wrecks + intval($value['Wrecks']));
        $Faction[$value['ID']]['Asteroids'] += ($Asteroids + intval($value['Asteroids']));
        $Faction[$value['ID']]['Stations'] += ($Stations + intval($value['Stations']));
        $Faction[$value['ID']]['Influence'] += ($Influence + intval($value['Influence']));
        $Faction[$value['ID']]['Name'] = $value['Name'];
      }
    }
    //Display the data in a table format
    foreach ($Faction as $key => $value) {
      echo '<tr>';
      echo '<td>'.$value['Name'].'</td>';
      echo '<td>'.$key.'</td>';
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
