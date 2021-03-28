<?php
     session_start();
   // required headers for post api
   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json; charset=UTF-8");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Max-Age: 3600");
   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    //include our required classes
    include '../../../config/Database.php';
    include '../../../models/User.php';


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


//client
    if(isset($_POST['inputid']) AND (!trim($_POST['inputid'])=="") )
    {
        $nid=htmlspecialchars(strip_tags($_POST['inputid']));
    }
    else
    {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Unable to login. Login ID is required."));
        return;
    }

    if(isset($_POST['inputPwd']) AND (!trim($_POST['inputPwd'])=="") )
    {
        $pword=htmlspecialchars(strip_tags($_POST['inputPwd']));
    }
    else
    {
       // set response code - 400 bad request
       http_response_code(400);
       // tell the user
       echo json_encode(array("message" => "Unable to login. Password is required."));
       return;
    }


    $data->DATA_EMAIL= $nid;
    $data->DATA_PASSWORD=md5($pword);

    
    //Client query
    $result = $data->login($db);
    if ($result)
    {
        $num = $result->num_rows;
        //check if results were returned and assign to array
        if ($num > 0) 
        {
            while ($row = $result->fetch_assoc()) 
            {
                // Register details in session and redirect
                $_SESSION['user_email'] = $row['user_email'];
                $_SESSION['user_name']=$row['user_name'];
                $_SESSION['user_contact'] = $row['user_contact'];
                $_SESSION['user_id'] = $row['user_id'];

                // set response code - 201 created
                http_response_code(201);
                // tell the user
                echo json_encode(array("message" => "Success","email" => $_SESSION['user_email'],"contact" => $_SESSION['user_contact'],"name" => $_SESSION['user_name'],"id" => $_SESSION['user_user_idname']));
                return;
            }

        }
        else
        {

            // set response code - 404 service unavailable
            http_response_code(404);
            // tell the user
            echo json_encode(array("message" => "User Not Found Please Check Login Credentials"));
            return;
        }
    }
    else
    {
        // set response code - 404 service unavailable
        http_response_code(404);
        // tell the user
        echo json_encode(array("message" => "User Not Found Please Check Login Credentials"));
        return;

    }
    



?>