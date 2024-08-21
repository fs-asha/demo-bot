
var usrText=$('#usertext');
var lang='en';
var res="";
var userName="";
var isIE = false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia; 
var url_link="";
var isFirefox = typeof InstallTrigger !== 'undefined';
var pattern='';
var tout;
var panFormEnabled=false;
var addressFormEnabled=false;
var currentRequest = 'checkReq';
var priceValMsg = "Please enter valid number, upto 10 digits.";

var botIcon='<div class="chat-icon"></div>';
var scrollElment= $(".chat-list");
var btnSets=$('.btn-generic');
// check page type
// if(env.data!==''){
//     botIcon='<div class="chat-icon"></div>';
//     scrollElment= $(".chat-list");
//     btnSets= $('.btn-portals');
// } else {
//     botIcon='<div class="chat-icon"></div>';
//     scrollElment= $(".chat-list");
//     // scrollElment= $("#style-3");
//     btnSets= $('.yesnobtn');
// }
var botContainerPre='<div class="chat-message chat-message-recipient chat-top-fill animated fadeIn">'+ botIcon;
var botContainerPost='</div>';
// geturl
function geturl() {
    $.ajax({
      url: "api/v1/login",
      method: "POST",
      crossDomain: true,
      async: false,
      data: {
        usrname:"S6z0Grq6vpJrp7MtXIS8wflBB9gCVFTuVNCk2DGq/eHVmCGjHUSLB4zin9dyVX6u",
        pswd: "DtmkeZmWs1+CxFhwqPFvYg==",
        meth: "ChatSession",
        key: key,
        method: "8465d9w",
      },
    }).done(function (data, status) {
      var obj = $.parseJSON(data);
      
      if (obj.loginStatus === 200) {
        isInit=false;
        res = obj.userInfo.session_Id;
        saveclientData(res);
      } else {
        var error =
          '<div class="chat-message chat-message-recipient chat-top-fill animated fadeIn">'+botIcon;
          error +='<div class="chat-message-wrapper">' +
          '<div class="chat-message-content">' +
          "Invalid Access to Service" +
          "</div>" +
          "</div>" +
          "</div>";
        /*error=HttpUtility.HtmlEncode(error);*/
        $(".message-container").append(error);
        $("#usertext").attr("disabled", "disabled");
        $("#overlayforchat").addClass("overlaychat");
      }
    });
  
    url_link = ''; //_client.getUrl();
    console.log(url_link);
  
    $.ajax({
      url: "api/v1/url.do",
      method: "GET",
      async: false,
      crossDomain: true,
      data: {
        url_data: url_link,
        key: key,
      },
      success: function (data) {
        var status = data;
        var JsonObject = JSON.parse(data);
        for (var i = 0; i < JsonObject.jArray.length; i++) {
          var json_data = JsonObject.jArray[i];
          $("#idw").html(json_data.id);
          var url = document.referrer;
          $("#url").html(url);
          var p = json_data.plan;
          if (p !== "") {
            $("#overlayforchat").addClass("overlaychat");  
            getConversation(p);
          } else {
            var error =
              '<div class="chat-message chat-message-recipient chat-top-fill animated fadeIn">'+botIcon;
              error +='<div class="chat-message-wrapper">' +
              '<div class="chat-message-content">' +
              "Invalid Access to Service" +
              "</div>" +
              "</div>" +
              "</div>";
            /*error=HttpUtility.HtmlEncode(error);*/
            $("#loading").hide();
            $(".message-container").append(error);
            $("#overlayforchat").addClass("overlaychat");
          }
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        var error =
          botContainerPre + "Invalid Access to Service" + botContainerPost;
        $(".message-container").append(error);
        scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
      },
    });
}

$('#home').click(function(){
  $('#refresh').addClass("disableMouseEvent");
  $('.dropdown').addClass("disableMouseEvent");
  // $('.message-container').html('');
  $('#usertext').val('');
  $('#form-message').addClass("disableMouseEvent");
  $('#overlayforchat').addClass('overlaychat');
  geturl();  
  $('#usertext').removeClass('disableMouseEvent');
  if(isIE === false && isFirefox === false) {
    usrText.removeClass('micOpen');
    synth.cancel();
    recognition.stop();
  }
  
});

$('#refresh').click(function(){
  $('#refresh').addClass("disableMouseEvent");
  $('.dropdown').addClass("disableMouseEvent");
  $('.message-container').html('');
  $('#usertext').val('');
  $('#form-message').addClass("disableMouseEvent");
  $('#overlayforchat').addClass('overlaychat');
  geturl();  
  $('#usertext').removeClass('disableMouseEvent');
  if(isIE === false && isFirefox === false) {
    usrText.removeClass('micOpen');
    synth.cancel();
    recognition.stop();
  }
  
});

// Form submit
$("form").on('submit',function(e){
    var reg=new RegExp("[~!#$%^()\"<>|]"); //<(.|\n)*?>
    
    $("#usertext").val().replace('\'','');
    $("#send").removeClass("animate-pulse-send");
    usrText.removeClass('micOpen');
    if(isIE === false && isFirefox === false) {
      // For Audio - uncomment whenever need
      synth.cancel();
      if(typeof audio!='undefined'){
        audio.stop();
      }
    }
    if (reg.test($("#usertext").val()) === true) {
      var pre =
        '<div class="chat-message chat-message-recipient animated fadeIn abc">' +
        botIcon +
        '<div class="chat-message-wrapper">' +
        '<div class="chat-message-content">';
      var error = pre + "Please enter valid query." + botContainerPost;
      $(".message-container").append(error);
      $(".abc").delay(3000).fadeOut("blind");
      scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
      $("#usertext").val("");
      if (screen.width > 480) {
        $("#usertext").focus();
      }
      e.preventDefault();
    } else if($("#usertext").val() === "") {
      var pre =
        '<div class="chat-message chat-message-recipient animated fadeIn abc">' +
        botIcon +
        '<div class="chat-message-wrapper">' +
        '<div class="chat-message-content">';
      var error = pre + "Please enter your question" + botContainerPost;
      $(".message-container").append(error);
      $(".abc").delay(3000).fadeOut("blind");
      scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
      $("#usertext").val("");
      if (screen.width > 480) {
        $("#usertext").focus();
      }
      e.preventDefault();
    } else if($("#usertext").val().length > 512) {
      var pre =
        '<div class="chat-message chat-message-recipient animated fadeIn abc">' +
        botIcon +
        '<div class="chat-message-wrapper">' +
        '<div class="chat-message-content">';
      var error = pre + "Character limit exceeds" + botContainerPost;
      $(".message-container").append(error);
      $(".abc").delay(3000).fadeOut("blind");    
      scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
    
      $("#usertext").val("");
      if (screen.width > 480) {
        $("#usertext").focus();
      }
      e.preventDefault();
    } else {
      //$("#usertext").removeClass("disableMouseEvent");
      $(".irs").addClass("disableMouseEvent");
      $("#form-message").addClass("disableMouseEvent");
      $("#overlayforchat").addClass("overlaychat");
      letsChat();
      e.preventDefault();
      $("#usertext").removeClass("disableMouseEvent");
    }
    
});

// Ref click
$('#ref').click(function(){
    $('#refresh').addClass("disableMouseEvent");
    $('#ref').addClass("disableMouseEvent");
    $('.dropdown').addClass("disableMouseEvent");
    $('.message-container').html(baseFrame);
    $('#usertext').val('');
    $('#form-message').addClass("disableMouseEvent");
    $('#overlayforchat').addClass('overlaychat');
    geturl();
    
    $('#usertext').removeClass('disableMouseEvent');
    usrText.removeClass('micOpen');
    if(isIE === false && isFirefox === false) {
      synth.cancel();
      recognition.stop();
      if(typeof audio!='undefined'){
        audio.stop();
      }
    } 
    
});

// Letschat
function letsChat() {
    var userio = $("#usertext").val();
    userContainerPre = userContainer(userName);
    var user = userContainerPre + userio + userContainerPost;
    //$('.message-container').append(user);
    scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
    $("#usertext").val("");
    getConv(userio);
    //getConversation(userio);
    $(".yesnobtn").addClass("disableMouseEvent");
    $(".maleBtn1").addClass("disableMouseEvent");
    $(".femaleBtn1").addClass("disableMouseEvent");
    $("#datetimepicker11").addClass("disableMouseEvent");
    $(".form-check").addClass("disableMouseEvent");
    $(".irs").addClass("disableMouseEvent");
    $("#usertext").removeClass("disableMouseEvent");
}

// userContainer
function userContainer(name){
    var userImg = '<div class="chat-message chat-message-sender animated fadeInRight">'+ botIcon+
                    '<div class="chat-message-wrapper">'+
                        '<div class="chat-message-content">';

      
 

    if(name != undefined && name.length >= 1){    
        userImg ='<div class="chat-message chat-message-sender animated fadeInRight">'+
                    '<div class="senderLetter chat-icon">'+name.charAt(0)+'</div>'+
                        '<div class="chat-message-wrapper">'+
                            '<div class="chat-message-content">';
    }else {
	 userImg ='<div class="chat-message chat-message-sender animated fadeInRight">'+
                    '<div class="chat-icon"></div>'+
                        '<div class="chat-message-wrapper">'+
                            '<div class="chat-message-content">';
	
	}
    return userImg;
}

// Submit pan
window.submitPan=function(e){	
	$('#loading').show();
	$('#submit_pan').prop("disabled",true);
	
	setTimeout(function(){
		$('.err_panno').last().html('');
		$('.err_panfile').last().html('');
	
	panFormEnabled = true;
	
	if(!panFormEnabled){
		panFormEnabled=true;
		$('.txtPanNo').last().removeAttr('readonly');
		/*$('#filePanProof').removeAttr('readonly');
		$('#addpanfiles').prop("disabled", false);*/
		$('.filePanProoftd').last().removeClass('overlaytd');
		$('#loading').hide();
		$('#submit_pan').prop("disabled",false);
	}else{		
		var newPan=$('.txtPanNo').last().val();
		var clientId=$('.clientId').last().val();
		var dob=$('.dob').last().val();
		var policyno=$('.policyno').last().val();
		var oldPan=$('.oldPan').last().val();
		var file=$('.filePanProof').last()[0].files[0];

		if(!validates.panNo(newPan)){
			$('.err_panno').last().html('Kindly enter correct PAN details');
			$('#loading').hide();
			$('#submit_pan').prop("disabled",false);
		}else if(!file){
			$('.err_panfile').last().html('File is missing, Please uplpoad your PAN proof.');
			$('#loading').hide();
			$('#submit_pan').prop("disabled",false);
		}else if(!validates.attachmentFormat(file)){
			$('.err_panfile').last().html('Only .jpg, .gif, .png, .jpeg, .bmp, .pdf, .tif, .tiff file format are allowed.');
			$('#loading').hide();
			$('#submit_pan').prop("disabled",false);
		}else if(!validates.attachmentSize(file,'pan')){
			$('.err_panfile').last().html('File size must be less than or equal to 5 MB');
			$('#loading').hide();
			$('#submit_pan').prop("disabled",false);
		} 
		else {	
			btnSets.addClass('disableMouseEvent');
			var regex=/[a-z]/g;
			newPan=newPan.replace(regex,function(match){
				return match.toUpperCase();			
			});

			var f=new FormData();
			f.append("file",file);
			f.append("new_pan",newPan);
			f.append("client_id",clientId);
			f.append("dob",dob);
			f.append("policy_no",policyno);
			f.append("session",res);
			f.append("key",key);
			f.append("old_pan",oldPan);

			$.ajax({
				url:'api/v1/panAttachment',
				type:'POST',
				enctype:'multipart/form-data',
				data:f,
				processData:false,
				contentType:false,
				cache:false,
				async:false,
				success:function(data){
					console.log(data);
					setTimeout(function(){
						//getDialog("{form_submit:"+data+"}");
						if(data!==""){
							transaction_id=data;
							if(transaction_id==='{error}'){
								getDialog("{error}");
							}else if(transaction_id==='{SR_FAIL}'){
								getDialog("{sr_fail}");
							}else if(transaction_id==='{SR_SUCCESS}'){
								getDialog("{sr_success}");
							}else{
								getDialog("{form_success}");	
							}
						}else{
							getDialog("{form_fail}");
						}
						panFormEnabled=false;
					},100);
					

				},
				fail:function(xhr){
					console.log(xhr);
					getDialog("{form_fail}");					
				}
			});
		}
	} //Else end	
	},100);
	
};

// loadAddressFormData
var ext_a1;
var ext_a2;
var ext_a3;
var ext_landmark;
var ext_city;
var ext_state;
var ext_pincode;
var oldAddress='';
window.loadAddressFormData=function(){
	ext_a1=$('.txtAddressL1').last().val();
	ext_a2=$('.txtAddressL2').last().val();
	ext_a3=$('.txtAddressL3').last().val();
	ext_landmark=$('.txtLandmark').last().val();
	ext_city=$('.txtCitys').last().val();
	ext_state=$('.txtState').last().val();
	ext_pincode=$('.txtPincode').last().val();

	if(ext_a1.trim()!=='' && ext_a1){
		oldAddress+=ext_a1.trim()+', ';
	}
	if(ext_a2.trim()!=='' && ext_a2){
		oldAddress+=ext_a2.trim()+', ';
	}
	if(ext_a3.trim()!=='' && ext_a3){
		oldAddress+=ext_a3.trim()+', ';
	}
	if(ext_landmark.trim()!=='' && ext_landmark){
		oldAddress+=ext_landmark.trim()+', ';
	}
	if(ext_city.trim()!=='' && ext_city){
		oldAddress+=ext_city.trim()+', ';
	}
	if(ext_state.trim()!=='' && ext_state){
		oldAddress+=ext_state.trim()+', ';
	}
	if(ext_pincode.trim()!=='' && ext_pincode){
		oldAddress+=ext_pincode.trim()+'';
	}
	oldAddress=oldAddress.trim();

	if(oldAddress.charAt(oldAddress.length-1)===','){
		oldAddress=oldAddress.slice(0,-1);
	}

}

// submitAddress
window.submitAddress=function(e){	
	$('#loading').show();	
	$('#submit_address').prop('disabled',true);
	
	setTimeout(function(){
		$('.err_adr1').last().html('');
		$('.err_adr2').last().html('');
		$('.err_adr3').last().html('');
		$('.err_landmark').last().html('');
		$('.err_city').last().html('');
		$('.err_pincode').last().html('');
		$('.err_state').last().html('');
		$('.err_AdrFile').last().html('');

		var a1=$('.txtAddressL1').last().val();
		var a2=$('.txtAddressL2').last().val();
		var a3=$('.txtAddressL3').last().val();
		
		a1=a1.trim();
		a2=a2.trim();
		a3=a3.trim();
		
		var landmark=$('.txtLandmark').last().val();
		var city=$('.cities option').last().filter(function(){return this.value==$('.txtCitys').last().val();}).data('value');
		
		if(!city){
			city='';

			searchCity($('.txtCitys').last().val());
			
			setTimeout(function(){
				city=$('.cities:last option').filter(function(){return this.value==$('.txtCitys').last().val();}).data('value');	
			},500);		
		}
			
        setTimeout(function(){
        city+='|'+$('.txtCitys').last().val();			
    
        var state=$('.txtState').last().val();
        //var pincode=$('#txtPincode').val();
        var pincode=$('.pincodes:last option').filter(function(){return this.value==$('.txtPincode').last().val();}).data('value');
        var proofType=$('.txtAddressProofType').last().val();
        
        var clientId=$('.clientid').last().val();
        var dob=$('.dob').last().val();
        var policyno=$('.policy_no').last().val();
        
        // Validations
        if(!validates.address1(a1)){
            $('.err_adr1:last').html('Kindly enter correct Address1');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        } else if(a2 !== '' && !validates.address2(a2)){
            $('.err_adr2:last').html('Kindly enter correct Address2');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        } else if(a3 !== '' && !validates.address3(a3)){
            $('.err_adr3:last').html('Kindly enter correct Address3');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        } else if(landmark !=='' && !validates.landmark(landmark)){
            $('.err_landmark:last').html('Kindly enter correct Landmark');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        }else if(city.charAt(0)==='|'){
            $('.err_city:last').html('Kindly enter correct City');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        } 
        else if(!validates.city(city)){
            $('.err_city:last').html('Kindly enter correct City');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        } else if(!validates.pinCode(pincode)){
            $('.err_pincode:last').html('Kindly enter correct Pincode');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        } else if(!validates.state(state)){
            $('.err_state:last').html('Kindly enter correct State');
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
        }else {
            var process=true;
            if(!$('.fileAddressProof').last()[0].files[0]){
            $('.err_AdrFile:last').html('File is missing, please upload your address proof. ');	
            process=false;
            $('#loading').hide();
            $('#submit_address').prop('disabled',false);
            }else{
            if(!validates.attachmentSize($('.fileAddressProof').last()[0].files[0],'address')){
                $('.err_AdrFile').last().html('File size must be less than or equal to 5 MB');
                process=false;
                $('#loading').hide();
                $('#submit_address').prop('disabled',false);
            }else{
                
                if(!validates.attachmentFormat($('.fileAddressProof').last()[0].files[0])){
                $('.err_AdrFile').last().html('Only .jpg, .gif, .png, .jpeg, .bmp, .pdf, .tif, .tiff file format are allowed.');
                process=false;
                $('#loading').hide();
                $('#submit_address').prop('disabled',false);
                }else{
                
                for(var j=1;j<=noAddressProof;j++){
                    if(!$('.fileAddressProof-'+j+'').last()[0].files[0]){
                    $('.err_fileAddressProof-'+j+'').last().html('File is missing, please upload your address proof. ');	
                    process=false;
                    $('#loading').hide();
                    $('#submit_address').prop('disabled',false);
                    }else{
                    if(!validates.attachmentSize($('.fileAddressProof-'+j+'').last()[0].files[0],'address')){
                        $('.err_fileAddressProof-'+j+':last').html('File size must be less than or equal to 5 MB');
                        process=false;
                        $('#loading').hide();
                        $('#submit_address').prop('disabled',false);
                        break;
                    }else{
                        if(!validates.attachmentFormat($('.fileAddressProof-'+j+'').last()[0].files[0])){	
                        $('.err_AdrFile-'+j+':last').html('Only .jpg, .gif, .png, .jpeg, .bmp, .pdf, .tif, .tiff file format are allowed.');
                        process=false;
                        $('#loading').hide();
                        $('#submit_address').prop('disabled',false);
                        break;
                        }
                    } 	
                    }
                }
                }
            }	
            }        

            if(process){
            btnSets.addClass('disableMouseEvent');
            
            var f=new FormData();
            f.append("files",$('.fileAddressProof').last()[0].files[0]);

            for(var k=1;k<=noAddressProof;k++){
                f.append("files",$('.fileAddressProof-'+k+'').last()[0].files[0]);
            }
            
            f.append("a1",a1);
            f.append("a2",a2);
            f.append("a3",a3);
            f.append("landmark",landmark);
            f.append("city",city);
            f.append("state",state);
            f.append("pincode",pincode);
            f.append("proofType",proofType);
            f.append("client_id",clientId);
            f.append("dob",dob);
            f.append("policy_no",policyno);
            f.append("session",res);
            f.append("key",key);
            f.append("old_address",oldAddress);

            $.ajax({
                url:'api/v1/addressAttachment',
                type:'POST',
                enctype:'multipart/form-data',
                data:f,
                processData:false,
                contentType:false,
                cache:false,
                async:false,
                success:function(data){
                if(data!==""){
                    transaction_id=data;
                    
                    if(transaction_id==='{error}'){
                    getDialog("{error}");
                    }else if(transaction_id==='{SR_FAIL}'){
                    getDialog("{sr_fail}");
                    }else if(transaction_id==='{SR_SUCCESS}'){
                    getDialog("{sr_success}");
                    }else{
                    getDialog("{form_success}");	
                    }
                    
                }else{
                    getDialog("{form_fail}");
                }
                addressFormEnabled=false;
                noAddressProof=0;
                strAdC=2;
                },
                fail:function(xhr){
                console.log(xhr);
                getDialog("{form_fail}");
                }
            });
            
            }
            
        }		
        },700);		
			
	},100);
	
	//}
};

// getLinkCount
window.getLinkCount = function (links, cat) {
    var link = "";
    if (links == "aviva-i-growth") {
      var link =
        "https://www.avivaindia.com/saving-investment-plans/aviva-i-growth";
    } else if (links == "aviva-annuity-plus") {
      var link =
        "https://www.avivaindia.com/retirement-pension-plans/aviva-annuity-plus";
    } else if (links == "TopUpPaymentDirect") {
      var link =
        "https://online.avivaindia.com/econnect/Pages/TopUpPaymentDirect.aspx";
    } else if (links == "aviva-lifeshield-premium") {
      var link = "https://www.avivaindia.com/aviva-life-shield-premium";
    } else if (links == "aviva-saral-jeevan-bhima") {
      var link = "https://www.avivaindia.com/aviva-saral-jeevan-bima-plan";
    } else if (links == "fortune-plus") {
      var link = "https://www.avivaindia.com/aviva-fortune-plus-plan";
    } else if (links == "saral-pension") {
      var link = "https://www.avivaindia.com/aviva-saral-pension-plan";
    } else if (links == "next-innings") {
      var link =
        "https://www.avivaindia.com/retirement-pension-plans/aviva-next-innings-action-plan";
    } else if (links == "aviva-wealth-builder") {
      var link =
        "https://www.avivaindia.com/saving-investment-plans/aviva-new-wealth-builder";
    } else if (links == "aviva_protection_plus") {
      var link =
        "https://www.avivaindia.com/term-insurance-plans/aviva-protection-plus";
    } else if (links == "aviva-nivesh-bima") {
      var link =
        "https://www.avivaindia.com/saving-investment-plans/aviva-nivesh-bima";
    } else {
      link = links;
    }
  
    $.ajax({
      url: "api/v1/save_linkcount",
      method: "POST",
      crossDomain: true,
      async: false,
      data: {
        key: key,
        session: res,
        link: link,
        cat: cat,
      },
    }).done(function (data, status) {
      //window.location.href('https://www.avivaindia.com/aviva-will-writing');
    });
    window.open(link);
};

// speechResponse
window.speechResponse=function(txt){
    $('#usertext').val().toLowerCase();
    //query_count=query_count+1;
    if($('#usertext').val() == 'Tom' || $('#usertext').val() == 'tom'){
        $('#usertext').val('Term');
      }else
    if($('#usertext').val() == 'Tom or Health' || $('#usertext').val() == 'tom or health' || $('#usertext').val() == 'tum or health' || $('#usertext').val() == 'Tum or Health'  || $('#usertext').val() == 'tum aur health' || $('#usertext').val() == 'tom aur health'){
        $('#usertext').val('Term or Health');
      }else
    if($('#usertext').val() == 'xxxviii' || $('#usertext').val() == 'XXXVIII'){
        $('#usertext').val('38');
      }
    else{        
        if($('.btn-2').hasClass('maleBtn1') && $('.btn-2').hasClass('femaleBtn1') ){
          if($('#usertext').val() == 'mail' || $('#usertext').val() == 'mele' || $('#usertext').val() == 'meal'){
              $('#usertext').val('Male');
          } else{
              $('#usertext').val(txt);
          }
        }
    }
    letsChat();		
};

// getDialog
window.getDialog= function (userio){
    if(getConvCount===0){
        var abc="";
        if($('.allbtn').html().indexOf('getConv(&quot;Health Plan&quot;)')>0){
          abc=$('.allbtn').html().replace('getConv(&quot;Health Plan&quot;)','getDialog(&quot;b_h_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Term Plan&quot;)')>0){
          abc=$('.allbtn').html().replace('getConv(&quot;Term Plan&quot;)','getDialog(&quot;b_t_page&quot;)');
          $('.allbtn').html(abc);
        }        
        if($('.allbtn').html().indexOf('getConv(&quot;Saving &amp; Investment&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Saving &amp; Investment&quot;)','getDialog(&quot;s1_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;For Retirement&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;For Retirement&quot;)','getDialog(&quot;b_r_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;For My Child&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;For My Child&quot;)','getDialog(&quot;b_ch_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;For Financial Protection&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;For Financial Protection&quot;)','getDialog(&quot;fp_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;For My Business&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;For My Business&quot;)','getDialog(&quot;bus_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;For Tax Planning&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;For Tax Planning&quot;)','getDialog(&quot;tx_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Multiple illnesses&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Multiple illnesses&quot;)','getDialog(&quot;hs_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Comprehensive heart insurance&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Comprehensive heart insurance&quot;)','getDialog(&quot;ht_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Term or Health&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Term or Health&quot;)','getDialog(&quot;oth_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Service Requirement&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Service Requirement&quot;)','getDialog(&quot;sr_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Write your Free Will&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Write your Free Will&quot;)','getDialog(&quot;ww_page&quot;)');
          $('.allbtn').html(abc);
        }
    
    }else{
      var abc="";
        if($('.allbtn:last').html().indexOf('getConv(&quot;Health Plan&quot;)')>0){
          abc=$('.allbtn:last').html().replace('getConv(&quot;Health Plan&quot;)','getDialog(&quot;b_h_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;Term Plan&quot;)')>0){
          abc=$('.allbtn:last').html().replace('getConv(&quot;Term Plan&quot;)','getDialog(&quot;b_t_page&quot;)');
          $('.allbtn:last').html(abc);
        }        
        if($('.allbtn:last').html().indexOf('getConv(&quot;Saving &amp; Investment&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;Saving &amp; Investment&quot;)','getDialog(&quot;s1_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;For Retirement&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;For Retirement&quot;)','getDialog(&quot;b_r_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;For My Child&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;For My Child&quot;)','getDialog(&quot;b_ch_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;For Financial Protection&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;For Financial Protection&quot;)','getDialog(&quot;fp_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;For My Business&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;For My Business&quot;)','getDialog(&quot;bus_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;For Tax Planning&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;For Tax Planning&quot;)','getDialog(&quot;tx_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;Multiple illnesses&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;Multiple illnesses&quot;)','getDialog(&quot;hs_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;Comprehensive heart insurance&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;Comprehensive heart insurance&quot;)','getDialog(&quot;ht_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn:last').html().indexOf('getConv(&quot;Term or Health&quot;)')>0)	{
          abc=$('.allbtn:last').html().replace('getConv(&quot;Term or Health&quot;)','getDialog(&quot;oth_page&quot;)');
          $('.allbtn:last').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Service Requirement&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Service Requirement&quot;)','getDialog(&quot;sr_page&quot;)');
          $('.allbtn').html(abc);
        }
        if($('.allbtn').html().indexOf('getConv(&quot;Write your Free Will&quot;)')>0)	{
          abc=$('.allbtn').html().replace('getConv(&quot;Write your Free Will&quot;)','getDialog(&quot;ww_page&quot;)');
          $('.allbtn').html(abc);
        }
    }
    getConvCount++;
  
    $('#refresh').addClass("disableMouseEvent");
    $('#ref').addClass("disableMouseEvent");
    $('.dropdown').addClass("disableMouseEvent");
    $('#overlayforchat').addClass('overlaychat');
    scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
    $("#usertext").attr("disabled","disabled");
    $('#usertext').val('');
    $("#send").attr("disabled","disabled");
    $('.yesnobtn').addClass("disableMouseEvent");
    $('.irs').addClass("disableMouseEvent");
    $('#datetimepicker11').addClass("disableMouseEvent");
    $('.form-check').addClass("disableMouseEvent");
    getConversation(userio);
    $('#usertext').removeClass("disableMouseEvent");
  
};

