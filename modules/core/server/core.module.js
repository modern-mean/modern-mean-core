import routes from './routes/core.server.routes';
import chalk from 'chalk';


function init(app) {
  return new Promise(function (resolve, reject) {
    routes.init(app)
      .then(function (app) {
        console.log(chalk.bold.green('Core::Init::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Users::Init::Error::' + err));
        reject(err);
      });
  });

}

let service = { init: init };

export default service;
export { init };
