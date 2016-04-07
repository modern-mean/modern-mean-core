'use strict';

import chalk from 'chalk';
import config from 'modernMean/config';
import userModel from './users.server.model.user';
import aclModule from '../config/acl.js';

let users = {};

let userTemplate = {
  email: 'user@localhost.com',
  name: {
    first: 'User',
    last: 'Local'
  }
};

let adminTemplate = {
  email: 'admin@localhost.com',
  name: {
    first: 'User',
    last: 'Admin'
  }
};



function removeUser() {
  let User = userModel.getModels().user;
  users.user = undefined;
  return User.remove({ 'providers.email': userTemplate.email });
}

function removeAdmin() {
  let User = userModel.getModels().user;
  users.admin = undefined;
  return User.remove({ 'providers.email': adminTemplate.email });
}


function getUser(template) {
  return new Promise((resolve, reject) => {
    let User = userModel.getModels().user;

    User.findOne({ 'providers.email': template.email, 'providers.type': 'local' })
      .then(user => {
        if (!user) {
          resolve(new User(template));
        }
        resolve(user);
      });
  });
}

function seedUser() {
  return new Promise((resolve, reject) => {

    let LocalProvider = userModel.getModels().provider;
    let Email = userModel.getModels().email;

    let passwordPromise = LocalProvider.generateRandomPassphrase();
    let userPromise = getUser(userTemplate);

    Promise.all([passwordPromise, userPromise])
      .then(promises => {
        let user = promises[1];
        let password = promises[0];

        //Set email if its not set
        if (user.emails.length === 0) {
          let email = new userModel.getModels().email({
            email: userTemplate.email,
            primary: true
          });
          user.emails.push(email);
        }

        //Set address if its not set
        if (user.addresses.length === 0) {
          let address = new userModel.getModels().address({
            addressType: 'Shipping',
            streetAddress: '123 Bedrock',
            locality: 'Hollywood',
            region: 'CA',
            postalCode: '90210',
            country: 'US'
          });
          user.addresses.push(address);
        }

        //Remove Providers
        user.providers = [];
        //Set provider
        let provider = new LocalProvider({
          type: 'local',
          email: userTemplate.email,
          clearpassword: password
        });

        user.providers.push(provider);
        user.save()
          .then(() => {

            aclModule.getAcl().addUserRoles(user._id.toString(), 'user');
            users.user = user.toObject();
            users.user.password = password;
            console.log(chalk.bold.magenta('Users::Model::Seed::User::'), user.emails[0].email + ':' + password);
            resolve(user);
          });
          /*
          Commented out till i figure out how to mock it.
          .catch(err => {
            console.log(chalk.bold.red('Users::Model::Seed::User::Error::' + err));
            reject(err);
          });
          */


      });
  });
}

function seedAdmin() {
  return new Promise((resolve, reject) => {

    let LocalProvider = userModel.getModels().provider;
    let Email = userModel.getModels().email;

    let passwordPromise = LocalProvider.generateRandomPassphrase();
    let userPromise = getUser(adminTemplate);

    Promise.all([passwordPromise, userPromise])
      .then(promises => {
        let user = promises[1];
        let password = promises[0];

        //Set email if its not set
        if (user.emails.length === 0) {
          let email = new userModel.getModels().email({
            email: adminTemplate.email,
            primary: true
          });
          user.emails.push(email);
        }

        //Remove Providers
        user.providers = [];
        //Set provider
        let provider = new LocalProvider({
          type: 'local',
          email: adminTemplate.email,
          clearpassword: password
        });

        user.providers.push(provider);

        user.save()
          .then(() => {
            aclModule.getAcl().addUserRoles(user._id.toString(), ['admin']);
            users.admin = user.toObject();
            users.admin.password = password;
            console.log(chalk.bold.magenta('Users::Model::Seed::Admin::'), user.emails[0].email + ':' + password);
            resolve(user);
          });
          /*
          Commented out till i figure out how to mock it.
          .catch(err => {
            console.log(chalk.bold.red('Users::Model::Seed::Admin::Error::' + err));
            reject(err);
          });
          */

      });
  });
}

function init() {
  return new Promise(function (resolve, reject) {

    if (users.admin !== undefined && users.user !== undefined) {
      return resolve(users);
    }

    console.log(chalk.green('Users::Model::Seed::Start'));
    seedUser()
      .then(seedAdmin)
      .then(() => {
        console.log(chalk.green('Users::Model::Seed::Success'));
        resolve(users);
      });
      /*
      Commented out till i figure out how to mock it.
      .catch((err) => {
        console.log(chalk.bold.red('Users::Model::Seed::Error::' + err));
        reject(err);
      });
      */

  });
}

function getUsers() {
  return users;
}



let service = { init: init, getUsers: getUsers, seedUser: seedUser, seedAdmin: seedAdmin, removeUser: removeUser, removeAdmin: removeAdmin };

export default service;
export { init, getUsers, seedUser, seedAdmin, removeUser, removeAdmin };