// getiframeurl
function getiframeurl(){ 
    var url_link =	 $('#iframe').html(window.location.href);
    var str =url_link[0].baseURI;
    $.ajax({url : "api/v1/iframe.do",
        method : "GET",
        async : true,
        data :({url_data :str}),
        success: function(data) {
                var url_link =	 $('#iframe').html(window.location.href);
        }
    }).done(function(data) { 
        var status = data;
    }).fail(function(){
        bootbox.alert("Error to get url");
    });
}

// timeout
function timeOut() {
    var pre = '<div class="chat-message chat-message-recipient animated fadeIn abc">' + botIcon +
        '<div class="chat-message-wrapper">' +
        '<div class="chat-message-content">';
  
    var botContainerPost = "</div>";
  
    var period = 900; //in seconds
    tout = setInterval(function () {
      period = period - 1;
      _rem = period;
      if (_rem <= 60) {
        if (_rem === 60) {
          var mesg ="Your session with ALISHA will expire in <span class='time'>1 minute.</span>";
          var me = pre + mesg + botContainerPost;
          $(".message-container").append(me);
          scrollElment.animate({ scrollTop: scrollElment.prop("scrollHeight") }, 1000);
          speakLoud("Your session with ALISHA will expire in 1 minute.");
        } else if(_rem === 0) {
          $("#errormodel").modal({
            show: "true",
            backdrop: "static",
            keyboard: false,
          });
          clearInterval(tout);
        } else {
          $(".time").html(_rem + " seconds");
        }
      }
    }, 1000);
}

