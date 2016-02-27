var uniqueId = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return parseInt(Math.random().toString(36).substr(2, 9));
};

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createUser() {
	return {
		"id" : uniqueId(),
		"name" : "",
		"color" : getRandomColor(),
		"keys" : {}
	}
}

var currentUser = createUser();

var pusher = new Pusher('63d59e4d863d6c327df0', {
  encrypted: true,
  authTransport: 'client',
    clientAuth: {
      key: '63d59e4d863d6c327df0',
      secret: '3f3f9b3c99eaa688e16b',
      user_id: 1,
      user_info: {}
    }
});

var channel = pusher.subscribe('private-global');

var activeTracks = {};
var users = {};

channel.bind('client-music_keystroke', function(data) {
	/*if(!(data.user_id in activeTracks)) {
		activeTracks[data.user_id] = new track();
		activeTracks[data.user_id].beat(4);
	}*/
	console.log('Received sample: ' + data.sound);
	//activeTracks[data.user_id].eval(data.sound);
});


channel.bind('pusher:subscription_succeeded', function(data) {
	console.log('new user');
	channel.trigger('client-add_user', users);
});


$(document).keypress(function(event) {
	channel.trigger('client-music_keystroke', {
		"user_id" : currentUser.id,
	  	"sound": "notes(60).notes(70)"
	});
});

