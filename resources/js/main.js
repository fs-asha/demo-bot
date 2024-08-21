var usrText=$('#usertext');
var convid='';
var lang='en';
var res="";

var isIE = false || !!document.documentMode;
// var isIE = /*@cc_on!@*/ false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia; 
var url_link="";
var isFirefox = typeof InstallTrigger !== 'undefined';
var pattern='';
var panFormEnabled=false;
var addressFormEnabled=false;
var currentRequest = 'checkReq';
var transaction_id="";
var tout;
var noAddressProof=0;
var getConvCount=0;
var strAdC=2;
var isInit = true;
var imgWidth;

query_count=0;
var child_page_url = "https://www.avivaindia.com";

var baseFrame = '<div class="container-fluid bg-template ">'
                + '<div class="row hn-154 position-relative">'
                + '<h5 class="text-center text-white mt-3" id="username">Hello <span id="res_username">...</span></h5>'
                + '<img src="resources/images/chat/chatbtn.png" class="section-bot-icon" alt="..." />'
                // + '<div class="chat-icon-wrap"><div class="av-chat-icon"></div></div>'
                + '</div>'
                + '</div>'
                + '<div class="pre-loader"></div>';

var botContainerPre='<div class="chat-message chat-message-recipient animated fadeIn">'+
					'<div class="chat-icon"></div>';
var botContainerFillPre='<div class="chat-message chat-message-recipient chat-top-fill animated fadeIn">'+
					'<div class="chat-icon"></div>';
var botContainerNoIconPre='<div class="chat-message chat-message-recipient animated fadeIn">'+
					'<div class="chat-icon opac"></div>';
var botContainerPost='</div>';

var userContainerPre='<div class="chat-message chat-message-sender animated fadeInRight">'+
                        '<div class="chat-icon"></div>'+
                        '<div class="chat-message-wrapper">'+
                            '<div class="chat-message-content">'; 
var userContainerPost='</div></div></div>';

var messageWrapPre = '<div class="chat-message-wrapper">'
var messageWrapPost = '</div>';

var messageWrapNoGutterPre = '<div class="chat-message-wrapper no-pad">'
var messageWrapNoGutterPost = '</div>';

var messageRangePre = '<div class="chat-message-wrapper chat-range">'
var messageRangePost = '</div>';

var messageContentPre = '<div class="chat-message-content">'
var messageContentPost = '</div>';

var messageButtonsPre = '<div class="chat-message-buttons">'
var messageButtonsPost = '</div>';

var topMessageWrapPre = '<div class="top-navs">'
var topMessageWrapPost = '</div>';

var topMessageTextPre = '<div class="top-text">'
var topMessageTextPost = '</div>';

var topMessageListPre = '<ul class="fullnav">'
var topMessageListPost = '</ul>';

var imgButtonWrapPre = '<div class="main-nav">'
var imgButtonWrapPost = '</div>';

var imgButtonListPre = '<ul>'
var imgButtonListPost = '</ul>';

var adsBannerUI = '<div class="chat-message chat-message-recipient chat-banner-ads">'
                + '<div class="swiper adsSwiper">'
                + '  <div class="swiper-wrapper">'
                + '    <div class="swiper-slide">'
                + '      <img src="resources/images/ads/ad-banner-01.png" class="ads-banner" alt="..." />'
                + '    </div>'
                + '    <div class="swiper-slide">'
                + '      <img src="resources/images/ads/ad-banner-01.png" class="ads-banner" alt="..." />'
                + '    </div>'
                + '    <div class="swiper-slide">'
                + '      <img src="resources/images/ads/ad-banner-01.png" class="ads-banner" alt="..." />'
                + '    </div>'
                + '  </div>'
                + '  <div class="ads-pagination"></div>'
                + '</div>'
                + '</div>';

$(document).ready(function(){
	var date =moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	var tzone=moment(new Date()).format("Z").replace('+',' +');
  $import('resources/dist/js/bootstrap-formhelpers.min.js');
  $import('resources/js/cccode.js');
  // setTimeout(function(){
  //   $('#myEnterNameModal').modal({
  //     show: 'true',
  //     backdrop: 'static',
  //     keyboard: false
  //  });
  // }, 10);
  getConvCount=0;
	var mfbtn = document.getElementsByClassName('btn-2');
  $('.chat-list').on('scroll', function () {
    /* header active on scroll more than n px*/
    if ($(this).scrollTop() >= 60) {
        $('body').addClass('header-sticky')
    } else {
        $('body').removeClass('header-sticky')
    }
  });
	$("#usertext").on("keypress", function(e) {
	    if (e.which === 32 && !this.value.length){
	    	e.preventDefault();
	    	usrText.removeClass('micOpen');
	    	if(isIE === false && isFirefox === false) {
          // For Audio - uncomment to start
		    	synth.cancel();
		    	if(typeof audio!='undefined'){
	        		audio.stop();
	        	}
        	}
	    }
	    
	}); 

  // init
  if(isInit){ 
    // geturl()
  }
}); //End: document ready

