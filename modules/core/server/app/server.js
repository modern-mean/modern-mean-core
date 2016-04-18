'use strict';

import winston from 'winston';
import app from './init';
import logger from './winston';

logger
  .init()
  .then(app.start)
  .then(function (app) {
    winston.info('Modern-MEAN started Successfully');
  })
  .catch(function (err) {
    winston.error(err);
    app.stop();
  });
