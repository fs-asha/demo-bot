var searchText="";
var askquestion="";
var question = 0;
var shouldFix = 0; 
var ordered_by = "insert_timestamp";
var order_type = "asc";
var permissionList = "";
//var userRole = "";	
var InitialchatVal = "";
var alerted = "no";
var isWebScoketConnected = false;
//var authenticationBy ="";

( function($) {
		$(document).ready(function() {
			$(".zEWidget-launcher").hide(); //for support
			$('#support').click(function() {
				zE(function() { zE.identify({ name: userNameForSupport, email: userEmaiIdForSupport }); });
				zE.activate();
	        });
			$('#support').keypress(function(event) {
				if (event.keyCode == 13) {
					zE(function() { zE.identify({ name: userNameForSupport, email: userEmaiIdForSupport }); });
					zE.activate();
				}
			});
			
			$('#noti_Button1').click(function() {

	            // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
	            $('#notifications1').fadeToggle('fast', 'linear', function() {
	                if ($('#notifications1').is(':hidden')) {
	                    $('#noti_Button1').css('background-color', '');
	                } else $('#noti_Button1').css('background-color', '#FFF'); // CHANGE BACKGROUND COLOR OF THE BUTTON.
	            });
	            
	            $('#noti_Counter1').fadeOut('slow'); // HIDE THE COUNTER.
	            
	            document.getElementById("myMenuss").style.display = "none";
	            document.getElementById("showMe").style.display = "block";
	            document.getElementById("hideMe").style.display = "none";

	            return false;
	        });
		
	        // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
	        $(document).click(function() {
	            $('#notifications1').hide();

	            // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
	            if ($('#noti_Counter1').is(':hidden')) {
	                // CHANGE BACKGROUND COLOR OF THE BUTTON.
	                $('#noti_Button1').css('background-color', '');
	            }
	        });

	        $('#notifications1').click(function() {
	            return false; // DO NOTHING WHEN CONTAINER IS CLICKED.
	        });
	  
	     
		    /* start code - Refresh page on click of browser back button*/
	       /*  var $input = $('#refresh1');
			 $input.val() == 'yes' ? location.reload(true) : $input.val('yes');
			 
			 var $input = $('#refresh');
			 $input.val() == 'yes' ? location.reload(true) : $input.val('yes');*/
			/* End code - Refresh page on click of browser back button */			
			
			 //setWorkspaceID();
			shouldFix = getParameterByName('shouldfix', 0);
			fixNewSciReady();
			$('#loginbtn').on('click',function(){
				login();
			});
		
			$('#loginbtn').keypress(function(event) {
				if (event.keyCode == 13) {
					login();
				}
			});
			
			$('#SkipLogin').on('click',function(){
				SkipLogin();
			});
			
			$('#logout').keypress(function(event) {
				if (event.keyCode == 13) {
					if(isWebScoketConnected){
			    		ws.close();
			    		//isWebScoketConnected =false;
			    	}
					
					logout();
				}
			});
			
			$('#logout').on('click',function(){
				if(isWebScoketConnected){
		    		ws.close();
		    	  //	isWebScoketConnected =false;
		    	} // websocket 
				logout();
			});
			
			$('#conersation_history').keypress(function(event) {
				if (event.keyCode == 13) {
					if(isWebScoketConnected){
			    		ws.close();
			    		//isWebScoketConnected =false;
			    	} // websocket 
					chatHistory.shortBy('date',1,1);
				}
			});
			
			$('#conersation_history').on('click',function(){
				if(isWebScoketConnected){
		    		ws.close();
		    		//isWebScoketConnected =false;
		    	} // websocket 
				chatHistory.shortBy('date',1,1);
			});
			
			$('#pgtMns_4').click(function() {
			    
				window.location.href = "ConversationHistory.html";
			});
			
			$('#password').keypress(function(event) {
				if (event.keyCode == 13) {
					$("#loginbtn").trigger( "click" );
				}
			});
			
			$('#query').keypress(function(event) {
				if (event.keyCode == 13) {
					askwatson();
				}
			});
			  
			$("#askwatson").click(function(e) {
				askwatson();
			});			
			
		});
		$(window).resize(fixNewSciResize);
	}(jQuery));


