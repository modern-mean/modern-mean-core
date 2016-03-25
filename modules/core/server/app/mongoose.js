'use strict';

import chalk from 'chalk';
import mongoose from 'mongoose';
import globby from 'globby';
import path from 'path';
import config from 'modernMean/config';


//Database Connection
let db;

function connect() {
  return new Promise(function (resolve, reject) {
    db = mongoose.connect(config.db.uri, config.db.options, function (err) {
      if (err) {
        reject(err);
      }
    });

    mongoose.connection.once('connected', function () {
      console.log(chalk.cyan.bold('Mongoose Connected'));
      resolve(db);
    });
  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    if (mongoose.connection.readyState === 0) {
      resolve();
    }
    mongoose.disconnect(function (err) {
      if (err) {
        reject(err);
      }
    });
    mongoose.connection.once('disconnected', function () {
      console.log(chalk.cyan.bold('Mongoose Disconnected'));
      resolve(db);
    });
  });
}

function setPromise() {
  return new Promise(function (resolve, reject) {
    mongoose.Promise = global.Promise;
    resolve();
  });
};


let service = { connect: connect, disconnect: disconnect, setPromise: setPromise };

export default service;
export { connect, disconnect, setPromise };
