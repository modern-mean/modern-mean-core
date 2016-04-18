'use strict';

import winston from 'winston';
import config from 'modernMean/config';


function init() {
  return new Promise((resolve, reject) => {
    //Set log level
    winston.level = config.logs.winston.level;

    if (config.logs.winston.file) {
      winston.add(winston.transports.File, { filename: config.logs.winston.file });
    }
    return resolve();
  });
}

let logger = { init: init };

export { init };
export default logger;
