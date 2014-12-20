var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var methodOverride = require('method-override');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = 'f2023f2525674f1fb50cd9459605d49d'; // Your client id
var client_secret = 'b0324f076acb40f8b002126b12237ffd'; // Your client secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var scopes = ['user-read-private', 'user-read-email'];
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

var user

passport.use(new SpotifyStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      spotifyApi.setAccessToken(accessToken);
      user = profile.username;
      return done(null, profile);
    });
  }
));

///// APP /////

var app = express();
var router = express.Router();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'jfd74hwjkds97453kjfhsf' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

///// ROUTES /////

require('./app/routes')(router, passport);

///// SPOTIFY API /////

router.get('/api/profile', function(req, res) {
  spotifyApi.getMe()
    .then(function(data) {
      console.log('Some information about the authenticated user', data);
      res.json(data);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
});

router.get('/api/playlists', function(req, res) {
  spotifyApi.getUserPlaylists(user)
    .then(function(data) {
      console.log('Retrieved playlists', data);
      res.json(data);
    },function(err) {
      console.log('Something went wrong!', err);
    });
});

///// START SERVER /////

console.log('Listening on 8888');
app.listen(8888);

exports = module.exports = app;
