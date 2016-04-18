'use strict';

let development = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/modern-mean-dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  livereload: true,
  logs: {
    //https://github.com/expressjs/morgan
    morgan: {
      format: 'dev'
    },
    //https://github.com/winstonjs/winston
    winston: {
      level:  process.env.WINSTON_LEVEL || 'debug', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
      file: process.env.WINSTON_FILE || './logs/winston.log'
    }
  },
  seedDB: process.env.MONGO_SEED === 'true' ? true : false

};

export default development;
