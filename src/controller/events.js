var Controller,
	Events;

Controller = require('../Controller.js');

Events = function (options) {
	var self = this;
	(options) ? this.slug = options.slug || 'events' : 'events';

	this.get_index = function (req, res) {
		res.send(200, 'index');
	}
};



module.exports = function (app, options) {
	return new Controller(
		new Events(options), app
	);
}