//click to show/hide full volunteer bio
$(document).ready(function(){
	$( ".volunteer" ).click(function(event) {
		//console
		$(this).toggleClass("fullBio");
	});
});