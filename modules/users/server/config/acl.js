import nodeacl from 'acl';
import chalk from 'chalk';
import mongooseModule from '../../../core/server/app/mongoose';

let acl;

function init() {
  return new Promise((resolve, reject) => {
    console.log(chalk.green('User::Acl::Init::Start'));

    mongooseModule
      .connect()
      .then(db => {
        acl = new nodeacl(new nodeacl.mongodbBackend(db.connection.db, 'acl_'));
        console.log(chalk.green('User::Acl::Init::Success'));
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
