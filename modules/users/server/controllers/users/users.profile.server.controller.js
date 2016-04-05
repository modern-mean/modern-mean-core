'use strict';

import lodash from 'lodash';
import multer from 'multer';
import config from 'modernMean/config';



function update(req, res) {
  // Init Variables
  var user = req.user;

  user.name = req.body.name;
  user.emails = req.body.emails;


  return user.save()
    .then(user => {
      res.json(user);
    }).catch(err => {
      res.status(400).json(err.message);
    });
}


function changeProfilePicture(req, res) {

  var user = req.user;
  user.profileImageURL = './img/profile/uploads/' + req.file.filename;
  return user.save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json(err.message);
    });
}

function me(req, res) {
  return res.json(req.user);
}

let controller = { changeProfilePicture: changeProfilePicture, me: me, update: update };

export default controller;
export {
  changeProfilePicture,
  me,
  update
};
