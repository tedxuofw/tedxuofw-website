'use strict';

var posturl = "/messages/";
var url = "/messages/unset";


function setStatus(status, id){
    console.log(status);
    console.log(id);
    var response = {
        status: status
    };
    $.ajax({
        type: 'POST',
        url: posturl + id,
        data: JSON.stringify(response),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
    })
}

function approve(id) {
    setStatus("approved", id);
}

function unset(id) {
    setStatus("unset", id);
}

function disapprove(id) {
    setStatus("disapproved", id);
}

$(document).ready(function(){
    
    function addData(data){
        body.html("");
        var messages = data.messages;
        for(var i = 0; i < data.messages.length; i++){
            var message = messages[i];
            body.append(messageDiv(message.text, message.id, message.status));
        }
    }

	//url of the service to get messages from
	
	var body = $("#messages");

	//1000 ms = 1s interval for update function below
	var interval = 2000;

	//check for new unset messages
	setInterval(function(){
		$.get(url, addData);
	}, interval);

    
	$.get(url, addData);

	function messageDiv(msg, id, status){
		var start = "<div class='message' id='m"+ id +"'>";
        var status_class = status + "-status";
        var approve_button = "<button type='button' class='approve " + status_class + "' onclick='approve(" + id + ")'>Approve</button>";
        var unset_button = "<button type='button' class='unset " + status_class + "' onclick='unset(" + id + ")'>Unset</button>";
        var disapprove_button = "<button type='button' class='disapprove " + status_class + "' onclick='disapprove(" + id + ")'>Disapprove</button>";
        
		return start + approve_button + unset_button + disapprove_button + msg + "</div>";
	}
    
    $("input[name='toggle']").change(function() {
        if ($(this).val() == 'all') {
            url = "/messages";
        } else if ($(this).val() == 'approved') {
            url = "/messages/approved";
        } else if ($(this).val() == 'unset') {
            url = "/messages/unset";
        } else if ($(this).val() == 'disapproved') {
            url = "/messages/disapproved";
        }
    });
});

