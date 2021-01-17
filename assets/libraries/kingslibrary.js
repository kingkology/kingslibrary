/*
Welcome to the kings library.
This is a dynamic library to take care of all front end to backend communications. 
it works with json,temporal storage,sweet alert, and the jquery library

Feel free to contribute to it on github @ https://github.com/kingkology/kingslibrary
*/




/*
This displays a toast/popup message
it takes 3 arguments.
1. (x) the priority of the message ('success' for green, 'info' for blue, 'warning' for orange, 'danger' for red)
2. (y) the title of the message (optional : you can put an empty quote eg: '')
3. (z) the message to show
eg: Toastz('success','','Data inserted Successfully')
*/
function Toastz(x,y,z)
{
	var priority = x;
	var title    = y;
	var message  = z;

	$.toaster({ priority : priority, title : title, message : message });
}



/*
This checks to see if 2 password inputs are the same
it takes 3 arguments.
1. (x) the id of the first password input
2. (y) the id of the second password input
3. (z) the id of the element to display the error message

eg: <input type="password" id="1" oninput="checknewpass('1','2','error_here');">
	<input type="password" id="2" oninput="checknewpass('1','2','error_here');">
	<label id="error_here"></label>
*/
function checknewpass(x,y,z)
{
	var pwd1=document.getElementById(x).value;
	var pwd2=document.getElementById(y).value;

	if (pwd1=="" || pwd2=="")
	{
		return;
	}

	if (pwd1!=pwd2) 
	{
		document.getElementById(z).innerHTML="Passwords do not match!";

	}
	else
	{
		document.getElementById(z).innerHTML="";

	}

}


