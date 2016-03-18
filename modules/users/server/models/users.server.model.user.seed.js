'use strict';

import mongoose from 'mongoose';
import chalk from 'chalk';
import config from 'modernMean/config';

let users = {};

function removeUser (user) {
  return new Promise(function (resolve, reject) {
    let User = mongoose.model('User');
    User.find({ email: user.email })
      .remove()
      .then(() => {
        resolve(user);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function saveUser (user) {
  return new Promise(function (resolve, reject) {
    user.save()
      .then(savedUser => {
        resolve(user);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function seedUser() {
  return new Promise((resolve, reject) => {
    let User = mongoose.model('User');
    let user = new User({
      provider: 'local',
      email: 'user@localhost.com',
      firstName: 'User',
      lastName: 'Local',
      displayName: 'User Local',
      roles: ['user']
    });

    User.generateRandomPassphrase()
      .then(password => {
        user.password = password;
        removeUser(user)
          .then(saveUser)
          .then(() => {
            users.user = user.toObject();
            users.user.password = password;
            console.log(chalk.bold.magenta('Users::Model::Seed::User::'), users.user.email + ':' + users.user.password);
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

function seedAdmin() {
  return new Promise((resolve, reject) => {
    let User = mongoose.model('User');
    let user = new User({
      provider: 'local',
      email: 'admin@localhost.com',
      firstName: 'Admin',
      lastName: 'Local',
      displayName: 'Admin Local',
      roles: ['user', 'admin'],
      password: User.generateRandomPassphrase().password
    });

    User.generateRandomPassphrase()
      .then(password => {
        user.password = password;
        removeUser(user)
          .then(saveUser)
          .then(() => {
            users.admin = user.toObject();
            users.admin.password = password;
            console.log(chalk.bold.magenta('Users::Model::Seed::User::'), users.admin.email + ':' + users.admin.password);
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}


function init() {
  return new Promise(function (resolve, reject) {
    console.log(chalk.green('Users::Model::Seed::Start'));
    seedUser()
      .then(seedAdmin)
      .then(() => {
        console.log(chalk.green('Users::Model::Seed::Success'));
        resolve(users);
      })
      .catch((err) => {
        console.log(chalk.bold.red('Users::Model::Seed::Error::' + err));
        reject(err);
      });

  });
}



let service = { init: init, users: users, seedUser: seedUser, seedAdmin: seedAdmin };

export default service;
export { init, users, seedUser, seedAdmin };
