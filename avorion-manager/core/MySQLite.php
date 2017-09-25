<?php
/**
 * Simple example of extending the SQLite3 class and changing the __construct
 * parameters, then using the open method to initialize the DB.
 */
class MySQLite extends SQLite3
{
    public function __construct($file = '')
    {
        if( !is_file( $file ) )
          $file = __DIR__ . "/../DSM.db";

        $this->open($file);

    }

    /*
    * Class destructor
    * Close the connection to the database and free up resources as needed
    */
    public function __destruct()
    {
      //destroy the PDO object
      $this->close();
    }

    public function table_exsists(string $TableName){
      return $this->querySingle("SELECT 1 FROM sqlite_master WHERE type='table' AND name='".$TableName."';");
    }

    public function create_dynamic_table(string $TableName, array $Data){
      if($this->table_exsists($TableName)){
        foreach ($Data as $ColumnName => $Schema) {
          echo $ColumnName.PHP_EOL;
          try {
            $this->enableExceptions(true);
            $result = $this->querySingle("SELECT ".$ColumnName." FROM ".$TableName.";");
          } catch (Exception $e) {
            echo 'Error'.PHP_EOL;
            $this->exec("ALTER TABLE ".$TableName." ADD COLUMN ".$ColumnName." ".$Schema);
          }
        }
      }else{
        $this->create_table($TableName, $Data);
      }
    }

    public function create_table(string $TableName, array $Data){

      if( !$TableName || !$Data )
        return FALSE;

      $query = "CREATE TABLE IF NOT EXISTS ".$TableName." (";
      $i=0;
      $DataSize = count( $Data );
      foreach ($Data as $name => $value) {
        $query .= " ".$name." ";

        if(is_array($value)){
          foreach ($value as $valueData) {
            $query .= $valueData." ";
          }
        }else{
          $query .= $value." ";
        }

        if( $i < $DataSize - 1)
  				$query .= ",";

  			$i++;
      }

      $query .= ");";

      $this->exec($query);
      return true;
    }

    public function insert(string $TableName, array $Data){

      if( !$TableName || !$Data )
        return FALSE;

      $query = "INSERT INTO ".$TableName." (";
      $i=0;
      $DataSize = count( $Data );
      foreach ($Data as $name => $value) {
        $query .= " ".$name;

        if( $i < $DataSize - 1)
  				$query .= ",";

  			$i++;
      }

      $query .= ") VALUES (";
      $i=0;
      foreach ($Data as $value) {
        if(!is_numeric($value)){
          $query .= " '".$value."'";
        }else{
          $query .= " ".$value;
        }

        if( $i < $DataSize - 1)
          $query .= ',';

        $i++;
      }

      $query .= ");";

      $this->exec($query);
      return true;
    }

    public function update(string $TableName, array $Where, array $Data){
      //check all necessary arguments
  		if( !$TableName || !$Where || !$Data )
  			return FALSE;

      $query = "UPDATE ".$TableName." SET";
      $i=0;
      $DataSize = count( $Data );
      foreach ($Data as $name => $value) {
        $query .= " ".$name." = ";
        if(!is_numeric($value)){
          $query .= " '".$value."'";
        }else{
          $query .= $value;
        }

        if( $i < $DataSize - 1)
  				$query .= ",";

  			$i++;
      }

      $query .= " WHERE ";
      $i=0;
      $DataSize = count( $Where );
      foreach ($Where as $key => $value) {
        $query .= $key." = ";

        if(!is_numeric($value)){
          $query .= "'".$value."'";
        }else{
          $query .= $value;
        }

        if( $i < $DataSize - 1)
          $query .= ',';

        $i++;
      }

      $query .= ";";

      $this->exec($query);
    }
}