/*
This reads an image input and displays the image in a div element
it takes 2 arguments.
1. (input) the image input id
2. (x) the id of the image element
3. (y) the id of the element to display the image

eg. show_image(this,'picture_id','display_element_id') 
*/
 function show_image(input,x,y) 
{
  	let imagehold=y;

  	let fileUpload = document.getElementById(x);
   	if (typeof (fileUpload.files) != "undefined") 
   	{
        var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);
        if (size>5000) 
        {
        	Swal.fire('',"This image is larger than 5mb.",'error');
        	document.getElementById(x).value = "";
            return;
         }
    } 
    else 
    {
        Swal.fire('',"This browser does not support HTML5.",'error');
    }
	if (input.files && input.files[0]) 
    {
        let reader = new FileReader();
		reader.onload = function (e) 
        {
            $('#'+imagehold).attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}



//EXPORT TABLE TO EXCEL
/*
This exports a table to excel
it takes only one argument
1. (x) the id of the table to be exported
*/
//EXPORT TABLE TO EXCEL
 function ExportToExcel(x)
{
var tablez=x;
var htmltable= document.getElementById(x);
    
    $(htmltable).table2excel({
        exclude: ".noExl",
        name: "Excel Document",
        filename: "excel" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });

/*var html = htmltable.outerHTML;
window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));*/
}



//prints a div or a page

 function PrintContent(x)
{
    var printid=x;
    var DocumentContainer = document.getElementById(printid);
    var WindowObject = window.open("", "PrintWindow","top=70,toolbars=no,scrollbars=yes,status=no,resizable=yes");

    WindowObject.document.write('<link href="../assets/font-awesome-4.7.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">')
    WindowObject.document.write('<link href="../assets/css/style.css" rel="stylesheet" type="text/css"/>')
    WindowObject.document.write('<link href="../assets/css/mdb.min.css" rel="stylesheet" type="text/css"/>')
    WindowObject.document.write('<link href="../assets/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>')
    WindowObject.document.writeln(DocumentContainer.innerHTML);
    WindowObject.document.close();
    setTimeout(function(){
    WindowObject.focus();
    WindowObject.print();
    WindowObject.close();
},6000);
}


/*
CREATE TEXTBOX (create_textbox)

this function builds a textbox and inserts the values assigned to it.
remember to modify the div class and css to fit your theme
1. (a) represents the value.
2. (b) represents the id to be given to the textbox, usually its the count value.
3. (c) represents the name to be given to the text box, usually its the name in the json values.
4. (x) represents the label name of the textbox
5. (y) represents the property of the textbox (classes, properties or css)
7. (z) represents the textbox type (text or number)

eg: create_textbox("kofi","value1","username","Username","hidden disabled style='color:white;background:blue' onclick='view_details(1)'",'text')
*/
function create_textbox(a,b,c,x,y,z)
{

	let the_textbox="";
	the_textarea='<div class="form-group has-feedback">';
	if (x!="") {the_textbox=the_textbox+'<label>'+x+'</label>';}
	the_textbox=the_textbox+'<input type="'+z+'" name="'+c+'" id="'+b+'" value="'+a+'" '+y+' >';
	the_textarea=the_textarea+'</div>';
	return the_textbox;
}


/*
CREATE TEXT AREA (create_textarea)

this function builds a text area and inserts the values assigned to it.
remember to modify the div class and css to fit your theme
1. (a) represents the value.
2. (b) represents the id to be given to the textarea, usually its the count value.
3. (c) represents the name to be given to the text box, usually its the name in the json values.
4. (x) represents the label name of the textarea
5. (y) represents the property of the textarea (classes, properties or css)

eg: create_textarea('kofi is a box','value1','username','Username',"hidden disabled style='color:white;background:blue' onclick='view_details(1)'")
*/
function create_textarea(a,b,c,x,y,z)
{

	let the_textarea="";
	the_textarea='<div class="form-group has-feedback">';
	if (x!="") {the_textarea=the_textarea+'<label>'+x+'</label>';}
	the_textarea=the_textarea+'<textarea class="form-control" name="'+c+'" id="'+b+'" '+y+' >'+a+'</textarea>';
	the_textarea=the_textarea+'</div>';
	return the_textarea;
}


/*
CREATE Combobox (create_combobox)

this function builds a combobox and inserts the values assigned to it.
remember to modify the div class and css to fit your theme
1. (a) represents the value (the option value and the display value) as an array.
2. (b) represents the id to be given to the combobox, usually its the count value.
3. (c) represents the name to be given to the combobox, usually its the name in the json values.
4. (x) represents the label name of the combobox
5. (y) represents the property of the textarea (classes, properties or css)

eg: create_combobox([{opt_val:admin,disp_val:Administrator},{opt_val:admin,disp_val:Administrator}],'value1','access_right','Username',"hidden disabled style='color:white;background:blue' onclick='view_details(1)'")
*/
function create_combobox(a,b,c,x,y,z)
{
	if (z=='enabled') {z="";}
	if (y=='visible') {y="";}

	let the_combobox="";
	the_combobox='<div class="form-group has-feedback">';
	the_combobox=the_combobox+'<label>'+x+'</label>';
	the_combobox=the_combobox+'<select class="form-control" type="'+q+'" name="'+c+'" id="'+b+'" '+y+' >';
	for (var i = 0; i < a.length; i++) {
		the_combobox=the_combobox+'<option value="'+a[i][0]+'">'+a[i][1]+'</option>'
	}
	the_combobox=the_combobox+'</select>';
	the_combobox=the_combobox+'</div>';

	return the_combobox;
}



/*
CREATE button (create_button)

this function builds a button and inserts the values assigned to it.
remember to modify the div class and css to fit your theme
1. (a) represents the value (the option value and the display value) as an array.
2. (b) represents the id to be given to the button, usually its the count value.
3. (c) represents the name to be given to the button, usually its the name in the json values.
4. (x) represents any other properties you would want to assign to the button eg: calling of modals or specifying style

eg: create_button("<i class='fa fa-eye'></i>","view0","view0","hidden disabled style='color:white;background:blue' onclick='view_details(1)' ")
*/
function create_button(a,b,c,x,y)
{

	let the_button="";
	the_button=the_button+'<button name="'+c+'" id="'+b+'" '+x+' >'+a+'</button>';
	
	return the_button;
}





/*
This  calls the data belonging to an object through a click event or any other specified event
it takes 2 arguments.
1. (url) the data generating url (api)
2. (display_location) where to diplay the response eg: id of a div or id of an html element
eg.call_pagelet('../backend/product/load_data.php?id=1','pagelet_display')


*/
function call_pagelet(url,display_location)
{
	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : url, // the url where we want to POST
	    /*data        : formData, // our data object*/
	    dataType    : 'html' // what type of data do we expect back from the server
		})
		// using the done promise callback
	    .done(function(rs, textStatus, xhr) 
	    {
	    	// nreceive the reference component that will host component and the response after sending the request
	    	var data=rs;
	    	// Toastify({ text:  data , duration: 3000, newWindow: true, close: true, gravity: "bottom", position: "left", backgroundColor: "#D32929", stopOnFocus: true }).showToast();
	    	// now you state where to display the component
	    	document.getElementById(display_location).innerHTML=data;
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	      //Server failed to respond - call emergency default page
	      call_default_pagelet('404.php',display_location)
	      return;
	    });
}



