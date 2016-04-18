'use strict';

import winston from 'winston';
import mongooseModule from './mongoose';
import express from './express';
import config from 'modernMean/config';

function start() {
  /*
  let db = new Promise(function (resolve, reject) {

    mongoose
      .connect()
      .then(mongoose.setPromise)
      .then(function (db) {
        console.log(chalk.bold.cyan('Mongoose::Done::Successaa'));
        resolve(db);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Mongoose::Done::Error'));
        console.log(chalk.bold.red(err));
        reject();
      });
  });
  */

  let server = new Promise(function (resolve, reject) {

    express.init()
      .then(function (app) {
        return Promise.all([mongooseModule.connect(), express.variables(app), express.middleware(app), express.engine(app), express.headers(app)])
                .then(function () {

                  return app;
                });
      })
      .then(express.modules)
      .then(express.core)
      .then(express.listen)
      .then(function (app) {
        winston.verbose('Express::Done::Success');
        resolve(app);
      })
      .catch(function (err) {
        winston.error(err);
        reject(err);
      });
  });

  return server;
}

function stop() {
  return new Promise(function (resolve, reject) {
    Promise.all([express.destroy(), mongooseModule.disconnect()])
      .then(function () {
        winston.verbose('MEAN::Stop::Success');
        resolve();
      })
      .catch(function (err) {
        winston.error(err);
        reject(err);
      });
  });
}

let service = { start: start, stop: stop };
export default service;

export { start, stop };
