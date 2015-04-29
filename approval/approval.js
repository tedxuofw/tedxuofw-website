'use strict';

var posturl = "http://localhost:5000/messages/";

$(document).ready(function(){

	//url of the service to get messages from
	var url = "http://localhost:5000/messages/unset/unseen/";

	var body = $("#messages");

	//1000 ms = 1s interval for update function below
	var interval = 2000;

	//old timestamp for reference
	var last = "2015-04-29T06:52:56";

	//check for new unset messages
	setInterval(function(){
		$.get(url + last, function(data){
			for(var i = 0; i < data.messages.length; i++){
				var message = data.messages[i];
				console.log(JSON.stringify(message));				
				body.append(messageDiv(message.text, message.id));

				//update reference timestamp
				if (i == data.messages.length - 1)
					last = message.added_timestamp;
			}
			
		});			
	}, interval);

	function messageDiv(msg, id){
		var start = "<div class='message' id='m"+ id +"'>";
		var buttons = "<button type='button' class='approve' onclick='approve(" + id +")'>Yes</button> <button type='button' class='deny' onclick='deny(" + id +")'>No</button> </div>";
		return start + msg + buttons;
	}

});

//update status of a given message
function setStatus(id, status){
	var response = {
		status: status
	};
	$.ajax({
	    type: 'POST',
	    url: posturl + id,
	    data: JSON.stringify(response),
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8'
	}).done(function() {
		$( "#m" + id).html(status);
		//wait before removing div
		setTimeout(function(){
			$( "#m"+ id).remove();
		}, 850);
		
	});
}

//approve a message with given div id
function approve(id){
	setStatus(id, "approved");
}

//disapprove a message with given div id
function deny(id){
	setStatus(id, "disapproved");
}