'use strict';

$(document).ready(function(){

	//url of the service to get messages from
	var url = "http://localhost:5000/messages/unset";

	var body = document.getElementById("messages");

	//5000 ms = 5s interval for update function below
	var interval = 5000;

	//get timestamp for reference
	var last = new Date();

	//check for new string, replace oldest with this one
	setInterval(function(){
		$.get(url, function(data){
			for(var i = data.messages.length - 1; i >= 0; i--){
				var message = data.messages[i];
				console.log(JSON.stringify(message));
				var mtime = new Date(message.added_timestamp);
				console.log(mtime);
				console.log(last);
				if (mtime > last){
					break;
				}
				body.appendChild(messageDiv(message.text));
			}
			//refresh timestamp for next update
			last = new Date();
		});			
	}, interval);
	
	


	function messageDiv(msg){
		var start = "<div class='message'>";
		var buttons = "<button type='button' class='approve'>Yes</button> <button type='button' class='deny'>No</button> </div>";
		return start + msg + buttons;
	}
});