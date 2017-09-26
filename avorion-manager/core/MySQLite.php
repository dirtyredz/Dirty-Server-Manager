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

    /**
     * Checks if a table exsists
     * @method table_exsists
     * @param  string $TableName Name of the Table
     * @return  bool if successful
     * @return  null if failed
     */
    public function table_exsists(string $TableName){
      return $this->querySingle("SELECT 1 FROM sqlite_master WHERE type='table' AND name='".$TableName."';");
    }

    /**
     * Creates a table if the table doesnt already exsists, and if it does creates Columns for any missing Columns
     * @method create_dynamic_table
     * @param  string $TableName Name of the Table
     * @param  array $Data Data to create the table with
     */
    public function create_dynamic_table(string $TableName, array $Data){
      if($this->table_exsists($TableName)){
        foreach ($Data as $ColumnName => $Schema) {
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

    /**
     * Creates a table into the DB, if it does not exsists
     * @method create_table
     * @param  string $TableName Name of the Table
     * @param  array $Data Data to create the table with
     * @return bool
     */
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

    /**
     * Insert data array into table
     * @method insert
     * @param  string $TableName Name of the Table
     * @param  array $Data Data to insert into the table
     * @return bool
     */
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

    /**
     * Updates Data for specific rows into table
     * @method update
     * @param  string $TableName Name of the Table
     * @param  array $Where Data to determine which rows in the table will be updated
     * @param  array $Data Data to insert into the table
     * @return bool
     */
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

    /**
     * Returns all rows for which the Where data was matched to the table
     * @method GetRow
     * @param  string $TableName Name of the Table
     * @param  array $Where Data to determine which rows in the table will be updated
     * @return array
     */
    public function GetRow(string $TableName, array $Where){
      //check all necessary arguments
  		if( !$TableName || !$Where )
  			return FALSE;

      $query = "SELECT * FROM ".$TableName." WHERE ";
      $i=0;
      $DataSize = count( $Where );
      foreach ($Where as $key => $value) {
        $query .= $key." = :".$key;

        if( $i < $DataSize - 1)
          $query .= ',';

        $i++;
      }

      $query .= ";";

      $stmt = $this->prepare($query);

      foreach ($Where as $key => $value) {
        if(!is_numeric($value)){
          $Type = SQLITE3_TEXT;
        }else{
          $Type = SQLITE3_INTEGER;
        }
        $stmt->bindValue(':'.$key, $value, $Type);
      }
      $result = $stmt->execute();

      return $result->fetchArray();
    }

}