// Error_refresh
$('#error_refresh').on('click',function(){
    $('.spinner').css('display','block');
    document.location.reload();
    $('.spinner').hide();
});

// updatePincodes
function updatePincodes(e){
	e.blur();
	$.ajax({
		url:'getPinCode',
		type:'GET',
		data:{
			key:key,
			session:res,
			state:$('#txtPincode').val()
		},
		success:function(data){
			if(data!=="ERROR" || data!==""){
				$('.txtState').last().val(data);
			}
		},
		fail:function(xhr){
			console.log('Bad Request'+xhr);
		}
	});	
}

// addProof
//$('#addProof').click(function(){
function addProof(){	
	var numItems = $('.uap').length;
	console.log('UAP: '+numItems);
	noAddressProof=numItems;
	if(numItems<3){
	var new_tr = '<tr class="tr{i} uap">';
		new_tr +='<th>Upload Address Proof (upto 5 MB)<span style="color:#f00;"">*</span></th>';
		//new_tr +='<td><input type="file" class="form-control input-sm" id="fileAddressProof-'+numItems+'"><label class="error err_AdrFile'+numItems+'"></label></td>';
		/*new_tr +='<td><button class="btn addfiles" id="addfiles-'+numItems+'">Choose File</button>';
		new_tr +='<input id="fileAddressProof-'+numItems+'" type="file" class="hidden">';*/
		new_tr +='<td>';
		new_tr +='<input type="file" class="form-control input-sm inputClear fileAddressProof-'+numItems+'" id="fileAddressProof-'+numItems+'">';
		new_tr +='<button id="fileAddressProof-'+numItems+'clear" class="fileAddressProof-'+numItems+'clear" style="display:none" type="button">X</button>';
		new_tr +='<label class="error err_AdrFile'+numItems+'"></label></td>';
		new_tr +='</tr>';
		new_tr +='<tr class="tr{i}">';
		new_tr +='<td colspan="2">';
		new_tr +='<i title="Add Address Proof Type" onclick="addProof()" class="av-plus-o"></i>';
		new_tr +='<i title="Romove Address Proof Type" onclick="removeBlock(this.id)" id="tr{i}" class="av-minus-o"></i>';
		new_tr +='</td>';
		new_tr +='</tr>';
		new_tr +='<tr class="tr{i}" id="tr-{i}">';
		new_tr +='<td colspan="2" style="padding:0px;">';
		new_tr +='<hr class="trs">';
		new_tr +='</td>';
		new_tr +='</tr>';
		new_tr+="<script>";
		new_tr +="$(document).ready(function() { ";
		/*new_tr +='$("#addfiles-'+numItems+'").on("click", function() { $("#fileAddressProof-'+numItems+'").click();return false;});';
		new_tr +="});";*/
		new_tr +='$(".fileAddressProof-'+numItems+'").last().filestyle({icon : false, size: "sm"}); ';
		new_tr +='$(".fileAddressProof-'+numItems+'clear").last().click(function() {$(".fileAddressProof-'+numItems+'").last().filestyle("clear");});';
		new_tr +="});";
		new_tr +="</script>";

		var newstring = new_tr.replace(/{i}/g, strAdC);
		//$('#strategyaddmore').append(newstring);
		var b4 = strAdC - 1;
		if( $('#tr-'+b4+':last').length ){
			$( newstring ).insertAfter( "#tr-"+b4+":last" );
		} else {
			$( newstring ).insertAfter( "#tr-1:last" );
		}  
  	strAdC++;
  	} else {
  		console.log(numItems+" exceeds");
  	}
}

