/**
 * 
 */

$(document).ready(function() {
	
	verifyresetPassword();
});


 $('#pwd').keypress(function(event) {
 	   var keycode = (event.keyCode ? event.keyCode : event.which);
	    if (keycode == 13) {
	    	   $('#reset' ).prop( "disabled", true );
			   resetPassword()
			   return false;
		}
	});
    
    $('#confpwd').keypress(function(event) {
 	   var keycode = (event.keyCode ? event.keyCode : event.which);
 	    if (keycode == 13) {
 	    	   $('#reset' ).prop( "disabled", true );
			   resetPassword();
			   return false;
 		}
 	});
    $('#code').keypress(function(event) {
 	   var keycode = (event.keyCode ? event.keyCode : event.which);
 	    if (keycode == 13) {
 		      $('#reset' ).prop( "disabled", true );
		      resetPassword();
		      return false;
 		}
 	});

  $('#reset').on('click',function(){
    	$('#reset' ).prop( "disabled", true );
		   resetPassword()
	   });
 
    $('#gotologin').on('click',function(){
	   
	   document.forms[0].action = 'admin.html';
 		   return true;
 		
 	   });
     
	    $.urlParam = function(name){
	        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return decodeURI(results[1]) || 0;
        }
    }

function verifyresetPassword(){
   
   var key = $.urlParam('key');
   
	$.ajax({
		url : "api/v1/resetpwdlinkverification",
		method : "POST",
		async : true,
		data: {
			    key : key			    
			},
		success : function(data) {
			var response=$.parseJSON(data);
			var status=response.status;
	        var msg  = response.message;
	        
	        if(status == 200){
	        	$('.loginform').show();		
			}else{
				$("#invalidLink").show();
			}
	         //1$("#msg").text(msg); 
	         //$('#reset' ).prop( "disabled", false );
	        
		}
	}).fail(function()
	 	{		
			$("#msg").empty();
			$("#msg").text("Internal server error."); 
		    $('#reset' ).prop( "disabled", false );
   		});
   
}




function resetPassword(){
	
	$('.loginform').show();
	$("#msg").empty();
	$(".spinner").css("display","block");
   var password = $("#pwd").val().trim();
   var confpassword = $("#confpwd").val().trim();
   var code = $("#code").val().trim();
   var key = $.urlParam('key');
   
   if(password ==  null || password == ""){
	   $(".spinner").hide();
	   $("#msg").text("Please enter password"); 
	   $('#reset' ).prop( "disabled", false );
   }
   else if(confpassword ==  null || confpassword == ""){
	   $(".spinner").hide();
	   $("#msg").text("Please enter new password"); 
	   $('#reset' ).prop( "disabled", false );
   }
   else if(confpassword != password){
	   $(".spinner").hide();
	   $("#msg").text("Confirm password and new password should be same");
	   $('#reset' ).prop( "disabled", false );
   }
   else if ((password.length < 8) &&  (confpassword.length < 8)){
	   $(".spinner").hide();
	  $("#msg").text("Password must be at least 8 characters.");
	  $('#reset' ).prop( "disabled", false );
   }
   
   else if(code ==  null || code == ""){
	   $(".spinner").hide();
	   $("#msg").text("Please enter code");
	   $('#reset' ).prop( "disabled", false );
   }else{
    		   $.ajax({
   				url : "api/v1/resetpwd",
   				method : "POST",
   				async : true,
   				data: {
   					    key : key,
   					    code : 	code,
   					    newPassword : confpassword
   					},
   				success : function(data) {
   					var response=$.parseJSON(data);
   					var status=response.status;
   			        var msg  = response.message;
   			        
   			       /* if(status == 401){
   						$("#msg").text("User name or password is wrong.");
   					}*/
   			         $(".spinner").hide();
   			         $("#msg").text(msg); 
   			         $('#reset' ).prop( "disabled", false );
   					 
   			         if(status == 200){	
	   			        	setTimeout(() => {
	   							window.location.href = 'admin.html';
							}, 5000);
   			         }
   						
   				   /*if(status == 401){
   						$("#msg").text("User Name or Password is wrong.");
   					}
   					else if(status == 500){
   						$("#msg").empty();
   						$("#msg").text("Internal Server Error."); 
   					}
   					else if(status == 405){
   						$("#msg").empty();
   					 	$("#msg").text("Access Denied"); 
   					}
   					else if(status == 406){
   						$("#msg").empty();
   						$("#msg").text(msg);
   					} */
   				}
   			}).fail(function()
   			 	{		
   				    $(".spinner").hide();
   					$("#msg").empty();
   					$("#msg").text("Internal server error."); 
   				    $('#reset' ).prop( "disabled", false );
   				});
   }
}