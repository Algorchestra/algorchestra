var InterfaceIntro = React.createClass({

	_onClick : function(e) {
		var closestlink = $(e.target).closest('.conductorlink, .musicianlink');
		closestlink.css({'width':'100%', 'z-index':200, 'overflow':'auto'});
		closestlink.find('.textblock').fadeOut();
		closestlink.find('.signupform').fadeIn();

		if(closestlink.hasClass('conductorlink')) {
			$('#conductorlink').prop('checked', true);
		} else {
			$('#conductorlink').prop('checked', true);
		}
  	},

	render: function() {
		return(
		<div>
			<div className="conductorlink" onClick={this._onClick}>
				<span className="textblock">
					<span className="text-subline">Continue as</span>
					<span className="text-headline">Conductor</span>
					<span className="text-subline">AND SETUP</span>
					<span className="text-subline">YOUR ORCHESTRA</span>
				</span>

				<UserSignup />
			</div>

			<div className="musicianlink" onClick={this._onClick}>
				<span className="textblock">
					<span className="text-subline">Continue as</span>
					<span className="text-headline">Musician</span>
					<span className="text-subline">AND SUPPORT AN</span>
					<span className="text-subline">EXISTING ORCHESTRA</span>
				</span>

				<UserSignup />
			</div>
		</div>
		);
	}
});



var UserSignup = React.createClass({
  	render: function() {
    return (
    	<div className="signupform">
    		<span className="text-choosename">Choose a name</span>
			<form method="POST" action="/login">
				<input type="text" name="name" />
				<input type="radio" name="type" value="conductor" id="conductorlink" />
				<input type="radio" name="type" value="musician" id="musicianlink" />
				<input type="submit" value="Continue →" />
			</form>
		</div>
    );
  }
});




var UserList = React.createClass({
  	render: function() {
      var userlistEntries = this.props.users.map(function(user) {
      return (
       	<div className="userentry" key={user.id} style={{backgroundColor: '#' + user.color}}>
			<span className="name">{user.name}</span>
		</div>
      );
    });

    return (
		<aside id="userlist" className="sidebar">
			<div className="head">
				<span>The Orchestra</span>
			</div>

        	{userlistEntries}
		</aside>
    );
  }
});

var UserCircles = React.createClass({
  	render: function() {
    	return (
		<section id="usercircles">
			<div className="usercircle" data-id="">
				<span className="usercircle-ring active"></span>
			</div>
		</section>
    );
  }
});

var CurrentUserSounds = React.createClass({
  	render: function() {
	    var userSounds = this.props.user.sounds.map(function(sound) {
	      return (
			<div className="sound" key={sound.key}>
				<span className="key">{sound.key}</span>
				<blockquote className="code">
					<span>{sound.code}</span>
				</blockquote>
			</div>
	      );
	    });

    	return (
		<aside id="keylist" className="sidebar">
			<div className="head">
				<span>Your Sounds</span>
			</div>

			{userSounds}
		</aside>
    );
  }
});

var InterfaceMain = React.createClass({
	getInitialState: function() {
        return { users: this.props.initialUsers };
    },
  	render: function() {
    return (
      <div>
		<div id="usercolorbar"></div>

		<UserList users={this.state.users} />
		<UserCircles />
		<CurrentUserSounds user={this.state.users[0]} />
	</div>
    );
  }
});

users = [{
	"id" : 0,
	"name" : "Niklas",
	"color" : "83cd23",
	"sounds" : [{
		"key": "k",
		"code": "beat(4)"
	},{
		"key": "n",
		"code": "beat(4)"
	}]
}, {
	"id" : 1,
	"name" : "Nico",
	"color" : "23cd77",
	"sounds" : [{
		"key": "k",
		"code": "beat(4)"
	}]
}];


ReactDOM.render(
	<InterfaceIntro />,
	document.getElementById('wrapper')
)