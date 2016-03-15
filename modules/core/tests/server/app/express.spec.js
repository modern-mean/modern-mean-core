import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import expressModule from '../../../server/app/express';
import express from 'express';
import config from 'modernMean/config';
import request from 'superagent';
import http from 'http';
import https from 'https';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

describe('/modules/core/server/app/express.js', () => {

  it('should export module', () => {
    return expressModule.should.be.an.object;
  });

  it('should have property init', () => {
    return expressModule.init.should.be.a.function;
  });

  describe('init()', () => {

    describe('success', () => {

      it('should resolve a promise on success', () => {
        return expressModule.init().should.be.fulfilled;
      });

      it('should resolve an instance of express', () => {
        return expressModule.init()
                .then(app => {
                  return app.use.should.be.a.function;
                });
      });

    });

  });

  it('should have property variables', () => {
    return expressModule.variables.should.be.a.function;
  });

  describe('variables()', () => {

    it('should resolve a promise on success', () => {
      return expressModule.init()
              .then(expressModule.variables).should.be.fulfilled;
    });

    it('should set express local variables', () => {
      let app = express();
      expressModule.variables(app)
        .then(app => {
          return Object.keys(app.locals).length.should.be.above(1);
        });
    });

  });

  it('should have property middleware', () => {
    return expressModule.middleware.should.be.a.function;
  });

  describe('middleware()', () => {

    it('should call express.use', () => {
      let app = express();
      let spy = sinon.spy(app, 'use');
      expressModule.middleware(app);
      return spy.should.have.been.called;
    });

    describe('development environment', () => {

      beforeEach(() => {
        process.env.NODE_ENV = 'development';
      });

      afterEach(() => {
        process.env.NODE_ENV = 'test';
      });

      it('should resolve a promise on success', () => {
        let app = express();
        return expressModule.middleware(app).should.be.fulfilled;
      });

    });

    describe('production environment', () => {

      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      afterEach(() => {
        process.env.NODE_ENV = 'test';
      });

      it('should resolve a promise on success', () => {
        let app = express();
        return expressModule.middleware(app).should.be.fulfilled;
      });

    });

  });

  it('should have property engine', () => {
    return expressModule.engine.should.be.a.function;
  });

  describe('engine()', () => {

    it('should resolve a promise on success', () => {
      let app = express();
      return expressModule.engine(app).should.be.fulfilled;
    });

    it('should call app.engine', () => {
      let app = express();
      let spy = sinon.spy(app, 'engine');
      expressModule.engine(app);
      return spy.should.have.been.called;
    });

    it('should call app.set', () => {
      let app = express();
      let spy = sinon.spy(app, 'set');
      expressModule.engine(app);
      return spy.should.have.been.called;
    });

  });

  it('should have property headers', () => {
    return expressModule.headers.should.be.a.function;
  });

  describe('headers()', () => {

    it('should resolve a promise on success', () => {
      let app = express();
      return expressModule.headers(app).should.be.fulfilled;
    });

    it('should call app.use', () => {
      let app = express();
      let spy = sinon.spy(app, 'use');
      expressModule.headers(app);
      return spy.should.have.been.called;
    });

  });

  it('should have property modules', () => {
    return expressModule.modules.should.be.a.function;
  });

  describe('modules()', () => {

    describe('success', () => {
      let saveConfig;

      beforeEach(() => {
        saveConfig = config.files.modules.custom;
        config.files.modules.custom = ['./modules/core/tests/server/resolveModule.js'];
      });

      afterEach(() => {
        config.files.modules.custom = saveConfig;
      });

      it('should resolve a promise on success', () => {
        let app = express();
        return expressModule.modules(app).should.be.fulfilled;
      });

    });

    describe('error', () => {
      let saveConfig;
      beforeEach(() => {
        saveConfig = config.files.modules.custom;
        config.files.modules.custom = ['./modules/core/tests/server/rejectModule.js'];
      });

      afterEach(() => {
        config.files.modules.custom = saveConfig;
      });

      it('should reject a promise', () => {
        let app = express();
        return expressModule.modules(app).should.be.rejected;
      });

    });

  });

  it('should have property core', () => {
    return expressModule.core.should.be.a.function;
  });

  describe('core()', () => {

    describe('success', () => {

      it('should resolve a promise on success', () => {
        let app = express();
        return expressModule.core(app).should.be.fulfilled;
      });

    });

    describe('error', () => {
      let saveConfig;
      beforeEach(() => {
        saveConfig = config.files.modules.core;
        config.files.modules.core = './modules/core/tests/server/rejectModule.js';
      });

      afterEach(() => {
        config.files.modules.core = saveConfig;
      });

      it('should reject a promise', () => {
        let app = express();
        return expressModule.core(app).should.be.rejected;
      });

    });

  });

  it('should have property listen', () => {
    return expressModule.listen.should.be.a.function;
  });

  describe('listen()', () => {
    let app, promise;

    describe('success', () => {

      beforeEach(() => {
        app = express();
        return promise = expressModule.listen(app);
      });

      afterEach(() => {
        expressModule.destroy();
      });

      it('should resolve a promise on success', () => {
        return promise.should.be.fulfilled;
      });

      it('should populate httpServer', () => {
        return expressModule.httpServer().should.be.an.object;
      });

      it('should populate httpsServer', () => {
        return expressModule.httpsServer().should.be.an.object;
      });

    });

    describe('success production', () => {
      let mockHttpCreateServer, mockHttpsCreateServer, mockHttp, mockHttps, newHttp, newHttps;

      beforeEach(() => {
        process.env.NODE_ENV = 'production';
        app = express();

        newHttp = http.createServer(app);
        newHttps = https.createServer(app);

        mockHttp = sinon.stub(newHttp, 'listen').returns(newHttp).yields();
        mockHttps = sinon.stub(newHttps, 'listen').returns(newHttps).yields();

        mockHttpCreateServer = sinon.stub(http, 'createServer').returns(newHttp);
        mockHttpsCreateServer = sinon.stub(https, 'createServer').returns(newHttps);
        return promise = expressModule.listen(app);
      });

      afterEach(() => {
        mockHttpCreateServer.restore();
        mockHttpsCreateServer.restore();
        process.env.NODE_ENV = 'test';
      });

      it('httpServer should not be destroyable', () => {
        return expect(expressModule.httpServer().destroy).to.equal(undefined);
      });

      it('httpsServer should not be destroyable', () => {
        return expect(expressModule.httpsServer().destroy).to.equal(undefined);
      });

    });

    describe('error', () => {
      let mockHttpCreateServer, mockHttpsCreateServer;

      beforeEach(() => {
        app = express();
        mockHttpCreateServer = sinon.stub(http, 'createServer').throws();
        mockHttpsCreateServer = sinon.stub(https, 'createServer').throws();
      });

      afterEach(() => {
        mockHttpCreateServer.restore();
        mockHttpsCreateServer.restore();
      });

      it('should reject a promise', () => {
        return expressModule.listen(app).should.be.rejected;
      });

    });

  });

  it('should have property destroy', () => {
    return expressModule.destroy.should.be.a.function;
  });

  describe('destroy()', () => {
    let app, promise;

    describe('success', () => {

      beforeEach(() => {
        app = express();
        return expressModule.listen(app);
      });

      it('should resolve a promise if nothing is listening', () => {
        return expressModule.destroy()
                .then(() => {
                  return expressModule.destroy().should.be.resolved;
                });
      });

      it('should resolve a promise', () => {
        return expressModule.destroy().should.be.resolved;
      });

    });

  });


});
