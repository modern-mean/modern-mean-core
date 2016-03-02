'use strict';

import express from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import compress from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';
import consolidate from 'consolidate';
import path from 'path';
import glob from 'glob';
import config from '../../../../config/config';


function initLocalVariables(app) {
  return new Promise(function (resolve, reject) {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    if (config.secure && config.secure.ssl === true) {
      app.locals.secure = config.secure.ssl;
    }

    app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.livereload = config.livereload;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;
    console.log(chalk.green('Express::Variables::Success'));
    resolve(app);
  });
}

function middleware(app) {
  return new Promise(function (resolve, reject) {
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Should be placed before express.static
    app.use(compress({
      filter: function (req, res) {
        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    app.use(favicon(app.locals.favicon));

    // Environment dependent middleware
    /*
    Don't know what this is
    if (process.env.NODE_ENV === 'development') {
      // Disable views cache
      app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
      app.locals.cache = 'memory';
    }
    */

    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());


    // Passing the request url to environment locals
    app.use(function (req, res, next) {
      res.locals.host = req.protocol + '://' + req.hostname;
      res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
      next();
    });

    console.log(chalk.green('Express::Middleware::Success'));
    resolve(app);
  });
}

  /**
   * Configure view engine
   */
function initViewEngine(app) {
  return new Promise(function (resolve, reject) {
    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
    console.log(chalk.green('Express::Engine::Success'));
    resolve(app);
  });
}





function headers(app) {
  return new Promise(function (resolve, reject) {
    // Use helmet to secure Express headers
    let SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.use(helmet.hsts({
      maxAge: SIX_MONTHS,
      includeSubdomains: true,
      force: true
    }));
    app.disable('x-powered-by');
    console.log(chalk.green('Express::Headers::Success'));
    resolve(app);
  });
}

function modules(app) {
  return new Promise(function (resolve, reject) {
    var promises = [];
    glob('./build/!(*core)/server/*.module.js')
      .on('match', function (file) {
        console.log(chalk.yellow('Express::Module::Found::' + file));
        //TODO This needs to change to System.import when its available
        let mod = require(path.resolve(file)).default(app);
        promises.push(mod);
      })
      .on('end', function (files) {
        Promise.all(promises)
          .then(function () {
            console.log(chalk.green('Express::Modules::Success'));
            resolve(app);
          })
          .catch(function (err) {
            console.log(chalk.bold.red('Express::Modules::Err' + err));
            reject(err);
          });

      })
      .on('error', function (err) {
        reject(err);
      });
  });
}

function core(app) {
  return new Promise(function (resolve, reject) {
    //TODO  Change to System.import when its available
    require(path.resolve('./build/core/server/core.module.js')).default(app)
      .then(function (app) {
        console.log(chalk.green('Express::Core::Success'));
        resolve(app);
      });
  });
}



function listen(app) {
  return new Promise(function (resolve, reject) {
    app.listen(config.port, config.host, function () {
      let server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.app.version));
      console.log('--');
      resolve(app);
    });
  });
}



function init() {
  return new Promise(function (resolve, reject) {
    let app = express();
    console.log(chalk.green('Express::Init::Success'));
    resolve(app);
  });
}

export {
  core,
  initViewEngine as engine,
  headers,
  init,
  listen,
  middleware,
  modules,
  initLocalVariables as variables
};
