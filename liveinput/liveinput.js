'use strict';

$(document).ready(function(){
	var posturl = 'http://localhost:5000/messages';

	$( "#livesubmit" ).click(function(){
		var text = $( "#inputBox" ).val();
		var response = {"text": text};

		$.ajax({
		    type: 'POST',
		    url: posturl,
		    data: JSON.stringify(response),
		    dataType: 'json',
		    contentType: 'application/json; charset=utf-8'
		}).done(function(msg) {			
			if(msg.success){
				$("#submission").hide();
				$("#success").show();
			}else{
				console.log("failed: " + msg.errors);
			}
			
		});
	});
});

function reset(){
	$("#inputBox").val('');
	$("#submission").show();
	$("#success").hide();
}