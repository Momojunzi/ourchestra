var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, userName, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          userName: userName
        }
      }).then(function(user){
        if(user) {
          return done(null, false, {
            message: 'That user name is already taken'
          });
        }else {
          var userPassword = generateHash(password);
          var data = {
            name: req.body.name,
            userName: userName,
            email: req.body.email,
            location: req.body.location,
            password: userPassword
          }
          User.create(data).then(function(newUser, created) {
            if(!newUser) {
              return done(null, false);
            }
            if(newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }

  ));

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, userName, password, done){
      var User = user;
      var isValidPassword = function(userpass, password){
        return bCrypt.compareSync(password, userpass);
      }
      User.findOne({
        where: {
          userName: userName
        }
      }).then(function(user){
        if(!user) {
          console.log("user not found");
          return done(null, false, {
            message: 'Username does not exist'
          });
        }
        if (!isValidPassword(user.password, password)){
          console.log("password is wrong");
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        var  userinfo = user.get();
        console.log('everyhting check out ok')
        return done(null, userinfo);
      }).catch(function(err){
        console.log('Error:', err);
        return done(null, false, {
          message: 'Something went wrong with your signin.'
        });
      });
    }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if(user) {
        done(null, user.get());
      }else {
        done(user.errors, null);
      }
    });
  });
}
