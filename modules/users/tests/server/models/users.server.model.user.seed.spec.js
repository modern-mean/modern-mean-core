'use strict';

import * as userSeed from '../../../server/models/users.server.model.user.seed';
import userModel from '../../../server/models/users.server.model.user';
import mongooseModule from '../../../../core/server/app/mongoose';
import aclModule from '../../../server/config/acl';

let sandbox;

describe('/modules/users/server/models/users.server.model.user.seed.js', () => {

  before(() => {
    return mongooseModule.connect()
      .then(Promise.all([aclModule.init(), userModel.init()]));
  });

  after(() => {
    return mongooseModule.disconnect();
  });

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return userSeed.default.should.be.an('object');
    });

    it('should export init', () => {
      return userSeed.init.should.be.a('function');
    });

    describe('init()', () => {

      describe('success', () => {

        it('should fulfill a promise', () => {
          return userSeed.init().should.be.fulfilled;
        });

        it('should resolve an object with user and admin', () => {
          return userSeed.init().then(users => {
            users.user.should.be.an('object');
            return users.admin.should.be.an('object');
          });
        });

      });

    });

    it('should export getUsers', () => {
      return userSeed.getUsers.should.be.a('function');
    });

    it('should export seedUser', () => {
      return userSeed.seedUser.should.be.a('function');
    });

    describe('seedUser', () => {

      describe('success', () => {

        it('should fulfill a promise', () => {
          return userSeed.seedUser().should.be.fulfilled;
        });

        it('should promise should resolve user object', () => {
          return userSeed.seedUser().then(user => {
            user.name.should.be.an('object');
            return user.providers.length.should.equal(1);
          });
        });

        it('should set the user on the model export', () => {
          return userSeed.seedUser().then(user => {
            return userSeed.getUsers().user.should.exist;
          });
        });

        it('should resolve a promise if user does not currently exist', () => {
          return userSeed.removeUser()
            .then(() => {
              return userSeed.seedUser().should.be.fulfilled;
            });
        });

      });

    });

    it('should export seedAdmin', () => {
      return userSeed.seedAdmin.should.be.a('function');
    });

    describe('seedAdmin', () => {

      describe('success', () => {

        it('should fulfill a promise', () => {
          return userSeed.seedAdmin().should.be.fulfilled;
        });

        it('should promise should resolve user object', () => {
          return userSeed.seedAdmin().then(user => {
            user.name.should.be.an('object');
            return user.providers.length.should.equal(1);
          });
        });

        it('should set the user on the model export', () => {
          return userSeed.seedAdmin().then(user => {
            return userSeed.getUsers().admin.should.exist;
          });
        });

        it('should resolve a promise if user does not currently exist', () => {
          return userSeed.removeAdmin()
            .then(() => {
              return userSeed.seedAdmin().should.be.fulfilled;
            });
        });

      });

    });

    it('should export removeUser', () => {
      return userSeed.removeUser.should.be.a('function');
    });

    describe('removeUser', () => {

      it('should remove the user from export', () => {
        return userSeed.removeUser()
          .then(() => {
            return expect(userSeed.getUsers().user).to.not.exist;
          });
      });

    });

    it('should export removeAdmin', () => {
      return userSeed.removeAdmin.should.be.a('function');
    });

    describe('removeAdmin', () => {

      it('should remove the admin from export', () => {
        return userSeed.removeAdmin()
          .then(() => {
            return expect(userSeed.getUsers().admin).to.not.exist;
          });
      });

    });

  });

});
