//click to show/hide full volunteer bio
$(document).ready(function(){
	$( ".volunteer" ).click(function(event) {
		//console
		$(this).toggleClass("fullBio");
	});

	$( "#livesubmit" ).click(function){
		var inputStr = $( "inputBox" ).val();
		var d = new Date();
		//POST this string and date/time combination somewhere
	}
});