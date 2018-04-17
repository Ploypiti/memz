var appConfig = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
 
var server_port = process.env.PORT || appConfig.server_port;
var session_secret = process.env.SESSION_SECRET || appConfig.session_secret;
var db_user = process.env.DB_USER || appConfig.db_user;
var db_pass = process.env.DB_PASS || appConfig.db_pass;
var connection_string = process.env.DB_STR || appConfig.connection_string;
mongoose.connect(connection_string);

var server = app.listen(server_port, function(){
    console.log('Listening on port %d',server_port);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: session_secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var index_route = require('./routes/index');
var lesson_route = require('./routes/lesson');
var admin_route = require('./routes/admin');
app.use('/', index_route);
app.use('/lesson', lesson_route);
app.use('/admin', admin_route);