var HTML = document.documentElement.innerHTML;

//function that pastes something inside the html.
function pegaString(str, first_character, last_character) {
	if(str.match(first_character + "(.*)" + last_character) == null){
		return null;
	}else{
	    new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
	    return(new_str)
    }
}
//function that change the player to a simpler one.
function importPlayer(){
		console.log("[CR Premium] Removing player from Crunchyroll...");
		var elem = document.getElementById('showmedia_video_player');
    	elem.parentNode.removeChild(elem);

		console.log("[CR Premium] Getting data from the stream...");
		var video_config_media = JSON.parse(pegaString(HTML, "vilos.config.media = ", ";"));

    	console.log("[CR Premium] Adding jwplayer...");
    	ifrm = document.createElement("iframe");
    	ifrm.setAttribute("id", "frame"); 
		ifrm.setAttribute("src", "https://luiz-lp.github.io/crpiframeplayer/"); 
		ifrm.setAttribute("width","100%");
		ifrm.setAttribute("height","100%");
		ifrm.setAttribute("frameborder","0");
		ifrm.setAttribute("scrolling","no");
		ifrm.setAttribute("allowfullscreen","allowfullscreen");
		ifrm.setAttribute("allow","autoplay; encrypted-media *");

		if(document.body.querySelector("#showmedia_video_box") != null){
			document.body.querySelector("#showmedia_video_box").appendChild(ifrm);
		}else{
			document.body.querySelector("#showmedia_video_box_wide").appendChild(ifrm);
		}

		//Remove Top Note about Trying Premium
		if (document.body.querySelector(".freetrial-note") != null) {
			console.log("[CR Premium] Removing Free Trial Note...");
			document.body.querySelector(".freetrial-note").style.display = "none";
		}

		//Remove warnings that the video cannot be viewed
		if(document.body.querySelector(".showmedia-trailer-notice") != null){
			console.log("[CR Premium] Removing Trailer Notice...");
			document.body.querySelector(".showmedia-trailer-notice").style.display = "none";
		}

		//Remove suggestion to sign up for free trial
		if(document.body.querySelector("#showmedia_free_trial_signup") != null){
			console.log("[CR Premium] Removing Free Trial Signup...");
			document.body.querySelector("#showmedia_free_trial_signup").style.display = "none";
		}
		

		ifrm.onload = function(){
			ifrm.contentWindow.postMessage({
           		'video_config_media': [JSON.stringify(video_config_media)],
           		'lang': [pegaString(HTML, 'LOCALE = "', '",')]
        	},"*");
	    };

		//console.log(video_config_media);
}
//function when loading page.
function onloadfunction() {
	if(pegaString(HTML, "vilos.config.media = ", ";") != null){
		importPlayer();
	}
}
document.addEventListener("DOMContentLoaded", onloadfunction());
