var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport){

  app.get('/signup', authController.signup);

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup',
      failureFlash: true
    }
  ));

  app.get('/signin', authController.signin);

  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/signin',
      failureFlash: true
    }
  ));

  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }

}
