'use strict';

import chalk from 'chalk';
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';
import config from 'config/config';


function loadModels() {
  return new Promise(function (resolve, reject) {
    glob('./build/*/server/models/*.js')
      .on('match', function (file) {
        require(path.resolve(file));
      })
      .on('end', function (files) {
        console.log(chalk.green('Mongoose::LoadModels::Success'));
        resolve(files);
      })
      .on('error', function (err) {
        reject(err);
      });
  });
}


function connect() {
  return new Promise(function (resolve, reject) {
    mongoose.connect(config.db.uri, config.db.options, function (err) {
      if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        reject(err);
      } else {
        // Enabling mongoose debug mode if required
        mongoose.set('debug', config.db.debug);
        console.log(chalk.green('Mongoose::Connect::Success'));
        resolve();
      }
    });
  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    mongoose.disconnect(function (err) {
      if (err) {
        reject(err);
      }
      console.log(chalk.green('Mongoose::Disconnect::Success'));
      resolve();
    });
  });

}

function seedDB() {
  return new Promise(function (resolve, reject) {
    if (config.seedDB) {
      console.log(chalk.cyan('Mongoose::Seed::Start'));
      glob('./build/*/server/config/seed.js')
        .on('match', function (file) {
          require(path.resolve(file))();
        })
        .on('end', function (files) {
          console.log(chalk.cyan('Mongoose::Seed::Success'));
          resolve(files);
        })
        .on('error', function (err) {
          reject(err);
        });
    } else {
      resolve();
    }
  });
}

let service = {
  connect: connect,
  disconnect: disconnect,
  loadModels: loadModels,
  seed: seedDB
};


module.exports = service;
