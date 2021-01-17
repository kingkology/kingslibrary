<?php
    session_start();
  // required headers for post api
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    //include our required classes
    include '../../config/Database.php';
     include '../../models/User.php';

    $dt=new DateTime('now', new DateTimezone('Africa/Accra'));
    $ladate = $dt->format('Y-m-d');
    $latodayz = $ladate;
    $ladatez = $dt->format('Y-m-d H:i:s');
    $latimez = $dt->format('H:i:s');


    //instantiate database and connect
    $database=new Database();
    $db=$database->connect('default');

    //instantiate data object and assign the connectio to it
    $data=new User();
    //SANITIZE VALUE AND ASSIGN TO APPROPRIATE VARIABLE IN CLASS
    // get posted data
    //name
    if(isset($_POST['user_name']) AND (!trim(empty($_POST['user_name']))) )
    {
        $user_name=htmlspecialchars(strip_tags($_POST['user_name']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. Full name is required."));
        return;
    }

    //contact
    if(isset($_POST['user_telephone']) AND (!trim(empty($_POST['user_telephone']))) )
    {
        $user_telephone=htmlspecialchars(strip_tags($_POST['user_telephone']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. contact is required."));
        return;
    }

    //user_email
    if(isset($_POST['user_email']) AND (!trim(empty($_POST['user_email']))) )
    {
        $user_email=htmlspecialchars(strip_tags($_POST['user_email']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. email is required."));
        return;
    }

    //gender
    if(isset($_POST['user_type']) AND (!trim(empty($_POST['user_type']))) )
    {
        $user_type=htmlspecialchars(strip_tags($_POST['user_type']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. gender is required."));
        return;
    }

    //location
    if(isset($_POST['location']) AND (!trim(empty($_POST['location']))) )
    {
        $location=htmlspecialchars(strip_tags($_POST['location']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. location is required."));
        return;
    }


    //hobbies
    if(isset($_POST['hobbies']) AND (!trim(empty($_POST['hobbies']))) )
    {
        $hobbies=htmlspecialchars(strip_tags($_POST['hobbies']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. hobbies are required."));
        return;
    }



    //PASSWORD
    if(isset($_POST['user_password']) AND (!trim(empty($_POST['user_password']))) )
    {
        $user_password=htmlspecialchars(strip_tags($_POST['user_password']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. password 1 is required."));
        return;
    }

    //CONFIRM PASSWORD
    if(isset($_POST['user_password2']) AND (!trim(empty($_POST['user_password2']))) )
    {
        $user_password2=htmlspecialchars(strip_tags($_POST['user_password2']));

    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. password 2 is required."));
        return;
    }


//CHECK PASWORD
    if (!($user_password2==$user_password)) {
       // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to add user. passwords do not match"));
        return;
    }
    

//check name
   if(1 === preg_match('~[0-9]~', $user_name))
   {
        // set response code - 406 Not Acceptable
        http_response_code(406);
        // tell the user
        echo json_encode(array("message" => "Invalid name format"));
      return;
   }

//generate id
    do 
    {

        $seed = str_split('abcdefghijklmnop'.'123456789');
        shuffle($seed);
        $rand = '';
        foreach (array_rand($seed, 6) as $k) $rand .= $seed[$k];
        $ncodez='AKRO-'.$rand;
        $data->DATA_ID= $ncodez;
        $count = $data->check_id($db);
    } while ($count > 0);


//check contact
    $data->DATA_CONTACT= $user_telephone;
    $count = $data->check_contact($db);
    if ($count>0) 
    {
          // set response code - 409 Conflict
          http_response_code(409);
          // tell the user
          echo json_encode(array("message" => "Number already used in creating another account"));
        return;
    }


    $data->DATA_ID= $ncodez;
    $data->DATA_NAME=$user_name;
    $data->DATA_CONTACT= $user_telephone;
    $data->DATA_EMAIL=$user_email;
    $data->DATA_TYPE=$user_type;
    $data->DATA_LOCATION=$location;
    $data->DATA_HOBBIES=$hobbies;
    $data->DATA_STATUS='Active';
    $data->DATE_ADDED=$ladate;
    $data->TIME_ADDED=$latimez;
    $data->DATA_PASSWORD=md5($user_password);


    //data query
    $result = $data->add($db);

    if($result=="Account created successfully")
    {

        // set response code - 201 created
        http_response_code(201);
        // tell the user
        echo json_encode(array("message" => "Account Created successfully. \n Account ID\n (".$data->DATA_ID.")."));
        return;
                          
    } 
    else 
    {
        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the user
        echo json_encode(array("message" => "Error Creating Account"));
        return;
    }


?>