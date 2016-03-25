import mongoose from 'mongoose';
import UserSchema from '../schemas/users.server.schema.user';
import ProviderSchema from '../schemas/users.server.schema.provider';
import EmailSchema from '../schemas/users.server.schema.email';

let models = {};

function init() {
  return new Promise(function (resolve, reject) {
    if (!models.user) {
      models.user = mongoose.model('User', UserSchema);
    }

    if (!models.provider) {
      models.provider = mongoose.model('Provider', ProviderSchema);
    }

    if (!models.email) {
      models.email = mongoose.model('Email', EmailSchema);
    }
  
    resolve();
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
