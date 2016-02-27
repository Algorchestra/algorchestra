// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

var pusher = new Pusher('63d59e4d863d6c327df0', {
  encrypted: true
});

var channel = pusher.subscribe('global');
channel.bind('music_keystroke', function(data) {
  alert(data.message);
});

$(document).ready(function(){
	$(document).keypress(function(event) {
		channel.trigger('client-music_keystroke', {
		  "message": "hello world"
		}); 
	});
});
