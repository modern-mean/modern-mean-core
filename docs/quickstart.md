#Quick Start Guide
This guide will help you get Modern MEAN running

##Requirements
1. MongoDB
2. NodeJS v5.8
3. NPM
4. Bower
5. Gulp 4

##Node Support
You can find the most up to date information on what node versions we support by looking at our <a href="https://github.com/trainerbill/modern-mean-core/blob/master/.travis.yml#L3">travis builds.</a>

##Gulp 4 CLI installation
```sh
# uninstall previous Gulp installation, if any
npm uninstall gulp -g
npm uninstall gulp-cli -g

# install Gulp 4 CLI tools globally from 4.0 GitHub branch
npm install gulpjs/gulp-cli#4.0 -g
```
##Bower install
```sh
npm install bower -g
```
##Modern MEAN installation
```sh
#NodeJS v5.8 is REQUIRED
git clone https://github.com/modern-mean/modern-mean-core.git
cd modern-mean-core
npm install
```

###First Run
When running the application for the first time you should seed the users by setting the MONGO_SEED environment variable.
```bash
MONGO_SEED=true gulp
```
For more information on database seeding visit the <a href="https://github.com/modern-mean/modern-mean-core/blob/master/docs/dbseeding.md">database seeding documentation</a>

##Modern MEAN Runtime
```sh
gulp
```
For more information on gulp tasks visit the <a href="https://github.com/modern-mean/modern-mean-core/blob/master/docs/gulptasks.md">gulp tasks documentation</a>
