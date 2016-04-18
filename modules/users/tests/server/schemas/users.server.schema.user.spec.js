'use strict';

import userModel from '../../../server/models/users.server.model.user';
import userSeed from '../../../server/models/users.server.model.user.seed';
import mongooseModule from '../../../../core/server/app/mongoose';
import aclModule from '../../../server/config/acl';

let sandbox;

describe('/modules/users/server/schemas/users.server.schema.user.js', () => {

  before(() => {
    return mongooseModule.connect()
      .then(Promise.all([aclModule.init(), userModel.init()]))
      .then(userSeed.seedUser);
  });

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('virtuals', () => {
    let model;

    beforeEach(() => {
      model = new userModel.getModels().user();
    });

    describe('name.full', () => {

      it('should return first name + last name', () => {
        model.name.first = 'Fred';
        model.name.last = 'Flintstone';
        return model.name.full.should.equal('Fred Flintstone');
      });

    });
  });

  describe('toJSON', () => {
    let model;

    beforeEach(() => {
      model = new userModel.getModels().user();
    });

    describe('virtuals', () => {

      it('should include virtuals', () => {
        model.name.first = 'Fred';
        model.name.last = 'Flintstone';
        return model.toJSON().name.full.should.equal('Fred Flintstone');
      });

    });
  });



  describe('presave', () => {
    let model, users;

    beforeEach(() => {
      model = userModel.getModels().user;
      return model
        .find()
        .then(result => {
          users = result;
        });
    });

    it('should set updated timestamp if modified', (done) => {
      let user = users[0];
      let timestamp = user.timestamps.updated;

      setTimeout(function () {
        user.name.first = ~user.name.first;

        user.save()
          .then(result => {
            result.timestamps.updated.toString().should.not.equal(timestamp.toString());
            return done();
          });
      }, 1001);

    });

    it('should not updated timestamp if not modified', (done) => {
      let user = users[0];
      let timestamp = user.timestamps.updated;

      setTimeout(function () {
        user.save()
          .then(result => {
            result.timestamps.updated.toString().should.equal(timestamp.toString());
            return done();
          });
      }, 1001);

    });

  });

});
