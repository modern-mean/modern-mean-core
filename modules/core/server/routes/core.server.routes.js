'use strict';

import express from 'express';
import winston from 'winston';
import core from '../controllers/core.server.controller';

function init(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Core::Routes::Start');

    app.use('/', express.static('./public'));

    // Define error pages
    app.route('/server-error')
      .get(core.renderServerError);

    // Return a 404 for all undefined api, module or lib routes
    app.route('/:url(api|build|public)/*')
      .get(core.renderNotFound);

    // Define application route
    app.route('/*')
      .get(core.renderIndex);

    winston.verbose('Core::Routes::Success');

    return resolve(app);

  });
}

let service = { init: init };

export default service;
export { init };
