
function togglediv(id){
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
function showdiv(id){
	var item = document.getElementById(id);
	if(item){
		item.style.display = "";
	}
}
function removecookie()
{
	date = new Date();
	date.setDate(date.getDate() -1);
	document.cookie = 'SecureNetflixId=;expires=' + date;
	document.cookie = 'NetflixId=;expires=' + date;
	alert('Cookie removed! Press ok to refresh.');
	window.location.href = 'www.netflix.com/Login?';
}
function addcookie() {
	var input = document.getElementById('cookieid');
	if(input.value.length == 0) {
		alert('Please enter a cooke.');
	}
	else {
		var cookieadd = document.getElementById('cookieid').value
		var parts = cookieadd.split(':', 2);
		var SNID = parts[0];
		var NID  = parts[1];
		date = new Date();
		date.setFullYear(date.getFullYear()+1);
		document.cookie = "SecureNetflixId=" + SNID + "; expires=" + date.toGMTString();
		document.cookie = "NetflixId=" + NID + "; expires=" + date.toGMTString();
		alert('Cookie added! Press ok to redirect to the movie page.');
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
			if (c.indexOf(id1) == 0) alert('SecureNetflixId:\n' + c.substring(id1.length,c.length));
			if (c.indexOf(id2) == 0) alert('NetflixId:\n' + c.substring(id2.length,c.length));
		}
	}
	else {
		alert('No cookie found!');
	}
}
function madeby() {
	alert('thexshadow @ Leax.sx');
}
(function(){
	var existing = document.getElementById('mbmd');
	if (existing){
		showdiv('mbmd');
		return;
	}
	var div = document.createElement("div");
	div.id = "mbmd";
	var str = "";
	str += "<style>.cookiemain{width:500px;height:85px;background-color:#D30B03;position:fixed;text-align:center;top:0;right:0;margin:10px;border:3px double #FFF;z-index:10000000}.sb{width:20px;background:#fff;text-align:center}#bh{color:#fff;font-weight:700}#cookieid{display:block;text-align:center;width:calc(100% - 20px);margin:6px}.bb{-webkit-border-radius:3px;-moz-border-radius:3px;-ms-border-radius:3px;-o-border-radius:3px;border-radius:3px;color:#000;display:inline-block;border:0;height:24px;margin:2px 2px 0;width:120px;text-align:center;position:relative;background:#fff;line-height:24px}.bb:hover,.sb:hover{cursor:pointer}</style>"
	str += "<div class='cookiemain'>";
	str += "<div class='sb' style='float:right;' onclick='togglediv(&quot;mbmd&quot;);'>X</div>";
	str += "<div class='sb' style='float:left;' onclick='madeby()'>?</div>";
	str += "<div id='bh'>NETFLIX COOKIE LOADER</div>";
	str += "<input type='text' id='cookieid' placeholder='COO:KIE'>";
	str += "<div class='bb' onclick='viewcookie()'>View Cookie</div>";
	str += "<div class='bb' onclick='removecookie()'>Remove Cookie</div>";
	str += "<div class='bb' onclick='addcookie()'>Submit Cookie</div>";
	str += "</div>";
	div.innerHTML = str;
	document.body.insertBefore(div, document.body.firstChild);
})()
