'use strict';

import winston from 'winston';
import routes from './routes/core.server.routes';



function init(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Core::Init::Start');
    routes.init(app)
      .then(function (app) {
        winston.verbose('Core::Init::Success');
        return resolve(app);
      })
      .catch(function (err) {
        winston.error(err);
        return reject(err);
      });
  });

}

let service = { init: init };

export default service;
export { init };
