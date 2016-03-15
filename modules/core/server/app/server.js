'use strict';

import chalk from 'chalk';
import app from './init';

app
  .start()
  .then(function (app) {
    console.log(chalk.bold.green('Modern-MEAN started Successfully'));
  })
  .catch(function (err) {
    console.log(chalk.bold.red('Modern-MEAN start failure'));
    console.log(chalk.bold.red(err));
    app.stop();
  });
