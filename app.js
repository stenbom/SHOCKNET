// Module dependencies.
var express,
	mongoose,
	http,
	path,
	passport;


mongoose    = require('mongoose');
express     = require('express');
http        = require('http');
path        = require('path');
passport    = require('passport');


mongoose.connect('mongodb://localhost/intranet');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/src/view');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
	app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});


// Load Controllers
var Users, Auth;
Users = require('./src/controller/users.js')(app);
Auth = require('./src/controller/auth.js')(app);


app.configure('development', function(){
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
