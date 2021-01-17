<?php

class User
{

    //innitialise database
    private $con;

    public $AUTO_ID;
    public $DATA_ID;
    public $DATA_NAME;
    public $DATA_CONTACT;
    public $DATA_EMAIL;
    public $DATA_TYPE;
    public $DATA_LOCATION;
    public $DATA_HOBBIES;
    public $DATA_STATUS;
    public $DATA_PASSWORD;

    public $DATE_ADDED;
    public $TIME_ADDED;

    public $QUERY_VALUE;


    public $START;
    public $LIMIT;

    public function check_id($db)
    {

        $this->con= $db;

        $query = 'SELECT * FROM data WHERE user_id="'.$this->DATA_ID.'"';
        
        $result = mysqli_query($this->con, $query);
        if($result)
        {
            //get returned rows
            $num = $result->num_rows;
            return $num;
            
        }
    }

    public function check_contact($db)
    {

        $this->con= $db;

        $query = 'SELECT * FROM data WHERE user_contact="'.$this->DATA_CONTACT.'"';
        
        $result = mysqli_query($this->con, $query);
        if($result)
        {
            //get returned rows
            $num = $result->num_rows;
            return $num;
            
        }
    }


    public function add($db)
    {
        $this->con= $db;

        $query = 'INSERT INTO data (
        user_id,
        user_name,
        user_contact,
        user_email,
        user_type,
        user_location,
        user_hobbies,
        user_status,
        user_password,
        date_added,
        time_added
        )
        VALUES
        ("'.$this->DATA_ID.'","'.$this->DATA_NAME.'","'.$this->DATA_CONTACT.'","'.$this->DATA_EMAIL.'","'.$this->DATA_TYPE.'","'.$this->DATA_LOCATION.'","'.$this->DATA_HOBBIES.'","'.$this->DATA_STATUS.'","'.$this->DATA_PASSWORD.'","'.$this->DATE_ADDED.'","'.$this->TIME_ADDED.'")';
        $result = mysqli_query($this->con, $query);
        //return $query;
        if ($result === TRUE) {
            return "Account created successfully";
        } else {
            return "Error in creating Account ";
        }

    }

    public function fetch_all($db)
    {

        $this->con= $db;

        $query = 'SELECT * FROM data ';
        
        $result = mysqli_query($this->con, $query);
        return $result; 
    }


    public function login($db)
    {
        $this->con= $db;

        $query='SELECT * from data where (user_id = "'.$this->DATA_ID.'" OR user_contact = "'.$this->DATA_CONTACT.'" ) AND user_password="'.$this->DATA_PASSWORD.'" ';
        $result = mysqli_query($this->con, $query);
        if ($result)
        {
            return $result;
        }

    }

    public function change_password($db)
    {
        $this->con= $db;

        $query = 'UPDATE data SET
        user_password="'.$this->DATA_PASSWORD.'"
        WHERE 
        user_id="'.$this->DATA_ID.'" 
        ';
        //PREPARED STATEMENT
        $result = mysqli_query($this->con, $query);
        if ($result === TRUE) {
            if ($this->con->affected_rows>0) {
               return "Success"; 
            }
            else
            {
                return "No Data Modified";
            }
        }
        else
        {
            return "Error";
        }

    }


    public function update_profile($db)
    {
        $this->con= $db;

        $query = 'UPDATE data SET
        user_name="'.$this->DATA_NAME.'",
        user_contact="'.$this->DATA_CONTACT.'",
        user_email="'.$this->DATA_EMAIL.'"
        WHERE 
        user_id="'.$this->DATA_ID.'" 
        ';
        //PREPARED STATEMENT
        $result = mysqli_query($this->con, $query);
        if ($result === TRUE) {
            if ($this->con->affected_rows>0) {
               return "Success"; 
            }
            else
            {
                return "No Data Modified";
            }
        }
        else
        {
            return "Error";
        }

    }


    public function search_by_id($db)
    {
        $this->con= $db;

        $query = 'SELECT * FROM data 
        WHERE 
        user_id="'.$this->DATA_ID.'"
        ';
        
        $result = mysqli_query($this->con, $query);
        return $result; 
    }


    public function search_by_all($db)
    {
        $this->con= $db;

        $query = 'SELECT * FROM data 
        WHERE 
        user_id="'.$this->QUERY_VALUE.'"
        OR 
        user_name LIKE "%'.$this->QUERY_VALUE.'%"
        OR
        user_contact="'.$this->QUERY_VALUE.'"
        OR
        user_type="'.$this->QUERY_VALUE.'"
        OR
        user_email="'.$this->QUERY_VALUE.'"
        ';
        
        $result = mysqli_query($this->con, $query);
        return $result; 

    }


    
    public function account_status($db)
    {
        $this->con= $db;

        $query = 'UPDATE data SET
        user_status="'.$this->QUERY_VALUE.'"
        WHERE 
        user_id="'.$this->DATA_ID.'" 
        ';
        //PREPARED STATEMENT
        $result = mysqli_query($this->con, $query);
        if ($result === TRUE) {
            return "Success"; 
        }
        else
        {
            return "Error";
        }

    }


    public function delete_account($db)
    {
        $this->con= $db;

        $query = 'DELETE FROM data 
        WHERE 
        user_id="'.$this->DATA_ID.'" 
        ';
        //PREPARED STATEMENT
        $result = mysqli_query($this->con, $query);
        if ($result === TRUE) {
            return "Success"; 
        }
        else
        {
            return "Error";
        }

    }



 
}




?>