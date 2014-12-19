var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var methodOverride = require('method-override');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var client_id = 'f2023f2525674f1fb50cd9459605d49d'; // Your client id
var client_secret = 'b0324f076acb40f8b002126b12237ffd'; // Your client secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

///// OAUTH /////

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
      return done(null, profile);
    });
  }
));

///// APP /////

var app = express();
var router = express.Router();

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

///// ROUTES /////

router.get('/', function(req, res){
  res.sendfile('public/views/login.html');
});

router.get('/app', ensureAuthenticated, function(req, res){
  res.sendfile('public/views/app.html');
});

router.get('/login',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}),
  function(req, res){});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/app');
  });

///// START SERVER /////

console.log('Listening on 8888');
app.listen(8888);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}