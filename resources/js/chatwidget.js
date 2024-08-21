var isIE = /*@cc_on!@*/ false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

if (isIE == false) {
  window.onbeforeunload = function () {
    window.speechSynthesis.cancel();
  };

  if (typeof synth != "undefined") {
    synth.cancel();
  }
} else {
  //document.write ("<script src=\"js/ieskins.js\"></scr"+"ipt>");
}

var openCount = 0;
var div = document.createElement("div");

var cssLink = "resources/css/iframe.css";
var chatUrl = "chatframe.html";
var launcherImageUrl = "resources/images/demo-v1/ChatRoboGE.png";

var launcherImageToolTip = "Chat with Bot";

// //Append Css to head
document.querySelector("head").innerHTML +=
  '<link href="resources/css/chatwidget.css" type="text/css" rel="stylesheet"/>';

div.setAttribute("id", "chatH");
document.getElementsByTagName("body")[0].appendChild(div);
//Append buttons and iframe
var banime = document.getElementById("fsChatWidget").getAttribute("data-anime");
var url = chatUrl;
var chatHtml =
  '<img src="' +
  launcherImageUrl +
  '" title="' +
  launcherImageToolTip +
  '" class="showchatbar" id="showchatbar" onClick="showchat();"/><div class="outterFrame" id="outterFrame"><span class="closeBtn" id="closeBtn" onClick="hidechat();"></span></div>';
document.getElementById("chatH").innerHTML = chatHtml;

var node = document.createElement("iframe");
node.setAttribute(
  "sandbox",
  "allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups"
);
node.setAttribute("src", url);
node.setAttribute("class", "frame_box");
node.setAttribute("id", "iframe");
node.setAttribute("allowfullscreen", "");
node.setAttribute("oncontextmenu", "return false");
node.setAttribute("webkitallowfullscreen", "true");
node.setAttribute("mozallowfullscreen", "true");
node.setAttribute("allow", "microphone");

var closeBtn = document.getElementById("closeBtn");

//Check if frame-chatbox set to be open or closed
var vstatus = document.getElementById("fsChatWidget").getAttribute("data-view");

if (vstatus == "true") {
  if (screen.width > 480) {
    document.getElementById("outterFrame").style.display = "block";
    document.getElementById("closeBtn").style.display = "block";
  }
} else {
  document.getElementById("outterFrame").style.display = "none";
  document.getElementById("closeBtn").style.display = "none";
}
//show/hide chat box
function showchat() {
  openCount++;
  if (openCount == 1) {
    document.getElementById("outterFrame").appendChild(node);
  }
  document.getElementById("outterFrame").style.display = "block";
  document.getElementById("closeBtn").style.display = "block";
  document.getElementById("iframe").contentWindow.tobeSpeak = true;
}
function hidechat() {
  document.getElementById("outterFrame").style.display = "none";
  document.getElementById("closeBtn").style.display = "none";
  document.getElementById("iframe").contentWindow.tobeSpeak = false;

  if (isIE == false) {
    document.getElementById("iframe").contentWindow.synth.cancel();
  }
  if (
    typeof document.getElementById("iframe").contentWindow.audio != "undefined"
  ) {
    document.getElementById("iframe").contentWindow.audio.stop();
  }
  document.getElementById("iframe").contentWindow.recognition.stop();
}
closeBtn.setAttribute("title", "Minimize");