/*
this is an emergency function for calling the defalut dashboard page 
incase the requested page with call_pagelet fails
*/
function call_default_pagelet(url,display_location)
{
	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : url, // the url where we want to POST
	    /*data        : formData, // our data object*/
	    dataType    : 'html' // what type of data do we expect back from the server
		})
		// using the done promise callback
	    .done(function(rs, textStatus, xhr) 
	    {
	    	// nreceive the reference component that will host component and the response after sending the request
	    	var data=rs;
	    	// Toastify({ text:  data , duration: 3000, newWindow: true, close: true, gravity: "bottom", position: "left", backgroundColor: "#D32929", stopOnFocus: true }).showToast();
	    	// now you state where to display the component
	    	document.getElementById(display_location).innerHTML=data;
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	      //Server failed to respond - Show an error message
	      let response=Object.values(responseText);
	      response_value=Object.values(response[17]);
	      response_value=response_value[0];

	      let response_code=response[18];
	      let code_text=response[17];

	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	      return;
	    });
}



/*
This calls the data belonging to an object through a click event or any other specified event to build a table
it takes 4 arguments.
1. (url) the data generating url (api)
2. (display_location) where to diplay the response eg: id of a div or id of an html element (<table id="the_table"></table>)
3. (start) the point to select data from
4. (limit) the limit of data to display/number of rows to display
eg.create_table('../backend/product/load_data.php?id=1','call_pagelet')

example response from php api
###########################################################################################################
$response=array();

$data_item=array("th1" =>"VIEW","th2" =>"DELETE","th3" =>"ID" ,"th4" =>"NAME" );
$data[]=$data_item;
$response[]=$data;

for ($i=1; $i <= 10; $i++) 
{ 
	$data=array();
	$the_id=$i;
	$data_item=array("type" =>"button","name" =>"view".$the_id,"id" =>"view".$the_id ,"value" =>"<i class='fa fa-eye'></i>", "additional_properties"=>"onclick='view_details(".$the_id.")' class='btn btn-block' style=background:blue;color:white ");
	$data[]=$data_item;

	$data_item=array("type" =>"button","name" =>"view".$the_id,"id" =>"view".$the_id ,"value" =>"<i class='fa fa-times'></i>", "additional_properties"=>" onclick='view_details(".$the_id.")' class='btn btn-block' style=background:red;color:black ");
	$data[]=$data_item;

	$data_item=array("type" =>"text","name" =>"id".$the_id,"id" =>"id".$the_id ,"value" =>$the_id );
	$data[]=$data_item;

	$data_item=array("type" =>"text","name" =>"name".$the_id,"id" =>"name".$the_id ,"value" =>"kofi".$the_id );
	$data[]=$data_item;


	$response[]=$data;
}

// set response code - 200 ok
http_response_code(200);
echo json_encode($response);

###############################################################################################################
*/
function create_table(url,display_location,start,limit)
{
	
	let response="";
	let table_header="";
	let table_body="";
	let array_response;
	let old_content=document.getElementById(display_location).innerHTML;
	document.getElementById(display_location).innerHTML="";
	document.getElementById(display_location).innerHTML="<p><center><i class=\"fa fa-refresh fa-4x fa-spin\"></i></center></p>";

	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : url, // the url where we want to POST
	    data        : {start:start,limit:limit}, // our data object*/
	    dataType    : 'json' // what type of data do we expect back from the server
		})
		// using the done promise callback
	    .done(function(rs, textStatus, xhr) 
	    {
	        // nreceive the reference component that will host response and the response after sending the request
	        let data=rs;
	        /*parse response as json object*/
	        array_response=(data);
	        /*get length of full response object*/
	        let response_length=array_response.length;
	        /*convert the header index from an object to an array*/
	        let header_values=Object.values(array_response[0][0]);
	        /*get length of header array*/
	        let header_length=header_values.length;
	        if (response_length>1) 
	        {
	        	/*Building table headers from the first array index*/
	        	table_header="<thead><tr>";
	        	for (let i=0; i < header_length; i++) 
	        	{
	        		table_header=table_header+"<th>"+header_values[i]+"</th>";
	        	}
	        	table_header=table_header+"</tr></thead>";
	        	response=table_header;
	        	/*Building table body from the rest of the array index*/
	        	table_body="<tbody>";
	        	for (let i=1; i < response_length; i++) 
	        	{
	        		/*convert the current object index from an object to an array*/
	        		let current_index=Object.values(array_response[i]);
	        		table_body=table_body+"<tr>";
	        		//loop through the td elements
	        		for (let j=0; j < current_index.length; j++) 
	        		{
	        			//convert the td value object to an array inorder to access the properties
	        			let td_content=Object.values(current_index[j]);
	        			switch(td_content[0])
	        			{
	        				case 'text':
	        					table_body=table_body+"<td id='"+td_content[2]+"' name='"+td_content[1]+"'>"+td_content[3]+"</td>";
	        				break;

	        				case 'button':
	        					table_body=table_body+"<td>"+create_button(td_content[3],td_content[2],td_content[1],td_content[4])+"</td>";
	        				break;

	        			}
	        		}
	        		table_body=table_body+"</tr>";

	        	}
	        	if (start<1) 
	        	{
	        		let new_start=((start*1)+(limit*1)+(1*1));
	        		table_body=table_body+'<tr><td colspan=2><button type="button" class="btn btn-sm btn-info waves-effect waves-light" onclick="create_table(\''+url+'\',\''+display_location+'\','+new_start+','+limit+')"><i class="fa fa-arrow-right"></i></button></tr></td></tbody>';
	        	}
	        	else
	        	{
	        		let new_start=((start*1)+(limit*1)+(1*1));
	        		let old_start=((start*1)-(limit*1)-(1*1));
	        		table_body=table_body+'<tr><td colspan=2><button type="button" class="btn btn-sm btn-info waves-effect waves-light"><i class="fa fa-arrow-left" onclick="create_table(\''+url+'\',\''+display_location+'\','+old_start+','+limit+')"></i></button><button type="button" class="btn btn-sm btn-info waves-effect waves-light" onclick="create_table(\''+url+'\',\''+display_location+'\','+new_start+','+limit+')"><i class="fa fa-arrow-right"></i></button></tr></td></tbody>';
	        	}
	        	
	        	response=table_header+table_body;
	        }
	        else
	        {
	        	Swal.fire("Error","No Table Headers Found On Index [0] Of The Returned Data","error");
	        	return;
	        }
	        document.getElementById(display_location).innerHTML=response;
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	    	document.getElementById(display_location).innerHTML=old_content;
	      //Server failed to respond - Show an error message
	      let response=Object.values(responseText);
	      response_value=Object.values(response[17]);
	      response_value=response_value[0];

	      let response_code=response[18];
	      let code_text=response[19];

	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	      return;
	    });
}


