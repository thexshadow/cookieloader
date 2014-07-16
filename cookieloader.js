function getEmbed(){
   var e = window.frames["bookmarklet_iframe"];
   return e;
}

var END_OF_INPUT = -1;
var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readBase64(){    
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}
function encodeBase64(str){
    setBase64Str(str);
    var result = '';
    var inBuffer = new Array(3);
    var lineCount = 0;
    var done = false;
    while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT){
        inBuffer[1] = readBase64();
        inBuffer[2] = readBase64();
        result += (base64Chars[ inBuffer[0] >> 2 ]);
        if (inBuffer[1] != END_OF_INPUT){
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
            if (inBuffer[2] != END_OF_INPUT){
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
                result += (base64Chars [inBuffer[2] & 0x3F]);
            } else {
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
                result += ('=');
                done = true;
            }
        } else {
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
            result += ('=');
            result += ('=');
            done = true;
        }
        lineCount += 4;
        if (lineCount >= 76){
            result += ('\n');
            lineCount = 0;
        }
    }
    return result;
}

/* make string URL safe; remove padding =, replace "+" and "/" with "*" and "-" */
function encodeBase64ForURL(str){
   var str = encodeBase64(str).replace(/=/g, "").replace(/\+/g, "*").replace(/\//g, "-");
   str = str.replace(/\s/g, "");   /* Watch out! encodeBase64 breaks lines at 76 chars -- we don't want any whitespace */
   return str;
}

function keyPressHandler(e) {
      var kC  = (window.event) ?    // MSIE or Firefox?
                 event.keyCode : e.keyCode;
      var Esc = (window.event) ?   
                27 : e.DOM_VK_ESCAPE // MSIE : Firefox
      if(kC==Esc){
         // alert("Esc pressed");
         toggleItem("mbmd");
      }
}


function toggleItem(id){
  var item = document.getElementById(id);
  if(item){
    if ( item.style.display == "none"){
      item.style.display = "";
    }
    else{
      item.style.display = "none";
    } 
  }
}

function showItem(id){
  try{
    var item = document.getElementById(id);
    if(item){
        item.style.display = "";
    }
  }
  catch(e){
  
  }
}

function removecookie()
{
	if (document.cookie.indexOf("NetflixId") >= 1) {
		date = new Date();
		date.setDate(date.getDate() -1);
		document.cookie = 'SecureNetflixId=;expires=' + date;
		document.cookie = 'NetflixId=;expires=' + date;
		alert("Cookies Removed!")
	}
	else {
		alert('No cookie found!')
	}
}
function addcookie() {
	var input = document.getElementById('cookieid');
	if(input.value.length == 0) {
		alert('Please type in a cooke.')
	}
	else {
		var cookieadd = document.getElementById('cookieid').value
		var parts = cookieadd.split(':', 2);
		var SNID = parts[0];
		var NID  = parts[1];
		date = new Date();
		date.setTime(date.getTime()+31536000000);
		document.cookie = "SecureNetflixId=" + SNID + "; expires=" + date.toGMTString();
		document.cookie = "NetflixId=" + NID + "; expires=" + date.toGMTString();
		alert('Cookie added, page will refresh on ok.')
		location.reload(true);
	}
}
function viewcookie() {
	if (document.cookie.indexOf("NetflixId") >= 0) {
		var id1 = "SecureNetflixId=";
		var id2 = "NetflixId=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(id2) == 0) var t1 = c.substring(id2.length,c.length);
			if (c.indexOf(id1) == 0) alert('SecureNetflixId:\n' + c.substring(id1.length,c.length) + '\n\nNetflixId:\n' + t1);
		}
	}
	else {
		alert('No cookie found!')
	}
}
function madeby() {
	alert('Made by: thexshadow @ Leax.sx')
}

(function(){

  // get the currently selected text
  var t;
  try {
    t=((window.getSelection && window.getSelection())||(document.getSelection && document.getSelection())||(document.selection && document.selection.createRange && document.selection.createRange().text));
  }
  catch(e){ // access denied on https sites
    t = "";
  }

  var calcstring = t.toString();
  
  if (calcstring == ""){
    calcstring = "";
  }
  
 
  var iframe_url = "" + "?d=&c=" + encodeBase64ForURL(calcstring);
 
  var existing_iframe = document.getElementById('mbmd');
  
  if (existing_iframe){
    showItem('mbmd');
    return;
  }
  var div = document.createElement("div");
  div.id = "mbmd";
  
  var str = "";
	str += "<div style='width:500px;height:95px;background-color:red;position:absolute;text-align:center;top:0;right:0;margin:10px;border: 3px double #FFFFFF !important;;z-index:10000000;'>";
	str += "<button type='text' style='float:right;border:0;' onclick='toggleItem(\&quot;mbmd\&quot;);'>X</button>";
	str += "<button type='text' style='float:left;border:0;' onclick='madeby()'>?</button>";
	str += "<span style='color: #fff;'>NETFLIX COOKIE LOADER</span>";
	str += "<div style='padding: 10px;'>";
	str += "<input type='text' placeholder='COO:KIE' style='display:block;margin:0;width:100%;text-align:center;' id='cookieid' name='cookie'>";
	str += "<button type='text' class='b' onclick='viewcookie()'>View Cookie</button>";
	str += "<button type='text' class='b' onclick='removecookie()'>Remove Cookie</button>";
	str += "<button type='text' class='b' onclick='addcookie()'>Submit Cookie</button>";
	str += "</div>";
	str += "</div>";
  div.innerHTML = str;
  
  div.onkeypress = keyPressHandler;
  document.body.insertBefore(div, document.body.firstChild);
})()
