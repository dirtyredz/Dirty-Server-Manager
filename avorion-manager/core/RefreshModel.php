<?php
/**
 * [RefreshModel description]
 */
class RefreshModel extends CommonController
{
  /** @var array arraye of time 5 minute intervals from now to past */
  public $TimeArray = array();
  /** @var integer Range of graphs to grep for */
  public $Range = 12;

  /**
   * Settup for timezone and Range value for graphs
   * @method __construct
   * @param  mixed $Range string/int/null
   * @return void
   */
  function __construct($Range = null)
  {
    parent::__construct();
    /** @var string $Timezone Timezone of the server per server configs */
    $Timezone = `timedatectl status | grep "Time zone"`;
    //Set phps timezone to match servers
    date_default_timezone_set(trim(preg_replace('/Time zone: | \(.*/','',$Timezone)));

    //Settup Range Value
    //Were working with an html slider here so we convert 1-13 to how mnay 5 minute marks were grabbing
    if(isset($Range)){
      if($Range == 1){
        $this->Range = $Range * 12;
      }
      switch ($Range) {
        case 1:
            $this->Range = 12;// 1 hour
            break;
        case 2:
            $this->Range = 72;// 6 hours
            break;
        case 3:
            $this->Range = 144;// 12 hours
            break;
        case 4:
            $this->Range = 288;// 24 hours
            break;
        case 5:
            $this->Range = 576;// 2 days
            break;
        case 6:
            $this->Range = 864;// 3 days
            break;
        case 7:
            $this->Range = 1152;// 4 days
            break;
        case 8:
            $this->Range = 1440;// 5 days
            break;
        case 9:
            $this->Range = 1728;// 6 days
            break;
        case 10:
            $this->Range = 2016;// 7 days
            break;
        case 11:
            $this->Range = 2304;// 8 days
            break;
        case 12:
            $this->Range = 2592;// 9 days
            break;
        case 13:
            $this->Range = 2880;// 10 days
            break;
      }
      //Settup and store the time array
      $this->TimeArray = $this->BuildTimeArray();
    }

  }

  /**
   * Builds an array of time, every 5 minutes from now to the nearest 5 minute mark in the past.
   * ie current time = 12:37, Array will start at 12:35
   * array will then build backwards to the Range value supplied to the class
   * @method BuildTimeArray
   * @return array
   */
  private function BuildTimeArray()
  {
    //Obviously we have to start with now
    $current_time = time();
    //I must have removed some code at some point.
    $time = $current_time;
    //Get the nearest 5min mark in the past
    $time -= $time % (60 * 5);
    //initialize array with the first 5 min mark
    $NewArray = array(date("Y-m-d", $time)."T".date("H:i:s", $time));
    //Working backwards in time to the Range value
    for ($x = 1; $x <= $this->Range - 1; $x++) {
      //Minus 5 Minuts
      $time -= (5 * 60);
      //Add to array
      array_push($NewArray, date("Y-m-d", $time)."T".date("H:i:s", $time));
    }
    //Reverse so that array works from Past to Present
    $NewArray = array_reverse($NewArray);
    return $NewArray;
  }

  /**
   * Will parse  through the provided data arrays and correct any inconsistancies in that data.
   * this will give the graphs consistent data and time marks for every 5 minutes
   * @method RunThoughTimeArray
   * @param  array $Time  Array of time marks assosiated with the data
   * @param  array $Data1 Data associated with the time marks
   * @param  array $Data2 optional additional Data
   * @param  array $Data3 optional additional Data
   * @return void
   */
  private function RunThoughTimeArray($Time,$Data1,$Data2 = null,$Data3 = null)
  {
    //Runs through the array of Time marks
    foreach ($Time as $key => $value) {
      //if a time mark matchs up with the $TimeArray
      //do nothing as we want to keep and display the data provided for that time
      $Exsist = array_search($value, $this->TimeArray);
      //Remove any Data that doesnt match up with a mark in the $TimeArray
      if($Exsist === FALSE){
        //Remove the data from the data array since its either outside the range were grabbing
        //or additional data logged that wont match with the $timeArray
        unset($Data1[$key]);
        if(isset($Data2)){
          unset($Data2[$key]);
        }
        if(isset($Data2)){
          unset($Data3[$key]);
        }
        unset($Time[$key]);
      }
    }

    //Add any missing timestamps withen the $Range and set to 0
    foreach ($this->TimeArray as $key => $value) {
      //again if it exsists were good, we want to keep this data
      $Exsist = array_search($value, $Time);
      //if it doesnt exsist then we need to generate false data to fill in the blanks
      //this will keep the graphs consistent with each other and depict offline status of the server
      if($Exsist === FALSE){
        //Insert fake data, to match up with $Timearray
        array_splice( $Time, $key, 0, $value );
        array_splice( $Data1, $key, 0, 0);
        if(isset($Data2)){
          array_splice( $Data2, $key, 0, 0);
        }
        if(isset($Data2)){
          array_splice( $Data3, $key, 0, 0);
        }
      }
    }
    return array($Time, $Data1, $Data2, $Data3);
  }

