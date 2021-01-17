<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Akrotech Kingslibrary</title>
  <!-- Font Awesome -->
  <link href="assets/libraries/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet">
  <!-- Bootstrap core CSS -->
  <link href="assets/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="assets/css/mdb.min.css" rel="stylesheet">
  <!-- Your custom styles (optional) -->
  <link href="assets/css/style.css" rel="stylesheet">


  <style>
       .navbar .navbar-brand img {
        height: 20px;
      }

      .navbar .navbar-brand {
        padding-top: 0;
      }

      .navbar .nav-link {
        color: #444343!important;
      }

      .navbar .button-collapse {
        padding-top: 1px;
      }

      .card-intro .card-body {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-radius: 0 !important;
      }

      .card-intro .card-body h1 {
        margin-bottom: 0;
      }

      .card-intro {
        margin-top: 64px;
      }

      @media (max-width: 450px) {
        .card-intro {
          margin-top: 56px;
        }
      }

      @media (min-width: 1441px) {
        .card-intro {
          padding-left: 0 !important;
        }
      }
      </style>

</head>

<body>

  <!-- Start your project here-->

  <!-- Navigation -->
    <header>
      <!-- Navbar -->
      <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
        <div class="container">
          <!-- Collapse -->
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- Links -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left -->
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link waves-effect" href="#creating_table" >Tables</a>
              </li>
              <li class="nav-item">
                <a class="nav-link waves-effect"  href="#calling_pagelet">Pagelets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link waves-effect"  href="#insert_data">Insert Data</a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <!-- Navbar -->
      <!-- Intro -->
      <div class="card card-intro blue-gradient">
        <div class="card-body white-text rgba-black-light text-center">
          <!--Grid row-->
          <div class="row d-flex justify-content-center">
            <!--Grid column-->
            <div class="col-md-6">
              <p class="h5 mb-2">
                Kings Javascript Library
              </p>
              <p class="mb-0">This is a dynamic library to take care of all front end to backend communications.</p>
            </div>
            <!--Grid column-->
          </div>
          <!--Grid row-->
        </div>
      </div>
      <!-- Intro -->
    </header>
    <!-- Navigation -->


  <div>
    <br>

    <div class="container my-5 py-5 z-depth-1">
      <!--Section: Content-->
      <section class="dark-grey-text text-center">
        <h5 class="animated fadeIn mb-3">Thank you for using our product. We're glad you're with us.</h5>
        <p class="animated fadeIn mb-3">It works with json,temporal storage,sweet alert,toaster,font awesome, and the jquery library <br></p>
        <p class="animated fadeIn mb-3">Always remember to load the jquery library first before any other javascript file and the kings library last after all other javacript files <br></p>
        <p class="animated fadeIn mb-3">Feel free to contribute to it on github @ https://github.com/kingkology/kingslibrary</p>  
        <h3>Download files</h3>
        <p>1. font awesome,sweet alert,toaster,kingslibrary and jquery ==> <a href="assets/libraries/libraries.rar"> click here</a></p>
        <h3><b>NB: All sample api codes are written in php</b></h3>
        <hr>
        <h2>This template is made by : Material Design For Bootstrap</h2>
        <p>
          <a class="navbar-brand waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">
            <img src="https://mdbootstrap.com/wp-content/uploads/2018/06/logo-mdb-jquery-small.png" alt="Logo">
          </a>
        </p>
      </section>
      <!--Section: Content-->
    </div>



    <div class="container my-5 py-5 z-depth-1" id="calling_pagelet">
      <!--Section: Content-->
      <section class="dark-grey-text text-center">
        <h2> 1. <u><b>Calling a pagelet/component</b></u> &nbsp; </h2>
                  <h4>NB: A pagelet is a component of an HTML page, that contains directives , layout and code in a single context. </h4>
                  <h4>It may be a separate file or web page that contains information you want displayed in a accross a web page.</h4>
                  <p>To call a pagelet, you first need to call the function <code>call_pagelet('url','display_location')</code></p>
                  <p>The <code>call_pagelet()</code> function takes 2 arguments which are;</p>
                  <p>1. (url) the data generating url or the view eg: <code>'views/call_pagelet.php'</code></p>
                  <p>2. (display_location) where to diplay the response eg: id of a div or id of an html element </p>
                  <p>eg: <code>onclick="call_pagelet('views/general_pages/call_pagelet.php','the_table');"</code></p><br>
                  <p>NB : When it fails to call a page, it will try to call a default page called 404 from the views folder and show an error if it fails</p>
                  <p>A. The function expects an html response from your controller(api) <br> </p>

                  <p><strong><u>A sample pagelet in php</u></strong></p>
                  <p>
                    <pre align="left" style="color:red">
                      <code>
                        &lt;php 
                        // use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
                        header("Access-Control-Allow-Origin:*");
                        //content type as html
                        header("Content-Type:application/html");


                        // set response code - 200 ok
                        http_response_code(200);
                        ?&gt;
                            &lt;div class="container my-5 py-5 z-depth-1"&gt;
                              &lt;!--Section: Content--&gt;
                                &lt;section class="dark-grey-text text-center"&gt;
                                    &lt;h3 class="font-weight-bold pt-4 mb-4"&gt;Material Design Blocks&lt;/h3&gt;
                                    &lt;h5 class="font-weight-bold font-italic mb-5"&gt;At vero eos et accusamus et iusto odio dignissimos qui cupiditate non provident.&lt;/h5&gt;

                                    &lt;div class="row mx-lg-5 mx-md-3"&gt;
                                        &lt;div class="col-md-6 mb-4"&gt;
                                        
                                            &lt;div class="view mb-5"&gt;
                                              &lt;img src="assets/img/svg/undraw_grand_slam_0q5r.svg" class="img-fluid" alt="smaple image"&gt;
                                            &lt;/div&gt;
                                            &lt;h5 class="font-weight-normal text-muted"&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.&lt;/h5&gt;
                                        &lt;/div&gt;
                                            &lt;div class="col-md-6 mb-4"&gt;
                                                &lt;div class="view mb-5"&gt;
                                                  &lt;img src="assets/img/png/undraw_basketball_agx4.png" class="img-fluid" alt="smaple image"&gt;
                                                &lt;/div&gt;
                                                &lt;h5 class="font-weight-normal text-muted"&gt;Ut enim ad minim veniam, quis nostrud ut aliquip ex ea commodo consequat.&lt;/h5&gt;

                                            &lt;/div&gt;
                                    &lt;/div&gt;
                              &lt;/section&gt;
                              &lt;!--Section: Content--&gt;

                            &lt;/div&gt;

                        &lt;php 
                        ?&gt;
                      </code>
                    </pre>
                  </p>
                  
                  <br>
                  <p>Click the refresh button to load sample:  </p>
                  <p>
                    <button class="btn btn-sm btn-info" onclick="call_pagelet('views/general_pages/call_pagelet.php','call_pagelet');"><i class="fa fa-refresh"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="$('#call_pagelet').html('');"><i class="fa fa-times"></i></button>
                  </p>

                

              <hr>
        <div class="col-md-12 mb-4" id="call_pagelet">
          
        </div>
      </section>
      <!--Section: Content-->
    </div>




    <div class="container my-5 py-5 z-depth-1" id="insert_data">
      <!--Section: Content-->
      <section class="dark-grey-text text-center">
        <h2> 1. <u><b>Submitting data to be inserted into a database</b></u> &nbsp; </h2>
                  <p>To submit data, you first need to call the function <code>insert_data(url,form_id)</code></p>
                  <p>The <code>insert_data()</code> function takes 2 arguments which are;</p>
                  <p>1. (url) the data receiving url (controller/api) eg: <code>'controllers/users/add_user.php'</code></p>
                  <p>2. (form_id) The ID of the form that contains the data to be processed </p>
                  <p>eg: <code>onclick="insert_data('controller/users/add_user.php','user_add_form');"</code></p><br>
                  <p>A. The function expects a json response from the controller(api)</p> <br>

                  <p><b><u>HTML form example</u></b></p>
                  <pre  align="left" style="color:red">
                    &lt;php  
                    // use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
                    header("Access-Control-Allow-Origin:*");
                    //content type as json
                    header("Content-Type:application/html");
                    // set response code - 200 ok
                    http_response_code(200);
                    ?&gt;
                      &lt;form class="border border-light p-5" id="user_add_form"&gt
                          &lt;p class="h4 mb-4 text-center"&gtAdd User&lt;/p&gt
                          &lt;label&gtYour Name&lt;/label&gt
                          &lt;input type="text" id="value1" name="user_name" class="form-control mb-4" placeholder="Your Name" required&gt
                          &lt;label&gtYour Number&lt;/label&gt
                          &lt;input type="number" id="value2" name="user_telephone" class="form-control mb-4" placeholder="Telephone" required&gt
                          &lt;label&gtYour Email&lt;/label&gt
                          &lt;input type="email" id="value3" name="user_email" class="form-control mb-4" placeholder="E-mail" required&gt
                          &lt;label&gtGender&lt;/label&gt
                          &lt;div&gt
                            &lt;!-- Default inline 1--&gt
                            &lt;div class="custom-control custom-radio custom-control-inline"&gt
                              &lt;input type="radio" class="custom-control-input" id="value4a" name="user_type" value="Male"&gt
                              &lt;label class="custom-control-label" for="value4a"&gtMale&lt;/label&gt
                            &lt;/div&gt
                            &lt;!-- Default inline 2--&gt
                            &lt;div class="custom-control custom-radio custom-control-inline"&gt
                              &lt;input type="radio" class="custom-control-input" id="value4b" name="user_type" value="Female"&gt
                              &lt;label class="custom-control-label" for="value4b"&gtFemale&lt;/label&gt
                            &lt;/div&gt
                          &lt;/div&gt
                          &lt;br&gt
                          &lt;label&gtLocation&lt;/label&gt
                             &lt;select class="browser-default custom-select mb-4" id="value5" name="location"&gt
                                 &lt;option value="" selected&gtChoose option&lt;/option&gt
                                 &lt;option value="Accra"&gtAccra&lt;/option&gt
                                 &lt;option value="Kumasi"&gtKumasi&lt;/option&gt
                                 &lt;option value="Kasoa"&gtKasoa&lt;/option&gt
                             &lt;/select&gt
                          &lt;label&gtYour Hobbies&lt;/label&gt
                          &lt;div&gt
                            &lt;!-- Default inline 1--&gt
                            &lt;div class="custom-control custom-checkbox custom-control-inline"&gt
                              &lt;input type="checkbox" class="custom-control-input" name="hobbies" id="value6a" value="Dancing"&gt
                              &lt;label class="custom-control-label" for="value6a"&gtDancing&lt;/label&gt
                            &lt;/div&gt
                            &lt;!-- Default inline 2--&gt
                            &lt;div class="custom-control custom-checkbox custom-control-inline"&gt
                              &lt;input type="checkbox" class="custom-control-input" name="hobbies" id="value6b" value="Singing"&gt
                              &lt;label class="custom-control-label" for="value6b"&gtSinging&lt;/label&gt
                            &lt;/div&gt
                            &lt;!-- Default inline 3--&gt
                            &lt;div class="custom-control custom-checkbox custom-control-inline"&gt
                              &lt;input type="checkbox" class="custom-control-input" name="hobbies" id="value6c" value="Sleeping"&gt
                              &lt;label class="custom-control-label" for="value6c"&gtSleeping&lt;/label&gt
                            &lt;/div&gt
                          &lt;/div&gt
                          &lt;br&gt
                          &lt;label&gtYour Password&lt;/label&gt
                          &lt;input type="password" id="value7" name="user_password" class="form-control mb-4" placeholder="Password" onkeyup="checknewpass('value7','value8','pwd_message')" required&gt
                          &lt;label style="color:red" id="pwd_message"&gt&lt;/label&gt
                          &lt;br&gt
                          &lt;label&gtConfirm Password&lt;/label&gt
                          &lt;input type="password" id="value8" name="user_password2" class="form-control mb-4" placeholder="Password" onkeyup="checknewpass('value7','value8','pwd_message')" required&gt
                          &lt;a class="btn btn-info btn-lg my-4" onclick="insert_data('controllers/add_user.php','user_add_form');"&gtAdd User&lt;/a&gt
                      &lt;/form&gt
                    &lt;php 
                    ?&gt;
                  </pre>

                  <br>
                  <p><b><u>PHP controller example</u></b></p>

                  <p> 
                    <pre align="left" style="color:red">
                    <code>
                      &lt;?php
                          session_start();
                        // required headers for post api
                        header("Access-Control-Allow-Origin: *");
                        header("Content-Type: application/json; charset=UTF-8");
                        header("Access-Control-Allow-Methods: POST");
                        header("Access-Control-Max-Age: 3600");
                        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
                          
                          //include our required classes(models)
                          include '../config/Database.php';
                          include '../models/User.php';

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


                      ?&gt;

                      </code>
                  </pre> 
                </p>
                  <p>set response code - 201 eg: http_response_code(201);</code> `. </p>
                  <h3>NB: This does not submit images</h3>
                  <br>
                  <p>Click the refresh button to load sample:  </p>
                  <p>
                    <button class="btn btn-sm btn-info" onclick="call_pagelet('views/users/user_add.php','user_add');"><i class="fa fa-refresh"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="$('#user_add').html('');"><i class="fa fa-times"></i></button>
                  </p>

                

              <hr>
        <div class="col-md-12 mb-4" id="user_add">
          
        </div>
      </section>
      <!--Section: Content-->
    </div>


    <div class="container my-5 py-5 z-depth-1" id="creating_table">
      <!--Section: Content-->
      <section class="dark-grey-text text-center">
        <h2> 1. <u><b>Creating a table</b></u> &nbsp;</h2>
        <p>To create a table, you first need to call the function <code>create_table('url','display_location')</code></p>
        <p>As you can see, the <code>create_table()</code> function takes 2 arguments which are;</p>
        <p>1. (url) the data generating url (api) eg: <code>'test_app/api/controllers/array_test.php'</code></p>
        <p>2. (display_location) where to diplay the response eg: id of a div or id of an html element(table) </p>
        <p>eg: <code>onclick="create_table('test_app/api/controllers/array_test.php','the_table');"</code></p><br>
        <p>A. The function expects a json response from your api <br>` <code>header("Content-Type:application/json");</code> `. This response needs to define the table headers in the first index of the json response </p>
        <p>eg: <code>$data_item=array("th1" =>"VIEW","th2" =>"DELETE","th3" =>"ID" ,"th4" =>"NAME" );</code></p>
         <p><code>$data[]=$data_item; </code></p>
        <p><code>$response[]=$data;</code></p>
        <p>B. The json response needs to specify certain arguments when adding column values. </p>
        <p> I. Incase of adding a button,follow the following format:</p>
        <p>eg: <code>$data_item=array("type" =>"button","name" =>"view1","id" =>"view1" ,"value" =>"<i class='fa fa-eye'>( this is a font awesome code)</i>", "additional_properties"=>"onclick='view_details(1)' class='btn btn-block' style=background:blue;color:white ");</code></p>
        <p><code>$data[]=$data_item; </code></p>
        <p><code>$response[]=$data;</code></p>

        <p> II. Incase of adding a normal text,follow the following format:</p>
        <p>eg: <code>$data_item=array("type" =>"text","name" =>"view1","id" =>"view1" ,"value" =>"kofi1");</code></p>
        <p><code>$data[]=$data_item;</code></p>
        <p><code>$response[]=$data;</code></p>
        <br>
        <p>set response code - 200 eg: http_response_code(200);</code> `. </p>
        <p>Click the refresh button to load sample:  </p>
        <p>
          <button class="btn btn-sm btn-info" onclick="create_table('test_app/api/controllers/array_test.php','the_table');"><i class="fa fa-refresh"></i></button>
          <button class="btn btn-sm btn-danger" onclick="$('#the_table').html('');"><i class="fa fa-times"></i></button>
        </p>
        <hr>
        <div class="col-md-12 mb-4"  style="overflow-x: auto;overflow-y: auto;">
          <table class="table table-hover table-bordered" id="the_table">
            
          </table>
        </div>
      </section>
      <!--Section: Content-->
    </div>




  </div>
  <!-- /Start your project here-->

  <!-- SCRIPTS -->
  <!-- JQuery -->
  <script type="text/javascript" src="assets/libraries/jquery-3.4.0.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="assets/js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="assets/js/mdb.min.js"></script>

  <script type="text/javascript" src="assets/libraries/toaster/jquery.toaster.js"></script>
  <script type="text/javascript" src="assets/libraries/sweetalert2/dist/sweetalert2.all.min.js"></script>

  <script type="text/javascript" src="assets/libraries/kingslibrary.js"></script>
</body>

</html>
