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
              <p class="mb-0">This sample is a full page and not a pagelete and should be called by using the normal href navigation. that is <pre><code style="color:white"le>&lt;a href='views/users/login/users.php'&gt;&lt;/a&gt;</code></pre></p>
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
        
        <form class="border border-light p-5" id="user_login_form" autocomplete="off" method="post" action="../../../controllers/users/login/users.php" enctype="multipart/form-data">

            <p class="h4 mb-4 text-center">Login Sample</p>

            <label>Your Email</label>
            <input type="email" id="user_email" name="user_email" class="form-control mb-4" placeholder="E-mail" required>

            <br>
            <label>Your Password</label>
            <input type="password" id="user_password" name="user_password" class="form-control mb-4" placeholder="Password" required>


           

            <button type="submit" class="btn btn-info btn-lg my-4" >Login</a>

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
