var mongoose, UserSchema;
mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username : String,
	password : String,
	email : String
});

UserSchema.methods.validPassword = function () {
	return true;
}

module.exports = UserSchema;