/*
This fetches the data belonging to a form through a click event or any other specified event and serializes it to be sent to an Api For processing
it takes 2 arguments.
1. (url) the url (api) to receive and process the data
2. (form_id) The ID of the form that contains the data to be processed
NB: Your action button should not be a form submit button.
eg.insert_data('../backend/user/add_user.php','user_add_form')


*/
function insert_data(url,form_id)
{

	  var form = $('#'+form_id);
	  var the_data=[];
	  the_data=form.serializeArray();

	  var output = [];

	  the_data.forEach(function(item) {
	    var existing = output.filter(function(v, i) {
	      return v.name == item.name;
	    });
	    if (existing.length) {
	      var existingIndex = output.indexOf(existing[0]);
	      output[existingIndex].value = output[existingIndex].value.concat(item.value);
	    } else {
	      if (typeof item.value == 'string')
	        item.value = [item.value];
	      output.push(item);
	    }
	  });

	  /*console.log(output);*/


	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : url, // the url where we want to POST
	    data        : output, // our data object
	    dataType    : 'json' // what type of data do we expect back from the server
	})
	// using the done promise callback
	    .done(function(responseText) 
	    {
	    	// nreceive the response after sending the request
	    	let response=Object.values(responseText);
	      	response=response[0];
	      	Swal.fire("Success", response, "success");
	      	$('#'+form_id)[0].reset();
	      	return;

	    	
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	      //Server failed to respond - Show an error message
	      let response=Object.values(responseText);
	      response_value=Object.values(response[17]);
	      response_value=response_value[0];

	      let response_code=response[18];
	      let code_text=response[19];

	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	      return;
	    });

}


