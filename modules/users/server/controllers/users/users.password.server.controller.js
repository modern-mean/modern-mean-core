'use strict';


import { get as model } from '../../models/user.server.model';
import config from 'config/config';
import nodemailer from 'nodemailer';
import async from 'async';
import crypto from 'crypto';
import * as authentication from '../../config/jwt';



/*
let smtpTransport = nodemailer.createTransport(config.mailer.options);

function forgot(req, res, next) {
  async.waterfall([
    // Generate random token
    function (done) {
      crypto.randomBytes(20, function (err, buffer) {
        var token = buffer.toString('hex');
        done(err, token);
      });
    },
    // Lookup user by email
    function (token, done) {
      if (req.body.email) {
        User.findOne({
          email: req.body.email.toLowerCase()
        }, '-salt -password', function (err, user) {
          if (!user) {
            return res.status(400).send({
              message: 'No account with that email has been found'
            });
          } else if (user.provider !== 'local') {
            return res.status(400).send({
              message: 'It seems like you signed up using your ' + user.provider + ' account'
            });
          } else {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function (err) {
              done(err, token, user);
            });
          }
        });
      } else {
        return res.status(400).send({
          message: 'Email field must not be blank'
        });
      }
    },
    function (token, user, done) {

      var httpTransport = 'http://';
      if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
      }
      res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
        name: user.displayName,
        appName: config.app.title,
        url: httpTransport + req.headers.host + '/api/auth/reset/' + token
      }, function (err, emailHTML) {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    function (emailHTML, user, done) {
      var mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Password Reset',
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
}

function validateResetToken(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (!user) {
      return res.redirect('/password/reset/invalid');
    }

    res.redirect('/password/reset/' + req.params.token);
  });
}


function reset(req, res, next) {
  // Init Variables
  var passwordDetails = req.body;

  async.waterfall([

    function (done) {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }, function (err, user) {
        if (!err && user) {
          if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
            user.password = passwordDetails.newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function (err) {
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                // Remove sensitive data before return authenticated user
                user.password = undefined;
                user.salt = undefined;

                var jwtToken = authentication.signToken(user);
                res.json({ user: user, token: jwtToken });

                done(err, user);
              }
            });
          } else {
            return res.status(400).send({
              message: 'Passwords do not match'
            });
          }
        } else {
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.'
          });
        }
      });
    },
    function (user, done) {
      res.render('modules/users/server/templates/reset-password-confirm-email', {
        name: user.displayName,
        appName: config.app.title
      }, function (err, emailHTML) {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    function (emailHTML, user, done) {
      var mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Your password has been changed',
        html: emailHTML
      };

      smtpTransport.sendMail(mailOptions, function (err) {
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
}
*/
function changePassword(req, res, next) {
  // Init Variables
  let passwordDetails = req.body;
  let message = null;
  let User = model();

  if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
    return res.status(400).send({
      message: 'Passwords do not match'
    });
  };

  User.findById(req.user.id)
    .then(function (user) {
      if (user.authenticate(passwordDetails.currentPassword)) {
        user.password = passwordDetails.newPassword;
        user.save()
          .then(function (user) {
            return res.send({
              message: 'Password changed successfully'
            });
          })
          .catch(function (err) {
            return res.status(400).send(err);
          })
      } else {
        return res.status(400).send({
          message: 'Current password is incorrect'
        });
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

export {
  changePassword
  //forgot,
  //reset,
  //validateResetToken
}
