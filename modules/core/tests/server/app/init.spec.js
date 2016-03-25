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

let sandbox;

describe('/modules/core/server/app/init.js', function () {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

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
        mockExpress = sandbox.stub(express, 'init').rejects();
        mockMongoose = sandbox.stub(mongoose, 'connect').resolves();
      });

      it('should reject the promise', function () {
        let promise = app.start();
        return promise.should.eventually.be.rejected;
      });
    });

    describe('mongoose failure', function () {

      let mockExpress, mockMongoose;

      beforeEach(function () {
        mockExpress = sandbox.stub(express, 'init').resolves();
        mockMongoose = sandbox.stub(mongoose, 'connect').rejects();
      });

      it('should reject the promise', function () {
        let promise = app.start();
        return promise.should.eventually.be.rejected;
      });
    });

    describe('success', function () {

      let initStub, variablesStub, middlewareStub, engineStub, headersStub, modulesStub, coreStub, listenStub, connectStub, promiseStub;

      beforeEach(function () {
        //Express Stubs
        initStub = sandbox.stub(express, 'init').resolves();
        middlewareStub = sandbox.stub(express, 'middleware').resolves();
        variablesStub = sandbox.stub(express, 'variables').resolves();
        engineStub = sandbox.stub(express, 'engine').resolves();
        headersStub = sandbox.stub(express, 'headers').resolves();
        modulesStub = sandbox.stub(express, 'modules').resolves();
        coreStub = sandbox.stub(express, 'core').resolves();
        listenStub = sandbox.stub(express, 'listen').resolves();
        //Mongoose Stubs
        connectStub = sandbox.stub(mongoose, 'connect').resolves();
        promiseStub = sandbox.stub(mongoose, 'setPromise').resolves();


        return app.start();
      });

      it('should initialize express', function () {
        initStub.should.have.been.called;
        middlewareStub.should.have.been.called;
        variablesStub.should.have.been.called;
        engineStub.should.have.been.called;
        headersStub.should.have.been.called;
        modulesStub.should.have.been.called;
        coreStub.should.have.been.called;
        connectStub.should.have.been.called;
        promiseStub.should.have.been.called;
        return listenStub.should.have.been.called;
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
        app.start()
          .then(function () {
            request.get('https://localhost:8082/')
              .end(function(err, res){
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
        mockExpress = sandbox.stub(express, 'destroy').rejects();
        mockMongoose = sandbox.stub(mongoose, 'disconnect').resolves();
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
        mockExpress = sandbox.stub(express, 'destroy').resolves();
        mockMongoose = sandbox.stub(mongoose, 'disconnect').rejects();
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
              request.get('http://localhost:8082/')
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
