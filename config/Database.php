<?php
    //the database class
    class Database
    {
        // sepcify db parameters as pprivate because it will bonly be accesed from this class
        
        private $host='localhost';
        private $main_db= 'test_database';
        private $username='root';
        private $password='';
        private $con;
        private $selected_db;

        //connection function as public since it will be accessed from other pages
        public function connect($db)
        {
            //$this and  -> is used in object oriented to refer to or access parameters in a class. when using this the $ does not apply
            $this->con = null;

            (trim($db)=='default') ? $this->selected_db = $this->main_db : $this->selected_db=$db;
        
            
            try
            {
                
                //using mysqli adapter takes 4 parts(database host,database username,database password and database name separated by "," )
                $this->con = new mysqli($this->host,$this->username, $this->password, $this->selected_db);

                if (mysqli_connect_errno()) 
                {
                    echo "Failed to connect to MySQL: " . mysqli_connect_error();
                }
            }
            catch (Exception $e)
            {
                echo 'Connection Error: '.$e->getMessage();
            }
            return $this->con;
        }


    }

?>