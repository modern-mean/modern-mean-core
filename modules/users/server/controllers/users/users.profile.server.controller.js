'use strict';

import lodash from 'lodash';
import multer from 'multer';
import config from 'modernMean/config';


function update(req, res) {
  // Init Variables
  var user = req.user;

  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  // Merge existing user
  user = lodash.extend(user, req.body);
  user.updated = Date.now();
  user.displayName = user.firstName + ' ' + user.lastName;

  user.save()
    .then(function (user) {
      return res.json(user);
    }).catch(function (err) {
      return res.status(400).send(err);
    });
}


function changeProfilePicture(req, res) {
  var user = req.user;
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, config.uploads.profileUpload.dest);
    },
    filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, user._id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });
  var upload = multer({
    storage: storage
  }).single('newProfilePicture');

  var profileUploadFileFilter = require('../../config/multer.js');

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  upload(req, res, function (uploadError) {
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      user.profileImageURL = './img/profile/uploads/' + req.file.filename;
      user.save()
        .then(function (user) {
          return res.json(user);
        })
        .catch(function (err) {
          return res.status(400).send(err);
        });
    }
  });

}

function me(req, res) {
  return res.json(req.user || null);
}

export {
  changeProfilePicture,
  me,
  update
};
