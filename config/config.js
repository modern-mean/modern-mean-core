"use strict";
let lodash = require('lodash');

let config;
let defaultConfig = {
  app: {
    title: 'MODERN-MEAN',
    description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'mongodb, express, angularjs, node.js, mongoose, passport',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID',
    version: '0.0.2'
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  templateEngine: 'swig',
  logo: './public/dist/img/core/client/img/brand/logo.png',
  favicon: './public/dist/img/core/client/img/brand/favicon.ico',
  uploads: {
    profileUpload: {
      dest: './public/img/profile/uploads/', // Profile upload destination path
      limits: {
        fileSize: 1*1024*1024 // Max file size in bytes (1 MB)
      }
    }
  },
  jwt: {
    secret: process.env.TOKEN_AUTH_SECRET || 'MODERN!MEAN!t0p$3cr37!t0k3n',
    options: {  //Anything From https://www.npmjs.com/package/jsonwebtoken
      expiresIn: process.env.TOKEN_EXPIRES || '1d'
    }
  }
};

switch(process.env.NODE_ENV) {
  case 'development':
    config = lodash.merge(defaultConfig, require('./env/development'));
    break;
  case 'test':
    config = lodash.merge(defaultConfig, require('./env/test'));
    break;
  case 'production':
    config = lodash.merge(defaultConfig, require('./env/production'));
    break;
  default:
    config = defaultConfig;
    break;
}

module.exports = config;
