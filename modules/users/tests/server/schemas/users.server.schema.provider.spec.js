'use strict';

import userModel from '../../../server/models/users.server.model.user';
import userSeed from '../../../server/models/users.server.model.user.seed';
import mongooseModule from '../../../../core/server/app/mongoose';
import aclModule from '../../../server/config/acl';

let sandbox;

describe('/modules/users/server/schemas/users.server.schema.provider.js', () => {

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
      model = new userModel.getModels().provider();
    });

    describe('clearpassword', () => {

      it('should set hashedPassword', () => {
        model.clearpassword = 'test';
        return model.hashedPassword.length.should.be.above(1);
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
      let timestamp = user.providers[0].timestamps.updated;

      setTimeout(function () {
        user.providers[0].salt = ~user.providers[0].salt;

        user.save()
          .then(result => {
            result.providers[0].timestamps.updated.toString().should.not.equal(timestamp.toString());
            return done();
          });
      }, 1001);

    });

    it('should not updated timestamp if not modified', (done) => {
      let user = users[0];
      let timestamp = user.providers[0].timestamps.updated;

      setTimeout(function () {
        user.save()
          .then(result => {
            result.providers[0].timestamps.updated.toString().should.equal(timestamp.toString());
            return done();
          });

      }, 1001);

    });

  });

  describe('toJSON', () => {
    let model;

    beforeEach(() => {
      model = new userModel.getModels().user();
    });

    describe('filter', () => {

      it('should not include hashedPassword', () => {
        model.clearpassword = 'test';
        return expect(model.toJSON().hashedPassword).to.not.exist;
      });

      it('should not include salt', () => {
        model.clearpassword = 'test';
        return expect(model.toJSON().salt).to.not.exist;
      });

    });
  });

});
