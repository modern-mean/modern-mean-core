import chai from 'chai';
import sinon from 'sinon';
import sinonMongoose from 'sinon-mongoose';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import express from 'express';
import passport from 'passport';
import request from 'superagent';
import mongoose from 'mongoose';
import * as localStrategy from '../../../../server/authentication/strategies/local';
import userSeed from '../../../../server/models/users.server.model.user.seed';
import mean from '../../../../../core/server/app/init';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/authentication/strategies/local.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return localStrategy.default.should.be.an('object');
    });

    it('should export init', () => {
      return localStrategy.strategy.should.be.a('function');
    });

    describe('strategy()', () => {
      let localSpy, passportSpy;

      describe('success', () => {

        beforeEach(() => {
          passportSpy = sandbox.spy(passport, 'use');
        });

        afterEach(() => {
          passportSpy.restore();
        });

        it('should resolve a promise', () => {
          return localStrategy.strategy().should.be.fulfilled;
        });

        it('should call passport.use', () => {
          return localStrategy.strategy()
            .then(() => {
              return passportSpy.should.be.called;
            });
        });

      });

    });

  });

  describe('agent()', () => {
    let app, users;

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

    describe('success', () => {

      it('should authenticate the user', done => {
        request
          .post('https://localhost:8082/api/auth/signin')
          .send({ email: users.user.providers[0].email, password: users.user.password })
          .end((err, res) => {

            expect(res.status).to.equal(200);
            done();
          });

      });

    });

    describe('error', () => {

      describe('user not found', () => {

        it('should responsd 500', done => {
          request
            .post('https://localhost:8082/api/auth/signin')
            .send({ email: 'asdfadsf434983249@asdfjie.com', password: 'asdfasdf' })
            .end((err, res) => {
              expect(res.status).to.equal(500);
              expect(res.error.text).to.equal('Invalid email or password\n');
              done();
            });
        });

      });

      describe('authentication failure', () => {

        it('should responsd 500', done => {
          request
            .post('https://localhost:8082/api/auth/signin')
            .send({ email: users.user.providers[0].email, password: 'failme' })
            .end((err, res) => {
              expect(res.status).to.equal(500);
              expect(res.error.text).to.equal('Invalid email or password\n');
              done();
            });
        });

      });

      describe('mongoose error should fail', () => {

        let mongooseModel, mockMongoose;

        beforeEach(() => {
          mongooseModel = mongoose.model('User');
          mockMongoose = sandbox.stub(mongooseModel, 'findOne').rejects('Yippee');
        });

        afterEach(() => {
          mockMongoose.restore();
        });

        it('should respond 500', done => {
          request
            .post('https://localhost:8082/api/auth/signin')
            .send({ email: users.user.providers[0].email, password: users.user.password })
            .end((err, res) => {
              expect(res.status).to.equal(500);
              expect(res.error.text).to.contain('Yippee');
              done();
            });
        });

      });

    });

  });

});
