import nodeacl from 'acl';
import winston from 'winston';
import mongooseModule from '../../../core/server/app/mongoose';

let acl;

function init() {
  return new Promise((resolve, reject) => {
    winston.debug('User::Acl::Init::Start');

    mongooseModule
      .connect()
      .then(db => {
        acl = new nodeacl(new nodeacl.mongodbBackend(db.connection.db, 'acl_'));
        winston.verbose('User::Acl::Init::Success');
        return resolve(acl);
      });

  });
}

function getAcl() {
  return acl;
}

let service = { init: init, getAcl: getAcl };

export default service;
export { init, getAcl };