function login(){
	
	$("#ErrorBlock").empty();
	$(".spinner").css("display","block");
	var usrname = $("#username").val();
	var passwrd = $("#password").val(); 
	if(usrname=="" && passwrd==""){
		$(".spinner").hide();
		$("#ErrorBlock").empty();
		$("#ErrorBlock").html("Please input User Name and Password.");
		
	}
	else if(usrname==""){
		$(".spinner").hide();
		$("#ErrorBlock").empty();
		$("#ErrorBlock").html("Please input User Name.");
		
	}
	else if(passwrd==""){
		$(".spinner").hide();
		$("#ErrorBlock").empty();
		$("#ErrorBlock").html("Please input Password.");
		
	}
	else
		{
		  $('#loginbtn' ).prop( "disabled", true );
			
		  $.ajax({
				url : "api/v1/login",
				method : "POST",
				async : true,
				data: {
						usrname : usrname,
						pswd : passwrd,
						key:key,
						method:'8d4c82bb'
					},
				success : function(data) {
					var response=$.parseJSON(data);
					var loginStatus=response.loginStatus;
			
					if(loginStatus == 200){	
						var role=response.userInfo.role;
						clearCookie("session_Id");
						clearCookie("email_Id");
						document.cookie= "session_Id="+response.userInfo.session_Id;
			    		document.cookie= "email_Id="+response.userInfo.email_Id ; 
						
						var location_Navigate= "";
						if(role == "Admin"){
							location_Navigate = "ConversationHistory.html";
				        }else if(role == "User"){
				    		location_Navigate= "supportChat.html";							    	    
				    	}else if(role=="Marketing"){
				    		location_Navigate="UserInfo.html";
				    	}
				    	else{
				    		location_Navigate= "index.html"
				    	}
						
						var exportForm = document.createElement("form");
					    exportForm.method = "post";
					    exportForm.action = location_Navigate;
					    document.body.appendChild(exportForm);
					    exportForm.submit();
					    $(exportForm).remove();
					    permissionList = permission;
					}
					else if(loginStatus == 401){
						$(".spinner").hide();
						$("#ErrorBlock").html("User Name or Password is wrong.");
						//$('#loginbtn' ).prop( "disabled", false );
					}
					else if(loginStatus == 500){
						$(".spinner").hide();
						$("#ErrorBlock").empty();
						$("#ErrorBlock").html("Internal Server Error.");
					//	$('#loginbtn' ).prop( "disabled", false );
					}
					else if(loginStatus == 405){
						$(".spinner").hide();
						$("#ErrorBlock").empty();
						$("#ErrorBlock").html("Access Denied.");
					//	$('#loginbtn' ).prop( "disabled", false );
					}
					$('#loginbtn' ).prop( "disabled", false );
				}
			}).fail(function()
			 	{		
				    $(".spinner").hide();
					$("#ErrorBlock").empty();
					$("#ErrorBlock").html("Internal Server Error."); 
					$('#loginbtn' ).prop( "disabled", false );
				});
		}
}


