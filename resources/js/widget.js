	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	
	if(isIE == false) { 
	   window.onbeforeunload=function(){
			window.speechSynthesis.cancel();
	   }

	   if(typeof synth!='undefined'){
		   synth.cancel();
	   }
	} else {
		//document.write ("<script src=\"js/ieskins.js\"></scr"+"ipt>");
	}

	var current_url=document.URL;

	//if(current_url=='https://www.avivaindia.com/'){
	if(current_url=='https://dashboard.findabilityplatform.com:5773/YaxisApplication/site.html'){	
		if(screen.width>480){
			document.getElemntById('iframe').src="chat.html";
			document.getElementById('outterFrame').style.display='block';
			document.getElementById('outterFrame').style.background='#ffffff';
	  		document.getElementById('closeBtn').style.display='block';
		}
	}
	else{
		document.getElementById('outterFrame').style.display='none';
	  	document.getElementById('closeBtn').style.display='none';
	}
  	

	function showchat() {
		var iframeUrl = document.getElementById('iframe').src;
		var locUrl = window.location.href;
		if(isIE == true) {
			var to = locUrl.lastIndexOf('/');
			to = to == -1 ? locUrl.length : to + 1;
			locUrl = locUrl.substring(0, to);
		}
		if(iframeUrl===locUrl){
			document.getElementById('iframe').src="chat.html";
		}
		document.getElementById('outterFrame').style.display='block';
  		document.getElementById('closeBtn').style.display='block';
  		document.getElementById('iframe').contentWindow.tobeSpeak=true;
  		//document.getElementById('iframe').src=document.getElementById('iframe').src;
	}
	function hidechat() {
		document.getElementById('iframe').contentWindow.tobeSpeak=false;
		document.getElementById('outterFrame').style.display='none';
  		document.getElementById('closeBtn').style.display='none';
  		if(ie == false) {
  			document.getElementById('iframe').contentWindow.synth.cancel();
  		}
  		if(typeof document.getElementById('iframe').contentWindow.audio!='undefined'){
  			document.getElementById('iframe').contentWindow.audio.stop();
    	}
  		
  		//window.speechSynthesis.cancel();
  		//recognition.stop();
  		document.getElementById('iframe').contentWindow.recognition.stop();
  		//document.getElementById('iframe').contentWindow.stopStreaming();
  		
  		
	}
	
	
	closeBtn.setAttribute("title","Minimize");