/*
This fetches the data belonging to a form through a click event or any other specified event and serializes it to be sent to an Api For processing
it takes 2 arguments.
1. (url) the url (api) to receive and process the data
2. (form_id) The ID of the form that contains the data to be processed
NB: Your action button should not be a form submit button.
eg.insert_data('../backend/user/add_user.php','user_add_form')


*/
function update_form(url,form_id)
{
	  var form = $('#'+form_id);
	  var the_data=[];
	  the_data=form.serializeArray();

	  var output = [];

	  the_data.forEach(function(item) {
	    var existing = output.filter(function(v, i) {
	      return v.name == item.name;
	    });
	    if (existing.length) {
	      var existingIndex = output.indexOf(existing[0]);
	      output[existingIndex].value = output[existingIndex].value.concat(item.value);
	    } else {
	      if (typeof item.value == 'string')
	        item.value = [item.value];
	      output.push(item);
	    }
	  });

	  /*console.log(output);*/
	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : url, // the url where we want to POST
	    data        : output, // our data object
	    dataType    : 'json' // what type of data do we expect back from the server
	})
	// using the done promise callback
	    .done(function(responseText) 
	    {
	    	// nreceive the response after sending the request
	    	let response=Object.values(responseText);
	      	response=response[0];
	      	Swal.fire("Success", response, "success");
	      	$('#'+form_id)[0].reset();
	      	return;	
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	      //Server failed to respond - Show an error message
	      let response=Object.values(responseText);
	      response_value=Object.values(response[17]);
	      response_value=response_value[0];

	      let response_code=response[18];
	      let code_text=response[19];

	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	      return;
	    });

}


/*
This fetches the data belonging to a form through a click event or any other specified event and serializes it to be sent to an Api For processing
it takes 2 arguments.
1. (url) the url (api) to receive and process the data
2. (values) The ID of the html elements that contains the data to be processed separated by comma
NB: Button must be a button or <a> tag with button properties 
eg.insert_data('../backend/user/add_user.php','pin,'name')


*/
function update_values(url)
{

	  /*console.log(output);*/
	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : url, // the url where we want to POST
	    /*data        : the_values,*/ // our data object
	    dataType    : 'json' // what type of data do we expect back from the server
	})
	// using the done promise callback
	    .done(function(responseText) 
	    {
	    	// nreceive the response after sending the request
	    	let response=Object.values(responseText);
	      	response=response[0];
	      	Swal.fire("Success", response, "success");
	      	return;	
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	      //Server failed to respond - Show an error message
	      let response=Object.values(responseText);
	      response_value=Object.values(response[17]);
	      response_value=response_value[0];

	      let response_code=response[18];
	      let code_text=response[19];

	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	      return;
	    });

}



/*
This  deletes data using a specified ID through a click event or any other specified event
it takes 2 arguments.
1. (url) the data generating url (api)
2. (item_id) id of the item to delete
eg.call_pagelet('../backend/product/load_data.php','1')


*/
function remove(url,item_id)
{
	Swal.fire({
	  title: 'Are you sure?',
	  text: "Dear User, you are about to delete this data.",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Accept',
	  cancelButtonText: "Decline"
	}).then((result) => {
	  if (result.isConfirmed) 
	  {
	    $.ajax({
	     	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	     	    url         : url, // the url where we want to POST
	     	    data        : {'id':item_id}, // our data object
	     	    dataType    : 'json' // what type of data do we expect back from the server
	     		})
	     		// using the done promise callback
	     	    .done(function(responseText) 
	     	    {
	     	    		// nreceive the response after sending the request
	     	    		let response=Object.values(responseText);
	     	    	  	response=response[0];
	     	    	  	Swal.fire("Success", response, "success");
	     	    	  	return;

	     	    })
	     	    // using the fail promise callback
	     	    .fail(function(responseText) 
	     	    {
	     	       //Server failed to respond - Show an error message
	     	      let response=Object.values(responseText);
	     	      response_value=Object.values(response[17]);
	     	      response_value=response_value[0];

	     	      let response_code=response[18];
	     	      let code_text=response[19];

	     	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	     	      return;
	     	    });
	  }
	  else
	  {
	  	Swal.fire("Cancelled", "Your data was not deleted", "error");
	  }
	});
}


