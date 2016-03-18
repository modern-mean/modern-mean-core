'use strict';

import config from 'modernMean/config';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';

function signToken(user, options) {
  return new Promise(function (resolve, reject) {
    let payload,
      token,
      jwtOptions;

    if (!user || !user._id) {
      reject('User not valid');
    }

    options = options || {};

    payload = {
      user: user._id.toString()
    };

    jwtOptions = lodash.merge(config.jwt.options, options);

    token = jwt.sign(payload, config.jwt.secret, jwtOptions);

    resolve(token);
  });
}

let service = { signToken: signToken };

export default service;
export { signToken };
