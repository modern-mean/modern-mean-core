'use strict';

import lodash from 'lodash';
import development from './env/development';
import test from './env/test';
import production from './env/production';
import mainBowerFiles from 'main-bower-files';


let config;
let defaultConfig = {
  app: {
    title: 'MODERN-MEAN',
    description: 'Full-Stacka JavaScript with MongoDB, Express, AngularJS, and Node.js',
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
      enable: false, //Enabling SSL makes the entire site forced over SSL.
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
    build: {
      client: {
        application: ['./modules/core/client/app/core.client.app.loader.js', './modules/*/client/**/*.{js,css}'],
        images: ['./modules/*/client/**/*.{jpg,png,gif,ico}'],
        templates: ['./modules/*/client/**/*.html'],
        vendor: lodash.union(mainBowerFiles())
      },
      server: {
        application: ['./modules/*/server/**/*.{js,html}', './confi*/**/*.js']
      }
    },
    serve: {
      modules: {
        custom: ['./build/!(*core)/server/*.module.js'],
        core: './build/core/server/core.module.js'
      }
    },
    config: ['./config/**/*.js']
  }
};


function mergeEnvironment() {
  switch(process.env.NODE_ENV) {
    case 'development':
      config = lodash.merge(defaultConfig, development);
      return config;
      break;
    case 'test':
      config = lodash.merge(defaultConfig, test);
      return config;
      break;
    case 'production':
      config = lodash.merge(defaultConfig, production);
      return config;
      break;
    default:
      config = defaultConfig;
      return config;
      break;
  }
}

mergeEnvironment();

export default config;
export { mergeEnvironment, config };