// removeBlock
function removeBlock(e){
	$('.'+e).remove();
}

// searchCity
window.searchCity=function(){
	var city = $('.txtCitys').val();
	if(city===""){
		$('#cities').html('');
	}else{
		setTimeout(function(){
		$.ajax({
		url:'searchCity',
		type:'GET',
		async:true,
		data:{
			key:key,
			session:res,
			city:city
		},
		success:function(data){
			if(data!=="ERROR" || data!==""){
				$('#cities').html(data);
			}
		},
		fail:function(xhr){
			console.log('Bad Request'+xhr);
		}
		});
	},10);	
	}		
};

// clearAddFrm
function clearAddFrm(){
	$('.txtAddressL1').last().val('');
	$('.txtAddressL2').last().val('');
	$('.txtAddressL3').last().val('');
	$('.txtLandmark').last().val('');
	$('.txtCitys').last().val('');
	$('.txtPincode').last().val('');
	$('.txtState').last().val('');
	$('.fileAddressProofclear').last().trigger('click');
	$('.fileAddressProof-1clear').last().trigger('click');
	$('.fileAddressProof-2clear').last().trigger('click');
	$('.fileAddressProof-3clear').last().trigger('click');
	$('.err_adr1').last().html('');
	$('.err_adr2').last().html('');
	$('.err_adr3').last().html('');
	$('.err_landmark').last().html('');
	$('.err_city').last().html('');
	$('.err_pincode').last().html('');
	$('.err_state').last().html('');
	$('.err_country').last().html('');
	$('.err_AdrFile').last().html('');
	$('.err_AdrFile1').last().html('');
	$('.err_AdrFile2').last().html('');
}

