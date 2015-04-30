'use strict';

$(document).ready(function(){
	var posturl = '/messages';

	$( "#livesubmit" ).click(function(){
		$("#livesubmit").hide();
		$("#submitgif").show();

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

			}else{
				console.log("failed: " + msg.errors);
			}
			
		});

		$("#submitgif").hide();
		$("#livesubmit").show();	

		$("#success").show();
	});

	var area = document.getElementById("inputBox");
	var livechar = $("#livechar");
	new Countable.live(area, function(counter){
		var count = counter.all;
		livechar.html(count);
		if (count > 0)
			$("#success").hide();
		if(count > 140){
			livechar.addClass("charlimit");
			$("#livesubmit").attr('disabled','disabled');
		}else if(livechar.hasClass("charlimit")){
			livechar.removeClass("charlimit");
			$("#livesubmit").removeAttr('disabled');
		}
	});
});