'use strict';

import mongoose from 'mongoose';
import globby from 'globby';
import path from 'path';
import winston from 'winston';
import config from 'modernMean/config';

mongoose.Promise = global.Promise;

//Database Connection
let db;

function connect() {
  return new Promise((resolve, reject) => {

    if (mongoose.connection.readyState !== 0) {
      winston.info('Mongoose::Connect::Already Connected');
      return resolve(mongoose);
    }

    mongoose.connect(config.db.uri, config.db.options, function (err) {
      if (err) {
        return reject(err);
      }
    });

    mongoose.connection.once('connected', function () {
      winston.info('Mongoose::Connect::Success');
      return resolve(mongoose);
    });

  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    winston.debug('Mongoose::Disconnect::Start');
    if (mongoose.connection.readyState === 0) {
      winston.info('Mongoose::Disconnect::Not Connected');
      return resolve();
    }

    mongoose.disconnect(function (err) {
      if (err) {
        return reject(err);
      }
    });

    mongoose.connection.once('disconnected', function () {
      winston.info('Mongoose::Disconnect::Success');
      db = undefined;
      return resolve();
    });

  });
}


let service = { connect: connect, disconnect: disconnect };

export default service;
export { connect, disconnect };