// clearPanFrm
function clearPanFrm(){
	$('#txtPanNo').val('');
	$('#filePanProofclear').trigger('click');
	$('.err_panno').last().html('');
	$('.err_panfile').last().html('');
}

// saveclientData
function saveclientData(session){
	$.ajax({
		url:'api/v1/saveClientInfo',
		type:'POST',
		data:{
			key:key,
			session:session,
			os:_client.getOs(),
			os_ver:_client.getOsVersion(),
			browser:_client.getBrowser(),
			browser_ver:_client.getBrowserVersion(),
			browser_maj_ver:_client.getBrowserMajorVersion(),
			device_type:_client.getDevicetype(),
			screen:_client.getScreenSize(),
			cookie_status:_client.getCookieStatus(),
			latitude:_client.getLatitude(),
			longitude:_client.getLongitude
		},
		success:function(data){
			/*if(data==='true')
				console.log('Client info saved successfuly..!!!');
			else
				console.log('failed to save data');*/
		},
		fail:function(xhr){
			console.log('Bad Request'+xhr);
		}
	});
}

// Validations
var validates={
	emailId:function(e){
		var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    	var match = emailRegex.test($('#usertext').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	mobileNo:function(e){
		var phoneRegex = /^[0-9]{10}$/;
    	var match = phoneRegex.test($('#usertext').val());
		if(match){
			$("#send").removeAttr("disabled");
			$("#send").addClass("animate-pulse-send");
		} else {
			$("#send").attr("disabled","disabled");
			$("#send").removeClass("animate-pulse-send");
		}		
		return match;
	},
	panNo:function(pan){
		var panRegex = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;    
		var match= panRegex.test(pan);
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	otpNo:function(e){
		var otpRegex = /^[0-9]{6}$/;
    	var match =  otpRegex.test($('#usertext').val());
		if(match){
			$("#send").removeAttr("disabled");
			$("#send").addClass("animate-pulse-send");
		}
		else{
			$("#send").attr("disabled","disabled");
			$("#send").removeClass("animate-pulse-send");
		}		
		return match;
	},
	policyNo:function(e){
		var otpRegex = /^[0-9]{8}$/;
    	var match =  otpRegex.test($('#usertext').val());
		if(match){
			$("#send").removeAttr("disabled");
			$("#send").addClass("animate-pulse-send");
		} else{
			$("#send").attr("disabled","disabled");
			$("#send").removeClass("animate-pulse-send");
		}
		return match;
	},
	attachmentFormat:function(file){
		var fileName = file.name;
		var allowed_extensions = new Array("jpg","gif","png","jpeg","bmp","pdf","tif","tiff");
	    var file_extension = fileName.split('.').pop().toLowerCase(); // split function will split the filename by dot(.), and pop function will pop the last element from the array which will give you the extension as well. If there will be no extension then it will return the filename.

	    for(var i = 0; i <= allowed_extensions.length; i++)
	    {
	        if(allowed_extensions[i]==file_extension)
	        {
	            return true; // valid file extension
	        }
	    }
	    //$('.err_panfile').html('Only .jpg, .gif, .png, .jpeg, .bmp, .pdf, .tif, .tiff file format are allowed.');
	    return false;
	},
	address1:function(a1){
		var add1Regex = /([\w#`~%&\(\)\/])/g;
		var match =  add1Regex.test($('#txtAddressL1').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	address2:function(a2){
		var add2Regex = /([\w#`~%&\(\)\/])/g;
		var match =  add2Regex.test($('#txtAddressL2').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	address3:function(a3){
		var add3Regex = /([\w#`~%&\(\)\/])/g;
		var match =  add3Regex.test($('#txtAddressL3').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	landmark:function(l){
		var landmarkRegex = /([\w#`~%&\(\)\/])/g;
		var match =  landmarkRegex.test($('#txtLandmark').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	city:function(c){
		var cityRegex = /([\w#`~%&\(\)\/])/g;
		var match =  cityRegex.test($('#txtCity').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	state:function(c){
		var stateRegex = /([\w#`~%&\(\)\/])/g;
		var match =  stateRegex.test($('#txtState').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
	pinCode:function(p){
		var pinRegex = /^[0-9]{6}$/;
    	var match =  pinRegex.test($('#txtPincode').val());
		if(match)
			$("#send").removeAttr("disabled");
		else
			$("#send").attr("disabled","disabled");
		
		return match;
	},
  isNumber:function(n){
		var numberRegex = /^[0-9]{1,10}$/; // /^\d+\.?\d*$/; ///^[0-9]$/;
    var match =  numberRegex.test($('#usertext').val());
		if(match){
      $(".errorS_block").fadeOut();
      $(".errorS_block .content").html('');
			$("#send").removeAttr("disabled");
    } else {
      if($('#usertext').val()!==''){
        $(".errorS_block .content").html('').html(priceValMsg);
        $(".errorS_block").fadeIn();
      }
			$("#send").attr("disabled","disabled");
    }
		return match;
	},
	attachmentSize:function(file,cat){
		console.log(file.size);
		if(cat==='pan'){
			if(file.size>=5*1024*1024)
				return false;
			else
				return true;	
		}else if(cat==='address'){
			if(file.size>=5*1024*1024)
				return false;
			else
				return true;
		}else{
			return false;
		}
		
	},
	ValidateDateFormat:function(input, e){
      let seperator = "/";
      let keyCode = e.keyCode; 

      if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && keyCode != 16) {
        if ((input.value.length == 2 || input.value.length == 5) && keyCode != 8) {
          input.value += seperator;
        }
        if(input.value.length == 10){
            $("#send").removeAttr("disabled");
            $(".sendDP").removeAttr("disabled");
            $("#send").addClass("animate-pulse-send");           
        } else if(input.value.length <10 || input.value.length >10){
            $("#send").attr("disabled","disabled");
            $(".sendDP").attr("disabled","disabled");
            $("#send").removeClass("animate-pulse-send");
        }
        return true;
      } else {
        return false;
      }
    }
};

$(document).on('keyup','.validatePolicy,.validateOTP,.validateMobile,.validateEmail,.validateNumber',
	function(){
		if($(this).hasClass('validatePolicy')){
			validates.policyNo($('#usertext').val());
		}else if($(this).hasClass('validateOTP')){
			validates.otpNo($('#usertext').val());
		}else if($(this).hasClass('validateMobile')){
			validates.mobileNo($('#usertext').val());
		}else if($(this).hasClass('validateEmail')){
			validates.emailId($('#usertext').val());
    }else if($(this).hasClass('validateNumber')){
			validates.isNumber($('#usertext').val());
		}	
	}
);

$(document).on('paste','.validatePolicy,.validateOTP,.validateMobile,.validateEmail,.validateNumber',
	function(){
		if($(this).hasClass('validatePolicy')){
			validates.policyNo($('#usertext').val());
		}else if($(this).hasClass('validateOTP')){
			validates.otpNo($('#usertext').val());
		}else if($(this).hasClass('validateMobile')){
			validates.mobileNo($('#usertext').val());
		}else if($(this).hasClass('validateEmail')){
			validates.emailId($('#usertext').val());
    }else if($(this).hasClass('validateNumber')){
			validates.isNumber($('#usertext').val());
		}	
	}
);

$(document).on('blur','.validatePolicy,.validateOTP,.validateMobile,.validateEmail,.validateNumber',
	function(){
		if($(this).hasClass('validatePolicy')){
			validates.policyNo($('#usertext').val());
		}else if($(this).hasClass('validateOTP')){
			validates.otpNo($('#usertext').val());
		}else if($(this).hasClass('validateMobile')){
			validates.mobileNo($('#usertext').val());
		}else if($(this).hasClass('validateEmail')){
			validates.emailId($('#usertext').val());
		}else if($(this).hasClass('validateNumber')){
			validates.isNumber($('#usertext').val());
		}	
	}
);

$(document).on('click input propertychange','.validatePolicy,.validateOTP,.validateMobile,.validateEmail,.validateNumber',
	function(){
		if($(this).hasClass('validatePolicy')){
			validates.policyNo($('#usertext').val());
		}else if($(this).hasClass('validateOTP')){
			validates.otpNo($('#usertext').val());
		}else if($(this).hasClass('validateMobile')){
			validates.mobileNo($('#usertext').val());
		}else if($(this).hasClass('validateEmail')){
			validates.emailId($('#usertext').val());
		}else if($(this).hasClass('validateNumber')){
			validates.isNumber($('#usertext').val());
		}	
	}
);