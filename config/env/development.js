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
  seedDB: process.env.MONGO_SEED === 'true' ? true : false

};

export default development;
