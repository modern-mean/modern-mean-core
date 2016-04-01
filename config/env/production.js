'use strict';

let production = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/modern-mean',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
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
  build: {
    client: {
      uglify: process.env.MEAN_UGLIFY || true,
      stripDebug: process.env.MEAN_STRIPDEBUG || true
    },
    server: {
      stripDebug: process.env.MEAN_STRIPDEBUG || true
    }
  },
  serve: {
    forever: {
      logFile: process.cwd() + '/logs/logFile.log',
      outFile: process.cwd() + '/logs/outFile.log',
      errFile: process.cwd() + '/logs/errFile.log',
      silent: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};

export default production;
