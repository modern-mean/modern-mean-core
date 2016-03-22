'use strict';

import mongoose from 'mongoose';
import chalk from 'chalk';
import config from 'modernMean/config';
import userModel from './users.server.model.user';

let users = {};

function getUser(email, userTemplate) {
  return new Promise((resolve, reject) => {
    let User = userModel.getModels().user;
    User.findOne({ 'providers.email': email, 'providers.type': 'local' })
      .then(user => {
        if (!user) {
          resolve(new User(userTemplate));
        }
        resolve(user);
      });
  });
}

function seedUser() {
  return new Promise((resolve, reject) => {

    let LocalProvider = userModel.getModels().provider;
    let Email = userModel.getModels().email;
    let userEmail = 'user@localhost.com';
    let userTemplate = {
      name: {
        first: 'User',
        last: 'Local'
      },
      roles: ['user']
    };

    let passwordPromise = LocalProvider.generateRandomPassphrase();
    let userPromise = getUser(userEmail, userTemplate);

    Promise.all([passwordPromise, userPromise])
      .then(promises => {
        let user = promises[1];
        let password = promises[0];

        //Set email if its not set
        if (user.emails.length === 0) {
          let email = new userModel.getModels().email({
            email: userEmail,
            primary: true
          });
          user.emails.push(email);
        }

        //Remove Providers
        user.providers = [];
        //Set provider
        let provider = new LocalProvider({
          type: 'local',
          email: userEmail,
          clearpassword: password
        });

        user.providers.push(provider);

        user.save()
          .then(() => {
            users.user = user.toObject();
            users.user.password = password;
            console.log(chalk.bold.magenta('Users::Model::Seed::User::'), user.emails[0].email + ':' + password);
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });

      });
  });
}

function seedAdmin() {
  return new Promise((resolve, reject) => {

    let LocalProvider = userModel.getModels().provider;
    let Email = userModel.getModels().email;
    let adminEmail = 'admin@localhost.com';
    let userTemplate = {
      name: {
        first: 'Admin',
        last: 'Local'
      },
      roles: ['admin']
    };

    let passwordPromise = LocalProvider.generateRandomPassphrase();
    let userPromise = getUser(adminEmail, userTemplate);

    Promise.all([passwordPromise, userPromise])
      .then(promises => {
        let user = promises[1];
        let password = promises[0];

        //Set email if its not set
        if (user.emails.length === 0) {
          let email = new userModel.getModels().email({
            email: adminEmail,
            primary: true
          });
          user.emails.push(email);
        }

        //Remove Providers
        user.providers = [];
        //Set provider
        let provider = new LocalProvider({
          type: 'local',
          email: adminEmail,
          clearpassword: password
        });

        user.providers.push(provider);

        user.save()
          .then(() => {
            users.admin = user.toObject();
            users.admin.password = password;
            console.log(chalk.bold.magenta('Users::Model::Seed::Admin::'), user.emails[0].email + ':' + password);
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });

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
