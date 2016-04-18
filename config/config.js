'use strict';

import lodash from 'lodash';
import defaultConfig from './env/default';
import development from './env/development';
import test from './env/test';
import production from './env/production';


let config;

function mergeEnvironment() {
  switch(process.env.NODE_ENV) {
    case 'development':
      config = lodash.merge(defaultConfig, development);
      return config;
      break;
    case 'test':
      config = lodash.merge(defaultConfig, test);
      return config;
      break;
    case 'production':
      config = lodash.merge(defaultConfig, production);
      return config;
      break;
    default:
      config = defaultConfig;
      return config;
      break;
  }
}

mergeEnvironment();

export default config;
export { mergeEnvironment, config };
