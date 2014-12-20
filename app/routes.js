module.exports = function(router, passport){

  ///// APP ROUTES /////

  router.get('/', ensureAuthenticated, function(req, res){
    res.render('app.ejs', { user: req.user });
  });

  router.get('/login', function(req, res){
    res.render('login.ejs', { user: req.user });
  });

  router.get('/authenticate',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}),
    function(req, res){});

  router.get('/callback',
    passport.authenticate('spotify', {failureRedirect: '/login'}),
    function(req, res) {
      res.redirect('/');
    });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
}