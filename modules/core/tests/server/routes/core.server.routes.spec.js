import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import express from 'express';
import request from 'superagent';
import * as routes from '../../../server/routes/core.server.routes';
import * as controller from '../../../server/controllers/core.server.controller';
import mean from '../../../server/app/init';



chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();


describe('modules/core/server/routes/core.server.routes.js', () => {

  it('should export default', () => {
    return routes.default.should.be.an.object;
  });

  it('should export init', () => {
    return routes.init.should.be.a.function;
  });

  describe('init()', () => {
    let app;

    beforeEach(() => {
      app = express();
    });

    describe('successa', () => {

      it('should resolve a promise', () => {
        return routes.init(app).should.be.resolved;
      });

      it('should set static routes', () => {
        let spy = sinon.spy(app, 'use');
        return routes.init(app)
                .then(() => {
                  return spy.should.have.been.calledWith('/');
                });
      });

      it('should set core routes', () => {
        let spy = sinon.spy(app, 'route');
        return routes.init(app)
                .then(() => {
                  spy.getCall(0).should.have.been.calledWith('/server-error');
                  spy.getCall(1).should.have.been.calledWith('/:url(api|build|public)/*');
                  return spy.getCall(2).should.have.been.calledWith('/*');
                });
      });

    });

    describe('error', () => {

      let mockExpress;

      beforeEach(() => {
        mockExpress = sinon.stub(app, 'use').throws('yay');
      });

      it('should reject a promise', () => {
        return routes.init(app).should.be.rejectedWith('yay');
      });

    });

  });

  describe('agent', () => {

    beforeEach(() => {
      return mean.start();
    });

    afterEach(() => {
      return mean.stop();
    });

    it('should respond with 500 to server-error route', (done) => {
      request.get('http://localhost:8081/server-error')
        .end(function(err, res){
          expect(res.status).to.equal(500);
          done();
        });
    });

    it('should respond with 404 with text/html header', (done) => {
      request.get('http://localhost:8081/api/asdf')
        .end(function(err, res){
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should respond with 404 with application/json header', (done) => {
      request.get('http://localhost:8081/api/asdf')
        .set('Accept', 'application/json')
        .end(function(err, res){
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Path not found');
          done();
        });
    });

    it('should respond with 404 with application/xml header', (done) => {
      request.get('http://localhost:8081/api/asdf')
        .set('Accept', 'application/xml')
        .end(function(err, res){
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Path not found');
          done();
        });
    });

  });

});
