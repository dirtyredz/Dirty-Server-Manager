<?php
class RefreshModel extends CommonController {
    public $TimeArray = array();
    public $Range = 12;

    function __construct($Range = null){
        parent::__construct();

        $Timezone = `timedatectl status | grep "Time zone"`;
        date_default_timezone_set(trim(preg_replace('/Time zone: | \(.*/','',$Timezone)));

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
          $this->TimeArray = $this->BuildTimeArray();
        }

    }
    private function BuildTimeArray(){
      $current_time = time();
      $time = $current_time;
      $time -= $time % (60 * 5);
      $NewArray = array(date("Y-m-d", $time)."T".date("H:i:s", $time));
      for ($x = 1; $x <= $this->Range - 1; $x++) {
        $time -= (5 * 60);
        array_push($NewArray, date("Y-m-d", $time)."T".date("H:i:s", $time));
      }
      $NewArray = array_reverse($NewArray);
      return $NewArray;
    }
    private function RunThoughTimeArray($Time,$Data1,$Data2 = null,$Data3 = null){

      //Remove all timestamps that are not withen the past hour.
      foreach ($Time as $key => $value) {
        $Exsist = array_search($value, $this->TimeArray);
        if($Exsist === FALSE){
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
      //Add any missing timestamps withen the past hour and set to 0
      foreach ($this->TimeArray as $key => $value) {
        $Exsist = array_search($value, $Time);
        if($Exsist === FALSE){
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
    public function GetPlayersOnlineGraph(){
      if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
        return array();
      }
      $Time = `grep -h "Players Online" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
      $Data = `grep -h "Players Online" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*: //g' -e 's/\/.*//g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
      $Time = explode(',',$Time);
      $Data = explode(',',$Data);
      array_pop($Time);
      array_pop($Data);

      list ($Time, $Data) = $this->RunThoughTimeArray($Time, $Data);

        $PlotlyData = [[
          'x' => $Time,
          'y' => $Data,
          'type' => 'scatter',
          'fill' => 'tozeroy',
          'fillcolor' => 'rgba(168, 216, 234, 0.5)'
        ]];
        return $PlotlyData;
    }
    public function GetCurrentServerLoad(){
      if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
        return array();
      }
      $Date = date('d-m-Y');
      $Data = `grep -h "avg. server load" {$this->Config['LogsDir']}/{$Date}_status.log | tail -n 1 |  sed -e 's/.*://g' | tr '%' ' ' |  tr -d '[:blank:]'`;
      return $Data;
    }
    public function GetServerLoadGraph(){
        if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
          return array();
        }
        $Time = `grep -h "avg. server load" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
        $Data = `grep -h "avg. server load" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' | tr '%' ' ' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
        $Time = explode(',',$Time);
        $Data = explode(',',$Data);
        array_pop($Time);
        array_pop($Data);

        list ($Time, $Data) = $this->RunThoughTimeArray($Time, $Data);

        $PlotlyData = [[
          'x' => $Time,
          'y' => $Data,
          'type' => 'scatter',
          'fill' => 'tozeroy',
          'fillcolor' => 'rgba(168, 216, 234, 0.5)'
        ]];
        return $PlotlyData;
    }
    public function GetServerUpdateGraph(){
        if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
          return array();
        }
        $Time = `grep -h "avg. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
        $Avg = `grep -h "avg. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' -e 's/ms//g' | tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
        $Max = `grep -h "max. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' -e 's/ms//g' | tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
        $Min = `grep -h "min. update" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' -e 's/ms//g' | tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;

        $Time = explode(',',$Time);
        $Avg = explode(',',$Avg);
        $Max = explode(',',$Max);
        $Min = explode(',',$Min);

        array_pop($Time);
        array_pop($Avg);
        array_pop($Max);
        array_pop($Min);

        list ($Time, $Avg, $Max, $Min) = $this->RunThoughTimeArray($Time, $Avg, $Max, $Min);

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
    public function GetServerMemoryGraph(){
        if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
          return array();
        }
        $Time = `grep -h "Players Online" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
        $Players = `grep -h "players in memory" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*|//g' -e 's/ players.*//g' -e 's/.* //g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
        $Factions = `grep -h "factions in memory" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*|//g' -e 's/ factions.*//g' -e 's/.* //g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
        $Sectors = `grep -h "sectors in memory" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*|//g' -e 's/ sectors.*//g' -e 's/.* //g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;

        $Time = explode(',',$Time);
        $Players = explode(',',$Players);
        $Factions = explode(',',$Factions);
        $Sectors = explode(',',$Sectors);

        array_pop($Time);
        array_pop($Players);
        array_pop($Factions);
        array_pop($Sectors);

        list ($Time, $Players, $Factions, $Sectors) = $this->RunThoughTimeArray($Time, $Players, $Factions, $Sectors);

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
    public function GetCpuUsageGraph(){
      if(!is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log') || !is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_status.log')){
        return array();
      }
      $SectorDataTime = `grep -h "GetSectorData" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
      $SectorData = `grep -h "GetSectorData" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' | awk '{print q $0 q}' ORS=','`;
      $SectorDataTime = explode(',',$SectorDataTime);
      $SectorData = explode(',',$SectorData);
      array_pop($SectorDataTime);
      array_pop($SectorData);


      $Time = `grep -h "CPU" $(find {$this->Config['LogsDir']}/*_status.log  -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g' ) | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
      $Load = `grep -h "CPU" $(find {$this->Config['LogsDir']}/*_status.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' |  tr -d '[:blank:]' | awk '{print q $0 q}' ORS=','`;
      $Time = explode(',',$Time);
      $Load = explode(',',$Load);
      array_pop($Time);
      array_pop($Load);


      $RestartTime = `grep -h "Restart" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g' ) | tail -n {$this->Range} | sed -e 's/|.*//g' -e 's/-/:/g3' | tr ' ' 'T' | sed -e 's/..$/00/' | awk '{print q $0 q}' ORS=','`;
      $Restart = `grep -h "Restart" $(find {$this->Config['LogsDir']}/*_manager.log -printf '%T+ %p\n' | sort -n | sed -e 's/.* //g') | tail -n {$this->Range} |  sed -e 's/.*://g' | awk '{print q $0 q}' ORS=','`;
      $RestartTime = explode(',',$RestartTime);
      $Restart = explode(',',$Restart);
      array_pop($RestartTime);
      array_pop($Restart);


      list ($Time, $Load) = $this->RunThoughTimeArray($Time, $Load);



      $Error = array();
      foreach ($RestartTime as $key => $value) {
        $Restart[$key] = 50;
        $Error[$key] = 50;
        if(date($value) < date($this->TimeArray[0])){
          unset($Restart[$key]);
          unset($RestartTime[$key]);
        }
      }
      $Restart = array_values($Restart);
      $RestartTime = array_values($RestartTime);


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
          'text'=>'CPU Usage',
          'hoverinfo'=>'x+y+text',
          'fillcolor' => 'rgba(168, 216, 234, 0.5)'
        ];
          $PlotlyData = array($Baseline,$Restart,$GetSectorData);
        return $PlotlyData;
    }
    public function GetDiscoveredMap(){
      include __DIR__ ."/../SectorData.php";
      $X = array();
      $Y = array();
      foreach ($SectorData as $key => $value) {
        array_push($X,$value['X']);
        array_push($Y,$value['Y']);
      }
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
    public function GetFactionsMap(){
        include __DIR__ ."/../SectorData.php";
        $Faction = array();
        foreach ($SectorData as $key => $value) {
          if(isset($value['FactionName'])){
            $Faction[$value['FactionIndex']]['X'][] = $value['X'];
            $Faction[$value['FactionIndex']]['Y'][] = $value['Y'];
            $Faction[$value['FactionIndex']]['FactionName'] = $value['FactionName'];
          }
        }
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
    public function SendKeys($Message){
      shell_exec($this->Config['Manager'].' send PHP "'.$Message.'"');
      $this->LogMessage('Console command entered: '.$Message);
    }
    private function stringToColorCode($str) {
      $code = dechex(crc32($str));
      $code = substr($code, 0, 6);
      return $code;
    }
    public function GetServerTime(){
      return date(DATE_RFC2822);
    }
    public function GetConsoleData(){
      $Console = `cat {$this->Config['ConsoleLog']} | sed -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/$/<br\/>/g'`;
      return $Console;
    }
    public function GetChatLog(){
      $ChatLog = `grep '^<.*>' $(find {$this->Config['LogsDir']}/*_playerchat.log -mtime -1 ) {$this->Config['ConsoleLog']} | tac | grep -v '^<Rusty>' | sed -e 's/.*</\&lt;/g' -e 's/>/\&gt;/g'  -e 's/^/<span>/g' -e 's/$/<\/span>/g'`;

      return $ChatLog;
    }
}
?>
