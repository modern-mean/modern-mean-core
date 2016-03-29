'use strict';

import chalk from 'chalk';
import mongoose from 'mongoose';
import globby from 'globby';
import path from 'path';
import config from 'modernMean/config';

mongoose.Promise = global.Promise;

//Database Connection
let db;

function connect() {
  return new Promise((resolve, reject) => {

    if (mongoose.connection.readyState !== 0) {
      //console.log(chalk.cyan.bold('Mongoose::Connect::AlreadyConnected'));
      return resolve(mongoose);
    }

    mongoose.connect(config.db.uri, config.db.options, function (err) {
      if (err) {
        return reject(err);
      }
    });

    mongoose.connection.once('connected', function () {
      console.log(chalk.cyan.bold('Mongoose::Connect::Success'), mongoose.connection.readyState);
      return resolve(mongoose);
    });

  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    console.log(chalk.cyan.bold('Mongoose::Disconnect::Start'));
    if (mongoose.connection.readyState === 0) {
      resolve();
    }

    mongoose.disconnect(function (err) {
      if (err) {
        reject(err);
      }
    });

    mongoose.connection.once('disconnected', function () {
      console.log(chalk.cyan.bold('Mongoose::Disconnect::Success'));
      db = undefined;
      resolve();
    });

  });
}


let service = { connect: connect, disconnect: disconnect };

export default service;
export { connect, disconnect };
