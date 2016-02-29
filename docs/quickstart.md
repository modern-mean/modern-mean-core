#Quick Start Guide
This guide will help you get Modern MEAN running

##Requirements
1. MongoDB
2. NodeJS v5
3. NPM
4. Bower
5. Gulp 4

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
#NodeJS v5 is REQUIRED
git clone https://github.com/modern-mean/modern-mean-core.git
cd modern-mean-core
npm install
```

##Modern MEAN Runtime
```sh
#for development
gulp
```
For more information on gulp tasks visit the <a href="https://github.com/modern-mean/modern-mean-core/wiki/Gulp-Tasks">gulp wiki page</a>
