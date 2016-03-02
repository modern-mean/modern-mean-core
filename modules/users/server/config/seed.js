'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import chalk from 'chalk';
import crypto from 'crypto';
import config from 'modernMean/config';


// global seed options object
var seedOptions = {
  seedUser: {
    provider: 'local',
    email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
    firstName: 'User',
    lastName: 'Local',
    displayName: 'User Local',
    roles: ['user']
  },
  seedAdmin: {
    provider: 'local',
    email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
    firstName: 'Admin',
    lastName: 'Local',
    displayName: 'Admin Local',
    roles: ['user', 'admin']
  }
};

function removeUser (user) {
  return new Promise(function (resolve, reject) {
    var User = mongoose.model('User');
    User.find({ email: user.email }).remove(function (err) {
      if (err) {
        reject(new Error('Failed to remove local ' + user.email));
      }
      resolve();
    });
  });
}

function saveUser (user) {
  return function() {
    return new Promise(function (resolve, reject) {
      // Then save the user
      user.save(function (err, theuser) {
        if (err) {
          reject(new Error('Failed to add localaaa ' + user.email));
        } else {
          resolve(theuser);
        }
      });
    });
  };
}

function reportSuccess (password) {
  return function (user) {
    return new Promise(function (resolve, reject) {
      console.log(chalk.bold.red('Database Seeding:\t\t\tLocal ' + user.email + ' added with password set to ' + password));
      resolve();
    });
  };
}

// save the specified user with the password provided from the resolved promise
function seedTheUser (user) {
  return function (password) {
    return new Promise(function (resolve, reject) {

      var User = mongoose.model('User');
      // set the new password
      user.password = password;

      removeUser(user)
        .then(saveUser(user))
        .then(reportSuccess(password))
        .then(function () {
          resolve();
        })
        .catch(function (err) {
          reject(err);
        });

    });
  };
}

function reportError (reject) {
  return function (err) {
    console.log();
    console.log('Database Seeding:\t\t\t' + err);
    console.log();
    reject(err);
  };
}

function start() {
  return new Promise(function (resolve, reject) {
    var User = mongoose.model('User');
    var adminAccount = new User(seedOptions.seedAdmin);
    var userAccount = new User(seedOptions.seedUser);

    User.generateRandomPassphrase()
      .then(seedTheUser(userAccount))
      .then(User.generateRandomPassphrase)
      .then(seedTheUser(adminAccount))
      .then(function () {
        resolve();
      })
      .catch(reportError(reject));
  });
}

export default start;
