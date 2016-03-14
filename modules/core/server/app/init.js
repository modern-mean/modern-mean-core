'use strict';

import chalk from 'chalk';
import mongoose from './mongoose';
import express from './express';
import config from 'modernMean/config';

function start() {
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

  let server = new Promise(function (resolve, reject) {

    express.init()
      .then(function (app) {
        return Promise.all([express.modules(app), express.variables(app), express.middleware(app), express.engine(app), express.headers(app)])
                .then(function () {
                  return app;
                });
      })
      .then(express.core)
      .then(express.listen)
      .then(function (app) {
        console.log(chalk.bold.cyan('Express::Done::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Express::Done::Error' + err));
        reject(err);
      });
  });

  return Promise.all([db, server]);
}

function stop() {
  return new Promise(function (resolve, reject) {
    Promise.all([express.destroy(), mongoose.disconnect()])
      .then(function () {
        console.log(chalk.bold.cyan('Express::Stop::Success'));
        resolve();
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Express::Stop::Error' + err));
        reject();
      });
  });
}

let service = { start: start, stop: stop };
export default service;

export { start, stop };
