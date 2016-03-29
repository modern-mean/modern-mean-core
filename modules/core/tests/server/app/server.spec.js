'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import app from '../../../server/app/init';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/core/server/app/server.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  let mockStart, mockStop;

  describe('success', () => {

    beforeEach(() => {
      mockStart = sandbox.stub(app, 'start').resolves();
    });

    it('should call app.start()', () => {
      delete require.cache[require.resolve('../../../server/app/server')];
      require('../../../server/app/server');
      return mockStart.should.have.been.calledOnce;
    });

  });

  describe('error', () => {


    beforeEach(() => {
      mockStart = sandbox.stub(app, 'start').rejects('test');
      mockStop = sandbox.stub(app, 'stop').resolves();
    });

    it('should call app.stop()', (done) => {
      delete require.cache[require.resolve('../../../server/app/server')];
      require('../../../server/app/server');
      setTimeout(() => {
        mockStop.should.have.been.called;
        done();
      }, 75);
    });

  });




});
