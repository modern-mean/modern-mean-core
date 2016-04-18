'use strict';

import lodash from 'lodash';
import mainBowerFiles from 'main-bower-files';

let config = {
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
  logs: {
    //https://github.com/expressjs/morgan
    morgan: {
      format: 'short',
      options: {

      }
    },
    //https://github.com/winstonjs/winston
    winston: {
      level:  process.env.WINSTON_LEVEL || 'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
      file: process.env.WINSTON_FILE || './logs/winston.log'
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
  },
  build: {
    client: {
      uglify: process.env.MEAN_UGLIFY || false,
      stripDebug: process.env.MEAN_STRIPDEBUG || false
    },
    server: {
      stripDebug: process.env.MEAN_STRIPDEBUG || false
    }
  }
};

export default config;
