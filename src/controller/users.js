var path,
	Controller,
	Users,
	User;

path        = require('path');
Controller  = require(path.join(__dirname, '../Controller.js'));
User        = require(path.join(__dirname, '../model/User.js'));

Users = function (options) {
	var self = this;
	this.slug = 'users';
	this.model = User;

	this.get_index = function (req, res) {
		res.send(200, 'index');
	}

	this.post_add = function (req, res) {
		var username, password;

		username    = req.body.username || null;
		password    = req.body.password || null;
		email       = req.body.email    || null;

		if (
			req.body && username && password && email
		) {
			var user = new User({
				username : username,
				password : password,
				email : email
			})
			return user.save(function (err, doc) {
				if (err) return res.send(200, JSON.stringify(err));
				return res.send(200, JSON.stringify(doc));
			});
		} else {
			res.send(200, JSON.stringify({ message : "Must specify username, password & email" }));
		}
	}
};



module.exports = function (app, options) {
	return new Controller(
		new Users(options), app
	);
}