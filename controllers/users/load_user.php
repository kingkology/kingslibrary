<?php 
session_start();
//header for get api
// use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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

    //DECLARE EMPTY ARRAY
	$response=array();
	//DECLARE AUTO COUNT
	$auto_count=0;

	//data query
    $result = $data->fetch_all($db);
    if ($result) 
    {
    	$num = $result->num_rows;
      	//check if results were returned and assign to array
      	if ($num > 0) 
      	{
        	$data_item=array("th1" =>"N0", "th2" =>"VIEW", "th3" =>"REMOVE","th4" =>"NAME" ,"th5" =>"GENDER","th6" =>"LOCATION","th7" =>"HOBBIES","th8" =>"DATE ADDED" );
        	$new_data[]=$data_item;
        	$response[]=$new_data;
        	while ($stmt = $result->fetch_assoc()) 
        	{
        		$auto_count=$auto_count+1;
        		$new_data=array();

        		$the_id=$stmt['auto_id'];

        		$data_item=array("type" =>"text","name" =>"no".$auto_count,"id" =>"no".$the_id ,"value" =>$auto_count);
				$new_data[]=$data_item;

				$data_item=array("type" =>"button","name" =>"view".$the_id,"id" =>"view".$the_id ,"value" =>"<i class='fa fa-eye'></i>", "additional_properties"=>"onclick='view_details(".$the_id.")' class='btn btn-info btn-sm my-4' color:white ");
				$new_data[]=$data_item;

				$data_item=array("type" =>"button","name" =>"delete".$the_id,"id" =>"delete".$the_id ,"value" =>"<i class='fa fa-times'></i>", "additional_properties"=>" onclick='remove(".$the_id.")' class='btn btn-danger btn-sm my-4' style=color:black ");
				$new_data[]=$data_item;

				$data_item=array("type" =>"text","name" =>"name".$the_id,"id" =>"name".$the_id ,"value" =>$stmt['user_name'] );
				$new_data[]=$data_item;

				$data_item=array("type" =>"text","name" =>"gender".$the_id,"id" =>"gender".$the_id ,"value" =>$stmt['user_type'] );
				$new_data[]=$data_item;

				$data_item=array("type" =>"text","name" =>"location".$the_id,"id" =>"location".$the_id ,"value" =>$stmt['user_location'] );
				$new_data[]=$data_item;

				$data_item=array("type" =>"text","name" =>"hobby".$the_id,"id" =>"hobby".$the_id ,"value" =>$stmt['user_hobbies'] );
				$new_data[]=$data_item;

				$data_item=array("type" =>"text","name" =>"date".$the_id,"id" =>"date".$the_id ,"value" =>$stmt['date_added']." ".$stmt['time_added'] );
				$new_data[]=$data_item;

				$response[]=$new_data;

        	}

        	// set response code - 200 ok
        	http_response_code(200);
        	echo json_encode($response);

        }
        else
        {
            // set response code - 404 not found
        	http_response_code(404);
	        // tell the user
	        echo json_encode(array("message" => "No Data Found"));
	        return;
        }
    }
    else
    {
        // set response code - 404 not found
        http_response_code(404);
        // tell the user
        echo json_encode(array("message" => "No Data Found"));
        return;
    }






?>