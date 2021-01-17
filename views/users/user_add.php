<?php 
// use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
header("Access-Control-Allow-Origin:*");
//content type as json
header("Content-Type:application/html");



// set response code - 200 ok
http_response_code(200);
?>

	<form class="border border-light p-5" id="user_add_form">

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



<?php



?>