'use strict';

let test = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/modern-mean-test',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  express: {
    host: process.env.MEAN_HOST || '0.0.0.0',
    http: {
      port: process.env.MEAN_HTTP_PORT || 8081,
    },
    https: {
      enable: false,
      port: process.env.MEAN_HTTPS_PORT || 8082,
      options: { //Anything from https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
        key: process.env.MEAN_HTTPS_KEY || './ssl/key.pem',
        cert: process.env.MEAN_HTTPS_CERT || './ssl/cert.pem'
      }
    }
  },
  logs: {
    //https://github.com/expressjs/morgan
    morgan: {
      format: 'dev',
      options: {
        skip: () => { return true; }
      }
    },
    //https://github.com/winstonjs/winston
    winston: {
      level:  process.env.WINSTON_LEVEL || -1, //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
      file: false
    }
  },
  app: {
    title: ' - Test Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  files: {
    test: {
      lint: {
        eslint: ['./modules/**/*.js', './config/**/*.js']
      },
      client: {
        tests: ['./modules/*/tests/client/**/*.spec.js'],
        coverage: ['modules/core/client/app/core.client.app.loader.js', 'modules/*/client/**/*.module.js', './modules/*/client/**/!(*module).js']
      },
      server: {
        tests: ['./modules/*/tests/server/**/*.spec.js'],
        coverage: ['./modules/*/server/**/*.js']
      }
    },
    serve: {
      modules: {
        custom: ['./modules/!(*core)/server/*.module.js'],
        core: './modules/core/server/core.module.js'
      }
    }
  }
};

export default test;
