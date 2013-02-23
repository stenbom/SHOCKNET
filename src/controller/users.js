var Controller,
	Users;

Controller = require('../Controller.js');

Users = function (options) {
	var self = this;
	this.slug = 'users';

	this.get_index = function (req, res) {
		res.send(200, 'index');
	}
};



module.exports = function (app, options) {
	return new Controller(
		new Users(options), app
	);
}