(function() {
  'use strict';

  /**
   * Module dependencies
   */
  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

  module.exports = function () {
    // Use local strategy
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.authenticate(password)) {
          return done({
            message: 'Invalid email or password'
          }, false);
        }
        return done(null, user);
      });
    }));
  };
})();
