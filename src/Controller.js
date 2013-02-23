// Factory Controller
// ===================
var _,
	Controller;

// dependencies
_ = require('underscore');

Controller = function (Instance, app) {
	var _this;
	_.extend(this, Instance); _this = this;

	if (!app)
		throw new Error("Must pass express application instance when instantiating a controller)");

	// Loop through methods of passed instance and make them into routes
	_.each(this, function (value, key) {
		if (typeof(_this[key]) === typeof(Function)) {
			if (['all', 'get', 'post', 'put', 'delete'].indexOf(key.split('_')[0]) >= 0) {
				// is method get and action index? then we assume its default
				(key.split('_')[1] === 'index' && key.split('_')[0] === 'get') ? app[key.split('_')[0]]('/' + _this.slug, _this[key]) : '';
				// register the route
				app[key.split('_')[0]]('/' + _this.slug + '/' + key.split('_')[1], _this[key]);
			}
		}
	});
}

module.exports = function (Instance, app) {
	return new Controller(Instance, app);
}