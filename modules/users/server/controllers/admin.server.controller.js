'use strict';

import { get as model } from '../models/users.server.model.user';
import mongoose from 'mongoose';

function read(req, res) {
  return res.json(req.model);
}

function update(req, res) {
  let user = req.model;

  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;

  user.save()
    .then(function (user) {
      return res.json(user);
    })
    .catch(function (err) {
      return res.status(400).send(err);
    });
}

function remove(req, res) {
  let user = req.model;

  user.remove()
    .then(function (user) {
      return res.json(user);
    })
    .catch(function (err) {
      return res.status(400).send(err);
    });
}

function list(req, res) {
  let User = model();
  User.find({}, '-salt -password')
    .then(function (users) {
      return res.json(users);
    })
    .catch(function (err) {
      return res.status(400).send(err);
    });
}

function userByID(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  let User = model();
  User.findById(id, '-salt -password')
    .then(function (user) {
      if (!user) {
        return next(new Error('Failed to load user ' + id));
      }

      req.model = user;
      next();

    })
    .catch(function (err) {
      return next(err);
    });
}

export {
  read,
  update,
  remove,
  list,
  userByID
};
