'use strict';

import http from 'http';
import https from 'https';
import express from 'express';
import chalk from 'chalk';
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

//Store Express server
let httpServer,
  httpsServer;

function variables(app) {
  return new Promise(function (resolve, reject) {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;
    console.log(chalk.green('Express::Variables::Success'));
    resolve(app);
  });
}

function middleware(app) {
  return new Promise(function (resolve, reject) {

    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('combined'));
      app.use(livereload());
    }

    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    console.log(chalk.green('Express::Middleware::Success'));
    resolve(app);
  });
}

  /**
   * Configure view engine
   */
function engine(app) {
  return new Promise(function (resolve, reject) {
    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.express.engine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
    console.log(chalk.green('Express::Engine::Success'));
    resolve(app);
  });
}

function headers(app) {
  return new Promise(function (resolve, reject) {
    app.use(helmet());
    console.log(chalk.green('Express::Headers::Success'));
    resolve(app);
  });
}

function modules(app) {
  return new Promise(function (resolve, reject) {
    console.log(chalk.green('Express::Modules::Start'), config.files.modules.custom);
    let promises = [];
    globby(config.files.modules.custom)
      .then(files => {
        files.forEach(file => {
          console.log(chalk.yellow('Express::Module::Match::' + file));
          let promise = require(path.resolve(file)).default.init(app);
          promises.push(promise);
        });

        Promise.all(promises)
          .then(function () {
            console.log(chalk.green('Express::Modules::Success'));
            resolve(app);
          })
          .catch(function (err) {
            console.log(chalk.bold.red('Express::Modules::Err' + err));
            reject(err);
          });
      });

  });
}

function core(app) {
  return new Promise(function (resolve, reject) {
    //TODO  Change to System.import when its available
    require(path.resolve(config.files.modules.core)).default.init(app)
      .then(function () {
        console.log(chalk.green('Express::Core::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Express::Core::Error::' + err));
        reject(err);
      });
  });
}

function listen(app) {

  console.log('--');
  console.log(chalk.green(config.app.title));
  console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
  console.log(chalk.green('App version:     ' + config.app.version));
  console.log(chalk.green('Database:        ' + config.db.uri));

  let httpServerPromise = new Promise(function (resolve, reject) {
    try {
      httpServer = http.createServer(app).listen(config.express.http.port, config.express.host, () => {
        console.log(chalk.green('HTTP Server:          http://' + config.express.host + ':' + config.express.http.port));
        if(process.env.NODE_ENV !== 'production') {
          enableDestroy(httpServer);
        }
        resolve(app);
      });
    } catch (err) {
      reject(err);
    }
  });

  let httpsOptions = {
    key: fs.readFileSync(config.express.https.options.key),
    cert: fs.readFileSync(config.express.https.options.cert)
  };

  let httpsServerPromise = new Promise(function (resolve, reject) {
    try {
      httpsServer = https.createServer(httpsOptions, app).listen(config.express.https.port, config.express.host, () => {
        console.log(chalk.green('HTTPS Server:          https://' + config.express.host + ':' + config.express.https.port));
        if(process.env.NODE_ENV !== 'production') {
          enableDestroy(httpsServer);
        }
        resolve(app);
      });
    } catch (err) {
      reject(err);
    }
  });

  return Promise.all([httpServerPromise, httpsServerPromise])
          .then(promises => {
            console.log('--');
            return app;
          });
}

function init() {
  return new Promise(function (resolve, reject) {
    let app = express();
    console.log(chalk.green('Express::Init::Success'));
    resolve(app);
  });
}

function destroy() {
  let httpServerPromise = new Promise(function (resolve, reject) {
    if (!httpServer) {
      resolve();
    }

    httpServer.destroy(function () {
      httpServer = undefined;
      resolve();
    });
  });

  let httpsServerPromise = new Promise(function (resolve, reject) {
    if (!httpsServer) {
      resolve();
    }

    httpsServer.destroy(function () {
      httpsServer = undefined;
      resolve();
    });
  });

  return Promise.all([httpServerPromise, httpsServerPromise])
          .then(() => {
            console.log(chalk.green('Express::Destroy::Success'));
          });
}

function getHttpServer() {
  return httpServer;
}

function getHttpsServer() {
  return httpsServer;
}

let service = { core: core, engine: engine, headers: headers, init: init, listen: listen, middleware: middleware, modules: modules, variables: variables, destroy: destroy, httpServer: getHttpServer, httpsServer: getHttpsServer };
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
  destroy
};