  /**
   * Pulls Players Online from Status.logs and builds graphing data into an array
   * @method GetPlayersOnlineGraph
   * @return array Plotly Graph Data
   */
  public function GetPlayersOnlineGraph()
  {
    //If no status.log file exsists return an empty array
    if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
      return array();
    }
    //Pulls the Time from each /status command logged into status.Log
    $Time = `grep -h "Players Online" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $Data = `grep -h "Players Online" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*: //g' -e 's/\/.*//g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each 5 minute /status command ran withen Range of the Timestamp */
    $Time = explode(',',$Time);
    /** @var array $Data array of each 5 minute /status command ran withen Range of Players Online */
    $Data = explode(',',$Data);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($Time);
    array_pop($Data);

    //Fix array inconsistancys with the $Timearray
    list ($Time, $Data) = $this->RunThoughTimeArray($Time, $Data);

    //Build Plotly data and return
    $PlotlyData = [[
      'x' => $Time,
      'y' => $Data,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(168, 216, 234, 0.5)'
    ]];
    return $PlotlyData;
  }

  /**
   * Pulls the last (5 minute check) Server load
   * @method GetCurrentServerLoad
   * @return array Plotly Graph Data
   */
  public function GetCurrentServerLoad()
  {
    //function does NOT support if the server is offline or stalled
    //Can easily check for that.....
    //If no status.log file exsists return an empty array
    if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
      return array();
    }
    //Get todays status log
    $Date = date('d-m-Y');
    //Grab the last loged message
    $Data = `grep -h "avg. server load" {$this->Config['LogsDir']}/{$Date}_status.log | tail -n 1 |  sed -e 's/.*://g' | tr '%' ' ' |  tr -d '[:blank:]'`;
    return $Data;
  }

  /**
   * Pulls Server Load from Status.logs and builds graphing data into an array
   * @method GetServerLoadGraph
   * @return array Plotly Graph Data
   */
  public function GetServerLoadGraph()
  {
    //If no status.log file exsists return an empty array
    if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
      return array();
    }

    $Time = `grep -h "avg. server load" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $Data = `grep -h "avg. server load" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' | tr '%' ' ' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each 5 minute /status command ran withen Range of the Timestamp */
    $Time = explode(',',$Time);
    /** @var array $Data array of each 5 minute /status command ran withen Range of Server Load */
    $Data = explode(',',$Data);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($Time);
    array_pop($Data);
    //Fix array inconsistancys with the $Timearray
    list ($Time, $Data) = $this->RunThoughTimeArray($Time, $Data);
    //Build Plotly data and return
    $PlotlyData = [[
      'x' => $Time,
      'y' => $Data,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'text' => '%',
      'hoverinfo'=>'x+y+text',
      'fillcolor' => 'rgba(168, 216, 234, 0.5)'
    ]];
    return $PlotlyData;
  }

  /**
   * Pulls Server Updates from Status.logs and builds graphing data into an array
   * @method GetServerUpdateGraph
   * @return array Plotly Graph Data
   */
  public function GetServerUpdateGraph()
  {
    //If no status.log file exsists return an empty array
    if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
      return array();
    }

    $Time = `grep -h "avg. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $Avg = `grep -h "avg. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' -e 's/ms//g' | tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    $Max = `grep -h "max. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' -e 's/ms//g' | tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    $Min = `grep -h "min. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' -e 's/ms//g' | tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each 5 minute /status command ran withen Range of the Timestamp */
    $Time = explode(',',$Time);
    /** @var array $Avg array of each 5 minute /status command ran withen Range of Avg Updates */
    $Avg = explode(',',$Avg);
    /** @var array $Max array of each 5 minute /status command ran withen Range of Max Updates */
    $Max = explode(',',$Max);
    /** @var array $Min array of each 5 minute /status command ran withen Range of Min Updates */
    $Min = explode(',',$Min);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($Time);
    array_pop($Avg);
    array_pop($Max);
    array_pop($Min);
    //Fix array inconsistancys with the $Timearray
    list ($Time, $Avg, $Max, $Min) = $this->RunThoughTimeArray($Time, $Avg, $Max, $Min);
    //Build Plotly data and return
    $AvgUpdate = [
      'x' => $Time,
      'y' => $Avg,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(0, 0, 255, 0.5)',
      'name' => 'Avg'
    ];
    $MaxUpdate = [
      'x' => $Time,
      'y' => $Max,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(0, 255, 0, 0.5)',
      'name' => 'Max'
    ];
    $MinUpdate = [
      'x' => $Time,
      'y' => $Min,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(255, 0, 0, 0.5)',
      'name' => 'Min'
    ];

    $PlotlyData = array($MaxUpdate,$AvgUpdate,$MinUpdate);
    return $PlotlyData;
  }

  /**
   * Pulls Server Memory from Status.logs and builds graphing data into an array
   * @method GetServerMemoryGraph
   * @return array Plotly Graph Data
   */
  public function GetServerMemoryGraph()
  {
    //If no status.log file exsists return an empty array
    if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
      return array();
    }

    $Time = `grep -h "Players Online" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $Players = `grep -h "players in memory" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*|//g' -e 's/ players.*//g' -e 's/.* //g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    $Factions = `grep -h "factions in memory" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*|//g' -e 's/ factions.*//g' -e 's/.* //g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    $Sectors = `grep -h "sectors in memory" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*|//g' -e 's/ sectors.*//g' -e 's/.* //g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each 5 minute /status command ran withen Range of the Timestamp */
    $Time = explode(',',$Time);
    /** @var array $Players array of each 5 minute /status command ran withen Range of Players in Memory */
    $Players = explode(',',$Players);
    /** @var array $Factions array of each 5 minute /status command ran withen Range of Factions in Memory */
    $Factions = explode(',',$Factions);
    /** @var array $Sectors array of each 5 minute /status command ran withen Range of Sectors in Memory */
    $Sectors = explode(',',$Sectors);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($Time);
    array_pop($Players);
    array_pop($Factions);
    array_pop($Sectors);
    //Fix array inconsistancys with the $Timearray
    list ($Time, $Players, $Factions, $Sectors) = $this->RunThoughTimeArray($Time, $Players, $Factions, $Sectors);
    //Build Plotly data and return
    $PlayersData = [
      'x' => $Time,
      'y' => $Players,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(0, 0, 255, 0.5)',
      'name' => 'Players'
    ];
    $FactionsData = [
      'x' => $Time,
      'y' => $Factions,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(0, 255, 0, 0.5)',
      'name' => 'Factions'
    ];
    $SectorsData = [
      'x' => $Time,
      'y' => $Sectors,
      'type' => 'scatter',
      'fill' => 'tozeroy',
      'fillcolor' => 'rgba(255, 0, 0, 0.5)',
      'name' => 'Sectors'
    ];

    $PlotlyData = array($FactionsData,$PlayersData,$SectorsData);
    return $PlotlyData;
  }

  /**
   * Pulls Server CPU usage from Status.logs and builds graphing data into an array
   * @method GetCpuUsageGraph
   * @return array Plotly Graph Data
   */
  public function GetCpuUsageGraph()
  {
    //If no status.log file exsists return an empty array
    if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log') || !is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
      return array();
    }

    $SectorDataTime = `grep -h "GetSectorData" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $SectorData = `grep -h "GetSectorData" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each time GetSectorData script was performed */
    $SectorDataTime = explode(',',$SectorDataTime);
    /** @var array $SectorData array of each time GetSectorData script was performed */
    $SectorData = explode(',',$SectorData);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($SectorDataTime);
    array_pop($SectorData);


    $Time = `grep -h "CPU" $(find {$this->Config['LogsDir']}/*_status.log  -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g' ) | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $Load = `grep -h "CPU" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each 5 minute /status command ran withen Range of the Timestamp */
    $Time = explode(',',$Time);
    /** @var array $Load array of each 5 minute /status command ran withen Range of CPU Usage */
    $Load = explode(',',$Load);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($Time);
    array_pop($Load);


    $RestartTime = `grep -h "Restart" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g' ) | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
    $Restart = `grep -h "Restart" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' | awk '{print q $0 q}' ORS=','`;
    /** @var array $Time array of each time the Restart command was issued (timestamp) */
    $RestartTime = explode(',',$RestartTime);
    /** @var array $Restart array of each time the Restart command was issued (log message) */
    $Restart = explode(',',$Restart);
    //Remove the last index since awk will always add an additional , at the end
    array_pop($RestartTime);
    array_pop($Restart);

    //Fix array inconsistancys with the $Timearray
    list ($Time, $Load) = $this->RunThoughTimeArray($Time, $Load);



    //Generates ann array with values so that $RestartTime which is an array of log messages can be on the same graph as the cpu load.
    $Error = array();
    foreach ($RestartTime as $key => $value) {
      $Restart[$key] = 50;
      $Error[$key] = 50;
      //removes anything outside the range were requesting
      if(date($value) < date($this->TimeArray[0])){
        unset($Restart[$key]);
        unset($RestartTime[$key]);
      }
    }
    $Restart = array_values($Restart);
    $RestartTime = array_values($RestartTime);

    //Generates ann array with values so that $SectorData which is an array of log messages can be on the same graph as the cpu load.
    $Error2 = array();
    $Text = array();
    foreach ($SectorDataTime as $key => $value) {
      $Text[$key]=$SectorData[$key];
      $SectorData[$key] = 50;
      $Error2[$key] = 50;
      if(date($value) < date($this->TimeArray[0])){
        unset($SectorData[$key]);
        unset($SectorDataTime[$key]);
      }
    }

    $SectorData = array_values($SectorData);
    $SectorDataTime = array_values($SectorDataTime);


    $GetSectorData = [
      'x' => $SectorDataTime,
      'y' => $SectorData,
      'error_y'=> [
        'type'=> 'data',
        'array'=> $Error2,
        'visible'=> true
      ],
      'mode'=>'markers',
      'hoverinfo'=>'x+text',
      'text'=>$Text,
      'type' => 'scatter',
      'marker'=> [
        'symbol'=>'circle',
        'size'=>'10'
      ],
      'name' => 'GetSectorData'
    ];

    $Restart = [
      'x' => $RestartTime,
      'y' => $Restart,
      'error_y'=> [
        'type'=> 'data',
        'array'=> $Error,
        'visible'=> true
      ],
      'hoverinfo'=>'x+text',
      'mode'=>'markers',
      'text'=>'Restart Command',
      'type' => 'scatter',
      'marker'=> [
        'symbol'=>'circle',
        'size'=>'10'
      ],
      'name' => 'Restart'
    ];
    $Baseline = [
        'x' => $Time,
        'y' => $Load,
        'type' => 'scatter',
        'fill' => 'tozeroy',
        'text'=>'% CPU Usage',
        'hoverinfo'=>'x+y+text',
        'fillcolor' => 'rgba(168, 216, 234, 0.5)'
      ];
        $PlotlyData = array($Baseline,$Restart,$GetSectorData);
      return $PlotlyData;
  }

  /**
   * gets all the xy data from the results of GetSectorData for the discovery map
   * @method GetDiscoveredMap
   * @return array Plotly map data
   */
  public function GetDiscoveredMap(){
    //grab the results from GetSectorData
    include __DIR__ ."/../SectorData.php";
    /** @var $X array X coordinates of sector */
    $X = array();
    /** @var $Y array Y coordinates of sector */
    $Y = array();
    //Parse through all the sectors
    foreach ($SectorData as $key => $value) {
      array_push($X,$value['X']);
      array_push($Y,$value['Y']);
    }
    //Build Plotly array
    $PlotlyData = [[
        'x' => $X,
        'y' => $Y,
        'mode' => 'markers',
        'type' => 'scattergl',
        'name' => 'Discovered Sectors',
        'hoverinfo' => 'x+y',
        'marker' => ['size' => '3']
      ]];
      return $PlotlyData;
  }

  /**
   * gets all the data from the results of GetSectorData for the Factions Map
   * @method GetFactionsMap
   * @return array Plotly map data
   */
  public function GetFactionsMap()
  {
    //grab the results from GetSectorData
    include __DIR__ ."/../SectorData.php";
    /** @var $Faction array an array of all the factions, the XY coordinates of the sectors these factions reside */
    $Faction = array();
    foreach ($SectorData as $key => $value) {
      if(isset($value['FactionName'])){
        $Faction[$value['FactionIndex']]['X'][] = $value['X'];
        $Faction[$value['FactionIndex']]['Y'][] = $value['Y'];
        $Faction[$value['FactionIndex']]['FactionName'] = $value['FactionName'];
      }
    }
    //Builds an array of Plotly arrays, each array is a point on the map
    //Theres an alternative to this appreach, I dont think i need to run through the entire array of factions
    //Its possible to just provide the entire array to plotly
    $PlotlyData;
    foreach ($Faction as $key => $value) {
      $PlotlyData[] = [
          'x' => $value['X'],
          'y' => $value['Y'],
          'mode' => 'markers',
          'type' => 'scattergl',
          'name' => 'Discovered Sectors',
          'hoverinfo' => 'x+y+text',
          'FactionIndex' => $key,
          'text' => $value['FactionName'],
          'marker' => ['size' => '3','color' => '#'.$this->stringToColorCode(substr($key, 3)),'opacity'=>'1']
        ];
    }
    return $PlotlyData;
  }

  /**
   * Sends a message through the managers /send command, sending the message directly to the Console
   * @method SendKeys
   * @param  [type]   $Message [description]
   * @return void
   */
  public function SendKeys($Message)
  {
    //Theres a security risk I need to make sure i check for.
    //Send the message through /send manager
    shell_exec($this->Config['Manager'].' send PHP "'.addslashes($Message).'"');
    //Log the message
    $this->LogMessage('Console command entered: '.$Message);
  }

  /**
   * Turns a string into its Hex color code
   * @method stringToColorCode
   * @param  [type]            $str [description]
   * @return string Hex Color Code
   */
  private function stringToColorCode($str)
  {
    // ?
    $code = dechex(crc32($str));
    //Color codes are only 6 charectors long
    $code = substr($code, 0, 6);
    return $code;
  }

  /**
   * Returns the current Date/Time
   * @method GetServerTime
   * @return string Date
   */
  public function GetServerTime()
  {
    return date(DATE_RFC2822);
  }

  /**
   * Grabs the entire Console Log from Console.log, replaced <> special charectors and adds </br> for each line
   * @method GetConsoleData
   * @return string
   */
  public function GetConsoleData()
  {
    //Potentall config option to only grab the last x lines instead of everything
    $Console = `cat {$this->Config['ConsoleLog']} | sed -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/$/<br\/>/g'`;
    return $Console;
  }

  /**
   * Returns the last 24 hours worth of Chat log,
   * replaced <> special charectors and adds </br> for each line
   * also wraps every line into a span, so we can style each line seperatly
   * @method GetChatLog
   * @return string
   */
  public function GetChatLog()
  {
    //Potentall config option to only grab the last x lines instead of everything
    $ChatLog = `grep '^<.*>' $(find {$this->Config['LogsDir']}/*_playerchat.log -mtime -1 ) {$this->Config['ConsoleLog']} | tac | grep -v '^<Rusty>' | sed -e 's/.*</\&lt;/g' -e 's/>/\&gt;/g'  -e 's/^/<span>/g' -e 's/$/<\/span>/g'`;
    return $ChatLog;
  }

}
