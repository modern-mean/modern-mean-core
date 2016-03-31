'use strict';

import * as authentication from './users/users.authentication.server.controller';
import * as password from './users/users.password.server.controller';
import * as profile from './users/users.profile.server.controller';
import * as authorization from './users/users.authorization.server.controller';

let controller = { authentication: authentication, password: password, profile: profile, authorization: authorization };

export default controller;
export { authentication, password, profile, authorization };
