var path,
	Auth,
	Controller,
	passport,
	LocalStrategy,
	User;

path            = require('path');
passport        = require('passport');
LocalStrategy   = require('passport-local').Strategy;
Controller      = require(path.join(__dirname, '../Controller.js'));
User            = require(path.join(__dirname, '../model/User.js'));

// Passport: LocalStrategy
// =======================
passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({ username : username }, function (err, user) {
			// Error speaking with mongo
			if (err) { return done(err); }

			// Non existant user
			if (!user) { return done(null, false, { message : "User not found." }); }

			// Valid password
			if (user.validPassword(password)) { return done(null, user); }

			// Not a valid password
			else { return done(null, false, { message : "Invalid password." }); }
		});
	}
));

// Tell passport that we are using _id and not id
passport.serializeUser(function(user, done) { done(null, user._id); });

passport.deserializeUser(function(id, done) {
	User.findById(id, function (err, user) { done(err, user); });
});

// Controller: Auth
// ================
Auth = function (options) {
	var self = this;
	this.slug = 'auth';

	this.get_index = function (req, res) {
		res.send(200, 'index');
	}

	this.get_login = function (req, res) {
		res.send(200, '...');
	}

	this.post_login = passport.authenticate('local', {
		successRedirect : '/',
		failureRedirect : '/auth/login'
	});

	self.isLoggedIn = function (req) {
		return (req && req.user) ? true : false;
	}
};



module.exports = function (app, options) {
	return new Controller(
		new Auth(options), app
	);
}