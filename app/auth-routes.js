module.exports = function(app, passport){

  app.get('*/', ensureAuthenticated, function(req, res){
    res.render('index', { user: req.user });
  });

  app.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  app.get('/authenticate',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}),
    function(req, res){});

  app.get('/callback',
    passport.authenticate('spotify', {failureRedirect: '/'}),
    function(req, res) {
      res.redirect('/');
    });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
}