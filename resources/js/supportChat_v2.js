window.mitsui={},mitsui.pages={},mitsui.vars={};var chwnd,emailDomain="@directory.findabilitysciences.com",emailDomain1="@findabilitysciences.com",LimitValue=0,startlimit=0,endlimit=10,flagUserName=0,showBackValue=!1,pc_idval="";function maxiLimit(e){var t=e.value;if(50<e.value.length){var a=t.substring(0,50);e.value=a}}function imeiLimit(e){var t=e.value;if(15<e.value.length){var a=t.substring(0,15);e.value=a}e.value.match(/[^0-9]/g)&&bootbox.alert({size:"small",message:"Incorrect IMEI number.",callback:function(){setTimeout(function(){$("#"+e.id).val(""),$("#"+e.id).focus()},150)}})}function serialNumberLimit(e){var t=e.value;if(15<e.value.length){var a=t.substring(0,15);e.value=a}}function phoneNumberLimit(e){var t=e.value;if(12<e.value.length){var a=t.substring(0,12);e.value=a}e.value.match(/[^0-9]/g)&&bootbox.alert({size:"small",message:"Incorrect phone number.",callback:function(){setTimeout(function(){$("#"+e.id).val(""),$("#"+e.id).focus()},150)}})}function pcidLimit(e){var t=e.value;if(15<e.value.length){var a=t.substring(0,15);e.value=a}}function profitCenterLimit(e){var t=e.value;if(15<e.value.length){var a=t.substring(0,15);e.value=a}}function isNumberKey(e){var t=e.which?e.which:e.keyCode;return!(t=31<t&&(t<48||57<t))}function dateFormat(){var e=new Date,t=e.getDate(),a=e.getMonth()+1,i=e.getFullYear(),s=e.getHours(),n=e.getMinutes(),l=e.getSeconds();return i+"-"+(a<=9?"0"+a:a)+"-"+(t<=9?"0"+t:t)+" "+(s<=9?"0"+s:s)+":"+(n<=9?"0"+n:n)+":"+(l<=9?"0"+l:l)}function changeActive(e){$("#loading_gif_div").hide(),$("#query").prop("disabled",!1),$("#askwatson").css("pointer-events","visible");var t=$.parseJSON(e),a=" <div class='chat-message chat-message-recipient'><img class='chat-image chat-image-default' src='resources/images/bot1.png' /> <div class='chat-message-wrapper'> <div class='chat-message-content'>"+t.responseList[0].responseText+"</div><div class='chat-details'><span class='chat-message-localization font-size-small'> "+dateFormat()+"</span></div>";$("#Solrbringmore").html(a),$("body").data("conversationId",t.responseList[0].conversationId)}function feedbacksubmit(){var e=$("input[name='rating']:checked").val(),t=$("#fdbackform").val();return""==e||null==e?(bootbox.alert("Please provide the rating.").find(".modal-content").css({"font-weight":"bold","font-size":"1.3em","margin-top":"25%","font-family":'"Open Sans", "lt_helvetica", sans-serif'}),void $(".modal-footer").css("border","0px")):""!=t&&250<t.length?(bootbox.alert("Feedback maximum character limit is 250.").find(".modal-content").css({"font-weight":"bold","font-size":"1.3em","margin-top":"25%","font-family":'"Open Sans", "lt_helvetica", sans-serif'}),void $(".modal-footer").css("border","0px")):void websocketCall.addFeedbackData("addFeedbackData",e,t)}function feedbackskip(){$("#askwatson").css("pointer-events","visible"),$("#query").prop("disabled",!1),$(".feedbckhide").addClass("animated fadeOutLeft"),$(".feedbckhide").remove(),websocketCall.saveChatViaAjax("feedbackskip_saveChatViaAjax","Not Now","user")}function botscopeSelect(t){var e=t.textContent,a="";a="Yes"==e?"Inscope":"Outscope";var i=$(".chat-message-sender:nth-last-of-type(2)").find("div:first-child")[0].textContent,s=$(".chat-message-sender:nth-last-of-type(4)").find("div:first-child")[0].textContent,n=$(".chat-message-sender:nth-last-of-type(6)").find("div:first-child")[0].textContent;$.ajax({url:"api/v1/addScopeLog",method:"POST",data:{q1:i,q2:s,q3:n,scope:a}}).done(function(e){botBtnSelect(t),sendApprovalMail(a)}).fail(function(){bootbox.alert("Something unexpected happen, Refresh and try again").find(".modal-content").css({"font-weight":"bold","font-size":"1.3em","margin-top":"25%","font-family":'"Open Sans", "lt_helvetica", sans-serif'}),$(".modal-footer").css("border","0px")})}function sendApprovalMail(e){$.ajax({url:"api/v1/getSendMailInfo.html",method:"POST",async:!0,data:{scope:e},processData:!0}).done(function(e){}).fail(function(){bootbox.alert("Something unexpected happened !!").find(".modal-content").css({"font-weight":"bold","font-size":"1.3em","margin-top":"25%","font-family":'"Open Sans", "lt_helvetica", sans-serif'}),$(".modal-footer").css("border","0px")})}function initialConversationCall(e){$("#askwatson").css("pointer-events","none"),$("#query").prop("disabled",!0);$("#Solrbringmore").append(" <div class='chat-message chat-message-recipient'><img class='chat-image chat-image-default' src='resources/images/bot1.png' /> <div class='chat-message-wrapper'> <div class='chat-message-content'><div class='innerMaintxt'><img id='loading_gif' src='resources/images/loading_dot.gif'></div></div><div class='innertimetxt'></div>"),$("#Solrbringmore").show(),$("#style-3").scrollTop($("#style-3")[0].scrollHeight),$(".feedbckhide").addClass("animated fadeOutLeft"),$(".feedbckhide").remove(),websocketCall.watsonConversation("initialConversationCall",e)}function gotoInitial(){websocketCall.saveChatViaAjax("saveChatViaAjax","Reset","user")}function backBtnSelect(e){showBackValue=!0,websocketCall.backBtnSelect("backBtnSelect",e)}function askwatson(){if($("button").blur(),LimitValue=0,""==$.trim($("#query").val()))return bootbox.alert("Please Enter the question.").find(".modal-content").css({"font-weight":"bold","font-size":"1.3em","margin-top":"25%","font-family":'"Open Sans", "lt_helvetica", sans-serif'}).on("shown.bs.modal",function(){$("#query").focus()}),void $(".modal-footer").css("border","0px");askquestion=$("#query").val();$("#style-3")[0].scrollHeight;var e=$("#query").val().trim();websocketCall.saveChatViaAjax("askwatson_saveChat",e,"user")}function backBtnClick(){$(".hideBtns").css("pointer-events","none"),$(".optionbtn").addClass("optionbtncolor").removeClass("optionbtn"),$("#askwatson").css("pointer-events","none"),$("#query").prop("disabled",!0),$("#gotoInit").show(),$("#gotoInit").css("pointer-events","none"),$("#gotoInit").prop("disabled",!0),$("#gotoBack").css("pointer-events","none"),$("#gotoBack").prop("disabled",!0);$("#style-3")[0].scrollHeight;$(".hidedivs").remove();LimitValue++,websocketCall.saveChatViaAjax("backBtnClick_saveChatViaAjax","Back","user")}function openmail(){setTimeout(function(){"about:blank"==chwnd.location.href&&chwnd.close()},5e3)}function getuserdetails(){$("#search_username").select2({placeholder:"Search User Name",minimumInputLength:1,allowClear:!0,maximumSelectionSize:1,multiple:!1,ajax:{url:"api/v1/getRequestUserName.do",dataType:"json",type:"POST",quietMillis:250,id:function(e){return e.username},data:function(e,t){return{q:e,page:t}},results:function(e,t){var a=30*t<e.jArray.length;return{results:e.jArray,more:a}}},formatResult:function(e){return e.username},formatSelection:function(e){return e.username},initSelection:function(e,t){var a=[];""!=e.val()&&$.each(e.val().split(","),function(e,t){a.push({id:t,text:t})}),t(a)},dropdownCssClass:"bigdrop",escapeMarkup:function(e){return e}})}function getnewuserdetails(){$("#search_newusername").select2({placeholder:"Search User Name",minimumInputLength:1,allowClear:!0,maximumSelectionSize:1,multiple:!1,ajax:{url:"api/v1/getRequestUserName.do",dataType:"json",type:"POST",quietMillis:250,id:function(e){return e.username},data:function(e,t){return{q:e,page:t}},results:function(e,t){var a=30*t<e.jArray.length;return{results:e.jArray,more:a}}},formatResult:function(e){return e.username},formatSelection:function(e){return e.username},initSelection:function(e,t){var a=[];""!=e.val()&&$.each(e.val().split(","),function(e,t){a.push({id:t,text:t})}),t(a)},dropdownCssClass:"bigdrop",escapeMarkup:function(e){return e}})}function getuserdetailsForApprover(){$("#search_approver_name").select2({placeholder:"Search User Name",minimumInputLength:1,allowClear:!0,maximumSelectionSize:1,multiple:!1,ajax:{url:"api/v1/getRequestUserNameForApprover.do",dataType:"json",type:"POST",quietMillis:250,id:function(e){return e.username},data:function(e,t){return{q:pc_idval,page:t}},results:function(e,t){var a=30*t<e.jArray.length;return{results:e.jArray,more:a}}},formatResult:function(e){return e.username},formatSelection:function(e){return e.username},initSelection:function(e,t){var a=[];""!=e.val()&&$.each(e.val().split(","),function(e,t){a.push({id:t,text:t})}),t(a)},dropdownCssClass:"bigdrop",escapeMarkup:function(e){return e}})}function getpclist(){$("#select_profit_center").select2({placeholder:"Search User Name",minimumInputLength:1,allowClear:!0,maximumSelectionSize:1,multiple:!1,ajax:{url:"api/v1/getRequestPCList.do",dataType:"json",type:"POST",quietMillis:250,id:function(e){return e.username},data:function(e,t){return{q:e,page:t}},results:function(e,t){var a=30*t<e.jArray.length;return{results:e.jArray,more:a}}},formatResult:function(e){return e.username},formatSelection:function(e){return e.username},initSelection:function(e,t){var a=[];""!=e.val()&&$.each(e.val().split(","),function(e,t){a.push({id:t,text:t})}),t(a)},dropdownCssClass:"bigdrop",escapeMarkup:function(e){return e}})}function getPCIDlist(){$("#select_search_pcid").select2({placeholder:"Search PCID",minimumInputLength:1,allowClear:!0,maximumSelectionSize:1,multiple:!1,ajax:{url:"api/v1/getSearchPCIDList.do",dataType:"json",type:"POST",quietMillis:250,id:function(e){return e.username},data:function(e,t){return{q:e,page:t}},results:function(e,t){var a=30*t<e.jArray.length;return{results:e.jArray,more:a}}},formatResult:function(e){return e.username},formatSelection:function(e){return e.username},initSelection:function(e,t){var a=[];""!=e.val()&&$.each(e.val().split(","),function(e,t){a.push({id:t,text:t})}),t(a)},dropdownCssClass:"bigdrop",escapeMarkup:function(e){return e}})}jQuery(document).ready(function(){$(".nobtnptr1").addClass("nohovermenu"),$(".nobtnptr1").css({"pointer-events":"none",background:"#ccc"}),$(".nobtnptr1 a").css("color","#000"),connect(),$("#style-3").on("scroll",function(){$(this).scrollTop()<=0&&(startlimit=endlimit,endlimit+=50,websocketCall.checkForChatSession())})}),mitsui.pages.supportChart={showAll:function(){},insertResetPasswordRequestForIphoneAndIpad:function(){var e=$("#iphone_displayname").text().split(" / "),t=e[0],a=e[1],i=e[2],s=$("#iphone_phone_number").val(),n=$("#iphone_imei").val(),l=$("#iphone_serial_number").val();if(0==$.trim(s).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter phone number.",callback:function(){setTimeout(function(){$("#iphone_phone_number").focus()},150)}});else if($.trim(s).length<12)bootbox.alert({size:"small",title:"Submit application",message:"Incorrect phone number.",callback:function(){setTimeout(function(){$("#iphone_phone_number").focus()},150)}});else if(0==$.trim(n).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter IMEI number.",callback:function(){setTimeout(function(){$("#iphone_imei").focus()},150)}});else if($.trim(n).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Incorrect IMEI number.",callback:function(){setTimeout(function(){$("#iphone_imei").focus()},150)}});else if(0==$.trim(l).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter serial number.",callback:function(){setTimeout(function(){$("#iphone_serial_number").focus()},150)}});else{$(".hidedivs").addClass("animated fadeOutLeft"),$(".hidedivs").remove(),$("#gotoInit").show(),$("#gotoInit").css("pointer-events","none"),$("#gotoInit").prop("disabled",!0),$("#gotoBack").css("pointer-events","none"),$("#gotoBack").prop("disabled",!0),$("#query").blur(),$("#askwatson").css("pointer-events","none"),$("#query").prop("disabled",!0);var o="";o+="<b><p>Reset password application for iPhone/iPad</p></b>",o+="<p>Following are details:</p>",o+="<p>User ID: "+t+"</p>",o+="<p>Username: "+a+"</p>",o+="<p>User Mail Address: "+i+"</p>",o+="<p>User Phone Number: "+s+"</p>",o+="<p>User IMEI Number: "+n+"</p>",o+="<p>User Serial Number: "+l+"</p>",websocketCall.showUserInput("showUserInput",o),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",o,"user"),websocketCall.insertResetPasswordRequest("insertResetPasswordRequest","","iPhone/iPad",t,a,i,"",s,n,l)}},insertResetPasswordRequestForAppleID:function(){var e=$("#apple_id_userId").val(),t=$("#apple_id_username").val(),a=$("#apple_id_mail").val();0==$.trim(e).length?bootbox.alert({size:"small",title:"Submit application",message:"Please enter user id.",callback:function(){setTimeout(function(){$("#apple_id_userId").focus()},150)}}):0==$.trim(t).length?bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#apple_id_username").focus()},150)}}):0==$.trim(a).length?bootbox.alert({size:"small",title:"Submit application",message:"Please enter user mail address.",callback:function(){setTimeout(function(){$("#apple_id_mail").focus()},150)}}):0==/^[a-zA-Z0-9][A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test($.trim(a))?bootbox.alert({size:"small",title:"Submit application",message:"Incorrect user mail address.",callback:function(){setTimeout(function(){$("#apple_id_mail").val(""),$("#apple_id_mail").focus()},150)}}):-1==$.trim(a).indexOf(emailDomain)&&-1==$.trim(a).indexOf(emailDomain1)?bootbox.alert({size:"small",title:"Submit application",message:"Domain name should not be other than @mitsui.com",callback:function(){setTimeout(function(){$("#apple_id_mail").val(""),$("#apple_id_mail").focus()},150)}}):mitsui.pages.supportChart.insertResetPasswordRequest("","Apple ID",e,t,a)},insertResetPasswordRequestForRemoteAccess:function(){var e=$("#remote_access_displayname").text().split(" / "),t=e[0],a=e[1],i=e[2];if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user id.",callback:function(){setTimeout(function(){$("#remote_access_userId").focus()},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#remote_access_username").focus()},150)}});else if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user mail address.",callback:function(){setTimeout(function(){$("#remote_access_mail").focus()},150)}});else if(0==/^[a-zA-Z0-9][A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test($.trim(i)))bootbox.alert({size:"small",title:"Submit application",message:"Incorrect user mail address.",callback:function(){setTimeout(function(){$("#remote_access_mail").val(""),$("#remote_access_mail").focus()},150)}});else if(-1==$.trim(i).indexOf(emailDomain)&&-1==$.trim(i).indexOf(emailDomain1))bootbox.alert({size:"small",title:"Submit application",message:"Domain name should not be other than @mitsui.com",callback:function(){setTimeout(function(){$("#remote_access_mail").val(""),$("#remote_access_mail").focus()},150)}});else{$(".hidedivs").addClass("animated fadeOutLeft"),$(".hidedivs").remove(),$("#gotoInit").show(),$("#gotoInit").css("pointer-events","none"),$("#gotoInit").prop("disabled",!0),$("#gotoBack").css("pointer-events","none"),$("#gotoBack").prop("disabled",!0),$("#query").blur(),$("#askwatson").css("pointer-events","none"),$("#query").prop("disabled",!0);var s="";s+="<b><p>Reset password application for Remote Access</p></b>",s+="<p>Following are details:</p>",s+="<p>User ID: "+t+"</p>",s+="<p>Username: "+a+"</p>",s+="<p>User Mail Address: "+i+"</p>",websocketCall.showUserInput("showUserInput",s),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",s,"user"),websocketCall.insertResetPasswordRequest("insertResetPasswordRequest","","Remote Access",t,a,i,"","","","")}},insertResetPasswordRequestForBitLocker:function(){var e=$("#bit_locker_displayname").text().split(" / "),t=e[0],a=e[1],i=e[2],s=$("#select_search_pcid").select2("val").toString();if(0==$.trim(s).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter PCID value.",callback:function(){setTimeout(function(){$("#select_search_pcid").select2("focus")},150)}});else{$(".hidedivs").addClass("animated fadeOutLeft"),$(".hidedivs").remove(),$("#gotoInit").show(),$("#gotoInit").css("pointer-events","none"),$("#gotoInit").prop("disabled",!0),$("#gotoBack").css("pointer-events","none"),$("#gotoBack").prop("disabled",!0),$("#query").blur(),$("#askwatson").css("pointer-events","none"),$("#query").prop("disabled",!0);var n="";n+="<b><p>Reset password application for BitLocker</p></b>",n+="<p>Following are details:</p>",n+="<p>User ID: "+t+"</p>",n+="<p>Username: "+a+"</p>",n+="<p>User Mail Address: "+i+"</p>",n+="<p>New PCID: "+s+"</p>",websocketCall.showUserInput("showUserInput",n),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",n,"user"),websocketCall.insertResetPasswordRequest("insertResetPasswordRequest","","BitLocker",t,a,i,s,"","","")}},insertDeviceRequestForNewDevice:function(){var e=$("#new_device_imei").val(),t=$("#new_device_serial_number").val(),a=$("#new_device_phoneno").val(),i=$("#search_username").val(),s=$("#select_search_pcid").val(),n=$("#select_profit_center").val().split("-"),l=n[0],o=$("#search_approver_name").val(),r=$("#uid").text(),c=$("#uemail").text(),u=$("#aid").text(),m=$("#aemail").text();if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#search_username").select2("focus")},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter phone number.",callback:function(){setTimeout(function(){$("#new_device_phoneno").focus()},150)}});else if(0==$.trim(e).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter IMEI number.",callback:function(){setTimeout(function(){$("#new_device_imei").focus()},150)}});else if($.trim(e).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit IMEI number.",callback:function(){setTimeout(function(){$("#new_device_imei").select2("val",""),$("#new_device_imei").focus()},150)}});else if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter serial number.",callback:function(){setTimeout(function(){$("#new_device_serial_number").focus()},150)}});else if(0==$.trim(s).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter PCID.",callback:function(){setTimeout(function(){$("#select_search_pcid").select2("focus")},150)}});else if(0==$.trim(n).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter profit center.",callback:function(){setTimeout(function(){$("#select_profit_center").select2("focus")},150)}});else if(0==$.trim(o).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter approver name.",callback:function(){setTimeout(function(){$("#search_approver_name").focus()},150)}});else if($.trim(i)==$.trim(o))bootbox.alert({size:"small",title:"Submit application",message:"User and approver must be different.",callback:function(){setTimeout(function(){$("#search_username").select2("val",""),$("#search_approver_name").select2("val",""),$("#displaynewusr_name").empty(),$("#displayappr_name").empty(),$("#search_approver_name").select2("focus")},150)}});else{var p="";p+="Following are details for new device application:",p+="<p>IMEI: "+e+"</p>",p+="<p>Serial Number: "+t+"</p>",p+="<p>Phone Number: "+a+"</p>",p+="<p>User ID: "+r+"</p>",p+="<p>Username: "+i+"</p>",p+="<p>User Mail Address: "+c+"</p>",p+="<p>PCID: "+s+"</p>",p+="<p>Profit Center: "+n+"</p>",p+="<p>Approver ID: "+u+"</p>",p+="<p>Approver Name: "+o+"</p>",p+="<p>Approver Mail Address: "+m+"</p>",websocketCall.showUserInput("showUserInput",p),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",p,"user"),websocketCall.insertDeviceRequestForNewDevice("insertDeviceRequestForNewDevice",e,t,a,r,i,c,s,l,o,u,m)}},insertDeviceRequestForDeviceChange:function(){var e=$("#device_change_old_phoneno").val(),t=$("#device_change_old_imei").val(),a=$("#device_change_old_serial_number").val(),i=$("#device_change_new_phoneno").val(),s=$("#device_change_new_imei").val(),n=$("#device_change_new_serial_number").val(),l=$("#select_profit_center").val().split("-"),o=l[0],r=$("#search_username").val(),c=$("#search_approver_name").val(),u=$("#uid").text(),m=$("#uemail").text(),p=$("#aid").text(),f=$("#aemail").text();if(0==$.trim(r).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#search_username").select2("focus")},150)}});else if(0==$.trim(e).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter old phone number.",callback:function(){setTimeout(function(){$("#device_change_old_phoneno").focus()},150)}});else if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter old IMEI number.",callback:function(){setTimeout(function(){$("#device_change_old_imei").focus()},150)}});else if($.trim(t).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit old IMEI number.",callback:function(){setTimeout(function(){$("#device_change_old_imei").val(""),$("#device_change_old_imei").focus()},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter old serial number.",callback:function(){setTimeout(function(){$("#device_change_new_serial_number").focus()},150)}});else if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter new phone number.",callback:function(){setTimeout(function(){$("#device_change_new_phoneno").focus()},150)}});else if(0==$.trim(s).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter new IMEI number.",callback:function(){setTimeout(function(){$("#device_change_new_imei").focus()},150)}});else if($.trim(s).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit new IMEI number.",callback:function(){setTimeout(function(){$("#device_change_new_imei").select2("val",""),$("#device_change_new_imei").focus()},150)}});else if(0==$.trim(n).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter new serial number.",callback:function(){setTimeout(function(){$("#device_change_new_serial_number").focus()},150)}});else if($.trim(t)==$.trim(s))bootbox.alert({size:"small",title:"Submit application",message:"Old IMEI and new IMEI must be different.",callback:function(){setTimeout(function(){$("#device_change_new_imei").val(""),$("#device_change_old_imei").val(""),$("#device_change_old_imei").focus()},150)}});else if($.trim(a)==$.trim(n))bootbox.alert({size:"small",title:"Submit application",message:"Old serial number and new serial must be different.",callback:function(){setTimeout(function(){$("#device_change_old_serial_number").val(""),$("#device_change_new_serial_number").val(""),$("#device_change_old_serial_number").focus()},150)}});else if(0==$.trim(c).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter approver name.",callback:function(){setTimeout(function(){$("#search_approver_name").focus()},150)}});else if($.trim(r)==$.trim(c))bootbox.alert({size:"small",title:"Submit application",message:"User name and approver name must be different.",callback:function(){setTimeout(function(){$("#search_username").select2("val",""),$("#search_approver_name").select2("val",""),$("#displaynewusr_name").empty(),$("#displayappr_name").empty(),$("#search_username").select2("focus")},150)}});else{var b="";b+="Following are details for change device application:",b+="<p>Old Phone Number: "+e+"</p>",b+="<p>Old IMEI: "+t+"</p>",b+="<p>Old Serial Number: "+a+"</p>",b+="<p>New Phone Number: "+i+"</p>",b+="<p>New IMEI: "+s+"</p>",b+="<p>New Serial Number: "+n+"</p>",b+="<p>User ID: "+u+"</p>",b+="<p>Username: "+r+"</p>",b+="<p>User Mail Address: "+m+"</p>",b+="<p>Profit Center: "+l+"</p>",b+="<p>Approver Name: "+c+"</p>",b+="<p>Approver Mail Address: "+f+"</p>",websocketCall.showUserInput("showUserInput",b),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",b,"user"),websocketCall.insertDeviceRequestForDeviceChange("insertDeviceRequestForDeviceChange",e,t,a,i,s,n,u,r,m,o,p,c,f)}},insertDeviceRequestForUserChange:function(){var e=$("#user_change_phoneno").val(),t=$("#user_change_imei").val(),a=$("#user_change_serial_number").val(),i=$("#search_approver_name").val(),s=$("#user_change_approver_mail_address").val(),n=$("#select_profit_center").val().split("-"),l=n[0],o=$("#search_newusername").val(),r=$("#search_username").val(),c=$("#uid").text(),u=$("#uemail").text(),m=$("#new_uid").text(),p=$("#new_uemail").text(),f=$("#aid").text();s=$("#aemail").text();if(0==$.trim(r).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter old user name.",callback:function(){setTimeout(function(){$("#search_username").select2("focus")},150)}});else if(0==$.trim(e).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter phone number number.",callback:function(){setTimeout(function(){$("#user_change_phoneno").focus()},150)}});else if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter IMEI number.",callback:function(){setTimeout(function(){$("#user_change_imei").focus()},150)}});else if($.trim(t).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit IMEI number.",callback:function(){setTimeout(function(){$("#user_change_imei").select2("val",""),$("#user_change_imei").focus()},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter serial number.",callback:function(){setTimeout(function(){$("#user_change_serial_number").focus()},150)}});else if(0==$.trim(o).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter new user name.",callback:function(){setTimeout(function(){$("#search_newusername").focus()},150)}});else if($.trim(r)==$.trim(o))bootbox.alert({size:"small",title:"Submit application",message:"Old user name and new user name must be different.",callback:function(){setTimeout(function(){$("#search_newusername").select2("val",""),$("#search_username").select2("val",""),$("#search_username").select2("focus")},150),$("#displaynewusr_name").empty(),$("#displaynewusr_name1").empty()}});else if(0==$.trim(n).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter profit center.",callback:function(){setTimeout(function(){$("#select_profit_center").select2("focus")},150)}});else if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter approver name.",callback:function(){setTimeout(function(){$("#search_approver_name").focus()},150)}});else if($.trim(o)==$.trim(i))bootbox.alert({size:"small",title:"Submit application",message:"New user name and approver name must be different.",callback:function(){setTimeout(function(){$("#search_newusername").select2("val",""),$("#search_approver_name").select2("val",""),$("#displaynewusr_name1").empty(),$("#displayappr_name").empty(),$("#search_newusername").select2("focus")},150)}});else{var b="";b+="Following are details for change user application:",b+="<p>Phone Number: "+e+"</p>",b+="<p>IMEI: "+t+"</p>",b+="<p>Serial Number: "+a+"</p>",b+="<p>Old User ID: "+c+"</p>",b+="<p>Old Username: "+r+"</p>",b+="<p>Old Mail Address: "+u+"</p>",b+="<p>New User ID: "+m+"</p>",b+="<p>New Username: "+o+"</p>",b+="<p>New User Mail Address: "+p+"</p>",b+="<p>Profit Center: "+n+"</p>",b+="<p>Approver Name: "+i+"</p>",b+="<p>Approver Mail Address: "+s+"</p>",websocketCall.showUserInput("showUserInput",b),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",b,"user"),websocketCall.insertDeviceRequestForUserChange("insertDeviceRequestForUserChange",e,t,a,c,r,u,m,o,p,l,f,i,s)}},insertDeviceRequestForPCID:function(){var e=$("#pcid_phoneno").val(),t=$("#pcid_imei").val(),a=$("#pcid_serial_number").val(),i=$("#search_username").val(),s=$("#select_search_pcid").val(),n=$("#uid").text(),l=$("#uemail").text();if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#search_username").select2("focus")},150)}});else if(0==$.trim(e).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter phone number.",callback:function(){setTimeout(function(){$("#pcid_phoneno").focus()},150)}});else if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter IMEI number.",callback:function(){setTimeout(function(){$("#pcid_imei").focus()},150)}});else if($.trim(t).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit IMEI number.",callback:function(){setTimeout(function(){$("#pcid_imei").select2("val",""),$("#pcid_imei").focus()},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter serial number.",callback:function(){setTimeout(function(){$("#pcid_serial_number").focus()},150)}});else if(0==$.trim(s).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter PCID.",callback:function(){setTimeout(function(){$("#select_search_pcid").select2("focus")},150)}});else{var o="";o+="Following are details for PCID application:",o+="<p>Phone Number: "+e+"</p>",o+="<p>IMEI: "+t+"</p>",o+="<p>Serial Number: "+a+"</p>",o+="<p>User ID: "+n+"</p>",o+="<p>Username: "+i+"</p>",o+="<p>User Mail Address: "+l+"</p>",o+="<p>PCID: "+s+"</p>",websocketCall.showUserInput("showUserInput",o),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",o,"user"),websocketCall.insertDeviceRequestForPCID("insertDeviceRequestForPCID",e,t,a,n,i,l,s)}},insertDeviceRequestForProfitCenter:function(){var e=$("#profit_center_phoneno").val(),t=$("#profit_center_imei").val(),a=$("#profit_center_serial_number").val(),i=$("#search_username").val(),s=$("#select_profit_center").val().split("-"),n=s[0],l=$("#search_approver_name").val(),o=$("#uid").text(),r=$("#uemail").text(),c=$("#aid").text(),u=$("#aemail").text();if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#search_username").select2("focus")},150)}});else if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter IMEI number.",callback:function(){setTimeout(function(){$("#profit_center_imei").select2("focus")},150)}});else if($.trim(t).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit IMEI number.",callback:function(){setTimeout(function(){$("#profit_center_imei").select2("val",""),$("#profit_center_imei").select2("focus")},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter serial number.",callback:function(){setTimeout(function(){$("#profit_center_serial_number").select2("focus")},150)}});else if(0==$.trim(s).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter new profit center.",callback:function(){setTimeout(function(){$("#select_profit_center").focus()},150)}});else if(0==$.trim(l).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter approver name.",callback:function(){setTimeout(function(){$("#search_approver_name").select2("focus")},150)}});else if($.trim(r)==$.trim(l))bootbox.alert({size:"small",title:"Submit application",message:"User name and approver name must be different.",callback:function(){setTimeout(function(){$("#search_username").select2("val",""),$("#search_approver_name").select2("val",""),$("#search_username").select2("focus")},150)}});else{var m="";m+="Following are details for profit center application:",m+="<p>Phone Number: "+e+"</p>",m+="<p>IMEI: "+t+"</p>",m+="<p>Serial Number: "+a+"</p>",m+="<p>User ID: "+o+"</p>",m+="<p>Username: "+i+"</p>",m+="<p>User Mail Address: "+r+"</p>",m+="<p>New Profit Center: "+s+"</p>",m+="<p>Approver Name: "+l+"</p>",m+="<p>Approver Mail Address: "+u+"</p>",websocketCall.showUserInput("showUserInput",m),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",m,"user"),websocketCall.insertDeviceRequestForProfitCenter("insertDeviceRequestForProfitCenter",e,t,a,o,i,r,n,c,l,u)}},insertDeviceRequestForTerminate:function(){var e=$("#terminate_phoneno").val(),t=$("#terminate_imei").val(),a=$("#terminate_serial_number").val(),i=$("#search_approver_name").val(),s=$("#select_profit_center").val().split("-"),n=(s[0],$("#search_username").val()),l=$("#uid").text(),o=$("#uemail").text(),r=$("#aid").text(),c=$("#aemail").text();if(0==$.trim(n).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter user name.",callback:function(){setTimeout(function(){$("#search_username").select2("focus")},150)}});else if(0==$.trim(e).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter phone number.",callback:function(){setTimeout(function(){$("#terminate_phoneno").focus()},150)}});else if(0==$.trim(t).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter IMEI number.",callback:function(){setTimeout(function(){$("#terminate_imei").focus()},150)}});else if($.trim(t).length<15)bootbox.alert({size:"small",title:"Submit application",message:"Please enter 15 digit IMEI number.",callback:function(){setTimeout(function(){$("#terminate_imei").select2("val",""),$("#terminate_imei").focus()},150)}});else if(0==$.trim(a).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter serial number.",callback:function(){setTimeout(function(){$("#terminate_serial_number").focus()},150)}});else if(0==$.trim(i).length)bootbox.alert({size:"small",title:"Submit application",message:"Please enter approver name.",callback:function(){setTimeout(function(){$("#search_approver_name").focus()},150)}});else if($.trim(n)==$.trim(i))bootbox.alert({size:"small",title:"Submit application",message:"User name and approver name must be different.",callback:function(){setTimeout(function(){$("#displaynewusr_name").select2("val",""),$("#search_approver_name").select2("val",""),$("#displaynewusr_name").empty(),$("#displayappr_name").empty(),$("#displaynewusr_name").select2("focus")},150)}});else{var u="";u+="Following are details for terminate application:",u+="<p>Phone Number: "+e+"</p>",u+="<p>IMEI: "+t+"</p>",u+="<p>Serial Number: "+a+"</p>",u+="<p>User ID: "+l+"</p>",u+="<p>Username: "+n+"</p>",u+="<p>User Mail Address: "+o+"</p>",u+="<p>Profit Center: "+s+"</p>",u+="<p>Approver Name: "+i+"</p>",u+="<p>Approver Mail Address: "+c+"</p>",websocketCall.showUserInput("showUserInput",u),websocketCall.saveChatViaAjax("insertSenderResponse_saveChatViaAjax",u,"user"),websocketCall.insertDeviceRequestForTerminate("insertDeviceRequestForTerminate",e,t,a,l,n,o,r,i,c)}}};