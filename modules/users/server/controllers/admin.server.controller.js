import lodash from 'lodash';
import mongoose from 'mongoose';
import userModel from '../models/users.server.model.user';

function read(req, res) {
  return res.json(req.model);
}

function update(req, res) {
  let user = req.model;

  //Since this is admin functionality assuming they know what they are doing
  lodash.merge(user, req.body);

  return user.save()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.status(400).json(err.message);
    });
}

function remove(req, res) {
  let user = req.model;

  return user.remove()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.status(400).json(err.message);
    });
}

function list(req, res) {
  let User = userModel.getModels().user;
  return User.find({})
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      return res.status(400).json(err.message);
    });
}

function userByID(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('User is invalid');
  }

  let User = userModel.getModels().user;

  return User.findById(id)
    .then(user => {
      if (!user) {
        return next('Failed to load user ' + id);
      }

      req.model = user;
      return next();

    })
    .catch(err => {
      return next(err.message);
    });
}

let controller = { read: read, update: update, remove: remove, list: list, userByID, userByID };

export default controller;
export {
  read,
  update,
  remove,
  list,
  userByID
};