/*
This  deletes data using a specified ID through a click event or any other specified event
it takes 4 arguments.
1. (url) the data generating url (api)
2. (item_id) id of the item to delete
2. (table_id) id of the tablle to delete from
4. (r) `this` parameter to indicate the current row the delete action is being performed on
eg.remove_row('../backend/product/load_data.php','1',this)

*/
function remove_row(url,item_id,table_id,r)
{

	Swal.fire({
	  title: 'Are you sure?',
	  text: "Dear User, you are about to delete this data.",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Accept',
	  cancelButtonText: "Decline"
	}).then((result) => {
	  if (result.isConfirmed) 
	  {
	    $.ajax({
	     	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	     	    url         : url, // the url where we want to POST
	     	    data        : {'id':item_id}, // our data object
	     	    dataType    : 'json' // what type of data do we expect back from the server
	     		})
	     		// using the done promise callback
	     	    .done(function(responseText) 
	     	    {
	     	    		// nreceive the response after sending the request
	     	    		let response=Object.values(responseText);
	     	    	  	response=response[0];

	     	    	  	//delete row from interface
	     	    	  	let i=r.parentNode.parentNode.rowIndex;
	     	    	  	document.getElementById(table_id).deleteRow(i);

	     	    	  	Swal.fire("Success", response, "success");
	     	    	  	return;

	     	    })
	     	    // using the fail promise callback
	     	    .fail(function(responseText) 
	     	    {
	     	       //Server failed to respond - Show an error message
	     	      let response=Object.values(responseText);
	     	      response_value=Object.values(response[17]);
	     	      response_value=response_value[0];

	     	      let response_code=response[18];
	     	      let code_text=response[19];

	     	      Swal.fire(response_code+'\n'+code_text, response_value, "error");
	     	      return;
	     	    });
	  }
	  else
	  {
	  	Swal.fire("Cancelled", "Your data was not deleted", "error");
	  }
	});

	
}


function get_stats_cims()
{

	let regval=[];
	let date_edited = [];
	let date_called = [];
	let isscrdz = [];
	let callz = [];
	let total_in_system = 0;
	let total_issued = 0;
	let total_unissued = 0;


	//total in system
	$("#tot_cards").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");
	//total claimed in system
	$("#tot_claimed").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");
	//total issued
	//$("#total_issued").html("<b>"+total_issued+"</b>");
	$("#total_issued").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");
	//total yet to issued
	$("#total_nissued").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");

	//my_claims
	$("#my_claims").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");
	//my_edits
	$("#my_edits").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");
	//my_issuance
	$("#my_issuance").html("<center><i class='fa fa-refresh fa-2x fa-spin'></i></center>");



	$.ajax({
	 	    type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
	 	    url         : '../apis/controllers/datagrams/datagrams.php', // the url where we want to POST
	 		})
	 		// using the done promise callback
	 	    .done(function(responseText) 
	 	    {
	 	    	if (responseText=="") 
	 	    	{
	 	    		Swal.fire('Error', 'No Data Returned', "error");
	 	    		return;
	 	    	}

	 	    	let regrecs=JSON.parse(responseText);
	 	    	let len=regrecs.length-1;
	 	    	let countz=0;
	 	    	let totz=0;
	 	    	let perc=0;

	 	    	for (let i = 0; i <= len; i++) 
	 	    	{

	 	    	  total_in_system=regrecs[i].total_Cards;
	 	    	  //total_issued=regrecs[i].total_issued;
	 	    	  //total_issued_2020=(regrecs[i].total_issued-4615)*1;
	 	    	  total_issued=(regrecs[i].total_issued)*1;
	 	    	  total_unissued=regrecs[i].total_unissued;
	 	    	  totz=(total_issued * 1)+(total_unissued * 1);

	 	    	  my_claims=(regrecs[i].my_claims)*1;
	 	    	  my_edits=(regrecs[i].my_edits)*1;
	 	    	  my_issuance=(regrecs[i].my_issuance)*1;

	 	    	}

	 	    	//total in system
	 	    	$("#tot_cards").html("<b>"+total_in_system+"</b>");

	 	    	//total claimed in system
	 	    	$("#tot_claimed").html("<b>"+totz+"</b>");
	 	    	//percentage
	 	    	$("#tclaim").css("width",((totz*100)/(total_in_system)));
	 	    	$("#tclaim").prop("title",(round(((totz*100)/(total_in_system)),2))+"%");

	 	    	//total issued
	 	    	$("#total_issued").html("<b>"+total_issued+"</b>");
	 	    	//percentage
	 	    	$("#tissue").css("width",((total_issued*100)/(total_in_system)));
	 	    	$("#tissue").prop("title",(round(((total_issued*100)/(total_in_system)),2))+"%");
	 	    	

	 	    	//total yet to issued
	 	    	$("#total_nissued").html("<b>"+total_unissued+"</b>");
	 	    	//percentage
	 	    	$("#tnissue").css("width",((total_unissued*100)/(total_in_system)));
	 	    	$("#tnissue").prop("title",(round(((total_unissued*100)/(total_in_system)),2))+"%");
	 	    	

	 	    	//my_claims
	 	    	$("#my_claims").html("<b>"+my_claims+"</b>");
	 	    	//my_edits
	 	    	$("#my_edits").html("<b>"+my_edits+"</b>");
	 	    	//my_issuance
	 	    	$("#my_issuance").html("<b>"+my_issuance+"</b>");


	 	    })
	 	    // using the fail promise callback
	 	    .fail(function(responseText) 
	 	    {

	 	      Swal.fire('Error', responseText, "error");
	 	      return;
	 	    });

	
}


