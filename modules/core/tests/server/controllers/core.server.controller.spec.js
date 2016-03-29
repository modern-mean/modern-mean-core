'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import * as controller from '../../../server/controllers/core.server.controller.js';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/core/server/controllers/core.server.controller.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should export default', () => {
    controller.default.should.be.an('object');
  });

  it('should export renderIndex', () => {
    controller.renderIndex.should.be.a('function');
  });

  describe('renderIndex()', () => {
    let mockRes;

    beforeEach(() => {
      mockRes = {
        render: sandbox.spy()
      };
    });

    it('should call res.render', () => {
      controller.renderIndex({}, mockRes);
      return mockRes.render.should.have.been.called;
    });

  });

  it('should export renderServerError', () => {
    controller.renderServerError.should.be.a('function');
  });

  describe('renderServerError()', () => {
    let mockRes;

    beforeEach(() => {
      mockRes = {
        status: sandbox.stub().returnsThis(),
        render: sandbox.spy()
      };
    });

    it('should call res.render', () => {
      controller.renderServerError({}, mockRes);
      mockRes.render.should.have.been.called;
      mockRes.status.should.have.been.calledWith(500);
    });

  });

  it('should export renderNotFound', () => {
    controller.renderNotFound.should.be.a('function');
  });

  describe('renderNotFound()', () => {
    let mockRes, mockReq;

    beforeEach(() => {
      mockRes = {
        status: sandbox.stub().returnsThis(),
        render: sandbox.spy(),
        json: sandbox.spy()
      };
      mockReq = { originalUrl: 'http://test' };
    });

    it('should call respond with status 404', () => {
      mockRes.format = sandbox.stub().yieldsTo('text/html');
      controller.renderNotFound(mockReq, mockRes);
      return mockRes.status.should.have.been.calledWith(404);
    });

    describe('text/html header', () => {

      it('should call res.render', () => {
        mockRes.format = sandbox.stub().yieldsTo('text/html');
        controller.renderNotFound(mockReq, mockRes);
        return mockRes.render.should.have.been.called;
      });

    });

    describe('application/json header', () => {

      it('should call res.json', () => {
        mockRes.format = sandbox.stub().yieldsTo('application/json');
        controller.renderNotFound(mockReq, mockRes);
        return mockRes.json.should.have.been.called;
      });

    });

    describe('catch all header', () => {

      it('should call res.json', () => {
        mockRes.format = sandbox.stub().yieldsTo('default');
        controller.renderNotFound(mockReq, mockRes);
        return mockRes.json.should.have.been.calledWith({ error: 'Path not found' });
      });

    });

  });

});
