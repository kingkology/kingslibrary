<?php 
// use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
header("Access-Control-Allow-Origin:*");
//content type as html
header("Content-Type:application/html");


// set response code - 200 ok
http_response_code(200);
?>
	<div class="container my-5 py-5 z-depth-1">
	  <!--Section: Content-->
		<section class="dark-grey-text text-center">
	    	<h3 class="font-weight-bold pt-4 mb-4">Material Design Blocks</h3>
	    	<h5 class="font-weight-bold font-italic mb-5">At vero eos et accusamus et iusto odio dignissimos qui cupiditate non provident.</h5>

		    <div class="row mx-lg-5 mx-md-3">
		      	<div class="col-md-6 mb-4">
		        
			        <div class="view mb-5">
			          <img src="assets/img/svg/undraw_grand_slam_0q5r.svg" class="img-fluid" alt="smaple image">
			        </div>
		        	<h5 class="font-weight-normal text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</h5>
		     	</div>
			     	<div class="col-md-6 mb-4">
				        <div class="view mb-5">
				          <img src="assets/img/png/undraw_basketball_agx4.png" class="img-fluid" alt="smaple image">
				        </div>
			        	<h5 class="font-weight-normal text-muted">Ut enim ad minim veniam, quis nostrud ut aliquip ex ea commodo consequat.</h5>

			      	</div>
		    </div>
	  </section>
	  <!--Section: Content-->

	</div>

<?php
?>