'use strict';

import config from 'config/config';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';

function signToken(user, options) {
  return new Promise(function (resolve, reject) {
    let payload,
      token,
      jwtOptions;

    if (!user || !user._id) {
      return null;
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

export { signToken };
