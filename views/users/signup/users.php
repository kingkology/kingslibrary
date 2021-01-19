<?php 
session_start();

$dt=new DateTime('now', new DateTimezone('Africa/Accra'));
$ladate = $dt->format('Y-m-d');
$lamonth= $dt->format('m');
$latodayz = $ladate;
$ladatez = $dt->format('Y-m-d H:i:s');
$latimez = $dt->format('H:i:s');


?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Akrotech Kingslibrary</title>
  <!-- Font Awesome -->
  <link href="../../../assets/libraries/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet">
  <!-- Bootstrap core CSS -->
  <link href="../../../assets/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="../../../assets/css/mdb.min.css" rel="stylesheet">
  <!-- Your custom styles (optional) -->
  <link href="../../../assets/css/style.css" rel="stylesheet">


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

<?php 
if (isset($_SESSION['backend_message'])) 
{
  ?>
  <body onload="Swal.fire('<?php echo $_SESSION['message_type']; ?>', '<?php echo $_SESSION['backend_message']; ?>', '<?php echo $_SESSION['message_type']; ?>');">
  <?php
  unset($_SESSION['message_type']);
  unset($_SESSION['backend_message']);
  session_unset(); 
} 
else 
{
?>
<body >
<?php
}
?>

  <!-- Start your project here-->

  <!-- Navigation -->
    <header>
      <!-- Navbar -->
      
      <!-- Navbar -->
      <!-- Intro -->
      <div class="card card-intro blue-gradient">
        <div class="card-body white-text rgba-black-light text-center">
          <!--Grid row-->
          <div class="row d-flex justify-content-center">
            <!--Grid column-->
            <div class="col-md-6">
              <p class="h5 mb-2">
                Kings frame login sample
              </p>
              <p class="mb-0">This sample is a full page and not a pagelete and should be called by using the normal href navigation. that is <pre><code>&lt;a href='views/users/login/users.php'&gt;&lt;/a&gt;</code></pre></p>
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
        
        <form class="border border-light p-5" id="user_login_form" autocomplete="off" method="post" action="../../../controllers/users/signup/users.php" enctype="multipart/form-data">


                <p class="h4 mb-4 text-center">Add User</p>

                <label>Your Name</label>
                <input type="text" id="value1" name="user_name" class="form-control mb-4" placeholder="Your Name" required>

                <label>Your Number</label>
                <input type="number" id="value2" name="user_telephone" class="form-control mb-4" placeholder="Telephone" required>

                <label>Your Email</label>
                <input type="email" id="value3" name="user_email" class="form-control mb-4" placeholder="E-mail" required>

                <label>Gender</label>
                <div>
                  <!-- Default inline 1-->
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="value4a" name="user_type" value="Male">
                    <label class="custom-control-label" for="value4a">Male</label>
                  </div>

                  <!-- Default inline 2-->
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="value4b" name="user_type" value="Female">
                    <label class="custom-control-label" for="value4b">Female</label>
                  </div>
                </div>
                <br>

                <label>Location</label>
                   <select class="browser-default custom-select mb-4" id="value5" name="location">
                       <option value="" selected>Choose option</option>
                       <option value="Accra">Accra</option>
                       <option value="Kumasi">Kumasi</option>
                       <option value="Kasoa">Kasoa</option>
                   </select>

                <label>Your Hobbies</label>
                <div>
                  <!-- Default inline 1-->
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" class="custom-control-input" name="hobbies" id="value6a" value="Dancing">
                    <label class="custom-control-label" for="value6a">Dancing</label>
                  </div>

                  <!-- Default inline 2-->
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" class="custom-control-input" name="hobbies" id="value6b" value="Singing">
                    <label class="custom-control-label" for="value6b">Singing</label>
                  </div>

                  <!-- Default inline 3-->
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" class="custom-control-input" name="hobbies" id="value6c" value="Sleeping">
                    <label class="custom-control-label" for="value6c">Sleeping</label>
                  </div>

                </div>
                <br>
                <label>Your Password</label>
                <input type="password" id="value7" name="user_password" class="form-control mb-4" placeholder="Password" onkeyup="checknewpass('value7','value8','pwd_message')" required>

                <label style="color:red" id="pwd_message"></label>
                <br>

                <label>Confirm Password</label>
                <input type="password" id="value8" name="user_password2" class="form-control mb-4" placeholder="Password" onkeyup="checknewpass('value7','value8','pwd_message')" required>

               

                <a class="btn btn-info btn-lg my-4" onclick="insert_data('controllers/users/add_user.php','user_add_form');">Add User</a>

          

        </form>

      </section>
      <!--Section: Content-->
    </div>




  </div>
  <!-- /Start your project here-->

  <!-- SCRIPTS -->
  <!-- JQuery -->
  <script type="text/javascript" src="../../../assets/libraries/jquery-3.4.0.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="../../../assets/js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="../../../assets/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="../../../assets/js/mdb.min.js"></script>

  <script type="text/javascript" src="../../../assets/libraries/toaster/jquery.toaster.js"></script>
  <script type="text/javascript" src="../../../assets/libraries/sweetalert2/dist/sweetalert2.all.min.js"></script>

  <script type="text/javascript" src="../../../assets/libraries/kingslibrary.js"></script>
</body>

</html>
