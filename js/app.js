var pusher = {}
var channel = {};
var t = {};
var currentUser = {};


var pusherConnect = function(user) {
    pusher = new Pusher('63d59e4d863d6c327df0', {
      encrypted: true,
      authTransport: 'client',
        clientAuth: {
          key: '63d59e4d863d6c327df0',
          secret: '3f3f9b3c99eaa688e16b',
          user_id: user.id,
          user_info: user
        }
    });

    channel = pusher.subscribe('presence-global');
    t = new track();
    t.beat(6).nl(1);

    channel.bind('client-music_keystroke', function(data) {
        console.log('Received sample: ' + data.sound);
        t.eval(data.sound);
    });

    channel.bind('pusher:member_added', function(member) {
        window.interfaceMain._updateUserList();
    });

    channel.bind('pusher:member_removed', function(member) {
        window.interfaceMain._updateUserList();
    });

    channel.bind('pusher:subscription_succeeded', function(member) {
        window.interfaceMain._updateUserList();
    });

    $(document).keypress(function(e) {
        currentUserKeys = {};
        $.each(channel.members.me.info.sounds, function(key, sound){ currentUserKeys[sound.key] = sound.code; });

        var c = '';
        if((c = String.fromCharCode(e.which)) in currentUserKeys) {
            console.log('send: ' + currentUserKeys[c]);
            channel.trigger('client-music_keystroke', {
                "user_id" : channel.members.me.info.id,
                "sound": currentUserKeys[c]
            });
            t.eval(currentUserKeys[c]);
        } 
    });
}

