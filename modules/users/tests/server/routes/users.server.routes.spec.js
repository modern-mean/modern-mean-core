import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';

import promised from 'chai-as-promised';
import request from 'supertest';
import mongoose from 'mongoose';
import * as userRoutes from '../../../server/routes/users.server.routes.js';
import jwtToken from '../../../server/authentication/jwtToken';
import userSeed from '../../../server/models/users.server.model.user.seed';
import mean from '../../../../core/server/app/init';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

xdescribe('modules/users/server/routes/users.server.routes.js', () => {

  describe('export', () => {

    it('should export default', () => {
      return userRoutes.default.should.be.an.object;
    });

    it('should export init', () => {
      return userRoutes.init.should.be.a.function;
    });

  });

  describe('/api/users/me', () => {
    let users, app;

    beforeEach(() => {
      return mean.start()
              .then(promises => {
                app = promises[1];
              });
    });

    beforeEach(() => {
      return userSeed.init()
        .then(seedUsers => {
          users = seedUsers;
        });
    });

    afterEach(() => {
      return mean.stop();
    });

    describe('GET', () => {

      it('should return the user that is logged in', (done) => {
        return jwtToken.signToken(users.user)
          .then(token => {
            request(app)
              .get('/api/users/me')
              .set('Authorization', 'JWT ' + token)
              .expect('Content-Type', /json/)
              .expect(200)
              .expect(res => {
                expect(res.body._id).to.equal(users.user._id.toString());
                expect(res.body.email).to.equal(users.user.email);
              })
              .end(done);
          });
      });

    });

  });

  describe('/api/users', () => {
    let users, app;

    beforeEach(() => {
      return mean.start()
              .then(promises => {
                app = promises[1];
              });
    });

    beforeEach(() => {
      return userSeed.init()
        .then(seedUsers => {
          users = seedUsers;
        });
    });

    afterEach(() => {
      return mean.stop();
    });

    describe('PUT', () => {

      describe('success', () => {
        let user;

        it('should update the logged in user', (done) => {
          user = users.user;
          user.firstName = 'okie';
          user.roles = ['admin', 'wtf'];
          return jwtToken.signToken(users.user)
            .then(token => {
              request(app)
                .put('/api/users')
                .set('Authorization', 'JWT ' + token)
                .send(user)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                  expect(res.body.firstName).to.equal('okie');
                  expect(res.body.roles).to.be.an.array;
                  expect(res.body.roles).to.not.contain('admin');
                  expect(res.body.displayName).to.equal('okie Local');
                })
                .end(done);
            });

        });

      });

      describe('error', () => {

        let mongooseModel, mockMongoose;

        beforeEach(() => {
          mongooseModel = mongoose.model('User');
          console.log(mongooseModel);
          mockMongoose = sinon.stub(mongooseModel.prototype, 'save').rejects('Yippee');
        });

        afterEach(() => {
          mockMongoose.restore();
        });

        it('should send a 400 error', (done) => {

          return jwtToken.signToken(users.user)
            .then(token => {
              request(app)
                .put('/api/users')
                .set('Authorization', 'JWT ' + token)
                .send(users.user)
                .expect('Content-Type', /json/)
                .expect(400)
                .expect(res => {
                  console.log(res);
                  expect(res.error.text).to.equal('Yippee');
                })
                .end(done);
            });

        });

      });

    });

  });

});
