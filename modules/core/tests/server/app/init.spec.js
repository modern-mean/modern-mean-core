'use strict';

import app from '../../../server/app/init';
import mongooseModule from '../../../server/app/mongoose';
import expressModule from '../../../server/app/express';

let sandbox;

describe('/modules/core/server/app/init.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should export app', () => {
    return app.should.be.an('object');
  });

  it('should have start property that is a function', () => {
    return app.start.should.be.a('function');
  });

  describe('app.start()', () => {

    describe('error', () => {

      let mockExpress;

      beforeEach(() => {
        mockExpress = sandbox.stub(expressModule, 'init').rejects();
      });

      it('should reject the promise', () => {
        return app.start().should.be.rejected;
      });
    });

    describe('success', () => {

      let initStub, variablesStub, middlewareStub, engineStub, headersStub, modulesStub, coreStub, listenStub, connectStub, promiseStub;

      beforeEach(() => {
        //Express Stubs
        initStub = sandbox.stub(expressModule, 'init').resolves();
        middlewareStub = sandbox.stub(expressModule, 'middleware').resolves();
        variablesStub = sandbox.stub(expressModule, 'variables').resolves();
        engineStub = sandbox.stub(expressModule, 'engine').resolves();
        headersStub = sandbox.stub(expressModule, 'headers').resolves();
        modulesStub = sandbox.stub(expressModule, 'modules').resolves();
        coreStub = sandbox.stub(expressModule, 'core').resolves();
        listenStub = sandbox.stub(expressModule, 'listen').resolves();
        //Mongoose Stubs
        connectStub = sandbox.stub(mongooseModule, 'connect').resolves();

        return app.start();
      });

      it('should initialize express', () => {
        initStub.should.have.been.called;
        middlewareStub.should.have.been.called;
        variablesStub.should.have.been.called;
        engineStub.should.have.been.called;
        headersStub.should.have.been.called;
        modulesStub.should.have.been.called;
        coreStub.should.have.been.called;
        connectStub.should.have.been.called;
        return listenStub.should.have.been.called;
      });

      it('should resolve the promise', () => {
        let promise = app.start();
        return promise.should.be.fulfilled;
      });
    });

    describe('agent', () => {

      beforeEach(() => {
        return app.start();
      });

      afterEach(() => {
        return app.stop();
      });

      describe('http', () => {

        it('should start the http server and be listening', done => {
          request(expressModule.expressApp())
            .get('/')
            .expect(200, done);
        });

      });

      describe('https', () => {

        before(() => {
          config.express.https.enable = true;
        });

        after(() => {
          config.express.https.enable = false;
        });

        it('should start the http server and force redirect', done => {
          request(expressModule.expressApp())
            .get('/')
            .expect(301, done);
        });

      });



    });

  });

  it('should have stop property that is a function', () => {
    expect(app.stop).to.be.a('function');
  });

  describe('app.stop()', () => {

    describe('express failure', () => {
      let mockExpress, mockMongoose;

      beforeEach(() => {
        mockExpress = sandbox.stub(expressModule, 'destroy').rejects();
        mockMongoose = sandbox.stub(mongooseModule, 'disconnect').resolves();
      });

      it('should reject the promise', done => {
        app.stop()
          .catch(() => {
            done();
          });
      });
    });

    describe('mongoose failure', () => {
      let mockExpress, mockMongoose;

      beforeEach(() => {
        mockExpress = sandbox.stub(expressModule, 'destroy').resolves();
        mockMongoose = sandbox.stub(mongooseModule, 'disconnect').rejects();
      });

      it('should reject the promise', done => {
        app.stop()
          .catch(err => {
            done();
          });
      });
    });

  });
});
