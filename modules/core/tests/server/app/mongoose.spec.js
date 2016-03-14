import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import promised from 'chai-as-promised';
import mongoose from '../../../server/app/mongoose';
import mongooseModule from 'mongoose';




chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();



describe('/modules/core/server/app/mongoose.js', function () {

  it('should export mongoose', function () {
    return mongoose.should.be.an.object;
  });

  it('should have property connect that is a function', function () {
    return mongoose.connect.should.be.a.function;
  });

  describe('connect()', function () {

    describe('success', function () {
      let connect;
      beforeEach(function () {
        return connect = mongoose.connect();
      });

      afterEach(function () {
        return mongoose.disconnect();
      });

      it('should resolve a promise after connection', function () {
        return connect.should.be.fulfilled;
      });

      it('should have a ready state of 1', function () {
        return mongooseModule.connection.readyState.should.be.equal(1);
      });
    });

    describe('error', function () {
      let mockMongoose;
      beforeEach(function () {
        mockMongoose = sinon.stub(mongooseModule, 'connect').yields('Error Connecting');
      });

      afterEach(function () {
        mockMongoose.restore();
      });

      it('should reject the promise', function () {
        return mongoose.connect().should.be.rejected;
      });

      it('should have a ready state of 0', function () {
        return mongooseModule.connection.readyState.should.be.equal(0);
      });
    });

  });

  it('should have property disconnect that is a function', function () {
    return mongoose.disconnect.should.be.a.function;
  });

  describe('disconnect()', function () {

    describe('success', function () {

      beforeEach(function () {
        return mongoose.connect();
      });

      it('should resolve a promise after disconnect', function () {
        return mongoose.disconnect().should.be.fulfilled;
      });

      it('should resolve a promise if already disonnected', function () {
        return mongoose.disconnect()
          .then(function () {
            return mongoose.disconnect().should.be.fulfilled;
          })
      });

      it('should disconnect from mongoDB', function () {
        return mongoose.disconnect()
          .then(function () {
            return mongooseModule.connection.readyState.should.be.equal(0);
          });
      });

    });

    describe('error', function () {

      let mockMongoose;
      beforeEach(function () {
        mockMongoose = sinon.stub(mongooseModule, 'disconnect').yields('Error Disconnecting');
        return mongoose.connect();
      });

      afterEach(function () {
        mockMongoose.restore();
        return mongoose.disconnect();
      });

      it('should reject the promise', function () {
        return mongoose.disconnect().should.be.rejected;
      });

      it('should have ready state of 1', function () {
        return mongoose.disconnect()
          .catch(function () {
            return mongooseModule.connection.readyState.should.be.equal(1);
          });
      });

    });

  });

});
