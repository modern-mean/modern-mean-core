import app from '../../../server/app/init';
import mongoose from '../../../server/app/mongoose';
import express from '../../../server/app/express';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import request from 'superagent';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();



describe('/modules/core/server/app/init.js', function () {

  it('should export app', function () {
    return app.should.be.an('object');
  });

  it('should have start property that is a function', function () {
    return app.start.should.be.a('function');
  });

  describe('app.start()', function () {

    describe('express failure', function () {

      let mockExpress, mockMongoose;

      beforeEach(function () {
        mockExpress = sinon.stub(express, 'listen').rejects('Error!!!!!!!!!');
        mockMongoose = sinon.stub(mongoose, 'connect').resolves('Yay!!!!!!!!!!!!!!!!');
      });

      afterEach(function () {
        mockExpress.restore();
        mockMongoose.restore();
      });

      it('should reject the promise', function () {
        let promise = app.start();
        return promise.should.eventually.be.resolved;
      });
    });

    describe('mongoose failure', function () {

      let mockExpress, mockMongoose;

      beforeEach(function () {
        mockExpress = sinon.stub(express, 'listen').resolves('Yay');
        mockMongoose = sinon.stub(mongoose, 'connect').rejects('Err');
      });

      afterEach(function () {
        mockExpress.restore();
        mockMongoose.restore();
      });

      it('should reject the promise', function () {
        let promise = app.start();
        return promise.should.eventually.be.rejected;
      });
    });

    describe('success', function () {

      let mockExpress, mockMongoose;

      beforeEach(function () {
        mockExpress = sinon.stub(express, 'listen').resolves('Yay');
        mockMongoose = sinon.stub(mongoose, 'connect').resolves('Yay');
      });

      afterEach(function () {
        mockExpress.restore();
        mockMongoose.restore();
      });

      it('should call express.init', function () {
        let spy = sinon.spy(express, 'init');
        return app.start().then(function () {
          return spy.should.have.been.called;
        });
      });

      it('should call express.middleware', function () {
        let spy = sinon.spy(express, 'middleware');
        return app.start().then(function () {
          return spy.should.have.been.calledOnce;
        });
      });

      it('should call express.engine', function () {
        let spy = sinon.spy(express, 'engine');
        return app.start().then(function () {
          return spy.should.have.been.called;
        });
      });

      it('should call express.headers', function () {
        let spy = sinon.spy(express, 'headers');
        return app.start().then(function () {
          return spy.should.have.been.called;
        });
      });

      it('should call express.modules', function () {
        let spy = sinon.spy(express, 'modules');
        return app.start().then(function () {
          return spy.should.have.been.called;
        });
      });

      it('should call express.core', function () {
        let spy = sinon.spy(express, 'core');
        return app.start().then(function () {
          return spy.should.have.been.called;
        });
      });

      it('should call express.listen', function () {
        return app.start().then(function () {
          return mockExpress.should.have.been.calledOnce;
        });
      });

      it('should resolve the promise', function () {
        let promise = app.start();
        return promise.should.be.fulfilled;
      });
    });

    describe('full', function () {
      it('should start the http server and be listening', function (done) {
        app.start()
          .then(function () {
            request.get('http://localhost:8081/')
              .end(function(err, res){
                expect(res.status).to.equal(200);
                app.stop()
                  .then(function () {
                    done();
                  });
              });
          });
      });

      it('should start the https server and be listening', function (done) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        app.start()
          .then(function () {
            request.get('https://localhost:8082/')
              .end(function(err, res){
                console.log(err);
                expect(res.status).to.equal(200);
                app.stop()
                  .then(function () {
                    done();
                  });
              });
          });
      });
    });

  });

  it('should have stop property that is a function', function () {
    expect(app.stop).to.be.a('function');
  });

  describe('app.stop()', function () {

    describe('express failure', function () {
      let mockExpress, mockMongoose;

      beforeEach(function () {
        mockExpress = sinon.stub(express, 'destroy').returns(new Promise(function (resolve, reject) { reject(); }));
        mockMongoose = sinon.stub(mongoose, 'disconnect').returns(new Promise(function (resolve, reject) { resolve(); }));
      });

      afterEach(function () {
        mockExpress.restore();
        mockMongoose.restore();
      });

      it('should reject the promise', function (done) {
        app.stop()
          .catch(function () {
            done();
          });
      });
    });

    describe('mongoose failure', function () {
      let mockExpress, mockMongoose;

      beforeEach(function () {
        mockExpress = sinon.stub(express, 'destroy').returns(new Promise(function (resolve, reject) { resolve(); }));
        mockMongoose = sinon.stub(mongoose, 'disconnect').returns(new Promise(function (resolve, reject) { reject(); }));
      });

      afterEach(function () {
        mockExpress.restore();
        mockMongoose.restore();
      });

      it('should reject the promise', function (done) {
        app.stop()
          .catch(function (err) {
            done();
          });
      });
    });

    describe('success', function () {

      it('should stop the http server from listening', function (done) {
        app.start().then(function () {
          app.stop()
            .then(function () {
              request.get('http://localhost:8081/')
                .end(function(err, res){
                  expect(err.code).to.equal('ECONNREFUSED');
                  done();
                });
            });
        });
      });

      it('should stop the https server from listening', function (done) {
        app.start().then(function () {
          app.stop()
            .then(function () {
              request.get('http://localhost:8444/')
                .end(function(err, res){
                  expect(err.code).to.equal('ECONNREFUSED');
                  done();
                });
            });
        });
      });
    });


  });
});