function SkipLogin(){

/*	var usrname = $("#username").val();
	var passwrd = $("#password").val(); 
	if(usrname=="" && passwrd==""){
		$("#ErrorBlock").empty();
		$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">Please input User Name and Password.</div>");
	}
	else if(usrname==""){
		$("#ErrorBlock").empty();
		$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">Please input User Name.</div>");
	}
	else if(passwrd==""){
		$("#ErrorBlock").empty();
		$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">Please input Password.</div>");
	}
	else
		{*/
		
			$.ajax({
				url : "api/v1/SkipLogin",
				method : "POST",
				async : true,
				data: {
						usrname : "",
						pswd : ""
					},
				success : function(data) {
					var response=$.parseJSON(data);
					var loginStatus=response.loginStatus;
			
					if(loginStatus == 200){	
						var role=response.userInfo.role;
						clearCookie("session_Id");
						clearCookie("email_Id");
						document.cookie= "session_Id="+response.userInfo.session_Id;
			    		document.cookie= "email_Id="+response.userInfo.email_Id ; 
						
						var location_Navigate= "";
						if(role == "Admin"){
							location_Navigate = "ConversationHistory.html";
				        }else if(role == "Approver" || role == "Support"){
				        	location_Navigate = "requestDetails.html";							    	     
				        }else if(role == "User"){
				    		location_Navigate= "supportChat.html";							    	    
				    	}else if(role == "AdminAndSupport"){
				    		location_Navigate = "requestDetails.html";	
					    }else if(role == "AdminAndApprover"){
					    	location_Navigate = "requestDetails.html";	
					    }else{
				    		location_Navigate= "index.html"
				    	}
						
						var exportForm = document.createElement("form");
					    exportForm.method = "post";
					    exportForm.action = location_Navigate;
					    document.body.appendChild(exportForm);
					    exportForm.submit();
					    $(exportForm).remove();
					    permissionList = permission;
					}
					else if(loginStatus == 401){
						$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">User Name or Password is wrong.</div>");
					}
					else if(loginStatus == 500){
						$("#ErrorBlock").empty();
						$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">Internal Server Error.</div>"); 
					}
					else if(loginStatus == 405){
						$("#ErrorBlock").empty();
						$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">Access Denied.</div>"); 
					}
				}
			}).fail(function()
			 	{		
					$("#ErrorBlock").empty();
					$("#ErrorBlock").html("<div class=\"alert alert-danger\" style=\"text-align:center\">Internal Server Error.</div>"); 
				});
		/*}*/
}


function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


