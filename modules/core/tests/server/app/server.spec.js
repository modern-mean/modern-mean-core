'use strict';

import app from '../../../server/app/init';

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

    it('should call app.start()', (done) => {
      delete require.cache[require.resolve('../../../server/app/server')];
      require('../../../server/app/server');
      setTimeout(() => {
        mockStart.should.be.calledOnce;
        done();
      }, 75);

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
