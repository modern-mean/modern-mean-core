'use strict';

import mongoose from 'mongoose';
import passport from 'passport';
import lodash from 'lodash';
import authentication from '../../authentication/jwtToken';
import userModel from '../../models/users.server.model.user';

// URLs for which user can't be redirected on signin
let noReturnUrls = [
  '/authentication/signin',
  '/authentication/signup'
];


function signup(req, res) {
  let user = req.model;
  let models = userModel.getModels();
  let provider = new models.provider();
  let email = new models.email();

  user.name = req.body.name;

  email.email = req.body.email;
  email.primary = true;

  provider.type = 'local';
  provider.email = req.body.email;
  provider.clearpassword = req.body.password;

  user.providers.push(provider);
  user.emails.push(email);

  return user.save()
    .then(user => {

      return authentication
        .signToken(user)
        .then(function (token) {
          return res.json({ user: user, token: token });
        });
    })
    .catch(err => {
      return res.status(400).json(err.message);
    });
}

function signin(req, res) {
  return authentication
    .signToken(req.user)
    .then(token => {
      return res.json({ user: req.user, token: token });
    })
    .catch(err => {
      return res.status(400).json(err.message);
    });
}


/*
function oauthCall(strategy, scope) {
  return function (req, res, next) {
    // Set redirection path on session.
    // Do not redirect to a signin or signup page
    if (noReturnUrls.indexOf(req.query.redirect_to) === -1) {
      req.session.redirect_to = req.query.redirect_to;
    }
    // Authenticate
    passport.authenticate(strategy, scope)(req, res, next);
  };
}

function oauthCallback(strategy) {
  return function (req, res, next) {
    // Pop redirect URL from session
    var sessionRedirectURL = req.session.redirect_to;
    delete req.session.redirect_to;

    passport.authenticate(strategy, function (err, user, redirectURL) {
      if (err) {
        return res.redirect('/authentication/signin?err=' + encodeURIComponent(errorHandler.getErrorMessage(err)));
      }
      if (!user) {
        return res.redirect('/authentication/signin');
      }

      var jwtToken = authentication.signToken(user);
      return res.redirect((redirectURL || sessionRedirectURL || '/') + '?token=' + jwtToken);

    })(req, res, next);
  };
}


function saveOAuthUserProfile(req, providerUserProfile, done) {
  if (!req.user) {
    // Define a search query fields
    var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
    var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

    // Define main provider search query
    var mainProviderSearchQuery = {};
    mainProviderSearchQuery.provider = providerUserProfile.provider;
    mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define additional provider search query
    var additionalProviderSearchQuery = {};
    additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define a search query to find existing user with current provider profile
    var searchQuery = {
      $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
    };

    User.findOne(searchQuery, function (err, user) {
      if (err) {
        return done(err);
      } else {
        if (!user) {
          var possibleEmail = ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

          User.findUniqueEmail(possibleEmail, null, function (availableEmail) {
            user = new User({
              firstName: providerUserProfile.firstName,
              lastName: providerUserProfile.lastName,
              displayName: providerUserProfile.displayName,
              email: providerUserProfile.email,
              profileImageURL: providerUserProfile.profileImageURL,
              provider: providerUserProfile.provider,
              providerData: providerUserProfile.providerData
            });

            // And save the user
            user.save(function (err) {
              return done(err, user);
            });
          });
        } else {
          return done(err, user);
        }
      }
    });
  } else {
    // User is already logged in, join the provider data to the existing user
    var user = req.user;

    // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
    if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
      // Add the provider data to the additional provider data field
      if (!user.additionalProvidersData) {
        user.additionalProvidersData = {};
      }

      user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

      // Then tell mongoose that we've updated the additionalProvidersData field
      user.markModified('additionalProvidersData');

      // And save the user
      user.save(function (err) {
        return done(err, user, '/settings/accounts');
      });
    } else {
      return done(new Error('User is already connected using this provider'), user);
    }
  }
}

function removeOAuthProvider(req, res, next) {
  var user = req.user;
  var provider = req.query.provider;

  if (!user) {
    return res.status(401).json({
      message: 'User is not authenticated'
    });
  } else if (!provider) {
    return res.status(400).send();
  }

  // Delete the additional provider
  if (user.additionalProvidersData[provider]) {
    delete user.additionalProvidersData[provider];

    // Then tell mongoose that we've updated the additionalProvidersData field
    user.markModified('additionalProvidersData');
  }

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(user);
    }
  });
}
*/

let controller = { signin: signin, signup: signup };

export default controller;
export {
  //oauthCall: oauthCall,
  //oauthCallback: oauthCallback,
  //removeOAuthProvider: removeOAuthProvider,
  //saveOAuthUserProfile: saveOAuthUserProfile,
  signin,
  signup
};
