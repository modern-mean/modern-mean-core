import passport from 'passport';
import chalk from 'chalk';
import jwtStrategy from './strategies/jwt';
import localStrategy from './strategies/local';

function init(app) {
  return new Promise(function (resolve, reject) {
    Promise.all([ jwtStrategy.strategy(app), localStrategy.strategy(app) ])
      .then(function () {
        app.use(passport.initialize());
        console.log(chalk.bold.green('Users::Authentication::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Users::Authentication::Error' + err));
        reject(err);
      });
  });
}

let service = { init: init };

export default service;
export { init };
