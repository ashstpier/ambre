module.exports = function(app, passport, User){

  app.get('*/', ensureAuthenticated, function(req, res){
    res.render('index', { user: req.session.user });
  });

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  app.get('/authenticate',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-modify', 'user-library-read']}),
    function(req, res){});

  app.get('/callback',
    passport.authenticate('spotify', {failureRedirect: '/'}),
    function(req, res) {
      User
        .findOrCreate({where: {id: req.user.id}, defaults: {name: req.user.username}})
        .spread(function(user, created) {
          req.session.user = user
          res.redirect('/');
        })
    });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
}