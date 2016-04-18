'use strict';

import http from 'http';
import https from 'https';
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import consolidate from 'consolidate';
import path from 'path';
import globby from 'globby';
import config from 'modernMean/config';
import enableDestroy from 'server-destroy';
import morgan from 'morgan';
import livereload from 'connect-livereload';
import fs from 'fs';
import forceSSL from 'express-force-ssl';

//Store Express server
let httpServer,
  httpsServer,
  expressApp;

function variables(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Variables::Start');
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;
    winston.verbose('Express::Variables::Success');
    return resolve(app);
  });
}

function middleware(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Middleware::Start');
    app.use(morgan(config.logs.morgan.format, config.logs.morgan.options));

    if (process.env.NODE_ENV === 'development') {
      app.use(livereload());
    }

    app.use(bodyParser.urlencoded({
      extended: true
    }));

    app.use(bodyParser.json());

    if (config.express.https.enable) {
      app.set('forceSSLOptions', {
        httpsPort: config.express.https.port
      });

      app.use(forceSSL);
    }

    winston.verbose('Express::Middleware::Success');
    return resolve(app);
  });
}

  /**
   * Configure view engine
   */
function engine(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Engine::Start');
    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.express.engine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
    winston.verbose('Express::Engine::Success');
    return resolve(app);
  });
}

function headers(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Headers::Start');
    app.use(helmet());
    winston.verbose('Express::Headers::Success');
    return resolve(app);
  });
}

function modules(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Modules::Start');
    let promises = [];
    globby(config.files.serve.modules.custom)
      .then(files => {
        files.forEach(file => {
          winston.debug('Express::Module::Match::' + file);
          let promise = require(path.resolve(file)).default.init(app);
          promises.push(promise);
        });

        Promise.all(promises)
          .then(function () {
            winston.verbose('Express::Modules::Success');
            resolve(app);
          })
          .catch(function (err) {
            winston.error(err);
            reject(err);
          });
      });

  });
}

function core(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Core::Start');
    //TODO  Change to System.import when its available
    require(path.resolve(config.files.serve.modules.core)).default.init(app)
      .then(function () {
        winston.verbose('Express::Core::Success');
        return resolve(app);
      })
      .catch(function (err) {
        winston.error(err);
        return reject(err);
      });
  });
}

function listen(app) {
  winston.debug('Express::Listen::Start');
  let httpServerPromise = new Promise(function (resolve, reject) {

    httpServer.listen(config.express.http.port, config.express.host, () => {
      /* istanbul ignore else: cant test this since production server cant be destroyed  */
      if(process.env.NODE_ENV !== 'production') {
        enableDestroy(httpServer);
      }
      resolve(app);
    });

  });

  let httpsServerPromise = new Promise(function (resolve, reject) {
    if (!config.express.https.enable) {
      return resolve();
    }

    httpsServer.listen(config.express.https.port, config.express.host, () => {
      /* istanbul ignore else: cant test this since production server cant be destroyed  */
      if(process.env.NODE_ENV !== 'production') {
        enableDestroy(httpsServer);
      }
      resolve(app);
    });

  });

  return Promise.all([httpServerPromise, httpsServerPromise])
          .then(promises => {
            winston.info('--');
            winston.info(config.app.title);
            winston.info('Environment:     ' + process.env.NODE_ENV);
            winston.info('App version:     ' + config.app.version);
            winston.info('Database:        ' + config.db.uri);
            winston.info('HTTP Server:     http://' + httpServer.address().address + ':' + httpServer.address().port);
            if (config.express.https.enable) {
              winston.info('HTTPS Server:    https://' + httpsServer.address().address + ':' + httpsServer.address().port);
            }
            winston.info('--');
            return app;
          });
}

function init() {
  return new Promise(function (resolve, reject) {
    winston.debug('Express::Init::Start');
    if (expressApp !== undefined || httpsServer !== undefined || httpServer !== undefined) {
      return reject('Express::Init::Error::Server is still running.');
    }
    expressApp = express();
    httpServer = http.createServer(expressApp);
    if (config.express.https.enable) {
      let httpsOptions = {
        key: fs.readFileSync(config.express.https.options.key),
        cert: fs.readFileSync(config.express.https.options.cert)
      };
      httpsServer = https.createServer(httpsOptions, expressApp);
    }
    winston.verbose('Express::Init::Success');
    return resolve(expressApp);
  });
}

function destroy() {
  expressApp = undefined;
  let httpServerPromise = new Promise(function (resolve, reject) {
    if (!httpServer || !httpServer.listening) {
      httpServer = undefined;
      return resolve();
    }

    httpServer.destroy(function () {
      httpServer = undefined;
      resolve();
    });
  });

  let httpsServerPromise = new Promise(function (resolve, reject) {
    if (!httpsServer || !httpsServer.listening) {
      httpsServer = undefined;
      return resolve();
    }

    httpsServer.destroy(function () {
      httpsServer = undefined;
      return resolve();
    });
  });

  return Promise.all([httpServerPromise, httpsServerPromise])
          .then(() => {
            winston.info('Express::Destroy::Success');
          });
}

function getHttpServer() {
  return httpServer;
}

function getHttpsServer() {
  return httpsServer;
}

function getExpressApp() {
  return expressApp;
}

let service = { core: core, engine: engine, headers: headers, init: init, listen: listen, middleware: middleware, modules: modules, variables: variables, destroy: destroy, httpServer: getHttpServer, httpsServer: getHttpsServer, expressApp: getExpressApp };
export default service;

export {
  core,
  engine,
  headers,
  init,
  listen,
  middleware,
  modules,
  variables,
  getHttpServer as httpServer,
  getHttpsServer as httpsServer,
  getExpressApp as expressApp,
  destroy
};
