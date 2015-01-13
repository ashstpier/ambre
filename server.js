var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var methodOverride = require('method-override');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var postgres = require('pg');

var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = 'f2023f2525674f1fb50cd9459605d49d'; // Your client id
var client_secret = 'b0324f076acb40f8b002126b12237ffd'; // Your client secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var state = 'ambre-state';

///// OAUTH /////

var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      spotifyApi.setAccessToken(accessToken);
      return done(null, profile);
    });
  }
));

///// DATABASE /////

var database = require('./config/database');

///// MODELS /////

var Soundtrack = require('./app/models/soundtrack')(database);
var Book = require('./app/models/book')(database);

Book.hasMany(Soundtrack)
Soundtrack.belongsTo(Book)

///// APP /////

var app = express();

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());
app.use(session({ secret: 'jfd74hwjkds97453kjfhsf' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

///// ROUTES /////

require('./app/auth-routes')(app, passport);
require('./app/soundtrack-routes')(app, Soundtrack, Book);
require('./app/book-routes')(app, Book, Soundtrack);
require('./app/book-api')(app);
require('./app/spotify-api')(app, spotifyApi);

///// START SERVER /////

console.log('Listening on 8888');
app.listen(8888);

exports = module.exports = app;
