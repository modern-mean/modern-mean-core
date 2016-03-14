'use strict';

import lodash from 'lodash';
import development from './env/development';
import test from './env/test';
import production from './env/production';


let config;
let defaultConfig = {
  app: {
    title: 'MODERN-MEAN',
    description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'mongodb, express, angularjs, node.js, mongoose, passport',
    version: '0.0.2',
    logo: '/dist/img/core/client/img/brand/logo.png',
    favicon: '/dist/img/core/client/img/brand/favicon.ico',
  },
  express: {
    engine: 'swig',
    host: process.env.MEAN_HOST || '0.0.0.0',
    http: {
      port: process.env.MEAN_HTTP_PORT || 8080,
    },
    https: {
      port: process.env.MEAN_HTTPS_PORT || 8443,
      options: {
        key: process.env.MEAN_HTTPS_KEY || './ssl/key.pem',
        cert: process.env.MEAN_HTTPS_CERT || './ssl/cert.pem'
      }
    }
  },
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
  },
  files: {
    modules: {
      custom: ['./build/!(*core)/server/*.module.js'],
      core: './build/core/server/core.module.js'
    },
    server: {
      tests: ['./modules/*/tests/server/**/*.spec.js'],
      application: ['./modules/*/server/**/*.js']
    }
  }
};

switch(process.env.NODE_ENV) {
  case 'development':
    config = lodash.merge(defaultConfig, development);
    break;
  case 'test':
    config = lodash.merge(defaultConfig, test);
    break;
  case 'production':
    config = lodash.merge(defaultConfig, production);
    break;
  default:
    config = defaultConfig;
    break;
}

export default config;
