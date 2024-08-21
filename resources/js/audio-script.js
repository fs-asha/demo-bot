var url = "wss://dashboard.findabilityplatform.com:5773/KTApplication-test/converse";
	var socket = new WebSocket(url);
	var sec=8;
	var tsec=0;
	var mimeType="";
	var timeout1;
	var timeout2;

socket.onopen=onOpen;
function onOpen(event){
    console.log("Connection is Open..!!!")
}

if (!navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia = navigator.getMediaDevices.getUserMedia || navigator.getMediaDevices.webkitGetUserMedia ||
    navigator.getMediaDevices.mozGetUserMedia || navigator.getMediaDevices.msGetUserMedia;
}
navigator.mediaDevices.getUserMedia({ audio:true })
.then(stream => {
    
    startRecording=function(){
        var mediaRecorder= new MediaRecorder(stream);
        clearTimeout(timeout1);
        var audioChunks = [];
        
        mediaRecorder.start();
        mimeType=mediaRecorder.mimeType;
        $('#time').html(sec);
        tsec=sec;
        $('.message').html('We will listen you for next <span id="time">'+sec+'</span> Seconds');
        $('.message').show();
        
        var interval=setInterval(function(){
            if(tsec!=0){
                tsec=tsec-1;
                $('#time').html(tsec);
            }   
            else{
                $('.message').html("Processing your audio...");
                clearInterval(interval);
            }
        },1000);

        var tOut=setTimeout(function(){
            stopRecording();
        },sec*1000)
        // setDelay(function(){
        //     stopRecording();
        // },12000)
        
        $('.mic-btn').text('STOP');
        $('.mic-btn').attr('onclick','stopRecording()');
        $('.mic-btn').addClass('animate-pulse');
        
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        stopRecording=function(){
        	
            //$('.message').hide();
            $('.mic-btn').text('START');
            $('.mic-btn').attr('onclick','startRecording()');
            $('.mic-btn').removeClass('animate-pulse');
    
            if(mediaRecorder.state=='recording')
                mediaRecorder.stop();    
            else
                console.log('recorder is not running to close');
            
        }
        function getArrayBuffer(blob){
        	var fr=new FileReader();
            var arrayBuffer;
            
            fr.addEventListener('loadend',function(){
                arrayBuffer=fr.result;  
                socket.binaryType='arraybuffer';
    
                if (!socket && socket.readyState !== socket.OPEN) {
					socket.onopen=onOpen;
				}
				$('.message').html("wait for somewhile....");
				
				var reqBody='{message:"",ab:"'+new Int8Array(arrayBuffer)+'",'+
							'mimeType:"'+mimeType+'"}';

                socket.send(reqBody);
                // }else{
                //     console.log('Websocket Connection closed');
                //     $('.message').html('It seems server is unreachable...');
                // }
                socket.addEventListener('message',function(event){
                    $('.message').html("Please find your result below..");
                    $('.speech-result').html(event.data);
                    if(event.data=='')
                    $('.message').html("Oops..! Unable to recognize, Please try again!");
                    console.log(event.data);
                    var timeout1=setTimeout(function(){
                    	$('.message').hide();
                    },5000);
                    
                });
            });
            fr.readAsArrayBuffer(blob);
        }
    
        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks,{type:'audio/webm;codecs=opus'});
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            //audio.play();
    
            getArrayBuffer(audioBlob);
    
        });

    }

});