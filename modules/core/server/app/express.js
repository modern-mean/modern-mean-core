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
import config from 'config/config';


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



  /**
   * Invoke modules server configuration
   */
function initModulesConfiguration(app) {
  return new Promise(function (resolve, reject) {
    glob('./build/*/server/config/express.js')
      .on('match', function (file) {
        require(path.resolve(file))(app);
      })
      .on('end', function (files) {
        console.log(chalk.green('Express::ModuleConfig::Success'));
        resolve(app);
      })
      .on('error', function (err) {
        reject(err);
      });
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

function policies(app) {
  return new Promise(function (resolve, reject) {
    glob('./build/*/server/policies/**/*.js')
      .on('match', function (file) {
        require(path.resolve(file)).invokeRolesPolicies();
      })
      .on('end', function (files) {
        console.log(chalk.green('Express::Policies::Success'));
        resolve(app);
      })
      .on('error', function (err) {
        reject(err);
      });
  });
}

  /**
   * Configure the modules server routes
   */
function routes(app) {
  return new Promise(function (resolve, reject) {
    //TODO CAn this be removed?
    /*
    app.use(function (err, req, res, next) {
      if (!err) {
        return next();
      }
      console.error(err.stack);
      res.redirect('/server-error');
    });
    */
    app.use('/', express.static(path.resolve('./public')));
    glob('./build/*/server/routes/**/*.js')
      .on('match', function (file) {
        require(path.resolve(file))(app);
      })
      .on('end', function (files) {
        console.log(chalk.green('Express::Routes::Success'));
        resolve(app);
      })
      .on('error', function (err) {
        reject(err);
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

let server = {
  engine: initViewEngine,
  headers: headers,
  init: init,
  listen: listen,
  middleware: middleware,
  moduleconfig: initModulesConfiguration,
  policies: policies,
  routes: routes,
  variables: initLocalVariables
};

module.exports = server;
