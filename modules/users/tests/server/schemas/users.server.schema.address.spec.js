'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import userModel from '../../../server/models/users.server.model.user';
import userSeed from '../../../server/models/users.server.model.user.seed';
import mongooseModule from '../../../../core/server/app/mongoose';
import aclModule from '../../../server/config/acl';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/schemas/users.server.schema.address.js', () => {

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
        user.addresses[0].streetAddress = ~user.addresses[0].streetAddress;

        user.save()
          .then(result => {
            result.addresses[0].timestamps.updated.toString().should.not.equal(timestamp.toString());
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
            result.addresses[0].timestamps.updated.toString().should.equal(timestamp.toString());
            return done();
          });
      }, 1001);

    });

  });

});