function clearCookie(cookie){
 	document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout(){
	var session_ID = getCookie("session_Id");
	
	if(isWebScoketConnected){
		ws.close();
	//	isWebScoketConnected =false;
		clearCookie("session_Id");
		clearCookie("email_Id");
	
	}// webscoket connection close
	
	  //remove cookies.
	// deleteAllCookies();
	  /*  var cookies = $.cookie();
	    for(var cookie in cookies) {
	    $.removeCookie(cookie);
	  }*/
	 
	    
	  $.ajax({
			 url : "api/v1/logout.html",
			 method : "POST",
			 async : true,
			 data: {
				 session_id : session_ID
	          },
	   success : function(data) {
		       window.location="admin.html";
		 }
	  }).fail(function(){
		   
	  });
 }

function checkSession(){
				 $.ajax({
						url : "api/v1/isValiedSessionId",
						method : "POST",
						async : true,
						data: {},
				  success : function(data) {
							  var response=$.parseJSON(data); 
							  if(!response.isSessionValied){
							 /*  if(response.getSessionId = "" && (!response.isSessionValied)){ */
								 // alert("check session = "+ response.isSessionValied);
					 	        //  var alerted = localStorage.getItem('alerted') || '';
					 	         
								  if (alerted != 'yes') {
									  alerted = "yes";
			 	        	        bootbox.alert({ 
			 	        	            	size: "small",
			 	        	            	closeButton: false,
			 	        	            	message: "Your session has expired.", 
						    				callback: function(){
						    					      //  localStorage.setItem('alerted','No');
						    					        alerted = "no";
						    					        logout();
						    					        var exportForm = document.createElement("form");
													    exportForm.method = "post";
													    exportForm.action = "index.html";
													    document.body.appendChild(exportForm);
													    exportForm.submit();
													    $(exportForm).remove();
													    permissionList = permission;
								    		 }
				    				 });
			 	        	       //  alerted = "yes";
			 	        	         //localStorage.setItem('alerted','yes');     
					 	         }
							   }
							  else
								  {
								 // showNotification();
								  }
				     	}
					}).fail(function(){		
						//alert("error");
					});
}

var val = 0;
$('body').click(function (event) {
	
	 if(event.target.id=="menuid")
		{
			showMenus_1();
		}
	else
		{
			hideMenus_1();
		}
});

//show notification
function showNotification()
{
	$.ajax({ url:"api/v1/showNotification.html",
			method:"POST",
			async:true,
			data:{}})
			.done(function(data)
			{ 
				var i=0;
				var count=0;
				if(data != null)
				{
					if(data == 'redirect:index.html')
					{
						window.location.href = 'index.html';
					}
					else if(data == 'SQLERROR')
					{
						//something unexpected happend
					}
					else
					{
						var jsonData = $.parseJSON(data);
						var str='';
						if(jsonData.notification.length!=0)
						  {
							if(jsonData.notification[i].id!=0)
								{
								 str+='<h4  class="notifyheader">Notification</h4>';
								 str+=' <div class="notifyin" id="style-3">';
								for( i=0;i<jsonData.notification.length;i++)
			    				{
									 str+='<a href="#" class="">';
									 if(jsonData.notification[i].is_open)
										{
										 str+='<div id="view_noti_'+jsonData.notification[i].id+'" class="notifycontent" onclick="onClickViewNotification('+jsonData.notification[i].id+');">';
										}
									 else
										 {
										 count++;
										 str+='<div id="view_noti_'+jsonData.notification[i].id+'" class="newnotify" onclick="onClickViewNotification('+jsonData.notification[i].id+');" >';
										 }
									 //str+='<i class="fa fa-times" aria-hidden="true" style="float:right;"></i>';
									 str+='<p id="'+jsonData.notification[i].id+'">Your PIN for <b>'+jsonData.notification[i].requestType+'</b> is '+jsonData.notification[i].notificationText+'.';
									 str+=' You can ask ChatBot to start initial setup.</p>'
									 str+='</div>';
									 str+=' </a>';
			    				}
					
								 str+='</div>';
								 str+='';
								 
								 $("#notifications1").html(str);
								 $("#noti_Button1").show();
								 document.getElementById("noti_Container1").style.display = "block";
								 $("#noti_Button2").hide();
								 // ANIMATEDLY DISPLAY THE NOTIFICATION COUNTER.
								 if(count!=0)
									 {
								        $('#noti_Counter1').css({ opacity: 0}).text(count).css({top: '-10px'}).animate({top: '-2px',opacity: 1}, 500);
								        $('#noti_Counter1').show();	
									 }
								}
						  }
					}
				}
				else
				{
					// do nothing
				}

			}).fail(function()
					{			
				
				//something unexpected happend
					});
	
}

//menu function display on and off
function showMenus_1() {
   // $("#myMenuss").fadeIn();
    document.getElementById("myMenuss").style.display = "block";
    document.getElementById("showMe").style.display = "none";
    document.getElementById("hideMe").style.display = "block";
    val = true;
    return false;
}

function hideMenus_1() {
   // $("#myMenuss").fadeOut();
    document.getElementById("myMenuss").style.display = "none";
    document.getElementById("showMe").style.display = "block";
    document.getElementById("hideMe").style.display = "none";
    return false;
}

function checkScroll() {
    if ($("body").height() > window.innerHeight) {
        $(".pgfooter").css({
            'position': 'initial',
            'bottom': 'inherit'
        });
    } else {
        $(".pgfooter").css({
            'position': 'fixed',
            'bottom': '0px'
        });
    }
}
function fadeoutbtn(para) {
    $("#optiondiv").addClass("animated fadeOutLeft");
}


function closeMe() { window.opener = self; window.close(); }

Array.prototype.allValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0])
            return false;
    }

    return true;
}

Array.prototype.allStared = function() {
	var count=0;
    for(var i = 0; i < this.length; i++)
    {
        if(this[i] == 0)
    	{
        	count++;
        	 //return true;
    	}            
    }
    if(count>=4){
    	return true;
    }
    else if(count)
    	return false;  
}

