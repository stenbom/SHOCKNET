// Dependencies
var mongoose,
	userSchema,
	path;

path        = require('path');
mongoose    = require('mongoose');
userSchema  = require(path.join(__dirname, '../model/schema/User.js'));

var User;
User = mongoose.model('User', userSchema);

module.exports = User;