function round(value, decimals) 
{
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}



function check_pin(x,y,z)
{

	let pagelocaction=x;
	let message_label=y;
	let textbox_container=z;
	//change the button state to loading
	$("#"+message_label).html('<h2><center><i class="fa fa-refresh fa-spin fa-1x"></i></center></h2>');
	$.ajax({
		url : pagelocaction,
		type : "POST",
		success : function(data)
		{
			if (data=="") 
			{
				$("#thesname").show();
				$("#thefname").show();
				$("#thedob").show();
				$("#thetel").show();
				return;
			}
			if (data=="Found") 
				{
					$("#"+textbox_container).css('border-color','green');
					$("#"+message_label).css('color','green');
					$("#"+message_label).html('In System');
					$("#thesname").hide();
					$("#thefname").hide();
					$("#thedob").hide();
					$("#thetel").hide();
					return;
				}
			if (data=="Not Found") 
				{
					$("#thesname").show();
					$("#thefname").show();
					$("#thedob").show();
					$("#thetel").show();
					$("#"+textbox_container).css('border-color','orange');
					$("#"+message_label).css('color','orange');
					$("#"+message_label).html('Not In System');
					return;
				}
			if (data=="This Record Has Been Issued") 
				{
					$("#thesname").show();
					$("#thefname").show();
					$("#thedob").show();
					$("#thetel").show();

					$("#"+textbox_container).css('border-color','red');
					$("#"+message_label).css('color','red');
					$("#"+message_label).html(data);
					return;

				}
		},
		error : function(data) 
		{
			$("#thesname").show();
			$("#thefname").show();
			$("#thedob").show();
			$("#thetel").show();
			$("#"+message_label).html('');
			return;
		}
	}
	);
}


function not_in_system(x,y,z)
{

	let pagelocaction=x;
	//set default value to attach to url as none
	pagelocaction=pagelocaction+"?default_value=none";
	let arrz=[];
	let values_to_send=[];
	let retz=y;
	//split textboxvalues by the ","
	arrz=Array.from(retz.split(","));
	values_to_send=JSON.stringify(arrz)
	values_to_send=JSON.parse(values_to_send);
	let len=values_to_send.length;
	//button id
	let thebtn="#"+z;
	let btnz=$(thebtn).html();
	//change the button state to loading
	$(thebtn).html('<i class="fa fa-refresh fa-spin"></i>');
	//check for empty values
	for (let i = 0; i <= len-1; i++) 
	{	
//		if ($("#"+values_to_send[i]).val()=="") {Swal.fire('warning',values_to_send[i]+" is empty",'warning');$(thebtn).html(btnz);return;}else{pagelocaction=pagelocaction+'&'+values_to_send[i]+'='+$("#"+values_to_send[i]).val();}
		pagelocaction=pagelocaction+'&'+values_to_send[i]+'='+$("#"+values_to_send[i]).val();
	
	}

	$.ajax({
		url : pagelocaction,
		type : "POST"})
		.done(function(responseText) 
	 	{
	 	   let data=responseText;
	 	   if (data=="") 
	 	   {
	 	   	$("#thesname").show();
	 	   	$("#thefname").show();
	 	   	$("#thedob").show();
	 	   	$("#thetel").show();
	 	   	$(thebtn).html(btnz);
	 	   	$('#pinz').focus();
	 	   	Swal.fire('No Data Returned',data,'warning');$(thebtn).html(btnz);
	 	   }
	 	   if (data=="This record has been transfered to your station." || data=="Record Added Successfully") 
	 	   {
	 	   	$('#pinz').val('GHA-');$('#sn').val('');$('#dob').val('');$('#cnumz').val('');$('#fn').val('');$('#box_num').val('');
	 	   	$("#pinz").css('border-color','black');$("#is_in").css('color','black');$("#is_in").html('');
	 	   	$("#thesname").show();
	 	   	$("#thefname").show();
	 	   	$("#thedob").show();
	 	   	$("#thetel").show();
	 	   	$(thebtn).html(btnz);
	 	   	$('#pinz').focus();
	 	   	Swal.fire('Success',data,'success');
	 	   }
	 	   else
	 	   {
	 	   	//$("#pinz").css('border-color','black');$("#is_in").css('color','black');$("#is_in").html('');return;
	 	   	$("#thesname").show();
	 	   	$("#thefname").show();
	 	   	$("#thedob").show();
	 	   	$("#thetel").show();
	 	   	$(thebtn).html(btnz);
	 	   	$('#pinz').focus();
	 	   	Swal.fire('error',data,'error');
	 	   }
	 	   
	 	   $(thebtn).html(btnz); 	

	 	})
	 	// using the fail promise callback
	 	.fail(function(responseText) 
	 	{
			Swal.fire('Error', responseText, "error");
	 	    return;
	 	});
	$(thebtn).html(btnz);
}