function FunctionExportPdf2()
{
	var con_id = $("#searchConversationId").select2("val").toString();
	
	var name = "";
	//$("#searchUserList").select2("val").toString();
	
	var ipaddress = $("#searchIpAddress").select2("val").toString();
	
	var s_date = $("#startDate").val().replace("/","-").replace("/","-");
	
	var e_date = $("#endDate").val().replace("/","-").replace("/","-"); 
	
	var channel = $("#channelList").val();
	var mobile = $("#searchMobileNo").val();
	
	var flow = $('#flowList').val();
		
		var param = new Object();
		var exportForm = document.createElement("form");
		param.con_id = con_id;
		
		param.name = name;			
		
		param.s_date = s_date;
		
		param.e_date = e_date;
		
		param.ordered_by = ordered_by;
		
		param.order_type = order_type;
		
		param.ipaddress = ipaddress;
		
		param.channel = channel;
		param.mobile = mobile;
		
		param.flow=flow;
		param.range = $('#range').val();
		
		param.export_type = "pdf";
	    
		exportForm.method = "post";
	    
		exportForm.action = "api/v1/conversation.pdf";
	    
		exportForm.target = "_blank";
	    
	    if (param){
			 for(var key in param){
				 
				 var input = document.createElement("input");
				 input.setAttribute("name", key);
				 input.setAttribute("value", param[key]);
				 exportForm.appendChild(input);
			 }
		}
		document.body.appendChild(exportForm);
		
		exportForm.submit();
		
		$(exportForm).remove();
	
}

function FunctionExportXls2()
{
	var con_id = $("#searchConversationId").select2("val").toString();
	var name = "";//$("#searchUserList").select2("val").toString();
	var ipaddress = $("#searchIpAddress").select2("val").toString();
	var s_date = $("#startDate").val().replace("/","-").replace("/","-");
	var e_date = $("#endDate").val().replace("/","-").replace("/","-"); 
	var channel = $("#channelList").val();
	var mobile = $("#searchMobileNo").val();
	var flow = $('#flowList').val();
	
		var param = new Object();
		var exportForm = document.createElement("form");
		param.con_id = con_id;
		param.name = name;			
		param.s_date = s_date;
		param.e_date = e_date;
		param.ordered_by = ordered_by;
		param.order_type = order_type;
		param.ipaddress = ipaddress;
		param.channel = channel;
		param.export_type = "xls";
		param.mobile = mobile;
	    param.flow = flow;
	    param.range = $('#range').val();
	    
		exportForm.method = "post";
	    exportForm.action = "api/v1/conversation.xls";
	    exportForm.target = "_blank";
	    
	    
	    if (param) 
		 {
			 for (var key in param) 
			 {
				 var input = document.createElement("input");
				 input.setAttribute("name", key);
				 input.setAttribute("value", param[key]);
				 exportForm.appendChild(input);
			 }
		 }
		 document.body.appendChild(exportForm);
		 exportForm.submit();
		 $(exportForm).remove();
}


function fixNewSciReady() {
	if (shouldFix) {
		if (parent.document.getElementsByTagName("iframe").length > 0) {
			for (var i = 0; i < parent.document.getElementsByTagName("iframe").length; i++) {
				if (parent.document.getElementsByTagName("iframe")[i].src == window.location.href) {
					parent.document.getElementsByTagName("iframe")[i].height = $("html").height();
					break;
				}
			}

			$("#LoadingImage").css("background", "url(/ima/resources/images/loading.gif) center 185px no-repeat #a39d9c");
		}

		if (parent.document.getElementsByTagName("iframe").length == 0) {
			if ($(".poweredByContents img").length > 0) {
				$(".newsci").css("left", $(".poweredByContents img").offset().left);
			}
		}

	}

}

function fixNewSciResize() {
	if (shouldFix) {
		if (parent.document.getElementsByTagName("iframe").length == 0) {
			if ($(".poweredByContents img").length > 0) {
				$(".newsci").css("left", $(".poweredByContents img").offset().left);
			}
		}
	}

}

/********UTIL Functions********************/
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function getSelectedText() {
	if (window.getSelection) {
		return window.getSelection().toString();
	} else if (document.selection) {
		return document.selection.createRange().text;
	}
	return '';
}

