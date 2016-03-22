import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import express from 'express';
import passport from 'passport';
import request from 'superagent';
import mongoose from 'mongoose';
import * as jwtStrategy from '../../../../server/authentication/strategies/jwt';
import jwtToken from '../../../../server/authentication/jwtToken';
import userSeed from '../../../../server/models/users.server.model.user.seed';
import mean from '../../../../../core/server/app/init';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/authentication/strategies/jwt.jsa', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return jwtStrategy.default.should.be.an.object;
    });

    it('should export init', () => {
      return jwtStrategy.strategy.should.be.a.function;
    });

    describe('strategy()', () => {
      let jwtSpy, passportSpy;

      describe('success', () => {

        beforeEach(() => {
          passportSpy = sandbox.spy(passport, 'use');
        });

        it('should resolve a promise', () => {
          return jwtStrategy.strategy().should.be.fulfilled;
        });

        it('should call passport.use', () => {
          return jwtStrategy.strategy()
            .then(() => {
              return passportSpy.should.be.called;
            });
        });

      });

    });

  });

  describe('agent()', () => {
    let app;

    beforeEach(() => {
      return mean.start()
              .then(promises => {
                app = promises[1];
              });
    });

    afterEach(() => {
      return mean.stop();
    });

    describe('success', () => {
      let users;

      beforeEach(() => {
        return userSeed.init()
          .then(seedUsers => {
            users = seedUsers;
          });
      });

      it('should authenticate the user', done => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        return jwtToken.signToken(users.user)
          .then(token => {
            request
              .get('https://localhost:8082/api/users/me')
              .set('Authorization', 'JWT ' + token)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
              });
          });

      });

    });

    describe('user not found', () => {

      it('should responsd 500', done => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        jwtToken.signToken({ _id: '5669a12817d7528f3866efbe' })
          .then(token => {
            request
              .get('https://localhost:8082/api/users/me')
              .set('Authorization', 'JWT ' + token)
              .end((err, res) => {
                expect(res.status).to.equal(500);
                expect(res.error.text).to.equal('User not found\n');
                done();
              });
          });

      });

    });

    describe('invalid token', () => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      it('should responsd 401', done => {
        request
          .get('https://localhost:8082/api/users/me')
          .set('Authorization', 'JWT asdfasdfasdf')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

    });

    describe('mongoose error should reject the token', () => {

      let mongooseModel, mockMongoose;

      beforeEach(() => {
        mongooseModel = mongoose.model('User');
        mockMongoose = sandbox.stub(mongooseModel, 'findById').rejects('Yippee');
      });

      it('should respond 401', done => {


        jwtToken.signToken({ _id: '5669a12817d7528f3866efbe' })
          .then(token => {
            request
              .get('https://localhost:8082/api/users/me')
              .set('Authorization', 'JWT ' + token)
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
