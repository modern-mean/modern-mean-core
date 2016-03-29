'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import mongooseModule from '../../../server/app/mongoose';
import mongoose from 'mongoose';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/core/server/app/mongoose.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should export mongoose', () => {
    return mongooseModule.should.be.an('object');
  });

  it('should have property connect that is a function', () => {
    return mongooseModule.connect.should.be.a('function');
  });

  describe('connect()', () => {

    describe('success', () => {
      let promise;
      before(() => {
        return promise = mongooseModule.connect();
      });

      after(() => {
        return mongooseModule.disconnect();
      });

      it('should resolve a promise after connection', () => {
        return promise.should.be.fulfilled;
      });

      it('should have a ready state of 1', () => {
        return mongoose.connection.readyState.should.be.equal(1);
      });

      it('should resolve on existing connection', () => {
        return mongooseModule.connect().should.be.fulfilled;
      });

      it('should not call connect on an existing connection', () => {
        let spy = sandbox.spy(mongoose, 'connect');
        return mongooseModule.connect()
          .then(() => {
            return spy.should.not.have.been.called;
          });
      });
    });

    describe('error', () => {
      let mockMongoose;
      beforeEach(() => {
        mockMongoose = sandbox.stub(mongoose, 'connect').yields('Error Connecting');
      });

      it('should reject the promise', () => {
        return mongooseModule.connect().should.be.rejected;
      });

      it('should have a ready state of 0', () => {
        return mongoose.connection.readyState.should.be.equal(0);
      });

    });

  });

  it('should have property disconnect that is a function', () => {
    return mongooseModule.disconnect.should.be.a('function');
  });

  describe('disconnect()', () => {

    describe('success', () => {

      beforeEach(() => {
        return mongooseModule.connect();
      });

      it('should resolve a promise after disconnect', () => {
        return mongooseModule.disconnect().should.be.fulfilled;
      });

      it('should resolve a promise if already disonnected', () => {
        return mongooseModule.disconnect()
          .then(() => {
            return mongooseModule.disconnect().should.be.fulfilled;
          });
      });

      it('should disconnect from mongoDB', () => {
        return mongooseModule.disconnect()
          .then(() => {
            return mongoose.connection.readyState.should.be.equal(0);
          });
      });

    });

    describe('error', () => {

      let mockMongoose;
      beforeEach(() => {
        mockMongoose = sandbox.stub(mongoose, 'disconnect').yields('Error Disconnecting');
        return mongooseModule.connect();
      });

      afterEach(() => {
        mockMongoose.restore();
        return mongooseModule.disconnect();
      });

      it('should reject the promise', () => {
        return mongooseModule.disconnect().should.be.rejected;
      });

      it('should have ready state of 1', () => {
        return mongooseModule.disconnect()
          .catch(() => {
            return mongoose.connection.readyState.should.be.equal(1);
          });
      });

    });

  });

});