function new_request(x,y)
{
	let thebtn="#"+y;
	let btnz=$(thebtn).html();
	let z=btnz;

	//change the location state to loading
	$(thebtn).html('<center><i class="fa fa-refresh fa-3x fa-spin"></i></center>');

	  /*console.log(output);*/
	$.ajax({
	    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	    url         : x, // the url where we want to POST
	    /*data        : the_values,*/ // our data object
	    dataType    : 'json' // what type of data do we expect back from the server
	})
	// using the done promise callback
	    .done(function(responseText) 
	    {
	    	// nreceive the response after sending the request
	    	let response=Object.values(responseText);
	      	response=response[0];
	      	Swal.fire("Success", response, "success");

	      	myTimer=setInterval(my_request,10000);
	      	return;	
	    })
	    // using the fail promise callback
	    .fail(function(responseText) 
	    {
	    	$(thebtn).html(btnz);
		    //Server failed to respond - Show an error message
		    let response=Object.values(responseText);
		    response_value=Object.values(response[17]);
		    response_value=response_value[0];

		    let response_code=response[18];
		    let code_text=response[19];

		    Swal.fire(response_code+'\n'+code_text, response_value, "error");
		    return;
	    });
}

function my_request()
{

	$.ajax({
		url : '../../cims/apis/controllers/requests/my_center_request.php',
		type : "POST",
		success : function(data)
		{
			if (data=="Request Approved") 
			{	
				clearInterval(my_request);
				let thebtn="#the_place";
				$(thebtn).html('<center><h3>Kindly refresh page</h3></center>');
				Swal.fire('','Your Request For A Center Change Has Been Approved.Kindly Refresh Page For Changes To Reflect','success');
					
			}
			else if (data=="Request Rejected") 
			{
				clearInterval(my_request);
				Swal.fire('','Your Request Is Rejected.','error');

				let thebtn="#the_place";
				$(thebtn).html('<center><h3>Kindly refresh page</h3></center>');
					
			}
			else
			{
				
			}

		},
		error : function(data) 
		{	
			clearInterval(my_request);
			let thebtn="#the_place";
			$(thebtn).html('<center><h3>Kindly refresh page</h3></center>');
	      	//Server failed to respond - Show an error message
	      	let response=Object.values(responseText);
	      	response_value=Object.values(response[17]);
	      	response_value=response_value[0];

	      	let response_code=response[18];
	      	let code_text=response[19];

	      	Swal.fire(response_code+'\n'+code_text, response_value, "error");
	      	return;
		}
	});
}




function approve_request(v,w,x,y,z,k)
{

	//button id
	let thebtn="#"+k;
	let btnz=$(thebtn).html();
	//change the button state to loading
	$(thebtn).html('<i class="fa fa-refresh fa-spin"></i>');
	let theurl='../apis/controllers/requests/approve_center_change.php?pinz='+v+'&center='+w+'&center_name='+x+'&center_statz='+y+'&request_statz='+z;

	$.ajax({
		url : theurl,
		type : "POST"
	})
	// using the done promise callback
	    .done(function(data) 
	    {
	    	$(thebtn).html(btnz);
	    	// nreceive the response after sending the request
	    	if (data=="Success") {Swal.fire('Success','Request Updated Successfully','success');$('#show_n_request').click();}
	    	else if (data=="Failed") {Swal.fire('Error','Error Occured While approving request','warning');}
	    	else if (data=="Approval Failed.Error Adding New Center") {Swal.fire('Error','Approval Failed.Error Adding New Center','error');}
	    	else{Swal.fire('',data,'warning');}
	      	return;	
	    })
	    // using the fail promise callback
	    .fail(function(data) 
	    {
	      //Server failed to respond - Show an error message
	      $(thebtn).html(btnz);
	      Swal.fire('error', data, "error");
	      return;
	    });

	
}
