//url of the service to get messages from
var url = "";

var body = document.getElementById("messages");

//do some get request here for new messages
var msgs = [];
for(var i = 0; i < msgs.length; i++){
	body.appendChild(messageDiv(msgs[i]));
}

function messageDiv(msg){
	var start = "<div class='message'>";
	var buttons = "<button type='button' class="approve">Yes</button> <button type='button' class="deny">No</button> </div>";
	return start + msg + buttons;
}