function $import(src){
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',src);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

function getConversation(userio) {
    if(userio!=='start'){ $("#loading").delay(100).show(); } 
    $("#usertext").attr("disabled", "disabled");
    $(".dropdown").addClass("disableMouseEvent");
    $(".errorS_block .content").html('');
    $(".errorS_block").fadeOut();
    
    if (isIE === false && isFirefox === false) {
      // For Audio - uncomment to start
      synth.cancel();
      if (typeof audio != "undefined") {
        audio.stop();
      }
    }
    // ************************************** //
    // -----------------Test----------------- //
    var isTest=false;
    // ************************************** //
    if(isTest){
      setTimeout(() => {
        generateUI(response, userio)
      }, 800);
    } else {
        /* Ajax call */
        currentRequest = $.ajax({
          async: true,
          crossDomain: true,
          url: "api/v1/getWatsonConversationResponse",
          method: "POST",
          beforeSend : function()    {           
            if(currentRequest != 'checkReq' && currentRequest.readyState < 4) {
                currentRequest.abort();
            }
          },
          data: {
            query: userio,
            username: encodeURIComponent(userName),
            date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            //sessionid:res,
            key: key,
            lang: lang,
            timezone: moment(new Date()).format("Z"),
            data: _client.getData(),
            channel: 'Web-Portal',
          },
          success: function (data) {
            // Call function to make UI
            generateUI(data, userio)
            userName = data.username;

          },
          error: function (xhr, ajaxOptions, thrownError) {
            if(ajaxOptions!=="abort"){
              $("#errormodel").modal({
                show: "true",
                backdrop: "static",
                keyboard: false,
              });
            }            
          },
        });
    }
}

window.generateUI = function(obj, userio){
  let inputTypeElements='';
  let btnsElements=false;
  let imgBtnsElements=false;
  let faqListElements=false;
  let imgElements=false;
  let policyListElements=false;
  let policyDetailsElements=false;
  let updateCardElements=false;
  let updatePanFormElements=false;
  let updateAddressFormElements=false;
  let rangeElements=false;
  let priceRangeElements=false;
  let datePickerElements=false;
  let priceBarArr=[];
  
    $(".abc").fadeOut("blind");
    // console.log(obj);
    var hi = $(".message-container").height();
    var botio = "";
    var botMsg = "";

    let msgs = obj.msg;
    // Check if property found
    if(Object.prototype.hasOwnProperty.call(obj, 'element')) {
        // console.log("Is element");
        let elemnt = obj.element;
        btnsElements = Object.prototype.hasOwnProperty.call(elemnt, 'Btns');
        imgBtnsElements = Object.prototype.hasOwnProperty.call(elemnt, 'imgBtns');
        faqListElements = Object.prototype.hasOwnProperty.call(elemnt, 'links');
        imgElements = Object.prototype.hasOwnProperty.call(elemnt, 'img');
        policyListElements = Object.prototype.hasOwnProperty.call(elemnt, 'policy_list');
        policyDetailsElements = Object.prototype.hasOwnProperty.call(elemnt, 'policy_details');
        updateCardElements = Object.prototype.hasOwnProperty.call(elemnt, 'update_card');
        updatePanFormElements = Object.prototype.hasOwnProperty.call(elemnt, 'update_pan_form');
        updateAddressFormElements = Object.prototype.hasOwnProperty.call(elemnt, 'update_address_form');
        rangeElements = Object.prototype.hasOwnProperty.call(elemnt, 'Range');
        priceRangeElements = Object.prototype.hasOwnProperty.call(elemnt, 'priceRange');
        datePickerElements = Object.prototype.hasOwnProperty.call(elemnt, 'datepicker');
    }
    // Check and set inputType
    if(Object.prototype.hasOwnProperty.call(obj, 'input_type')) {
        inputTypeElements = obj.input_type;                                        
    }
    if(rangeElements && Object.prototype.hasOwnProperty.call(obj.element.Range, 'priceBar')) {
      priceBarArr=obj.element.Range.priceBar;
      // console.log(priceBarArr);
    }
    let msgTextRes='';
    msgs.map((ms, id, arr) => {
        let msg = ms.text.replace(/~/g, "\"").replace(/{tri_id}/g,transaction_id)
        if(userio==='start' && imgBtnsElements){
          if(id===0){
            $('#res_username').html('').html(msg)
          } else {
            msgTextRes+='<p>'+msg+'</p>'
          }
        } else {
          // Bubble logics
          if(id === 0 && id === arr.length - 1){ //Single
            // console.log('only');
            if(userio==='start'){
              msgTextRes+=botContainerFillPre
            } else  {
              msgTextRes+=botContainerPre
            }
            msgTextRes+=messageWrapPre
                +messageContentPre
                  +msg
                +messageContentPost
              +messageWrapPost
            +botContainerPost
          } else if(id === 0 && id !== arr.length - 1){ //First
            // console.log('1st');
            if(userio==='start'){
              msgTextRes+=botContainerFillPre
            } else  {
              msgTextRes+=botContainerPre
            }
            msgTextRes+=messageWrapPre
                +messageContentPre
                  +msg
                +messageContentPost
              +messageWrapPost
            +botContainerPost
          } else if(id > 0 && id !== arr.length - 1){ //Middles
            // console.log('Middle');
            msgTextRes+=botContainerNoIconPre
              +messageWrapPre
                +messageContentPre
                  +msg
                +messageContentPost
              +messageWrapPost
            +botContainerPost
          } else if(id > 0 && id === arr.length - 1){ //Last
            // console.log('Last');
            msgTextRes+=botContainerNoIconPre
              +messageWrapPre
                +messageContentPre
                  +msg
                +messageContentPost
              +messageWrapPost
            +botContainerPost
          }                  
        }
    })

    let itemListRes='';
    let btnRes='';
    let faqRes='';
    if(imgBtnsElements && userio==='start'){
        obj.element.imgBtns.plan.map((btns, bid)=>{
            let checkIcon ='';
            if (!btns.img_url.startsWith('av-')) {
              // string does not start with foo
              checkIcon = IconHandler(btns.img_url);
            } else {
              checkIcon = btns.img_url
            }            
            // console.log(checkIcon);
            itemListRes+='<li class="lvl1">'
                +'<a class="waves-effect ui-pages-timeline" onClick="getConv(\''+btns.value+'\')">';
            
            if(checkIcon!==false){
              itemListRes+='<i class="avi '+ checkIcon +'"></i>'
            } else {
              itemListRes+='<i class="li1-icons"><img src="'+checkIcon+'" class="" /></i>'
            }
                // +'<i class="li1-icons li1-personal-details">'
                // // +'<img src="'+btns.img_url+'" class="" />'
                // +'</i>'
              itemListRes+='<span class="title">'+btns.name+'</span>'
                +'</a>';
            if(btns.info && btns.info!==''){
              itemListRes+='<span onclick="getConv(\''+btns.info+'\')" class="btn-info" title="'+ btns.info +'"></i>'                
            }
            itemListRes+='</li>'
        })
    } else if(imgBtnsElements && userio!=='start'){
        obj.element.imgBtns.plan.map((btns, bid)=>{
            let checkIcon ='';
            if (!btns.img_url.startsWith('av-')) {
              // string does not start with foo
              checkIcon = IconHandler(btns.img_url);
            } else {
              checkIcon = btns.img_url
            }            
            // console.log(checkIcon);
            itemListRes+='<li class="">'
                +'<button onClick="getConv(\''+btns.value+'\')" class="av-sprite">';
            
            if(checkIcon!==false){
              itemListRes+='<div class="avi '+checkIcon+'"></div>'
            } else {
              itemListRes+='<img src="'+btns.img_url+'" class="" />'
            }
                  // +'<img src="'+btns.img_url+'" class="" />'
                  // +'<div class="'+btns.img_url+'"></div>'
              itemListRes+='<span class="">'+btns.name+'</span>'
                +'</button>';
              
              if(btns.info && btns.info!==''){
                itemListRes+='<span onclick="getConv(\''+btns.info+'\')" class="btn-img-info" title="'+ btns.info +'"></i>'                
              }
              
                itemListRes+='</li>'
        })
    }

    let policyDetailRes='';
    if(policyDetailsElements){
      let policyDetail = obj.element.policy_details;

      // POlicy Details:start
      // Top message text
      policyDetailRes+= botContainerPre
              +messageWrapPre
                +messageContentPre
                  +msgs[0].text
                +messageContentPost
              +messageWrapPost
            +botContainerPost
      // Table wrap
      policyDetailRes+= botContainerNoIconPre
            +'<div class="chat-message-wrapper table">'
            +'<table class="table pDetails">'
            +'<tbody>'
            +'<tr><th nowrap colspan=\'2\'>Policy Details</th></tr>';

      policyDetailRes+='<tr>'
            +'<th nowrap><span class="titleH">Policyholder Name</span></th>'
            +'<td><span class="titleD">'+policyDetail.policyHolderName+'</span></td>'
            +'</tr>'
            +'<tr>'
            +' <th nowrap><span class="titleH">Cliend ID</span></th>'
            +' <td><span class="titleD">'+policyDetail.clientId+'</span></td>'
            +'</tr>'
            +'<tr>'
            +' <th nowrap><span class="titleH">Product Name</span></th>'
            +' <td><span class="titleD">'+policyDetail.productName+'</span></td>'
            +'</tr>'
            +'<tr>'
            +' <th nowrap><span class="titleH">Life Assured Name</span></th>'
            +' <td><span class="titleD">'+policyDetail.lifeAssuredName+'</span></td>'
            +'</tr>'
            +'<tr>'
            +' <th>'
            +'  <span class="titleH">Policy Start Date</span>'
            +'  <span class="titleD">'+policyDetail.policyStartDate+'</span>'
            +' </th>'
            +' <td>'
            +'  <span class="titleH">Premium Due Date</span>'
            +'  <span class="titleD">'+policyDetail.premiumDueDate+'</span>'
            +' </td>'
            +'</tr>'
            +'<tr>'
            +' <th>'
            +'  <span class="titleH">Premium Amount</span>'
            +'  <span class="titleD">'+policyDetail.premiumAmount+'</span>'
            +' </th>'
            +' <td>'
            +'  <span class="titleH">Policy Status</span>'
            +'  <span class="titleD">'+policyDetail.policyStatus+'</span>'
            +' </td>'
            +'</tr>'
            +'<tr>'
            +' <th>'
            +'  <span class="titleH">Sum Assured</span>'
            +'  <span class="titleD">'+policyDetail.sumAssured+'</span>'
            +' </th>'
            +' <td>'
            +'  <span class="titleH">Policy Term</span>'
            +'  <span class="titleD">'+policyDetail.policyTerm+'</span>'
            +' </td>'
            +'</tr>'
            +'<tr>'
            +' <th>'
            +'  <span class="titleH">Premium Payment Term</span>'
            +'  <span class="titleD">'+policyDetail.premiumPaymentTerm+'</span>'
            +' </th>'
            +' <td>'
            +'  <span class="titleH">Maturity Date</span>'
            +'  <span class="titleD">'+policyDetail.maturityDate+'</span>'
            +' </td>'
            +'</tr>'
            +'<tr>'
            +' <th><span class="titleH">Total Premium Paid Till Date</span></th>'
            +' <td><span class="titleD">'+policyDetail.premiumPaidTillDate+'</span></td>'
            +'</tr>'
            +'<tr>'
            +'<th nowrap><span class="titleH">Nominee Name</span></th>'
            +'<td><span class="titleD">'+policyDetail.nomineeName+'</span></td>'
            +'</tr>'
            +'<tr>'
            +'<th nowrap><span class="titleH">Fund Value</span></th>'
            +'<td><span class="titleD">'+policyDetail.fundValue+'</span></td>'
            +'</tr>';

      policyDetailRes+='</tbody>'
            +'</table>'
            +'</div>'
            +botContainerPost
      // Table wrap: Ends


	if( msgs.length > 1 && msgs[1].text != '' ){
		 policyDetailRes+= botContainerNoIconPre
              +messageWrapPre
                +messageContentPre 
                  +msgs[1].text
                +messageContentPost
              +messageWrapPost
            +botContainerPost
	}
      
      // POlicy Details:ends

    }

    let updateCardRes='';
    if(updateCardElements){
      let updateCard = obj.element.update_card;

      // update Card:start
      // Top message text
      updateCardRes+= botContainerPre
              +messageWrapPre
                +messageContentPre
                  +msgs[0].text
                +messageContentPost
              +messageWrapPost
            +botContainerPost
      // Table wrap
      updateCardRes+= botContainerNoIconPre
            +'<div class="chat-message-wrapper table">'
            +'<table class="table pDetails">'
            +'<tbody>'
            +'<tr><th nowrap colspan=\'2\'>'+updateCard.header+'</th></tr>';
      
      updateCard.options.map((list)=>{
        updateCardRes+='<tr>'
            +'<th nowrap><span class="titleH">'+list.name+'</span></th>'
            +'<td><span class="titleD">'+list.value+'</span></td>'
            +'</tr>'
      })

      updateCardRes+='</tbody>'
            +'</table>'
            +'</div>'
            +botContainerPost
      // Table wrap: Ends

      // Dynamic buttons
      updateCardRes+= botContainerNoIconPre
              +messageButtonsPre;

        if(updateCard.header==='Mobile Details'){
          updateCardRes+='<button class="btn btn-portals" onclick="getConv(\'Update Mobile Number\')">Update Mobile Number</button>'
                +'<button class="btn btn-portals" onclick="getConv(\'Skip\')">Skip</button>'
        } else if(updateCard.header==='Email Details'){
          updateCardRes+='<button class="btn btn-portals" onclick="getConv(\'Update Email Id\')">Update Email Id</button>'
                +'<button class="btn btn-portals" onclick="getConv(\'Skip\')">Skip</button>'
        } else if(updateCard.header==='PAN Details'){
          updateCardRes+='<button class="btn btn-portals" onclick="getConv(\'Update PAN Details\')">Update PAN Details</button>'
                +'<button class="btn btn-portals" onclick="getConv(\'Skip\')">Skip</button>'
        } else {
          updateCardRes+='<button class="btn btn-portals" onclick="getConv(\'Update Address\')">Update Address</button>'
                +'<button class="btn btn-portals" onclick="getConv(\'Skip\')">Skip</button>'
        }
      
      updateCardRes+=messageButtonsPost
            +botContainerPost
      // update Card:ends

    }

    let updatePanFormRes='';
    if(updatePanFormElements){
      let panData = obj.element.update_pan_form;

      // Top message text
      updatePanFormRes+= botContainerPre
              +messageWrapPre
                +messageContentPre
                  +msgs[0].text
                +messageContentPost
              +messageWrapPost
            +botContainerPost

      updatePanFormRes += botContainerNoIconPre
      updatePanFormRes +=  messageContentPre;
      updatePanFormRes += "<div class='chat-message-wrapper table' style='line-height: 1.5em;'>";
      updatePanFormRes += "<table class='table pDetails allbtn'>";
      updatePanFormRes += "<tbody>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<th nowrap colspan='2'>" + "PAN Details" + "</th>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<th nowrap>" + "Policyholder Name" + "</th>";
      updatePanFormRes += "<td>" + panData.policyholder_name+ "</td>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<th>" + "Client ID" + "</th>";
      updatePanFormRes += "<td><input type='hidden' class='form-control input-sm clientId' value='" + panData.clientId + "' id='clientId'/>"
          + "<input type='hidden' class='form-control input-sm oldPan' value='" + panData.old_pan + "' id='oldPan'/>"
          + "<input type='hidden' class='form-control input-sm dob' value='" + panData.dob + "' id='dob'/>"
          + "<input type='hidden' class='form-control input-sm policyno' value='" + panData.policy_no + "' id='policyno'/>"
          + panData.clientId +
          "</td>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<th>Existing PAN Details</th>";
      updatePanFormRes += "<td>" + panData.pan + "</td>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<th>Enter New PAN</th>";
      updatePanFormRes += "<td><input autocomplete='off' type='text' class='form-control input-sm txtPanNo' value='' id='txtPanNo'><label class='error err_panno'></label></td>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<th colspan='2'>Upload Coloured PAN Proof(upto 5 MB)</th>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr>";
      updatePanFormRes += "<td colspan='2' class='filePanProoftd '>";
      updatePanFormRes += "<input type='file' class='form-control input-sm inputClear filePanProof' id='filePanProof'>";
      updatePanFormRes += "<button id='filePanProofclear' style='display:none' type='button'>X</button>";
      updatePanFormRes += "<label class='error err_panfile'></label></td>";
      updatePanFormRes += "</tr>";
      updatePanFormRes += "<tr><th colspan='2'style='font-size: 10px;'><a onclick='clearPanFrm()' class='clearForms'>(x) Clear all fields</a><br>Notes & Instructions</th></tr>";
      updatePanFormRes += "<tr><td colspan='2'><ul style='font-size: 10px;margin-left: -15px;'><li>Your request will be processed post verification of PAN details.</li><li>Pan updation is applicable at client level hence changes will be applicable for all the policies of the client.</li><li>As per PMLA Regulations, it is mandatory to link your PAN details with your Aviva Life Insurance Policy(ies). Incase you do not have a PAN, kindly submit Form 60 at any Aviva Branch, if not provided earlier.</li><li>If your PAN Card details are updated, tax is deducted at lower rates. So, to avoid tax deduction at a higher rate, we recommend that to update your PAN.</li><li>Only .jpg,.gif,.png,.jpeg,.bmp,.pdf,.tif,.tiff file format are allowed.</li></ul></td></tr>";
      updatePanFormRes += "</table>";
      updatePanFormRes += "</div>";
      updatePanFormRes +=  messageContentPost;
      updatePanFormRes += botContainerPost

      // buttons
      updatePanFormRes += botContainerNoIconPre;
      updatePanFormRes +=  messageButtonsPre;
      updatePanFormRes += "<button class='btn btn-portals' id='submit_pan' onclick='submitPan()'>Update PAN</button>";
      updatePanFormRes += "<button class='btn btn-portals' onClick='getConv(\"Skip\")'>Skip</button>";
      updatePanFormRes +=  messageButtonsPost;
      updatePanFormRes += botContainerPost;
      updatePanFormRes += "<script>" + "$('#usertext').attr('disabled','disabled');"
          + " $('#usertext').addClass('disableMouseEvent');";
      updatePanFormRes += "$(document).ready(function() { ";
      updatePanFormRes += "$('#filePanProof').filestyle({icon : false, size: 'sm'}); ";
      updatePanFormRes += " $('#filePanProofclear').click(function() {$('#filePanProof').filestyle('clear');}); ";
      updatePanFormRes += " }); ";
      updatePanFormRes += "</script>" + "<div class='pan-form-end'></div>";
    }

    let replyResponse=false;
    let updateAddressFormRes='';
    let updateAddressFormResMessage='';
    // TODO: Get response from element and generate UI
    if(updateAddressFormElements && !replyResponse){
      let addressData = obj.element.update_address_form;

      // Top message text
      updateAddressFormRes+= botContainerPre
              +messageWrapPre
                +messageContentPre
                  +msgs[0].text
                +messageContentPost
              +messageWrapPost
            +botContainerPost

      updateAddressFormRes+=botContainerNoIconPre;
      updateAddressFormRes+=messageContentPre;
      updateAddressFormRes+="<div class='chat-message-wrapper table' style='line-height: 1.5em;'>";
      updateAddressFormRes+="<table class='table pDetails'><tbody><tr>";
      updateAddressFormRes+="<th nowrap colspan='2'>" + "Correspondence Address" + "</th></tr><tr>";
      updateAddressFormRes+="<th nowrap>" + "Policyholder Name" + "</th>";
      updateAddressFormRes+="<td>" + addressData.policyholder_name + "</td>";
      updateAddressFormRes+="</tr><tr><th>Client ID</th>";
      updateAddressFormRes+="<td><input type='hidden' class='form-control input-sm clientid' value='"+addressData.clientId+"' id='clientid'>";
      updateAddressFormRes+="<input type='hidden' class='form-control input-sm dob' value='"+addressData.dob+"' id='dob'>";
      updateAddressFormRes+="<input type='hidden' class='form-control input-sm policy_no' value='"+addressData.policy_no+"' id='policy_no'>"
        + addressData.clientId + "</td>";
      updateAddressFormRes+="</tr><tr>";
      updateAddressFormRes+=" <th>Address Line 1<span style='color:#f00;'>*</span></th>";
      updateAddressFormRes+=" <td><textarea  class='form-control input-sm txtAddressL1' id='txtAddressL1' maxlength='30'>"
              + addressData.address1 + "</textarea><label class='error err_adr1'></label></td>";
      updateAddressFormRes+="</tr><tr> <th>Address Line 2</th>";
      updateAddressFormRes+=" <td><textarea  class='form-control input-sm txtAddressL2' id='txtAddressL2' maxlength='30'>"
              + addressData.address2 + "</textarea><label class='error err_adr2'></label></td>";
      updateAddressFormRes+="</tr><tr><th>Address Line 3</th>";
      updateAddressFormRes+=" <td><textarea  class='form-control input-sm txtAddressL3' id='txtAddressL3' maxlength='30'>"
              + addressData.address3 + " </textarea><label class='error err_adr3'></label></td>";
      updateAddressFormRes+="</tr><tr><th>Landmark</th>";
      updateAddressFormRes+="<td><input  type='text' class='form-control input-sm txtLandmark' id='txtLandmark' value='"
              + addressData.address4 + "'><label class='error err_landmark'></label></td>";
      updateAddressFormRes+="</tr><tr>";
      updateAddressFormRes+=" <th>City<span style='color:#f00;'>*</span></th> <td>";
      updateAddressFormRes+="<input id='txtCitys' class='form-control input-sm txtCitys' oninput='searchCity()' list='cities' onselect='losefocus(this)' onchange='losefocus(this)' autocomplete='off' value='"
              + addressData.city + "'>";
      updateAddressFormRes+="<datalist class='cities' id='cities'></datalist>";
      updateAddressFormRes+="<label class='error err_city'></label></td></tr><tr>";
      updateAddressFormRes+=" <th>Pincode<span style='color:#f00;'>*</span></th>";
      updateAddressFormRes+=" <td>";
      updateAddressFormRes+="<input id='txtPincode' class='form-control input-sm txtPincode' list='pincodes' onChange='updatePincodes(this)'  autocomplete='off' value='"
              + addressData.pincode + "'>";
      updateAddressFormRes+="<datalist id='pincodes' class='pincodes'></datalist>";
      updateAddressFormRes+="<label class='error err_pincode'></label></td>";
      updateAddressFormRes+=" </tr>";

      updateAddressFormRes+="<tr>";
      updateAddressFormRes+=" <th>State<span style='color:#f00;'>*</span></th>";
      updateAddressFormRes+=" <td><input readonly type='text' class='form-control input-sm txtState' id='txtState' value='"
              + addressData.address5 + "'>";
      updateAddressFormRes+="<label class='error err_state'></label></td>";
      updateAddressFormRes+="</tr>";
      updateAddressFormRes+="<tr>";
      updateAddressFormRes+=" <th>Country<span style='color:#f00;'>*</span></th>";
      updateAddressFormRes+=" <td><input type='text' class='form-control input-sm txtCountry' id='txtCountry' value='India' disabled><label class='error err_country'></label></td>";
      updateAddressFormRes+="</tr>";
      updateAddressFormRes+="<tr class='tr1'>";
      updateAddressFormRes+=" <th>Address Proof Type<span style='color:#f00;'>*</span></th>";
      updateAddressFormRes+=" <td>";
      updateAddressFormRes+="<select id='txtAddressProofType' class='form-control txtAddressProofType'>";
      updateAddressFormRes+="<option value='Passport'>Passport</option>"
          + "<option value='Voter ID Card'>Voter ID Card</option>"
          + "<option value='Driving License'>Driving License</option>"
          + "<option value='Job card issued by NREGA'>Job card issued by NREGA</option>";
      updateAddressFormRes+="</select>";
      updateAddressFormRes+="</td>";
      updateAddressFormRes+="</tr>";
      updateAddressFormRes+="<tr class='tr1 uap'>";
      updateAddressFormRes+="<th>Upload Address Proof(upto 5 MB)<span style='color:#f00;'>*</span></th>";
      updateAddressFormRes+="<td>";
      updateAddressFormRes+="<input type='file' class='form-control input-sm inputClear fileAddressProof' id='fileAddressProof'>";
      updateAddressFormRes+="<button id='fileAddressProofclear' style='display:none' type='button'>X</button>";
      updateAddressFormRes+="<label class='error err_AdrFile'></label>";
      updateAddressFormRes+="</td>";
      updateAddressFormRes+="</tr>";
      updateAddressFormRes+="<tr class='tr1'>";
      updateAddressFormRes+="<td colspan='2'>";
      updateAddressFormRes+="<i title='Add Address Proof Type' onclick='addProof()' class='av-plus-o'></i>";
      updateAddressFormRes+="</td>";
      updateAddressFormRes+="</tr>";
      updateAddressFormRes+="<tr class='tr1' id='tr-1'><td colspan='2' style='padding:0px;'><hr class='trs'></td></tr>";
      updateAddressFormRes+="<tr><th colspan='2'style='font-size: 10px;'><a onclick='clearAddFrm()' class='clearForms'>(x) Clear all fields</a><br>Notes & Instructions</th></tr>";
      updateAddressFormRes+="<tr><td colspan='2'><ul style='font-size: 10px;margin-left: -10px;'><li>All * fields are mandatory.</li><li>Your request will be processed post verification of Address Proof.</li><li>Address updation is applicable at client level hence changes will be applicable for all the policies of the client.</li><li>The information declared by you can be shared with relevant authority(ies) in event of any reporting.</li><li>Only .jpg,.gif,.png,.jpeg,.bmp,.pdf,.tif,.tiff file format are allowed.</li></ul></td></tr>";
      updateAddressFormRes+="</tbody>";
      updateAddressFormRes+="</table>";
      updateAddressFormRes+="</div>";
      updateAddressFormRes+=  messageContentPost;
      updateAddressFormRes+= botContainerPost
      // buttons
      updateAddressFormRes += botContainerNoIconPre;
      updateAddressFormRes +=  messageButtonsPre;
      updateAddressFormRes += "<button class='btn btn-portals' id='submit_address' onclick='submitAddress()'>Update Address</button>";
      updateAddressFormRes += "<button class='btn btn-portals' onClick='getConv(\"Skip\")'>Skip</button>";
      updateAddressFormRes +=  messageButtonsPost;
      updateAddressFormRes += botContainerPost;      
      
      updateAddressFormRes+="<script>" + "$('#usertext').attr('disabled','disabled');";
      updateAddressFormRes+=" $('#usertext').addClass('disableMouseEvent');";
      updateAddressFormRes+="$(document).ready(function() { ";
      updateAddressFormRes+="$('.js-example-basic-single').select2({";
      updateAddressFormRes+="selectOnClose: true,";
      updateAddressFormRes+="tags: true";
      updateAddressFormRes+="}); ";
      updateAddressFormRes+="$('#fileAddressProof').filestyle({icon : false, size: 'sm'}); ";
      updateAddressFormRes+=" $('#fileAddressProofclear').click(function() {$('#fileAddressProof').filestyle('clear');}); ";
      updateAddressFormRes+=" }); loadAddressFormData();";
      updateAddressFormRes+="</script><div class='address-form-end'></div>";

      updateAddressFormResMessage+= updateAddressFormRes;
    }
    
    // TODO: Get response from dynamic generted reply
    if(updateAddressFormElements && replyResponse){
      let addressData = obj.element.update_address_form;
      
      let str0 = "<div class='chat-image chat-image-default'><div class='av-alisha-1'></div></div>";
      let str1 = "<div class='chat-image chat-image-default' style='visibility:hidden'><div class='av-alisha-1'></div></div>";
      let str2 = "<div class='chat-image chat-image-default' style='visibility:hidden'><div class=' av-alisha-1'></div></div>";
      
      let newIcon = "<div class='chat-icon'></div>";
      let newIconOpac = "<div class='chat-icon opac'></div>";
      
      let string = obj.reply;
      let updateAddressFormRes = replaceStr(string, str0, newIcon);
        updateAddressFormRes = replaceStr(updateAddressFormRes, str1, newIconOpac);
        updateAddressFormRes = replaceStr(updateAddressFormRes, str2, newIconOpac);
        updateAddressFormRes = replaceStr(updateAddressFormRes, "<div class='allbtn'>", '<div class="chat-message-buttons">');
        updateAddressFormRes = replaceStr(updateAddressFormRes, 'font-size: 10px;margin-left: 15px;', 'font-size: 10px;margin-left: -10px;');
        updateAddressFormRes = replaceStr(updateAddressFormRes, 'yesnobtngreen', 'btn-portals');
        updateAddressFormRes = replaceStr(updateAddressFormRes, 'yesnobtn', 'btn-portals');
        updateAddressFormRes = updateAddressFormRes.replace(/~/g, '"').replace(/{tri_id}/g, transaction_id);;

      updateAddressFormResMessage+= updateAddressFormRes;
      
    }

    let priceBarRes='';
    if(rangeElements){
      let uuid = Date.now();

      let a = "";
      let priceRange =[];
      for (var i = 0; i < priceBarArr.length; i++) {
        priceRange[i] = priceBarArr[i].value;
        a += priceBarArr[i].value;
        if ((i + 1) < priceBarArr.length) {
          a += ",";
        }
      }
      priceBarRes+= "   <section id='' class='chat-message-content' style='width:100%;'>";
      priceBarRes+= "      <input type='text' id='pb" + uuid + "' value='' name='priceRange' />";
      priceBarRes+= "   </section>";
      
      priceBarRes+= "  <script>";
      priceBarRes+= "   $(document).ready(function() { });";
      priceBarRes+= "      var arrData = [" + a + "];";
      priceBarRes+= "      $('#pb" + uuid + "').ionRangeSlider({";
      priceBarRes+= " 		    grid: true,";
      priceBarRes+= "         values: arrData,";
      priceBarRes+= "         onChange: function (data) {";
      priceBarRes+= "                var an = data.from;";
      priceBarRes+= "                $('#usertext').val(arrData[an]);";
      priceBarRes+= "             setTimeout(function(){ $('#send').addClass('flash-button'); }, 200);";
      priceBarRes+= "             }";
      priceBarRes+= " 	 });";
      priceBarRes+= "  </script>";
    }
    
    let priceRangeRes='';
    if(priceRangeElements){
      let uuid = Date.now();
      let priceRangeData = obj.element.priceRange;

      // Need to update with dynamic values from response
      let min = priceRangeData.min;
      let max = priceRangeData.max;
      let step = max <= 1000? 1 : 1000; //priceRangeData.step;
      if (min == 5000000) { step = 2500000; }

      priceRangeRes+="   <section id='' class='chat-message-content' style='width:100%;'>";
      priceRangeRes+="       <input type='text' id='pr" + uuid + "' value='' name='range' />";
      priceRangeRes+="   </section>";
      
      priceRangeRes+="<script>";
      priceRangeRes+="  $(document).ready(function() { $('#usertext').val("+min+"); $('#usertext').addClass('validateNumber');$('#send').removeAttr('disabled'); });";
      priceRangeRes+="     $('#pr" + uuid + "').ionRangeSlider({";
      priceRangeRes+="         hide_min_max: false,";
      priceRangeRes+="         keyboard: true,";
      priceRangeRes+="         min: " + min + ",";
      priceRangeRes+="         max: " + max + ",";
      priceRangeRes+="         type: 'single',";
      priceRangeRes+="         skin: 'big',";
      priceRangeRes+="         step: " + step + ",";
      // priceRangeRes+="         grid: true,";
      priceRangeRes+="         onChange: function (data) {";
      priceRangeRes+="   		    var an = data.from;";
      priceRangeRes+="		        $('#usertext').val(an);";
      priceRangeRes+="             setTimeout(function(){ $('#send').addClass('flash-button');$('#send').removeAttr('disabled');  }, 200);";
      priceRangeRes+="	        }";
      priceRangeRes+="     });";
      priceRangeRes+="</script>";
    }

    if(btnsElements){
        obj.element.Btns.Buttons.map((btns, bid)=>{
            btnRes+='<button class="btn btn-portals" onclick="getConv(\''+btns.value+'\')">'
                  + btns.name
                  +'</button>'
        })
    }
    
    let policyListRes='';
    if(policyListElements){
        let uiid = Date.now();
        
          policyListRes+='<div class="chat-message-wrapper chat-swiper-container" id="swiper'+uiid+'">'
                + '<div class="swiper-wrapper">';

          obj.element.policy_list.options.map((list, lid)=>{
            // Slide loop
            policyListRes+= '<div class="swiper-slide">'
                    + ' <div class="data-block pList" onclick="getConv(\''+list.number+'\')">'
                    + '  <div class="p-number">'
                    + '   <span>Policy no</span>'
                    + '   <span>'+list.number+'</span>'
                    + '  </div>'
                    + '  <div class="p-name">'
                    + '   <span>Policy Name</span>'
                    + '   <span>'+list.name+'</span>'
                    + '  </div>'
                    + ' </div>'
                    + '</div>';            
          })

          policyListRes+= '</div><!-- swiper-wrapper -->'
                  + '<div class="swiper-button-prev"></div>'
                  + '<div class="swiper-button-next"></div>'
                +'</div>';

          // Script init
          policyListRes+='<script> $(document).ready(function() { initSwiper("swiper'+uiid+'") }) </script>'

    }
    
    let imageRes='';
    if(imgElements){
      imageRes+='<img class="" style="width:100%;max-width: 338px;" src="'+obj.element.img.img_url+'" />'
    }
    
    if(faqListElements){
        obj.element.links.map((faq, fid)=>{
            faqRes+='<div class="faqLink" onclick="getConv(\''+faq.value+'\')">'
                  + faq.name
                  +'</div>'
        })
    }

    let datePickerRes='';
    if(datePickerElements){
      let uuid = Date.now();
      datePickerRes+='<div class="select-date-wrapper"><input type="text" class="select-date" id="dp'+uuid+'" /><i class="calendar-icons"></i></div>'
      datePickerRes+="<script>";
      datePickerRes+="  $(document).ready(function() { $('#usertext').attr('disabled','disabled'); $('#usertext').addClass('disableMouseEvent');});";
      datePickerRes+="     $('#dp" + uuid + "').datepicker({";
      datePickerRes+="         maxDate: -1,";
      datePickerRes+="         changeMonth: true,";
      datePickerRes+="         changeYear: true,";
      datePickerRes+="         dateFormat: 'dd/mm/yy',";
      datePickerRes+="         yearRange: '-60:+00',";
      datePickerRes+="         onSelect: function(dates) {";
      datePickerRes+="          $('#usertext').val(this.value)";
      datePickerRes+="         }";
      datePickerRes+="     });";
      datePickerRes+="</script>";
    }

    // =======================
    // Wrap Final message body
    if(userio==='start' && imgBtnsElements){
        botMsg = topMessageWrapPre 
                    + topMessageTextPre
                        + msgTextRes
                    + topMessageTextPost
                    + topMessageListPre
                        + itemListRes
                    + topMessageListPost
                + topMessageWrapPost
    } else {
      if(policyDetailsElements) {
        botMsg+= policyDetailRes
      } else if(updateCardElements) {
        botMsg+= updateCardRes
      } else if(updatePanFormElements) {
        botMsg+= updatePanFormRes
      } else if(updateAddressFormElements) {
        botMsg+= updateAddressFormResMessage
      } else {
        botMsg+= msgTextRes
      }

      // If imageRes      
      if(!updateAddressFormElements && !policyDetailsElements && imgElements && imageRes!==''){
        botMsg+= botContainerNoIconPre
                  +messageWrapNoGutterPre
                    + imageRes
                  +messageWrapNoGutterPost
              +botContainerPost
      }
      
      // If BtnRes
      if(btnsElements && btnRes!==''){
        botMsg+= botContainerNoIconPre
                +messageButtonsPre
                  + btnRes
                +messageButtonsPost
              +botContainerPost
      }
      
      // If Range
      if(rangeElements && priceBarRes!==''){
        botMsg+= botContainerNoIconPre
                +messageRangePre
                  + priceBarRes
                +messageRangePost
              +botContainerPost
      }
      
      // If Price range
      if(priceRangeElements && priceRangeRes!==''){
        botMsg+= botContainerNoIconPre
                +messageRangePre
                  + priceRangeRes
                +messageRangePost
              +botContainerPost
      }

      // If imgBtns
      if(imgBtnsElements && itemListRes!==''){
        botMsg+= botContainerNoIconPre
                  +imgButtonWrapPre
                    +imgButtonListPre
                      +itemListRes
                    +imgButtonListPost
                  +imgButtonWrapPost
                +botContainerPost
      }

      // If FAQRes
      if(faqListElements && faqRes!==''){
        botMsg+= botContainerNoIconPre
                +messageWrapPre
                +messageContentPre
                  +faqRes
                +messageContentPost
                +messageWrapPost
              +botContainerPost
      }

      // If policyListRes
      if(policyListElements && policyListRes!==''){
        botMsg+= botContainerNoIconPre
                + policyListRes
              +botContainerPost
      }
      
      // If datePickerRes
      if(datePickerElements && datePickerRes!==''){
        botMsg+= botContainerNoIconPre
                + datePickerRes
              +botContainerPost
      }

    }

    try {
      botio = obj.reply
          .replace(/~/g, '"')
          .replace(/{tri_id}/g, transaction_id);
      } catch (err) {
      botio = obj;
      // If policyListRes
      if(policyListElements && policyListRes!==''){
        botMsg+= botContainerNoIconPre
                + policyListRes
              +botContainerPost
      }

      // If policyDetailRes - get message from dynamicgenerated
      // if(policyDetailsElements){
      //   try{
      //     let str0 = "<div class='chat-image chat-image-default'><div class='av-alisha-1'></div></div>";
      //     let str1 = "<div class='chat-image chat-image-default' style='visibility:hidden'><div class='av-alisha-1'></div></div>";
      //     let str2 = "<div class='chat-image chat-image-default' style='visibility:hidden'><div class=' av-alisha-1'></div></div>";
          
      //     let newIcon = "<div class='chat-icon'></div>";
      //     let newIconOpac = "<div class='chat-icon opac'></div>";
          
      //     let string = obj.reply;
      //     let updatedObj = replaceStr(string, str0, newIcon);
      //         updatedObj = replaceStr(updatedObj, str1, newIconOpac);
      //         updatedObj = replaceStr(updatedObj, str2, newIconOpac);
      //         updatedObj = replaceStr(updatedObj, "<div class='allbtn'>", '<div class="chat-message-buttons">');
      //         updatedObj = replaceStr(updatedObj, 'yesnobtngreen', 'btn-portals');

      //     botMsg+= updatedObj;
      //   } catch(err){
      //     botMsg+=obj;
      //   }
      // }
    }

    convid = obj.convId;
    $("#loading").hide();
    $(".message-container").append(botMsg);
    currentRequest='checkReq';
    /*/ Append ads banner
    if(userio==='start' && imgBtnsElements){ 
      $(".message-container").append(adsBannerUI);
      initAdsSlider() 
    }*/
    $('.pre-loader').addClass("close");
    $("#usertext").removeAttr("disabled");
    if (screen.width > 480) { $("#usertext").focus() }

    if(obj.input_type==='phone'){
      pattern="phone";
      //$("#usertext").attr('onkeyup','validates.mobileNo(this)');
      $("#usertext").addClass('validateMobile');
    }else if(obj.input_type==='email'){
      pattern="email";
      //$("#usertext").attr('onkeyup','validates.emailId(this)');
      $("#usertext").addClass('validateEmail');
    }else if(obj.input_type==='otp'){
      pattern="otp";
      $("#usertext").addClass('validateOTP');
      //$("#usertext").attr('onkeyup','validates.otpNo(this)');
      
    }else if(obj.input_type==='policy'){
      pattern="policy";
      $("#usertext").addClass('validatePolicy');
      //$("#usertext").attr('onkeyup','validates.policyNo(this)');
    }else{
      pattern="";
      //$("#usertext").removeAttr('onkeyup');
      $("#usertext").removeClass('validateMobile');
      $("#usertext").removeClass('validateEmail');
      $("#usertext").removeClass('validateOTP');
      $("#usertext").removeClass('validatePolicy');
      $("#usertext").removeClass('validateNumber');
    }
    $("#send").removeAttr("disabled");
    $("#send").removeClass("animate-pulse-send");
    $(".dropdown").removeClass("disableMouseEvent");
    $("#refresh").removeClass("disableMouseEvent");
    $("#ref").removeClass("disableMouseEvent");
    $(".dropdown").removeClass("disableMouseEvent");
    $("#send").removeClass("flash-button");
    $("#overlayforchat").removeClass("overlaychat");
    $("#form-message").removeClass("disableMouseEvent");
    var nhi = $(".message-container").height() - hi;
    nhi = nhi + 80;
    if(userio !='start'){
    	$(".chat-list").animate({ scrollTop: $(".chat-list").prop("scrollHeight") - nhi }, 1000);
    }
    
    // For Audio - uncomment whenever need
    if (isIE === false && isFirefox === false) {
      speakLoud(obj.speech);
    }
    clearInterval(tout);
    timeOut();
};

window.replaceStr = function(string, search, replacement) {
  var target = string;
  return target.split(search).join(replacement);
};

window.getConv = function (userio){
    speechSynthesis.cancel();
    getConvCount++;
    $('#refresh').addClass("disableMouseEvent");
    $('#ref').addClass("disableMouseEvent");
    $('.dropdown').addClass("disableMouseEvent");
    $(".animated").removeClass('animated');
    $(".maleBtn1").addClass("disableMouseEvent");
     $(".femaleBtn1").addClass("disableMouseEvent");
    $('.irs').addClass("disableMouseEvent");	    
    $('#overlayforchat').addClass('overlaychat');
    userContainerPre = userContainer(userName);
    var user=userContainerPre+userio+userContainerPost;
    $('.message-container').append(user);
    $(".chat-list").animate({ scrollTop: $(".chat-list").prop("scrollHeight") }, 1000);
    $("#usertext").attr("disabled","disabled");
    $('#usertext').val('');
    $("#send").attr("disabled","disabled");
    $('.yesnobtn').addClass("disableMouseEvent");
    $('.btn-portals').addClass("disableMouseEvent");
    $('.fullnav li a').addClass("disableMouseEvent");
    $('.main-nav button').addClass("disableMouseEvent");
    $('.btn-info').addClass("disableMouseEvent");
    $('.btn-img-info').addClass("disableMouseEvent");
    $('#datetimepicker11').addClass("disableMouseEvent");
    $('.select-date-wrapper').addClass("disableMouseEvent");
    $('.form-check').addClass("disableMouseEvent");
    $("#send").removeClass("animate-pulse-send");
    // $('.hasDatepicker').slideUp('slow');
    getConversation(userio);
    
    $('#usertext').removeClass("disableMouseEvent");
    
};

$('.start-over').click(function(){
  $('#ref').trigger('click');
});

window.initSwiper = function(e){
  var $swiper = $("#"+e);
  var $bottomSlide = null; // Slide whose content gets 'extracted' and placed
  // into a fixed position for animation purposes
  var $bottomSlideContent = null; // Slide content that gets passed between the
  // panning slide stack and the position 'behind'
  // the stack, needed for correct animation style

  var mySwiper = new Swiper("#"+e, {
    spaceBetween: 10,
    slidesPerView: 3,
    centeredSlides: false,
    roundLengths: true,
    loop: false,
    loopAdditionalSlides: null,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
};

window.initAdsSlider = function(e){
  var swiper = new Swiper(".adsSwiper", {
    spaceBetween: 10,
    pagination: {
      el: ".ads-pagination",
    },
    autoplay: {
   		delay: 3000,
 	},
  });
}

window.initDatePicker = function(e,o){
  var stdate = new Date();
  var dob = $('#'+e);
  var dobOp = $('#'+o);

  dob.click(function(){
    if(dobOp.is(':hidden')) {
      dobOp.slideDown(300);
    } else {
      var thisVl = dob.val();
      var thisCt = thisVl.split('_').length-1; console.log(thisCt);
      if (thisCt==0){
        dobOp.slideUp(300);
      }
    }
  })

  dob.bind("keyup", "keydown", function (e) {
    var thisVal = dob.val();
    var thisCnt = thisVal.split("_").length - 1;
    $("#send").attr("disabled", "disabled");
    $(".sendDP").attr("disabled", "disabled");
    $("#send").removeClass("animate-pulse-send");
    if (thisCnt == 0) {
      $("#"+o).datepicker("setDate", thisVal);
      $("#send").removeAttr("disabled");
      $(".sendDP").removeAttr("disabled");
      $("#send").addClass("animate-pulse-send");
    } else {
      $("#"+o).datepicker("setDate", "01/01/1990");
    }
    $("#usertext").val(thisVal);
  });

  $("#"+o).datepicker({
    changeMonth: true, changeYear:true, dateFormat:'dd/mm/yy', maxDate:stdate,
    yearRange: '-100:+0', defaultDate:'01/01/1990'
  });
  $('.av-dp').click(function() {$("#"+e).click();});
  $("#"+o).on('change', function(){
    $("#"+e).val($(this).val());
    $("#"+o).slideUp('slow');
    $('#send').removeAttr('disabled');
    $('.sendDP').removeAttr('disabled');
    $('#usertext').val($(this).val());
  });
  $('.sendDP').on('click', function(){
    var datePicker = $("#"+e).val(); 
    getConv(datePicker)
  });
};

window.IconHandler = function(img_url){
  let img_class;
  if (img_url.trim()==="resources/images/chat/health-plans-icon_0.png") {
    img_class = "av-health-plans-icon-0";
  } else if(img_url.trim()==="resources/images/chat/protection-plans-icon_0.png") {
    img_class = "av-protection-plans-icon-0";
  } else if(img_url.trim()==="resources/images/chat/saving-plans-1_0.png") {
    img_class = "av-saving-plans-1-0";
  } else if(img_url.trim()==="resources/images/chat/health_care.png") {
    img_class = "av-health-care";
  } else if(img_url.trim()==="resources/images/chat/retirement-plans_0.png") {
    img_class = "av-retirement-plans-0";
  } else if(img_url.trim()==="resources/images/chat/child-plans-icon_0.png") {
    img_class = "av-child-plans-icon-0";
  } else if(img_url.trim()==="resources/images/chat/tax-planning.png") {
    img_class = "av-tax-planning";
  } else if(img_url.trim()==="resources/images/chat/Business_Protection.png") {
    img_class = "av-business-protection";
  } else if(img_url.trim()==="resources/images/chat/will_icon.png") {
    img_class = "av-will";
  } else if(img_url.trim()==="resources/images/chat/covid.png") {
    img_class = "av-covid19";
  } else if(img_url.trim()==="resources/images/chat/lifegoals.png") {
    img_class = "av-life-goal";
  } else if(img_url.trim()==="resources/images/chat/garnteed_income.png") {
    img_class = "av-guaranteed-income";
  } else if(img_url.trim()==="resources/images/chat/claims_payouts.png") {
    img_class = "av-claims-payout";
  } else if(img_url.trim()==="resources/images/chat/maturity_payout.png") {
    img_class = "av-maturity-payout";
  } else if(img_url.trim()==="resources/images/chat/dealth_claim.png") {
    img_class = "av-death-claim";
  } else if(img_url.trim()==="resources/images/chat/rider_claim.png") {
    img_class = "av-rider-claim";
  } else if(img_url.trim()==="resources/images/chat/survival_benefit.png") {
    img_class = "av-survival-benifit-payout";
  } else if(img_url.trim()==="resources/images/chat/surrender_payout.png") {
    img_class = "av-surrender-payout";
  } else if(img_url.trim()==="resources/images/chat/documents.png") {
    img_class = "av-documents-required-death";
  } else if(img_url.trim()==="resources/images/chat/intimate_death_claim.png") {
    img_class = "av-intimate-death-claim";
  } else if(img_url.trim()==="resources/images/chat/intimate_death_claim.png") {
    img_class = "av-intimate-death-claim";
  } else if(img_url.trim()==="resources/images/chat/pay_premium.png") {
    img_class = "av-pay-premium";
  } else if(img_url.trim()==="resources/images/chat/human_life_value_0.png") {
    img_class = "av-human-life-value";
  } else {
    img_class=false;
  }

  return img_class;
};

// geturl
// Form submit
// #ref click
// letschat
// userContainer
// Submit pan
// loadAddressFormData
// submitAddress
// getLinkCount
// speechResponse
// getDialog
// getiframeurl
// timeout
// error_refresh
// updatePincodes
// addProof
// removeBlock
// searchcity
// clearAddFrm
// clearPanFrm
// saveclientData
// Validates

window.onresize = function(event) {
  let scrWidth = document.getElementsByClassName('chat-list')[0].offsetWidth;  
};

$("input.nameinput").keypress(function (event) {
  if (event.which == 13) {
    $("#submitName").click();
  }
});

$("#submitName").on("click", function (e) {
  var m_data = document.getElementById("username").value;
  var c_data = document.getElementById("cc-dropdown").value;

  var url_link = document.referrer;

  var checkUn = hasWhiteSpace(m_data);
  if (checkUn == true) {
    geturl();
    var cc = "";
    var input = "start";
    $.ajax({
      url: "api/v1/phoneAuth",
      method: "GET",
      crossDomain: true,
      // async:false,
      data: {
        phone: m_data,
        key: key,
        country_code: c_data,
        sessionid: res,
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        //sessionid:res,
        timezone: moment(new Date()).format("Z"),
        url: url_link,
      },
      beforeSend: function () {
        $("#submitName").html(
          'Authenticating <div style="max-width:15px;display:inherit;line-height:10px;min-width:15px;"><span style="float:left;" id="authLoad"></span></div>'
        );
        $("#username").prop("disabled", true);
        $("#submitName").prop("disabled", true);
        $("#cc-dropdown").prop("disabled", true);
      },
    }).done(function (data, status) {
      if (data === "ERROR" && _client.getOs() === "iOS") {
        $("#iosErrorModel").modal({
          show: "true",
          backdrop: "static",
          keyboard: false,
        });
      }
      var obj = $.parseJSON(data);
      $("#myEnterNameModal").modal("hide");
      msg = obj.message;
      input = "";
      if (msg == "positive") {
        input = "start";
        getConversation(input);
        showfinalchatbox();
      } else if (msg == "duplicate found in DataBase") {
        var reply = obj.consultant_info;
        var status = obj.ownerStatus;
        var diff = obj.diffMonth;
        var channel = obj.channel;

        if (status == "inactive") {
          if (diff > 6) {
            input = "reg_e_id";
          } else {
            if (channel == "web") {
              input = "expired_e_id";
            } else {
              input = "expired_wapp_id";
            }
          }

          getConversation(input);
          showfinalchatbox();
        } else {
          $(".message-container").append(reply);
          $("#loading").hide();
          $("#usertext").attr("disabled", "disabled");
          $("#overlayforchat").addClass("overlaychat");
          $("#sugUL").empty();
        }
      } else {
        var error =
          '<div class="chat-message chat-message-recipient animated fadeIn">' +
          '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">' +
          '<div class="chat-message-wrapper">' +
          '<div class="chat-message-content">' +
          "Invalid Access to Service" +
          "</div>" +
          "</div>" +
          "</div>";
        $(".message-container").append(error);
        $("#usertext").attr("disabled", "disabled");
        $("#overlayforchat").addClass("overlaychat");
        $("#sugUL").empty();
      }
    });
  } else {
    $(".errormessage")
      .empty()
      .html(
        "Please enter valid mobile number.<script>setTimeout(function(){$('.errormessage').empty()},7000)</script>"
      );
    $("#username").focus();
  }
});

function hasWhiteSpace(s) {
  var userName = $("#username").val();
  if (userName.length === 1) {
    userName = userName.replace(/\s/g, "");
  }
  var ex = /^[0-9]+$/; //For numbers only
  if (!$("#username").val().match(ex)) {
    $("#username").val("");
    return false;
  }
  if (userName.length < 8 || userName.length > 15) {
    return false;
  }
  return true;
}

$('#myEnterNameModal').on('shown.bs.modal', function () {
  $('#myEnterNameModal').css('display','block');
    $("#username").focus();
  
})