function safe_tags_replace(str) {
    return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

$("#addusr").click(function(e) {
	$("#userdisp1").hide();
	$("#userdisp2").show();
	$("#userdisp3").hide();
	$("#ufirstName").val("");
	$("#ulastName").val("");
	$("#uemail_Id").val("");
	$("#upassword").val("");
});

function sendApprovalMail()
{
		$.ajax({url : "api/v1/getSendMailInfo.html",
				method : "POST",
				async : true,
				data :{ userName : localStorage.getItem("usrname")},
				processData: true
		}).done(function(data) { 
				var status = data;
		}).fail(function(){
				bootbox.alert("Sending Mail to GUS has been failed").find('.modal-content').css({
					'font-weight' : 'bold',
					'font-size': '1.3em',
				    'margin-top': '25%',
				    'font-family': '"Open Sans", "lt_helvetica", sans-serif'
				});
				$(".modal-footer").css("border","0px");
		});
}

function getParameterByName(name, defaultVal) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
	return results == null ? defaultVal : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function onClickViewNotification(id) {
	
	if($('#view_noti_'+id+'').hasClass("newnotify"))
		{
			$('#view_noti_'+id+'').removeClass("newnotify");
			$('#view_noti_'+id+'').addClass("notifycontent");
		}
	
}

function questionLimit(question)
{
	var text = question.value;
	//question.value = $(text).text();
	question.value = text.replace(/(<([^>]+)>)/ig,""); //remove HTML Tags 
	var name_le = question.value.length;	
 	//alert(name_le);
 	if(name_le >= 500)
 	{
 		var result = question.value.substring(0,512);
 		question.value= result;
 	}
}


function FunctionClientExportXls2()
{
	var plan = $("#channelList").val();
	var conversation_id ='';// $("#searchConversationIdInUserInfo").select2("val").toString();
	var s_date = $("#startDate").val().replace("/","-").replace("/","-");
	var e_date = $("#endDate").val().replace("/","-").replace("/","-"); 
//	var channel = "";
		
		var param = new Object();
		var exportForm = document.createElement("form");
		param.plan = plan;
		param.conversationid = conversation_id;
		param.s_date = s_date;
		param.e_date = e_date;
		param.ordered_by = ordered_by;
		param.order_type = order_type;
		param.export_type = "xls";
	    exportForm.method = "post";
	    exportForm.action = "api/v1/UserInfo.xls";
	    exportForm.target = "_blank";
	    
	    if (param) 
		 {
			 for (var key in param) 
			 {
				 var input = document.createElement("input");
				 input.setAttribute("name", key);
				 input.setAttribute("value", param[key]);
				 exportForm.appendChild(input);
			 }
		 }
		 document.body.appendChild(exportForm);
		 exportForm.submit();
		 $(exportForm).remove();
}


function FunctionClientExportPdf2()
{
	var plan = $("#channelList").val();
	var conversation_id ='';// $("#searchConversationIdInUserInfo").select2("val").toString();
	var s_date = $("#startDate").val().replace("/","-").replace("/","-");
	var e_date = $("#endDate").val().replace("/","-").replace("/","-"); 
//	var channel = "";
		
		var param = new Object();
		var exportForm = document.createElement("form");
		param.plan = plan;	
		param.conversationid = conversation_id;
		param.s_date = s_date;
		param.e_date = e_date;
		param.ordered_by = ordered_by;
		param.order_type = order_type;
		param.export_type = "pdf";
	    exportForm.method = "post";
	    exportForm.action = "api/v1/UserInfo.pdf";
	    //exportForm.action = "api/v1/UserInfoPDFExport.pdf";
	    exportForm.target = "_blank";
	    
	    if (param) 
		 {
			 for (var key in param) 
			 {
				 var input = document.createElement("input");
				 input.setAttribute("name", key);
				 input.setAttribute("value", param[key]);
				 exportForm.appendChild(input);
			 }
		 }
		 document.body.appendChild(exportForm);
		 exportForm.submit();
		 $(exportForm).remove();
}


function geturl()
{
	
	
	var url_link =	window.parent.location.href;
	//var str =url_link[0].baseURI;
		$.ajax({url : "api/v1/url.do",
				method : "GET",
				async : false,
				data :({url_data :url_link}),
				 success: function(data) {
				//var url_link =	 $('#time').html(window.location.href);
					 
			        }
				
		}).done(function(data) { 
				var status = data;
				var JsonObject= JSON.parse(data);
				for(var i=0;i<JsonObject.jArray.length;i++){
					 var json_data = JsonObject.jArray[i];
					 
						/*var id = $('#idw').html(json_data.id);
						var url = $('#url').html(json_data.url_name);
						var plan = $('#plan').html(json_data.plan);*/
					 
					// var id = json_data.id;
					      $('#idw').html(json_data.id);
						//var url = json_data.url_name;
					      var url      = window.parent.location.href; 
						 $('#url').html(url);
						 $('#plan').html(json_data.plan);
						
						//var plan = json_data.plan;
						 
					
					  
				}
				
		}).fail(function(){
				bootbox.alert("Error to get url");
		});
}

function getiframeurl()
{
	
	
	var url_link =	 $('#iframe').html(window.location.href);
	var str =url_link[0].baseURI;
		$.ajax({url : "api/v1/iframe.do",
				method : "GET",
				async : false,
				data :({url_data :str}),
				 success: function(data) {
			    	var url_link =	 $('#iframe').html(window.location.href);
					 
			        }
				
		}).done(function(data) { 
				var status = data;
				/*var JsonObject= JSON.parse(data);
				for(var i=0;i<JsonObject.jArray.length;i++){
					 var json_data = JsonObject.jArray[i];
					 
						var id = $('#idw').html(json_data.id);
						var url = $('#url').html(json_data.url_name);
						var plan = $('#plan').html(json_data.plan);
						
					
					  
				}*/
				
		}).fail(function(){
				bootbox.alert("Error to get url");
		});
}

/*function prepareFrame() {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "http://localhost:8080/Alisha/demo.html");
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    document.body.appendChild(ifrm);
}*/
$('#commentPDF').on('click',function(){
	var param_page = $("#pageList").val();
	var param_respType = $("#respType").val();
	var param_sentiment = $("#sentiment").val();
	var start_date = $("#startDate").val();
	var end_date = $("#endDate").val(); 
		
		var param = new Object();
		var exportForm = document.createElement("form");
		param.page = param_page;	
		param.resp_type = param_respType;
		param.sentiment = param_sentiment;
		param.startDate = start_date;
		param.endDate = end_date;
	    exportForm.method = "post";
	    exportForm.action = "api/v1/commentReport.pdf";
	    //exportForm.action = "api/v1/UserInfoPDFExport.pdf";
	    exportForm.target = "_blank";
	    
	    if (param) 
		 {
			 for (var key in param) 
			 {
				 var input = document.createElement("input");
				 input.setAttribute("name", key);
				 input.setAttribute("value", param[key]);
				 exportForm.appendChild(input);
			 }
		 }
		 document.body.appendChild(exportForm);
		 exportForm.submit();
		 $(exportForm).remove();
});


$('#commentXLS').on('click',function(){
	var param_page = $("#pageList").val();
	var param_respType = $("#respType").val();
	var param_sentiment = $("#sentiment").val();
	var start_date = $("#startDate").val();
	var end_date = $("#endDate").val(); 
		
		var param = new Object();
		var exportForm = document.createElement("form");
		param.page = param_page;	
		param.resp_type = param_respType;
		param.sentiment = param_sentiment;
		param.startDate = start_date;
		param.endDate = end_date;
	    exportForm.method = "post";
	    exportForm.action = "api/v1/commentReport.xls";
	    //exportForm.action = "api/v1/UserInfoPDFExport.pdf";
	    exportForm.target = "_blank";
	    
	    if (param) 
		 {
			 for (var key in param) 
			 {
				 var input = document.createElement("input");
				 input.setAttribute("name", key);
				 input.setAttribute("value", param[key]);
				 exportForm.appendChild(input);
			 }
		 }
		 document.body.appendChild(exportForm);
		 exportForm.submit();
		 $(exportForm).remove();
});

