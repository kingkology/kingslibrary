<?php
    session_start();
  //header for read api
    // use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
    header('Access-Control-Allow-Origin:*');
    //content type as html
    //header('Content-Type:application/html');

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
    if(isset($_POST['user_email']) AND (!trim($_POST['user_email'])=="") )
    {
        $nid=htmlspecialchars(strip_tags($_POST['user_email']));
    }
    else
    {
        $_SESSION['backend_message']='Please Fill In Email';
        $_SESSION['message_type']='error';
        header("location: ../../../views/users/login/admin.php") ;
    }

    if(isset($_POST['user_password']) AND (!trim($_POST['user_password'])=="") )
    {
        $pword=htmlspecialchars(strip_tags($_POST['user_password']));
    }
    else
    {
        $_SESSION['backend_message']=' Password is required';
        $_SESSION['message_type']='error';
        header("location: ../../../views/users/login/admin.php") ;
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
                $_SESSION['admin_access'] = 'Yes';
                $_SESSION['user_name']=$row['user_name'];
                $_SESSION['user_contact'] = $row['user_contact'];
                $_SESSION['user_id'] = $row['user_id'];

                header("location: ../../../views/main/nav_content/nav_admin.php") ;
                return;
            }

        }
        else
        {
            $_SESSION['backend_message']='User Not Found Please Check Login Credentials';
            $_SESSION['message_type']='error';
            header("location: ../../../views/users/login/admin.php") ;
        }
    }
    else
    {
        $_SESSION['backend_message']='User Not Found Please Check Login Credentials';
        $_SESSION['message_type']='error';
        header("location: ../../../views/users/login/admin.php") ;
        return;
    }
    



?>