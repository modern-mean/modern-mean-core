var gulp = require('gulp');

// Drops the MongoDB database, used in e2e testing
gulp.task('dropdb', function (done) {
  // Use mongoose configuration
  var mongoose = require('../../config/lib/mongoose.js');

  mongoose.connect(function (db) {
    db.connection.db.dropDatabase(function (err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Successfully dropped db: ', db.connection.db.databaseName);
      }
      db.connection.db.close(done);
    });
  });
});
