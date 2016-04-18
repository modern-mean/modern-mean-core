'use strict';

import mongoose from 'mongoose';
import winston from 'winston';
import UserSchema from '../schemas/users.server.schema.user';
import ProviderSchema from '../schemas/users.server.schema.provider';
import EmailSchema from '../schemas/users.server.schema.email';
import AddressSchema from '../schemas/users.server.schema.address';

let models = {};

function init() {
  return new Promise(function (resolve, reject) {
    winston.debug('User::Model::Init::Start');
    if (!models.user) {
      models.user = mongoose.model('User', UserSchema);
    }

    if (!models.provider) {
      models.provider = mongoose.model('Provider', ProviderSchema);
    }

    if (!models.email) {
      models.email = mongoose.model('Email', EmailSchema);
    }

    if (!models.address) {
      models.address = mongoose.model('Address', AddressSchema);
    }
    winston.verbose('User::Model::Init::Success');
    return resolve(models);
  });
}

function getModels() {
  return models;
}

function create(req, res, next) {
  req.model = new models.user();
  next();
  return;
}


let userModel = { init: init, create: create, models: models, getModels: getModels };

export default userModel;
export { init, create, models, getModels };
